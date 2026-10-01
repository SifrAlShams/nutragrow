import { supabaseAdmin } from '@/lib/supabase-admin';
import { DollarSign, Package, Tag, TrendingUp, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0; // Don't cache admin dashboard

export default async function AdminDashboard() {
  // Fetch overall stats concurrently
  const [
    { data: ordersData, error: ordersError },
    { count: codesUsed, error: codesError },
    { data: productData, error: productError }
  ] = await Promise.all([
    supabaseAdmin.from('orders').select('*').order('created_at', { ascending: false }),
    supabaseAdmin.from('discount_codes').select('*', { count: 'exact', head: true }).eq('is_used', true),
    supabaseAdmin.from('products').select('stock').eq('id', '1').single()
  ]);

  if (ordersError || codesError || productError) {
    return (
      <div className="p-8 bg-red-50 text-red-700 rounded-xl flex items-start gap-3">
        <AlertCircle className="mt-1" size={20} />
        <div>
          <h3 className="font-bold text-lg mb-1">Error Loading Dashboard</h3>
          <p>Please ensure your SUPABASE_SERVICE_ROLE_KEY is correctly set in .env.local and matches the project URL.</p>
        </div>
      </div>
    );
  }

  // Calculate metrics
  const totalRevenue = ordersData.reduce((sum, order) => sum + (Number(order.total_amount) || 0), 0);
  const totalOrders = ordersData.length;
  const recentOrders = ordersData.slice(0, 10);
  const currentStock = productData?.stock || 0;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your store&apos;s performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Total Revenue</h3>
            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
              <DollarSign size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Total Orders</h3>
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
              <Package size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalOrders}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Discounts Used</h3>
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
              <Tag size={20} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{codesUsed || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">Inventory Stock</h3>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStock < 20 ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'}`}>
              <TrendingUp size={20} />
            </div>
          </div>
          <p className={`text-3xl font-bold ${currentStock < 20 ? 'text-red-600' : 'text-gray-900'}`}>{currentStock}</p>
          {currentStock < 20 && <p className="text-sm text-red-500 mt-1">Low stock warning!</p>}
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="p-4 font-medium">Order ID</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Discount Code</th>
                <th className="p-4 font-medium text-right">Amount</th>
                <th className="p-4 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No orders yet.
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-mono text-xs text-gray-500">
                      <Link href={`/orders/${order.id}`} target="_blank" className="hover:text-primary-600 transition-colors">
                        {order.id.split('-')[0]}...
                      </Link>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-sm font-medium text-gray-900">
                      {order.customer_email}
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {order.discount_code_used ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {order.discount_code_used}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="p-4 text-sm font-bold text-gray-900 text-right">
                      ${Number(order.total_amount).toFixed(2)}
                    </td>
                    <td className="p-4 text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
