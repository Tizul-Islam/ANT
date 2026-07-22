import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, Search, ChevronDown, Check } from 'lucide-react';
import ProductCard from '../components/common/ProductCard';
import { apiClient } from '../lib/api/client';
import useTitle from '../utils/useTitle';

export default function Product() {
  useTitle("Marketplace | ANT");
  const location = useLocation();
  const initialSearch = location.state?.searchQuery || '';

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(15000);
  
  const categories = ['All', 'Engine Parts', 'Brakes', 'Ignition', 'Battery', 'Filters', 'AC Parts', 'Suspension', 'Tyres', 'Accessories', 'Oil & Fluids'];
  const makes = ['Toyota', 'Honda', 'Nissan', 'Mitsubishi', 'Hyundai', 'Kia', 'BMW', 'Mercedes-Benz'];

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await apiClient.get('/products');
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => {
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    if (p.price > priceRange) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Header / Breadcrumbs */}
        <div className="mb-6">
          <div className="text-xs text-zinc-500 font-medium mb-1.5 flex items-center gap-1.5">
            <span className="hover:text-zinc-300 cursor-pointer">Home</span>
            <span>/</span>
            <span className="text-zinc-300">Marketplace</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Marketplace</h1>
              <p className="text-sm text-zinc-400">Showing {filteredProducts.length} products</p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-zinc-400">Sort by</span>
              <button className="bg-[#0f1115] border border-zinc-800 rounded-md px-3 py-1.5 text-sm flex items-center gap-2 hover:bg-[#1a1c23] transition-colors">
                Recommended <ChevronDown className="w-4 h-4 text-zinc-500" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-24 space-y-8">
              
              {/* Search within filters */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center justify-between">
                  Filters <Filter className="w-4 h-4 text-zinc-500" />
                </h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search in results..."
                    className="w-full bg-[#0f1115] border border-zinc-800 rounded-md pl-9 pr-3 py-2 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Categories</h4>
                <div className="space-y-1 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  {categories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className="w-full flex items-center justify-between group py-1"
                    >
                      <span className={`text-sm transition-colors ${selectedCategory === cat ? 'text-indigo-400 font-medium' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                        {cat}
                      </span>
                      {selectedCategory === cat && <Check className="w-4 h-4 text-indigo-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vehicle Make (Mock) */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Vehicle Make</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {makes.map(make => (
                    <label key={make} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-4 h-4 rounded border border-zinc-700 bg-[#0f1115] group-hover:border-zinc-500 flex items-center justify-center">
                        {/* checkbox mock */}
                      </div>
                      <span className="text-sm text-zinc-400 group-hover:text-zinc-200">{make}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Max Price</h4>
                <div className="px-1">
                  <input 
                    type="range" 
                    min="500" 
                    max="30000" 
                    step="500"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500" 
                  />
                  <div className="flex justify-between text-xs text-zinc-500 mt-2">
                    <span>৳500</span>
                    <span className="text-indigo-400 font-medium">৳{priceRange.toLocaleString()}</span>
                    <span>৳30k+</span>
                  </div>
                </div>
              </div>

            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {[1,2,3,4,5,6,7,8].map(n => (
                  <div key={n} className="bg-[#0f1115] rounded-xl aspect-[3/4] animate-pulse border border-zinc-800"></div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} viewMode="grid" />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-[#0f1115] rounded-xl border border-zinc-800">
                <Search className="w-10 h-10 text-zinc-600 mb-4" />
                <h3 className="text-lg font-medium text-white mb-1">No exact matches found</h3>
                <p className="text-sm text-zinc-500 mb-6">Try changing or removing some of your filters.</p>
                <button 
                  onClick={() => {
                    setSelectedCategory('All');
                    setPriceRange(30000);
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}