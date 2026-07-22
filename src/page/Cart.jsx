import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/useCartStore';
import { Trash2, Minus, Plus } from 'lucide-react';
import useTitle from '../utils/useTitle';

export default function Cart() {
  useTitle("Your Cart | ANT");
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity } = useCartStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subtotal = items.reduce((acc, item) => {
    const priceStr = item.price ? String(item.price).replace(/,/g, '') : '0';
    return acc + (parseFloat(priceStr) * item.quantity);
  }, 0);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#09090b] text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Your cart</h1>
          <p className="text-zinc-400">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="border border-dashed border-zinc-800 rounded-2xl py-24 flex flex-col items-center justify-center text-center">
            <h2 className="text-xl font-bold text-white mb-2">Your cart is empty</h2>
            <p className="text-sm text-zinc-500 mb-8 max-w-sm">
              Looks like you haven't added any products to your cart yet.
            </p>
            <button 
              onClick={() => navigate('/product')}
              className="bg-[#7a73ff] hover:bg-[#6b64ff] text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
            
            {/* Left Column - Cart Items */}
            <div className="flex-1 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl border border-zinc-800 bg-[#0c0d10]">
                  
                  {/* Image */}
                  <div className="w-24 h-24 sm:w-20 sm:h-20 bg-zinc-900 rounded-lg overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-base font-semibold text-white mb-1 line-clamp-1">{item.name}</h3>
                    <p className="text-xs text-zinc-500">{item.brand || item.category || 'Automotive Part'}</p>
                  </div>
                  
                  {/* Controls & Price */}
                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    
                    {/* Qty Selector */}
                    <div className="flex items-center gap-4 bg-[#0a0a0c] border border-zinc-800 rounded-lg px-3 py-1.5">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="text-zinc-400 hover:text-white transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-zinc-400 hover:text-white transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    
                    {/* Price & Delete */}
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-white whitespace-nowrap">
                        BDT {(parseFloat(String(item.price).replace(/,/g, '')) * item.quantity).toLocaleString()}
                      </span>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column - Order Summary */}
            <div className="w-full lg:w-[380px] shrink-0">
              <div className="bg-[#0c0d10] border border-zinc-800 rounded-xl p-6 sticky top-24">
                <h2 className="text-lg font-bold text-white mb-6">Order summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Subtotal</span>
                    <span className="font-medium text-white">BDT {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Shipping</span>
                    <span className="text-zinc-400">Calculated at checkout</span>
                  </div>
                </div>
                
                <div className="border-t border-zinc-800 pt-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">Total</span>
                    <span className="font-bold text-white text-lg">BDT {subtotal.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button 
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-[#7a73ff] hover:bg-[#6b64ff] text-white font-medium py-3 rounded-lg transition-colors"
                  >
                    Proceed to checkout
                  </button>
                  <button 
                    onClick={() => navigate('/product')}
                    className="w-full bg-transparent border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 text-white font-medium py-3 rounded-lg transition-all"
                  >
                    Continue shopping
                  </button>
                </div>
              </div>
            </div>
            
          </div>
        )}
        
      </div>
    </div>
  );
}
