import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    // Query Supabase for the discount code
    const { data, error } = await supabase
      .from('discount_codes')
      .select('code, discount_percentage, is_used')
      .eq('code', code.toUpperCase())
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Invalid discount code' }, { status: 404 });
    }

    if (data.is_used) {
      return NextResponse.json({ error: 'This discount code has already been used' }, { status: 400 });
    }

    return NextResponse.json({
      valid: true,
      discount_percentage: data.discount_percentage,
    });
  } catch (error) {
    console.error('Error validating code:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
