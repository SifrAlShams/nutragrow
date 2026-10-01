import LogoutButton from '@/components/LogoutButton';
import Link from 'next/link';
import { Settings, LogOut, LayoutDashboard, ShoppingBag } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <Link href="/admin" className="text-xl font-bold text-primary-600">
            NutraGrow Admin
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-primary-50 text-primary-700 rounded-xl font-medium">
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
            <ShoppingBag size={20} />
            View Store
          </a>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <LogoutButton />
        </div>
      </aside>

      {/* Mobile Header (simplified) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-50">
        <span className="font-bold text-primary-600">Admin</span>
        <a href="/" className="text-sm text-gray-600">View Store</a>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
