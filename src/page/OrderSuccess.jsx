import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import useTitle from '../utils/useTitle';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

export default function OrderSuccess() {
  useTitle("Order Placed Successfully | ANT");
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId || `ORD-${Math.floor(Math.random() * 90000) + 10000}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#09090b] flex items-center justify-center p-4">
      <div className="w-full max-w-[500px] bg-[#0c0d10] border border-zinc-800 rounded-2xl p-8 lg:p-12 text-center">
        
        <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-indigo-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-2">Order Successful!</h1>
        <p className="text-zinc-400 mb-8">
          Thank you for your purchase. We've received your order and are currently processing it.
        </p>

        <div className="bg-[#0a0a0c] border border-zinc-800 rounded-xl p-4 flex items-center justify-center gap-3 mb-8">
          <Package className="w-5 h-5 text-zinc-500" />
          <span className="text-zinc-400 text-sm">Order ID:</span>
          <span className="font-bold text-white tracking-wider">{orderId}</span>
        </div>

        <div className="space-y-3">
          <button 
            onClick={() => navigate('/profile/orders')}
            className="w-full bg-[#7a73ff] hover:bg-[#6b64ff] text-white font-medium py-3 rounded-lg transition-colors flex justify-center items-center gap-2"
          >
            Track Order Status
            <ArrowRight className="w-4 h-4" />
          </button>
          <button 
            onClick={() => navigate('/product')}
            className="w-full bg-transparent border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 text-white font-medium py-3 rounded-lg transition-all"
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
}
