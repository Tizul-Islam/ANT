import React, { useState } from 'react';
import { useCartStore } from '../stores/useCartStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useTitle from '../utils/useTitle';
import { CreditCard, Wallet, Truck, CheckCircle2 } from 'lucide-react';

export default function Checkout() {
  useTitle("Checkout | ANT");
  const { items, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');

  if (items.length === 0) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#09090b] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
        <button 
          onClick={() => navigate('/product')}
          className="px-6 py-2.5 bg-[#7a73ff] hover:bg-[#6b64ff] text-white font-medium rounded-lg transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  // Group by vendor/brand (mock logic)
  const groupedItems = items.reduce((acc, item) => {
    const vendor = item.brand || item.category || 'ANT Fulfillment';
    if (!acc[vendor]) acc[vendor] = [];
    acc[vendor].push(item);
    return acc;
  }, {});

  const subtotal = items.reduce((acc, item) => {
    const price = parseFloat(String(item.price).replace(/,/g, ''));
    return acc + (price * item.quantity);
  }, 0);

  const deliveryCharge = Object.keys(groupedItems).length * 100;
  const grandTotal = subtotal + deliveryCharge;

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      navigate('/order-success', { state: { orderId: `ORD-${Math.floor(Math.random() * 90000) + 10000}` } });
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#09090b] text-white py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
          
          {/* Left Column */}
          <div className="flex-1 space-y-8">
            
            {/* Shipping Info */}
            <div className="bg-[#0c0d10] border border-zinc-800 rounded-xl p-6 lg:p-8">
              <h2 className="text-xl font-bold text-white mb-6">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-semibold text-zinc-400">Full Name</label>
                  <input type="text" defaultValue="John Doe" className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500" />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-semibold text-zinc-400">Address</label>
                  <input type="text" defaultValue="123 Dhaka Street, Block C" className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400">City</label>
                  <input type="text" defaultValue="Dhaka" className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400">Phone</label>
                  <input type="tel" defaultValue="+880 1711-000000" className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500" />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-[#0c0d10] border border-zinc-800 rounded-xl p-6 lg:p-8">
              <h2 className="text-xl font-bold text-white mb-6">Payment Method</h2>
              <div className="space-y-3">
                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'bg-indigo-500/10 border-indigo-500' : 'bg-[#0a0a0c] border-zinc-800 hover:border-zinc-700'}`}>
                  <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="hidden" />
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'cod' ? 'border-indigo-500' : 'border-zinc-600'}`}>
                    {paymentMethod === 'cod' && <div className="w-3 h-3 bg-indigo-500 rounded-full" />}
                  </div>
                  <Truck className="w-5 h-5 text-zinc-400" />
                  <div className="flex-1">
                    <h3 className="font-medium text-white text-sm">Cash on Delivery</h3>
                    <p className="text-xs text-zinc-500">Pay when you receive</p>
                  </div>
                </label>
                
                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${paymentMethod === 'wallet' ? 'bg-indigo-500/10 border-indigo-500' : 'bg-[#0a0a0c] border-zinc-800 hover:border-zinc-700'}`}>
                  <input type="radio" name="payment" value="wallet" checked={paymentMethod === 'wallet'} onChange={() => setPaymentMethod('wallet')} className="hidden" />
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'wallet' ? 'border-indigo-500' : 'border-zinc-600'}`}>
                    {paymentMethod === 'wallet' && <div className="w-3 h-3 bg-indigo-500 rounded-full" />}
                  </div>
                  <Wallet className="w-5 h-5 text-zinc-400" />
                  <div className="flex-1">
                    <h3 className="font-medium text-white text-sm">ANT Wallet</h3>
                    <p className="text-xs text-zinc-500">Balance: BDT 50,000</p>
                  </div>
                </label>

                <label className={`flex items-center gap-4 p-4 rounded-xl border opacity-50 cursor-not-allowed bg-[#0a0a0c] border-zinc-800`}>
                  <input type="radio" name="payment" disabled className="hidden" />
                  <div className="w-5 h-5 rounded-full border border-zinc-800" />
                  <CreditCard className="w-5 h-5 text-zinc-600" />
                  <div className="flex-1">
                    <h3 className="font-medium text-zinc-400 text-sm">Card Payment</h3>
                    <p className="text-xs text-zinc-600">Coming soon</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Order Items (Grouped) */}
            <div className="bg-[#0c0d10] border border-zinc-800 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-zinc-800">
                <h2 className="text-xl font-bold text-white">Review Items</h2>
              </div>
              <div className="divide-y divide-zinc-800">
                {Object.entries(groupedItems).map(([vendor, vendorItems]) => (
                  <div key={vendor} className="p-6">
                    <h3 className="text-sm font-semibold text-zinc-400 mb-4 flex items-center gap-2">
                      <div className="w-6 h-6 bg-zinc-900 rounded flex items-center justify-center text-[10px] text-white">
                        {vendor.charAt(0)}
                      </div>
                      Package from {vendor}
                    </h3>
                    <div className="space-y-4">
                      {vendorItems.map(item => (
                        <div key={item.id} className="flex gap-4">
                          <div className="w-16 h-16 bg-zinc-900 rounded-lg shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg opacity-80" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-white line-clamp-1">{item.name}</h4>
                            <div className="text-xs text-zinc-500 mt-1">Qty: {item.quantity}</div>
                          </div>
                          <div className="text-sm font-bold text-white">
                            BDT {(parseFloat(String(item.price).replace(/,/g, '')) * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column - Summary */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="bg-[#0c0d10] border border-zinc-800 rounded-xl p-6 sticky top-24">
              <h2 className="text-lg font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Subtotal ({items.length} items)</span>
                  <span className="font-medium text-white">BDT {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Delivery Fee ({Object.keys(groupedItems).length} packages)</span>
                  <span className="font-medium text-white">BDT {deliveryCharge.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="border-t border-zinc-800 pt-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">Total</span>
                  <span className="font-bold text-white text-xl text-indigo-400">BDT {grandTotal.toLocaleString()}</span>
                </div>
              </div>
              
              <button 
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full bg-[#7a73ff] hover:bg-[#6b64ff] text-white font-medium py-3.5 rounded-lg transition-colors flex justify-center items-center h-[52px]"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                    Processing...
                  </span>
                ) : (
                  'Place Order'
                )}
              </button>
              
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-zinc-500">
                <CheckCircle2 className="w-4 h-4" />
                Secure Checkout
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
