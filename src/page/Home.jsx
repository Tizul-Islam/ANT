import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Wrench, ShieldCheck, Zap, ArrowRight, Settings, Disc, Droplet, Battery, Fan, Box } from 'lucide-react';
import ProductCard from '../components/common/ProductCard';
import ShopCard from '../components/common/ShopCard';
import { apiClient } from '../lib/api/client';
import useTitle from '../utils/useTitle';

export default function Home() {
  useTitle('Home | ANT');
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const [prodRes, shopRes] = await Promise.all([
          apiClient.get('/products'),
          apiClient.get('/shops')
        ]);
        setProducts(prodRes.data.slice(0, 8)); // 8 featured products
        setShops(shopRes.data.slice(0, 4)); // 4 top-rated shops
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchData();
  }, []);

  const categories = [
    { name: 'Engine Parts', count: '14K', icon: <Settings className="w-5 h-5" /> },
    { name: 'Brakes', count: '7K', icon: <Disc className="w-5 h-5" /> },
    { name: 'Suspension', count: '5.2K', icon: <Box className="w-5 h-5" /> },
    { name: 'Ignition', count: '3.1K', icon: <Zap className="w-5 h-5" /> },
    { name: 'Filters', count: '12K', icon: <Fan className="w-5 h-5" /> },
    { name: 'Tyres & Wheels', count: '4.5K', icon: <Box className="w-5 h-5" /> },
    { name: 'Oil & Fluids', count: '8K', icon: <Droplet className="w-5 h-5" /> },
    { name: 'Battery', count: '2K', icon: <Battery className="w-5 h-5" /> },
  ];

  return (
    <div className="bg-[#09090b] text-white overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs font-medium text-zinc-300 mb-8">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              The largest automotive marketplace
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Every part. Every <br /> shop. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">One super-app.</span>
            </h1>
            
            <p className="text-lg text-zinc-400 mb-10 max-w-xl leading-relaxed">
              Buy genuine auto parts from verified shops, book certified mechanics, track service history, and get expert advice. All in one unified ecosystem.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <button 
                onClick={() => navigate('/product')}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3.5 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                Explore marketplace <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => navigate('/shops')}
                className="bg-transparent border border-zinc-700 hover:bg-zinc-900 text-white px-8 py-3.5 rounded-lg font-medium transition-colors"
              >
                View all shops
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-8 border-t border-zinc-800 pt-8 max-w-xl">
              <div>
                <div className="text-3xl font-bold text-white mb-1">10K+</div>
                <div className="text-sm text-zinc-500">Genuine parts</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-sm text-zinc-500">Verified shops</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">50K+</div>
                <div className="text-sm text-zinc-500">Happy customers</div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute inset-0 bg-indigo-500/20 blur-[120px] rounded-full z-0"></div>
            <div className="relative z-10 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=900&fit=crop" 
                alt="Automotive parts and cars" 
                className="w-full h-full object-cover"
              />
              
              {/* Floating Badges */}
              <div className="absolute top-6 left-6 bg-[#0f1115]/90 backdrop-blur-md border border-zinc-700 p-3 rounded-xl flex items-center gap-3 shadow-xl">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">100% Genuine</div>
                  <div className="text-[10px] text-zinc-400">Verified sellers</div>
                </div>
              </div>
              
              <div className="absolute bottom-6 right-6 bg-[#0f1115]/90 backdrop-blur-md border border-zinc-700 p-3 rounded-xl flex items-center gap-3 shadow-xl">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Fast Delivery</div>
                  <div className="text-[10px] text-zinc-400">Anywhere in Dhaka</div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#0f1115] border border-zinc-800 p-5 rounded-xl flex items-center justify-between cursor-pointer hover:border-zinc-600 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <Box className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Parts Marketplace</h3>
                <p className="text-xs text-zinc-500">Shop genuine auto parts</p>
              </div>
            </div>
          </div>
          <div className="bg-[#0f1115] border border-zinc-800 p-5 rounded-xl flex items-center justify-between cursor-pointer hover:border-zinc-600 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Service Hub</h3>
                <p className="text-xs text-zinc-500">Book certified mechanics</p>
              </div>
            </div>
          </div>
          <div className="bg-[#0f1115] border border-zinc-800 p-5 rounded-xl flex items-center justify-between cursor-pointer hover:border-zinc-600 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Garage Finder</h3>
                <p className="text-xs text-zinc-500">Find trusted workshops</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR CATEGORIES */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-sm font-semibold text-indigo-400 mb-1 uppercase tracking-wider">Browse By Parts</h2>
            <h3 className="text-3xl font-bold text-white tracking-tight">Popular categories</h3>
          </div>
          <button className="text-sm text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1">
            View all <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-[#0f1115] border border-zinc-800 p-5 rounded-xl cursor-pointer hover:border-zinc-600 transition-all hover:-translate-y-1 group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-indigo-400 transition-colors">
                  {cat.icon}
                </div>
              </div>
              <h4 className="font-bold text-zinc-200 text-sm mb-1">{cat.name}</h4>
              <p className="text-xs text-zinc-500">{cat.count} products</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-sm font-semibold text-indigo-400 mb-1 uppercase tracking-wider">Handpicked For You</h2>
            <h3 className="text-3xl font-bold text-white tracking-tight">Featured products</h3>
          </div>
          <button onClick={() => navigate('/product')} className="text-sm text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1">
            View all <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* TOP RATED SHOPS */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-sm font-semibold text-indigo-400 mb-1 uppercase tracking-wider">Verified Sellers</h2>
            <h3 className="text-3xl font-bold text-white tracking-tight">Top-rated shops</h3>
          </div>
          <button onClick={() => navigate('/shops')} className="text-sm text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1">
            View all <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {shops.map(shop => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-zinc-900">
        <div className="bg-gradient-to-r from-[#0f1115] to-[#141724] border border-zinc-800 rounded-3xl p-10 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-500/10 blur-[100px]"></div>
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">Sell on ANT.</h2>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              Join hundreds of shops growing their business on the country's most trusted automotive marketplace. Setup takes minutes.
            </p>
            <div className="flex items-center gap-4">
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3.5 rounded-lg font-medium transition-colors">
                Become a seller
              </button>
              <button className="bg-transparent border border-zinc-700 hover:bg-zinc-800 text-white px-8 py-3.5 rounded-lg font-medium transition-colors">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}