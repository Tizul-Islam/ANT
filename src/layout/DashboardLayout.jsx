import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../utils/auth';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Bell,
  Heart,
  Car,
  Wallet,
  GraduationCap
} from 'lucide-react';

export default function DashboardLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const user = getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  // Define navigation based on role
  const shopLinks = [
    { name: 'Overview', to: '/myshop', icon: LayoutDashboard },
    { name: 'Products', to: '/myshop/products', icon: Package },
    { name: 'Orders', to: '/myshop/orders', icon: ShoppingCart },
    { name: 'Customers', to: '/myshop/customers', icon: Users },
    { name: 'Settings', to: '/myshop/settings', icon: Settings },
  ];

  const customerLinks = [
    { name: 'Dashboard', to: '/profile', icon: LayoutDashboard },
    { name: 'My Orders', to: '/profile/orders', icon: ShoppingCart },
    { name: 'Wallet', to: '/profile/wallet', icon: Wallet },
    { name: 'My Garage', to: '/profile/vehicles', icon: Car },
    { name: 'Training', to: '/profile/training', icon: GraduationCap },
    { name: 'Settings', to: '/profile/settings', icon: Settings },
  ];

  const navLinks = user?.role === 'shop_owner' ? shopLinks : customerLinks;

  return (
    <div className="flex h-screen bg-[#09090b] overflow-hidden font-sans text-white">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0c0d10] border-r border-zinc-800 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center px-6 border-b border-zinc-800">
          <span className="text-xl font-bold text-white tracking-tight">ANT Enterprise</span>
          <button className="ml-auto lg:hidden text-zinc-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6">
          <nav className="space-y-1.5 px-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.name}
                  to={link.to}
                  end={link.to === '/myshop' || link.to === '/profile'}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) => `
                    flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-[#7a73ff]/10 text-[#7a73ff]' 
                      : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}
                  `}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {link.name}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-zinc-800">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-[#0c0d10] border-b border-zinc-800 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10">
          <div className="flex items-center">
            <button 
              className="lg:hidden text-zinc-400 hover:text-white focus:outline-none"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden lg:block">
              <span className="text-sm text-zinc-400 font-medium tracking-wide">
                {user?.role === 'shop_owner' ? 'Shop Dashboard' : 'Customer Dashboard'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-zinc-400 hover:text-white relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-indigo-500 rounded-full border border-[#0c0d10]"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-zinc-800">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white leading-none">{user?.name || 'User'}</p>
                <p className="text-xs text-zinc-500 mt-1">{user?.role === 'shop_owner' ? 'Vendor' : 'Customer'}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold border border-indigo-500/20">
                {(user?.name || 'U').charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-[#09090b] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
