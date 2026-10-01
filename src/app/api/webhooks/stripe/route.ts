import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase-admin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2023-10-16' as any,
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    // If webhook secret is not set, we'll try to process it as a raw event for testing
    // but in production MUST use a webhook secret.
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
    } else {
      console.warn("No STRIPE_WEBHOOK_SECRET found, parsing event directly. NOT SAFE FOR PRODUCTION.");
      event = JSON.parse(body);
    }
  } catch (error: any) {
    console.error(`Webhook signature verification failed: ${error.message}`);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  // Handle successful payments
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const discountCode = session.metadata?.discountCode;
    const shippingDataStr = session.metadata?.shippingData;
    let shippingData = null;

    if (shippingDataStr) {
      try {
        shippingData = JSON.parse(shippingDataStr);
      } catch (e) {
        console.error("Failed to parse shipping data from metadata", e);
      }
    }

    try {
      // 1. Mark discount code as used if one was applied
      if (discountCode) {
        const { error: updateError } = await supabaseAdmin
          .from('discount_codes')
          .update({ 
            is_used: true,
            used_at: new Date().toISOString(),
            order_id: session.id 
          })
          .eq('code', discountCode);

        if (updateError) throw updateError;
      }

      // 2. Save order to database
      const { error: orderError } = await supabaseAdmin
        .from('orders')
        .insert({
          id: session.id,
          total_amount: session.amount_total ? session.amount_total / 100 : 0,
          status: 'paid',
          discount_code_used: discountCode || null,
          customer_email: session.customer_details?.email || shippingData?.email || null,
          customer_name: shippingData?.firstName && shippingData?.lastName ? `${shippingData.firstName} ${shippingData.lastName}` : session.customer_details?.name,
          shipping_address: shippingData?.address || null,
          shipping_city: shippingData?.city || null,
          shipping_state: shippingData?.state || null,
          shipping_zip: shippingData?.zipCode || null,
          shipping_country: shippingData?.country || null,
        });

      if (orderError) throw orderError;

      // 3. Decrement Product Stock
      try {
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
        const productId = session.metadata?.productId || '1'; // Currently only 1 product
        
        let totalQuantityBought = 0;
        lineItems.data.forEach(item => {
          totalQuantityBought += (item.quantity || 1);
        });

        // Call Supabase RPC or just read/update (since we are admin)
        const { data: product } = await supabaseAdmin
          .from('products')
          .select('stock')
          .eq('id', productId)
          .single();

        if (product && product.stock !== null) {
          await supabaseAdmin
            .from('products')
            .update({ stock: Math.max(0, product.stock - totalQuantityBought) })
            .eq('id', productId);
        }
      } catch (stockError) {
        console.error('Failed to update stock:', stockError);
      }

      console.log(`Order ${session.id} successfully processed!`);
    } catch (error) {
      console.error('Database update failed:', error);
      // Still return 200 to Stripe so it doesn't retry endlessly, but log the error
    }
  }

  return NextResponse.json({ received: true });
}
