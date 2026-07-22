import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTitle from '../utils/useTitle';

const BRANDS = [
  { name: 'Toyota', count: 128 },
  { name: 'Honda', count: 96 },
  { name: 'BMW', count: 84 },
  { name: 'Suzuki', count: 72 },
  { name: 'Nissan', count: 65 },
  { name: 'Mitsubishi', count: 54 },
  { name: 'Hyundai', count: 61 },
  { name: 'Mercedes-Benz', count: 47 },
];

export default function Brands() {
  useTitle("Brands | ANT");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#09090b] text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">Top brands</h1>
          <p className="text-zinc-400">Genuine parts from the manufacturers you trust.</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {BRANDS.map((brand) => (
            <div 
              key={brand.name}
              onClick={() => navigate(`/product`, { state: { searchQuery: brand.name } })}
              className="bg-[#0f1115] border border-zinc-800 hover:border-zinc-600 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-[#13151a] hover:-translate-y-1"
            >
              <h3 className="font-bold text-xl text-white mb-2">{brand.name}</h3>
              <p className="text-xs text-zinc-500">{brand.count} products</p>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
