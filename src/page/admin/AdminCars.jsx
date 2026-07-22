import React, { useState } from 'react';
import useTitle from '../../utils/useTitle';
import { Search, Edit2, Trash2, Star, CheckCircle2, Clock } from 'lucide-react';
import { toast } from 'react-toastify';

const initialCars = [
  { id: 'c1', make: 'Toyota', model: 'Corolla', year: 2024, price: 4500000, status: 'Approved', featured: true, sellerName: 'ANT Dealership', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?w=800' },
  { id: 'c2', make: 'Honda', model: 'Civic', year: 2023, price: 3800000, status: 'Approved', featured: false, sellerName: 'Auto World', image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800' },
  { id: 'c3', make: 'Nissan', model: 'X-Trail', year: 2022, price: 4100000, status: 'Pending', featured: false, sellerName: 'Premium Cars BD', image: 'https://images.unsplash.com/photo-1629897048514-3dd74142dff0?w=800' },
];

export default function AdminCars() {
  useTitle("Cars Management | Admin");
  
  const [cars, setCars] = useState(initialCars);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCars = cars.filter(c => 
    (c.make + ' ' + c.model).toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.sellerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFeatured = (id, isFeatured) => {
    setCars(cars.map(c => c.id === id ? { ...c, featured: !isFeatured } : c));
    toast.success(isFeatured ? "Car removed from Featured list." : "Car is now Featured!");
  };

  const deleteCar = (id) => {
    if(confirm("Are you sure you want to delete this car? This action is irreversible.")) {
      setCars(cars.filter(c => c.id !== id));
      toast.success("Car deleted successfully.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Cars Management</h1>
          <p className="text-sm text-zinc-400">View and manage all cars on the platform.</p>
        </div>
        
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search cars or sellers..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-[#0c0d10] border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="bg-[#0c0d10] border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#111216] text-zinc-400 border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-medium">Car Details</th>
                <th className="px-6 py-4 font-medium">Seller</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50 text-zinc-300">
              {filteredCars.map(car => (
                <tr key={car.id} className="hover:bg-zinc-800/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-lg bg-zinc-900 overflow-hidden shrink-0">
                        <img src={car.image} alt={car.model} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-medium text-white">{car.make} {car.model} ({car.year})</div>
                        <div className="text-xs text-indigo-400 font-bold mt-0.5">৳ {car.price.toLocaleString()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-400">{car.sellerName}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${
                      car.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {car.status === 'Approved' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {car.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => toggleFeatured(car.id, car.featured)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          car.featured 
                            ? 'bg-amber-500/10 border-amber-500/20 text-amber-500 hover:bg-amber-500/20' 
                            : 'bg-[#111216] border-zinc-700 text-zinc-500 hover:bg-zinc-800 hover:text-white'
                        }`}
                        title={car.featured ? 'Remove Featured' : 'Make Featured'}
                      >
                        <Star className={`w-4 h-4 ${car.featured ? 'fill-current' : ''}`} />
                      </button>
                      <button 
                        className="p-1.5 bg-[#111216] border border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white rounded-lg transition-colors"
                        title="Edit Car"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteCar(car.id)}
                        className="p-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-500 hover:bg-rose-500/20 rounded-lg transition-colors"
                        title="Delete Car"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCars.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-zinc-500">
                    No cars found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
