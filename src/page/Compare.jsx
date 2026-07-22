import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompareStore } from '../stores/useCompareStore';
import { Scale, X, ShoppingCart } from 'lucide-react';
import useTitle from '../utils/useTitle';
import { useCartStore } from '../stores/useCartStore';

export default function Compare() {
  useTitle("Compare | ANT");
  const navigate = useNavigate();
  const { items, removeFromCompare, clearCompare } = useCompareStore();
  const { addToCart } = useCartStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#09090b] text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">Compare</h1>
          <p className="text-zinc-400">Side-by-side comparison — up to 4 products.</p>
        </div>

        {items.length === 0 ? (
          /* Empty State matching Image 2 */
          <div className="border border-dashed border-zinc-800 rounded-2xl py-24 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mb-6">
              <Scale className="w-6 h-6 text-zinc-500" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">No products to compare</h2>
            <p className="text-sm text-zinc-500 mb-8 max-w-sm">
              Add products from the marketplace to see them side by side.
            </p>
            <button 
              onClick={() => navigate('/product')}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
            >
              Browse products
            </button>
          </div>
        ) : (
          /* Real Compare Grid (when items exist) */
          <div>
            <div className="flex justify-end mb-6">
              <button 
                onClick={clearCompare}
                className="text-sm text-red-400 hover:text-red-300 transition-colors"
              >
                Clear all
              </button>
            </div>
            
            <div className="overflow-x-auto pb-8 custom-scrollbar">
              <div className="inline-flex min-w-full">
                {items.map(product => (
                  <div key={product.id} className="w-72 shrink-0 bg-[#0f1115] border border-zinc-800 rounded-xl overflow-hidden mr-6 relative flex flex-col">
                    <button 
                      onClick={() => removeFromCompare(product.id)}
                      className="absolute top-3 right-3 z-10 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-black/80 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    
                    <div className="w-full h-48 bg-zinc-900">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-90" />
                    </div>
                    
                    <div className="p-6 flex flex-col flex-1">
                      <div className="text-xs text-indigo-400 font-medium uppercase tracking-wider mb-2">{product.brand}</div>
                      <h3 className="text-lg font-bold text-white mb-4 line-clamp-2">{product.name}</h3>
                      <div className="text-2xl font-bold text-white mb-6">৳{product.price.toLocaleString()}</div>
                      
                      <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-sm border-b border-zinc-800 pb-2">
                          <span className="text-zinc-500">Category</span>
                          <span className="text-zinc-300">{product.category}</span>
                        </div>
                        <div className="flex justify-between text-sm border-b border-zinc-800 pb-2">
                          <span className="text-zinc-500">Rating</span>
                          <span className="text-zinc-300">{product.rating} ★</span>
                        </div>
                        <div className="flex justify-between text-sm border-b border-zinc-800 pb-2">
                          <span className="text-zinc-500">Vendor</span>
                          <span className="text-zinc-300 truncate max-w-[120px]" title={product.vendor}>{product.vendor}</span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => addToCart(product, 1)}
                        className="w-full mt-auto bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4" /> Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}
