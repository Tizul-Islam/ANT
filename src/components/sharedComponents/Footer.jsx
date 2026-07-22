import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#09090b] border-t border-zinc-900 pt-20 pb-8 text-sm">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 pr-8">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-indigo-500 rounded flex items-center justify-center text-white font-bold text-xl">A</div>
              <span className="text-white font-bold text-xl tracking-tight">ANT</span>
            </Link>
            <p className="text-zinc-400 mb-8 max-w-sm leading-relaxed">
              Bangladesh's automotive super-app. Genuine parts, verified shops, certified mechanics, and training — all in one place.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </div>

          {/* Links Cols */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6">Marketplace</h4>
            <ul className="space-y-4">
              <li><Link to="/product" className="text-zinc-400 hover:text-indigo-400 transition-colors">All Parts</Link></li>
              <li><Link to="/shops" className="text-zinc-400 hover:text-indigo-400 transition-colors">Shops</Link></li>
              <li><Link to="/brands" className="text-zinc-400 hover:text-indigo-400 transition-colors">Brands</Link></li>
              <li><Link to="/categories" className="text-zinc-400 hover:text-indigo-400 transition-colors">Categories</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link to="#" className="text-zinc-400 hover:text-indigo-400 transition-colors">About</Link></li>
              <li><Link to="#" className="text-zinc-400 hover:text-indigo-400 transition-colors">Careers</Link></li>
              <li><Link to="#" className="text-zinc-400 hover:text-indigo-400 transition-colors">Press</Link></li>
              <li><Link to="#" className="text-zinc-400 hover:text-indigo-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link to="#" className="text-zinc-400 hover:text-indigo-400 transition-colors">Help Center</Link></li>
              <li><Link to="#" className="text-zinc-400 hover:text-indigo-400 transition-colors">Returns</Link></li>
              <li><Link to="#" className="text-zinc-400 hover:text-indigo-400 transition-colors">Shipping</Link></li>
              <li><Link to="#" className="text-zinc-400 hover:text-indigo-400 transition-colors">Warranty</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500">
            © 2026 ANT — Auto Network Technology. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="#" className="text-zinc-500 hover:text-white transition-colors">Privacy</Link>
            <Link to="#" className="text-zinc-500 hover:text-white transition-colors">Terms</Link>
            <Link to="#" className="text-zinc-500 hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}