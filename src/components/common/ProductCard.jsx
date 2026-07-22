import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Scale, ShoppingCart } from 'lucide-react';
import { useWishlistStore } from '../../stores/useWishlistStore';
import { useCompareStore } from '../../stores/useCompareStore';

export default function ProductCard({ product, viewMode = 'grid' }) {
  const navigate = useNavigate();
  const { toggleItem: toggleWishlist, isInWishlist } = useWishlistStore();
  const { toggleItem: toggleCompare, isInCompare } = useCompareStore();

  const isGrid = viewMode === 'grid';

  return (
    <div className={`group flex ${isGrid ? 'flex-col' : 'flex-row'} bg-[#0f1115] rounded-xl overflow-hidden hover:bg-[#1a1c23] border border-zinc-800 hover:border-zinc-700 transition-all duration-300 relative`}>
      
      {/* Discount Badge */}
      {product.discount && isGrid && (
        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
          {product.discount}
        </div>
      )}

      {/* Quick Actions (Hover) */}
      <div className={`absolute ${isGrid ? 'top-3 right-3' : 'bottom-3 right-3'} z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
        <button 
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
          className={`p-2 rounded-lg shadow-sm transition-colors ${isInWishlist(product.id) ? 'bg-indigo-500/20 text-indigo-400' : 'bg-black/50 backdrop-blur-sm text-zinc-400 hover:text-white hover:bg-black/80'}`}
          title="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); toggleCompare(product); }}
          className={`p-2 rounded-lg shadow-sm transition-colors ${isInCompare(product.id) ? 'bg-indigo-500/20 text-indigo-400' : 'bg-black/50 backdrop-blur-sm text-zinc-400 hover:text-white hover:bg-black/80'}`}
          title="Compare"
        >
          <Scale className="w-4 h-4" />
        </button>
      </div>

      {/* Image */}
      <div 
        className={`${isGrid ? 'w-full aspect-[4/3]' : 'w-48 shrink-0'} bg-zinc-900 relative cursor-pointer overflow-hidden`}
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
        />
        {!product.in_stock && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`flex flex-col flex-1 p-4 cursor-pointer ${!isGrid && 'justify-center'}`} onClick={() => navigate(`/product/${product.id}`)}>
        <div className="text-[10px] text-zinc-500 mb-1 font-semibold uppercase tracking-wider flex items-center justify-between">
          <span>{product.brand}</span>
        </div>
        
        <h3 className={`font-semibold text-zinc-200 mb-2 leading-snug ${isGrid ? 'line-clamp-2 min-h-[2.75rem]' : 'text-lg'}`}>
          {product.name}
        </h3>
        
        <div className="flex items-center text-yellow-500 text-xs mb-4">
          {'★'.repeat(Math.floor(product.rating))}
          <span className="text-zinc-500 ml-2">({product.reviews})</span>
        </div>

        <div className="mt-auto flex items-end justify-between">
          <div>
            <div className="font-bold text-lg text-white font-mono">
              ৳{product.price.toLocaleString()}
            </div>
            {product.old_price && (
              <div className="text-xs text-zinc-500 line-through">
                ৳{product.old_price.toLocaleString()}
              </div>
            )}
          </div>
          
          <button 
            className={`w-8 h-8 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-indigo-500 hover:text-white flex items-center justify-center transition-colors disabled:opacity-50`}
            disabled={!product.in_stock}
            onClick={(e) => { 
              e.stopPropagation(); 
            }}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
