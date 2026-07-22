import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import useTitle from '../../utils/useTitle';
import { toast } from 'react-toastify';

export default function Wishlist() {
  useTitle("My Wishlist | ANT");

  const [wishlist, setWishlist] = React.useState([
    {
      id: 'car-1',
      make: 'Toyota',
      model: 'Corolla Cross',
      year: 2024,
      price: 4500000,
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&q=80&w=800'
    }
  ]);

  const handleRemove = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
    toast.success("Removed from wishlist");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">My Wishlist</h1>
        <p className="text-sm text-zinc-400">Manage your favorite vehicles and products.</p>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map(item => (
            <div key={item.id} className="bg-[#0c0d10] border border-zinc-800 rounded-2xl overflow-hidden group">
              <div className="aspect-[4/3] bg-zinc-900 relative">
                <img 
                  src={item.image} 
                  alt={item.model} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button 
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-zinc-300 hover:text-rose-500 hover:bg-black/80 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-white">{item.make} {item.model}</h3>
                <p className="text-sm text-zinc-400 mb-4">{item.year}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-400">৳ {item.price.toLocaleString()}</span>
                  <Link 
                    to={`/cars/${item.id}`}
                    className="w-8 h-8 rounded-full bg-[#111216] border border-zinc-800 flex items-center justify-center text-white hover:bg-indigo-500 hover:border-indigo-500 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#0c0d10] border border-dashed border-zinc-800 rounded-3xl py-24 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-zinc-600" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Your wishlist is empty</h2>
          <p className="text-sm text-zinc-500 max-w-sm mb-6">
            You haven't saved any cars or products to your wishlist yet.
          </p>
          <Link 
            to="/cars"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
          >
            Browse Cars
          </Link>
        </div>
      )}

    </div>
  );
}
