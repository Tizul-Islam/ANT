import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, MapPin, CheckCircle } from 'lucide-react';

export default function ShopCard({ shop }) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/shops/${shop.id}`)}
      className="group bg-[#0f1115] rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-all duration-300 cursor-pointer relative"
    >
      {/* Background Image */}
      <div className="h-32 w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-transparent to-transparent z-10"></div>
        <img 
          src={shop.image} 
          alt={shop.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70"
        />
      </div>

      {/* Shop Info overlapping image */}
      <div className="px-4 pb-4 -mt-10 relative z-20 flex flex-col h-[calc(100%-8rem+2.5rem)]">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-black rounded-lg border border-zinc-800 flex items-center justify-center shrink-0 shadow-lg">
            <Store className="w-6 h-6 text-indigo-400" />
          </div>
          <div className="pt-2">
            <h3 className="font-bold text-white text-base flex items-center gap-1.5 leading-tight">
              {shop.name}
              {shop.verified && <CheckCircle className="w-3.5 h-3.5 text-blue-400" />}
            </h3>
            <p className="text-xs text-zinc-400 flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3" /> {shop.location}
            </p>
          </div>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between text-xs">
          <div className="flex items-center text-yellow-500 font-medium">
            {'★'.repeat(Math.floor(shop.rating))}
            <span className="text-zinc-500 ml-1">({shop.reviews})</span>
          </div>
          <div className="text-zinc-400">
            <span className="text-white font-medium">{shop.products_count}</span> products
          </div>
        </div>
      </div>
    </div>
  );
}
