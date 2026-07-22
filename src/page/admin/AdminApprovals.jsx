import React, { useState } from 'react';
import useTitle from '../../utils/useTitle';
import { Search, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const initialPendingCars = [
  { id: 'c3', make: 'Nissan', model: 'X-Trail', year: 2022, price: 4100000, sellerName: 'Premium Cars BD', location: 'Uttara, Dhaka', image: 'https://images.unsplash.com/photo-1629897048514-3dd74142dff0?w=800' },
  { id: 'c4', make: 'Hyundai', model: 'Tucson', year: 2024, price: 5200000, sellerName: 'ANT Dealership', location: 'Banani, Dhaka', image: 'https://images.unsplash.com/photo-1633505676353-ce20194091a1?w=800' },
];

export default function AdminApprovals() {
  useTitle("Approvals | Admin");
  
  const [cars, setCars] = useState(initialPendingCars);

  const approveCar = (id) => {
    setCars(cars.filter(c => c.id !== id));
    toast.success("Car approved successfully! It is now live.");
  };

  const rejectCar = (id) => {
    if(confirm("Are you sure you want to reject this car listing?")) {
      setCars(cars.filter(c => c.id !== id));
      toast.success("Car listing rejected.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Pending Approvals</h1>
        <p className="text-sm text-zinc-400">Review and approve new car listings from sellers.</p>
      </div>

      <div className="bg-[#0c0d10] border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#111216] text-zinc-400 border-b border-zinc-800">
              <tr>
                <th className="px-6 py-4 font-medium">Car Details</th>
                <th className="px-6 py-4 font-medium">Seller</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50 text-zinc-300">
              {cars.map(car => (
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
                  <td className="px-6 py-4 text-zinc-400">{car.location}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => approveCar(car.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 rounded-lg transition-colors font-medium text-xs"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Approve
                      </button>
                      <button 
                        onClick={() => rejectCar(car.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-500 hover:bg-rose-500/20 rounded-lg transition-colors font-medium text-xs"
                      >
                        <XCircle className="w-4 h-4" /> Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {cars.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-zinc-500">
                    No pending approvals at the moment.
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
