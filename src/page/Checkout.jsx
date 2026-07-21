import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useTitle from '../utils/useTitle';

export default function Checkout() {
  useTitle("Checkout | ANT");
  const { cartItems, getGroupedCart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // If cart is empty, go back
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <button 
          onClick={() => navigate('/products')}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const groupedCart = getGroupedCart();
  const vendors = Object.values(groupedCart);
  
  // Base delivery charge for this phase logic: 100 Taka per vendor
  const calculateDeliveryCharge = (vendorId) => {
    return 100; 
  };

  const totalDeliveryCharge = vendors.reduce((total, group) => total + calculateDeliveryCharge(group.vendor.id), 0);
  const orderTotal = getCartTotal() + totalDeliveryCharge;

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    // Mock API Call delay
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      toast.success(`Successfully placed ${vendors.length} sub-orders!`);
      navigate('/profile');
    }, 1500);
  };

  return (
    <section className="py-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Vendor grouped items */}
          <div className="w-full lg:w-2/3 space-y-6">
            {vendors.map((group) => (
              <div key={group.vendor.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                
                {/* Vendor Header */}
                <div className="bg-gray-50 border-b border-gray-200 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
                      {group.vendor.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Sold by: {group.vendor.name}</h3>
                      <p className="text-xs text-gray-500">Fulfilled as a separate shipment</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    Delivery: ৳{calculateDeliveryCharge(group.vendor.id)}
                  </div>
                </div>

                {/* Items List */}
                <div className="p-4 space-y-4">
                  {group.items.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={item.product.images?.[0] || item.product.image || 'https://placehold.co/80x80'} 
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                        <div className="text-sm text-gray-500 mt-1">
                          Condition: {item.condition} | Warranty: {item.warranty}
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-gray-600">Qty: {item.quantity}</span>
                          <span className="font-bold text-gray-900">৳{(item.product.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Vendor Subtotal */}
                <div className="bg-gray-50 border-t border-gray-100 p-4 flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Sub-order Total (inc. delivery):</span>
                  <span className="font-bold text-lg text-green-600">
                    ৳{(group.subtotal + calculateDeliveryCharge(group.vendor.id)).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Items Total ({cartItems.length})</span>
                  <span>৳{getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Total Delivery Charge ({vendors.length} shipments)</span>
                  <span>৳{totalDeliveryCharge.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                  <span className="font-bold text-gray-900">Grand Total</span>
                  <span className="text-2xl font-bold text-green-600">৳{orderTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Method (Mock) */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Payment Method</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer bg-green-50 border-green-200">
                    <input type="radio" name="payment" defaultChecked className="text-green-600 focus:ring-green-500" />
                    <span className="font-medium text-gray-900">Cash on Delivery</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-not-allowed opacity-50">
                    <input type="radio" name="payment" disabled />
                    <span className="font-medium text-gray-900">Online Payment (Escrow)</span>
                    <span className="ml-auto text-xs bg-gray-200 px-2 py-1 rounded">Coming Soon</span>
                  </label>
                </div>
              </div>

              <button 
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full py-4 bg-green-600 text-white font-bold rounded-lg shadow hover:bg-green-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Place Order'
                )}
              </button>
              <p className="text-xs text-gray-500 text-center mt-4">
                By placing this order, you agree to ANT's Terms and Conditions.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
