import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Search, Sun, Scale, Heart, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../stores/useCartStore';

export default function Navbar() {
  const navigate = useNavigate();
  const { getCartCount } = useCartStore();

  return (
    <nav className="sticky top-0 z-50 bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Links */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-500 rounded flex items-center justify-center text-white font-bold text-xl">A</div>
              <span className="text-white font-bold text-xl tracking-tight">ANT</span>
            </Link>
            
            <div className="hidden lg:flex items-center gap-6">
              <NavLink to="/product" className={({isActive}) => `text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'}`}>Marketplace</NavLink>
              <NavLink to="/shops" className={({isActive}) => `text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'}`}>Shops</NavLink>
              <NavLink to="/categories" className={({isActive}) => `text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'}`}>Categories</NavLink>
              <NavLink to="/brands" className={({isActive}) => `text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'}`}>Brands</NavLink>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl px-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-zinc-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-zinc-800 rounded-lg leading-5 bg-[#0f1115] text-zinc-300 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                placeholder="Search parts, brands, shops..."
              />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-5">
            <button className="text-zinc-400 hover:text-zinc-200 transition-colors hidden sm:block">
              <Sun className="w-5 h-5" />
            </button>
            <button onClick={() => navigate('/compare')} className="text-zinc-400 hover:text-zinc-200 transition-colors hidden sm:block">
              <Scale className="w-5 h-5" />
            </button>
            <button className="text-zinc-400 hover:text-zinc-200 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            
            <button className="text-zinc-400 hover:text-zinc-200 transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {getCartCount()}
                </span>
              )}
            </button>
            
            <button 
              onClick={() => navigate('/auth')}
              className="ml-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <div className="w-4 h-4 rounded-full bg-indigo-400 flex items-center justify-center border border-indigo-300">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
              Sign in
            </button>
          </div>
          
        </div>
      </div>
    </nav>
  );
}
