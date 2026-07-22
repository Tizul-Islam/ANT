import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, CheckCircle, Truck, Package, Clock, FileText } from 'lucide-react';
import useTitle from '../../utils/useTitle';

const mockOrder = {
  id: 'ORD-89234',
  date: 'July 20, 2025',
  status: 'Shipped',
  total: 12500,
  subtotal: 12300,
  shipping: 200,
  paymentMethod: 'Cash on Delivery',
  shippingAddress: '123 Dhaka Street, Block C, Dhaka, Bangladesh',
  items: [
    { id: 1, name: 'Premium Brake Pads Set', price: 4500, quantity: 2, total: 9000 },
    { id: 2, name: 'Engine Oil 5W-40', price: 3300, quantity: 1, total: 3300 }
  ],
  timeline: [
    { status: 'Order Placed', date: 'July 20, 2025, 10:00 AM', completed: true, icon: FileText },
    { status: 'Processing', date: 'July 20, 2025, 02:30 PM', completed: true, icon: Clock },
    { status: 'Shipped', date: 'July 21, 2025, 09:15 AM', completed: true, icon: Truck },
    { status: 'Delivered', date: 'Pending', completed: false, icon: CheckCircle },
  ]
};

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  useTitle(`Order ${id || mockOrder.id} | ANT`);

  const handleDownloadInvoice = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">
      
      {/* Header (Hidden in Print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 print:hidden">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/profile/orders')}
            className="w-10 h-10 bg-[#0c0d10] border border-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Order {id || mockOrder.id}</h1>
            <p className="text-sm text-zinc-400">Placed on {mockOrder.date}</p>
          </div>
        </div>
        <button 
          onClick={handleDownloadInvoice}
          className="bg-[#0c0d10] border border-zinc-800 hover:bg-zinc-800 text-white font-medium px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Timeline & Items */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Order Timeline (Hidden in Print) */}
          <div className="bg-[#0c0d10] border border-zinc-800 rounded-xl p-6 print:hidden">
            <h2 className="text-lg font-bold text-white mb-6">Order Status</h2>
            <div className="relative">
              {/* Line */}
              <div className="absolute left-[21px] top-4 bottom-4 w-0.5 bg-zinc-800" />
              
              <div className="space-y-8 relative">
                {mockOrder.timeline.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div key={idx} className="flex gap-6">
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 border-4 border-[#0c0d10] relative z-10 ${step.completed ? 'bg-indigo-500 text-white' : 'bg-zinc-800 text-zinc-500'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="pt-2">
                        <h3 className={`font-bold ${step.completed ? 'text-white' : 'text-zinc-500'}`}>{step.status}</h3>
                        <p className="text-sm text-zinc-500">{step.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Invoice View (Printable) */}
          <div className="bg-[#0c0d10] border border-zinc-800 rounded-xl p-8 print:border-none print:bg-white print:text-black">
            
            {/* Invoice Header */}
            <div className="flex justify-between items-start border-b border-zinc-800 print:border-gray-200 pb-8 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white print:text-black tracking-tight mb-1">ANT Enterprise</h2>
                <p className="text-sm text-zinc-500 print:text-gray-500">Invoice #{id || mockOrder.id}</p>
                <p className="text-sm text-zinc-500 print:text-gray-500">Date: {mockOrder.date}</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-zinc-800 print:text-gray-200 uppercase tracking-widest">Invoice</div>
              </div>
            </div>

            {/* Billing Info */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 print:text-gray-500">Billed To</h3>
                <p className="text-white print:text-black font-medium">Customer Name</p>
                <p className="text-sm text-zinc-400 print:text-gray-600 mt-1 max-w-[200px]">{mockOrder.shippingAddress}</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 print:text-gray-500">Payment Details</h3>
                <p className="text-sm text-zinc-400 print:text-gray-600">Method: {mockOrder.paymentMethod}</p>
                <p className="text-sm text-zinc-400 print:text-gray-600 mt-1">Status: Pending</p>
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full mb-8">
              <thead>
                <tr className="border-b border-zinc-800 print:border-gray-200">
                  <th className="text-left py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider print:text-gray-500">Item</th>
                  <th className="text-right py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider print:text-gray-500">Qty</th>
                  <th className="text-right py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider print:text-gray-500">Price</th>
                  <th className="text-right py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider print:text-gray-500">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 print:divide-gray-100">
                {mockOrder.items.map(item => (
                  <tr key={item.id}>
                    <td className="py-4 text-sm text-white print:text-black">{item.name}</td>
                    <td className="py-4 text-sm text-zinc-400 print:text-gray-600 text-right">{item.quantity}</td>
                    <td className="py-4 text-sm text-zinc-400 print:text-gray-600 text-right">BDT {item.price.toLocaleString()}</td>
                    <td className="py-4 text-sm text-white print:text-black font-medium text-right">BDT {item.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-64 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500 print:text-gray-500">Subtotal</span>
                  <span className="text-white print:text-black">BDT {mockOrder.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500 print:text-gray-500">Shipping</span>
                  <span className="text-white print:text-black">BDT {mockOrder.shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center border-t border-zinc-800 print:border-gray-200 pt-3 mt-3">
                  <span className="font-bold text-white print:text-black">Total</span>
                  <span className="font-bold text-lg text-indigo-400 print:text-black">BDT {mockOrder.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Order Summary (Sidebar) */}
        <div className="space-y-6 print:hidden">
          
          <div className="bg-[#0c0d10] border border-zinc-800 rounded-xl p-6">
            <h3 className="font-bold text-white mb-4">Customer Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Contact</p>
                <p className="text-sm text-white">john.doe@example.com</p>
                <p className="text-sm text-zinc-400">+880 1711-000000</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Shipping Address</p>
                <p className="text-sm text-zinc-400 leading-relaxed">{mockOrder.shippingAddress}</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
