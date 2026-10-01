import { supabaseAdmin } from '@/lib/supabase-admin';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Package, CheckCircle2, Truck, Home } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function OrderTrackingPage({ params }: { params: { id: string } }) {
  // Fetch order from DB
  const { data: order, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center bg-white p-12 rounded-3xl shadow-sm max-w-md w-full">
            <Package className="mx-auto text-gray-300 mb-6" size={64} />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h1>
            <p className="text-gray-500 mb-6">We couldn&apos;t find an order with that tracking ID. Please check the link in your email.</p>
            <Link href="/" className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors inline-block">
              Return Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Format date
  const orderDate = new Date(order.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-32 max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-10 border-b border-gray-100">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Details</h1>
              <p className="text-gray-500">Order placed on {orderDate}</p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full font-semibold">
                <CheckCircle2 size={18} />
                Paid Successfully
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Order Summary */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600">Order ID</span>
                  <span className="font-mono text-sm text-gray-900 break-all max-w-[200px] text-right">{order.id}</span>
                </div>
                {order.discount_code_used && (
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-600">Discount Code Applied</span>
                    <span className="font-semibold text-primary-600">{order.discount_code_used}</span>
                  </div>
                )}
                <div className="flex justify-between py-3">
                  <span className="text-lg font-bold text-gray-900">Total Paid</span>
                  <span className="text-lg font-bold text-gray-900">${order.total_amount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Shipping Details */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Information</h2>
              <div className="bg-gray-50 p-6 rounded-2xl">
                <div className="flex items-start gap-4 mb-4">
                  <Home className="text-primary-600 mt-1" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">{order.customer_name || 'Customer'}</p>
                    {order.shipping_address ? (
                      <>
                        <p className="text-gray-600">{order.shipping_address}</p>
                        <p className="text-gray-600">{order.shipping_city}, {order.shipping_state} {order.shipping_zip}</p>
                        <p className="text-gray-600">{order.shipping_country}</p>
                      </>
                    ) : (
                      <p className="text-gray-500 italic">Shipping address not provided.</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                  <Truck className="text-primary-600" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">Status</p>
                    <p className="text-gray-600">Processing (Usually ships in 1-2 days)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
