import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../lib/api/client';
import useTitle from '../utils/useTitle';
import ShopCard from '../components/common/ShopCard';

export default function Shops() {
  useTitle("Verified Shops | ANT");
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchShops = async () => {
      try {
        const res = await apiClient.get('/shops');
        setShops(res.data);
      } catch (err) {
        console.error("Error fetching shops", err);
      } finally {
        setLoading(false);
      }
    };
    fetchShops();
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="mb-10">
          <div className="text-xs text-zinc-500 font-medium mb-2 flex items-center gap-1.5">
            <button onClick={() => navigate('/')} className="hover:text-zinc-300">Home</button>
            <span>/</span>
            <span className="text-zinc-300">Shops</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Verified shops</h1>
          <p className="text-zinc-400 text-sm sm:text-base">{shops.length} trusted shops from across Bangladesh.</p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className="bg-[#0f1115] border border-zinc-800 rounded-xl h-48 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shops.map(shop => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
