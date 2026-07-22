import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronRight, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import useTitle from '../../utils/useTitle';

const mockOrders = [
  { id: 'ORD-89234', date: '2025-07-20', total: 12500, status: 'Delivered', items: 3 },
  { id: 'ORD-43921', date: '2025-07-18', total: 4500, status: 'Shipped', items: 1 },
  { id: 'ORD-98234', date: '2025-07-15', total: 8900, status: 'Processing', items: 2 },
  { id: 'ORD-11234', date: '2025-06-30', total: 2500, status: 'Delivered', items: 1 },
];

export default function Orders() {
  useTitle("My Orders | ANT");
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'Shipped': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Processing': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      default: return 'text-zinc-400 bg-zinc-800 border-zinc-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <CheckCircle className="w-3.5 h-3.5" />;
      case 'Shipped': return <Truck className="w-3.5 h-3.5" />;
      case 'Processing': return <Clock className="w-3.5 h-3.5" />;
      default: return <Package className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">My Orders</h1>
          <p className="text-sm text-zinc-400">View and track your recent orders.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#0c0d10] border border-zinc-800 rounded-xl p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search by Order ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="sm:w-48 relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 appearance-none"
          >
            <option value="All">All Statuses</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-[#0c0d10] border border-zinc-800 rounded-xl overflow-hidden">
        {filteredOrders.length > 0 ? (
          <div className="divide-y divide-zinc-800">
            {filteredOrders.map(order => (
              <div 
                key={order.id} 
                onClick={() => navigate(`/profile/orders/${order.id}`)}
                className="p-4 sm:p-6 hover:bg-[#111216] transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-900 rounded-lg flex items-center justify-center shrink-0">
                    <Package className="w-6 h-6 text-zinc-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">{order.id}</h3>
                    <div className="text-sm text-zinc-400 flex items-center gap-2">
                      <span>{order.date}</span>
                      <span>•</span>
                      <span>{order.items} items</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  <div className="text-left sm:text-right">
                    <div className="font-bold text-white mb-1">BDT {order.total.toLocaleString()}</div>
                    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] uppercase font-bold tracking-wider ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-zinc-600 hidden sm:block" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <Package className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No orders found</h3>
            <p className="text-sm text-zinc-500">Try adjusting your filters or place a new order.</p>
          </div>
        )}
      </div>

    </div>
  );
}
