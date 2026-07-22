import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import useTitle from '../utils/useTitle';

const CATEGORIES = [
  {
    name: 'Engine Parts',
    count: 342,
    subcats: ['Pistons', 'Gaskets', 'Timing Belt']
  },
  {
    name: 'Brake System',
    count: 218,
    subcats: ['Brake Pads', 'Brake Discs', 'Brake Fluid']
  },
  {
    name: 'Suspension',
    count: 156,
    subcats: ['Shock Absorbers', 'Springs']
  },
  {
    name: 'Electrical',
    count: 288,
    subcats: ['Battery', 'Alternator']
  },
  {
    name: 'Body Parts',
    count: 174,
    subcats: ['Bumpers', 'Mirrors']
  },
  {
    name: 'Interior',
    count: 132,
    subcats: ['Seat Covers', 'Floor Mats']
  },
  {
    name: 'Tires & Wheels',
    count: 198,
    subcats: ['Tires', 'Rims']
  },
  {
    name: 'Oil & Fluids',
    count: 143,
    subcats: ['Engine Oil', 'Coolant']
  },
  {
    name: 'Accessories',
    count: 267,
    subcats: ['Dashcams', 'Lighting']
  },
  {
    name: 'Tools & Equipment',
    count: 89,
    subcats: ['Hand Tools', 'Diagnostic']
  }
];

export default function Categories() {
  useTitle("Categories | ANT");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#09090b] text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">All categories</h1>
          <p className="text-zinc-400">Browse parts by category.</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <div 
              key={category.name}
              onClick={() => navigate(`/product`, { state: { category: category.name } })}
              className="bg-[#0f1115] border border-zinc-800 hover:border-zinc-600 rounded-xl p-6 cursor-pointer transition-all hover:bg-[#13151a] group flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-white mb-1">{category.name}</h3>
                  <p className="text-xs text-zinc-500">{category.count} products</p>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
              </div>
              
              <div className="mt-auto flex flex-wrap gap-2 pt-4">
                {category.subcats.map((sub, i) => (
                  <span 
                    key={i} 
                    className="bg-indigo-500/10 text-indigo-400 text-[10px] font-medium px-2.5 py-1 rounded-full border border-indigo-500/20"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
