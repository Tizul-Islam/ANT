import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, Edit2, Trash2, Eye, ToggleLeft, ToggleRight, CheckCircle2, Clock } from 'lucide-react';
import useTitle from '../../utils/useTitle';
import { toast } from 'react-toastify';
import { getCurrentUser } from '../../utils/auth';

const mockEmployerCars = [
  {
    id: 'car-1',
    make: 'Toyota',
    model: 'Corolla Cross',
    year: 2024,
    price: 4500000,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&q=80&w=800',
    status: 'Approved',
    available: true,
    views: 1240,
    sellerId: 'emp-123'
  },
  {
    id: 'car-3',
    make: 'Hyundai',
    model: 'Tucson',
    year: 2024,
    price: 5200000,
    image: 'https://images.unsplash.com/photo-1633505676353-ce20194091a1?auto=format&fit=crop&q=80&w=800',
    status: 'Pending',
    available: false,
    views: 0,
    sellerId: 'emp-123'
  }
];

export default function MyCars() {
  useTitle("My Cars | Employer Dashboard");
  const user = getCurrentUser();

  const [cars, setCars] = useState(mockEmployerCars);

  const toggleAvailability = (id) => {
    setCars(cars.map(car => {
      if (car.id === id) {
        const newStatus = !car.available;
        toast.success(`Car is now ${newStatus ? 'Available' : 'Hidden'}!`);
        return { ...car, available: newStatus };
      }
      return car;
    }));
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this car? This action cannot be undone.")) {
      setCars(cars.filter(car => car.id !== id));
      toast.success("Car deleted successfully.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-10">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">My Cars</h1>
          <p className="text-sm text-zinc-400">Manage your uploaded vehicles.</p>
        </div>
        <Link 
          to="/dashboard/add-car"
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-4 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          Add New Car
        </Link>
      </div>

      {cars.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cars.map(car => (
            <div key={car.id} className="bg-[#0c0d10] border border-zinc-800 rounded-2xl overflow-hidden flex flex-col sm:flex-row">
              
              {/* Image */}
              <div className="w-full sm:w-48 h-48 sm:h-auto bg-zinc-900 relative shrink-0">
                <img src={car.image} alt={car.model} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 flex flex-col gap-1.5">
                  {car.status === 'Approved' ? (
                    <span className="bg-emerald-500/90 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1 border border-emerald-400/50">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                      <span className="text-[10px] uppercase font-bold text-white tracking-wider">Approved</span>
                    </span>
                  ) : (
                    <span className="bg-amber-500/90 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1 border border-amber-400/50">
                      <Clock className="w-3 h-3 text-white" />
                      <span className="text-[10px] uppercase font-bold text-white tracking-wider">Pending</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Content & Actions */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-white">{car.make} {car.model}</h3>
                    <p className="text-sm text-zinc-400">{car.year}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-indigo-400">৳ {car.price.toLocaleString()}</div>
                    <div className="text-xs text-zinc-500 mt-0.5">{car.views} Views</div>
                  </div>
                </div>

                <div className="mt-auto pt-4 space-y-3">
                  
                  {/* Availability Toggle */}
                  <div className="flex items-center justify-between p-3 bg-[#0a0a0c] border border-zinc-800 rounded-xl">
                    <span className="text-sm font-medium text-zinc-300">Availability</span>
                    <button 
                      onClick={() => toggleAvailability(car.id)}
                      className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${car.available ? 'text-emerald-400' : 'text-zinc-500'}`}
                    >
                      {car.available ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                      {car.available ? 'Public' : 'Hidden'}
                    </button>
                  </div>

                  {/* Actions Row */}
                  <div className="grid grid-cols-3 gap-2">
                    <Link 
                      to={`/cars/${car.id}`}
                      className="flex items-center justify-center gap-1.5 py-2 bg-[#111216] hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-lg text-xs font-medium transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </Link>
                    <Link 
                      to={`/dashboard/edit-car/${car.id}`}
                      className="flex items-center justify-center gap-1.5 py-2 bg-[#111216] hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-lg text-xs font-medium transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(car.id)}
                      className="flex items-center justify-center gap-1.5 py-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-500 rounded-lg text-xs font-medium transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#0c0d10] border border-dashed border-zinc-800 rounded-3xl py-24 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Car className="w-8 h-8 text-zinc-600" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">You haven't added any cars</h2>
          <p className="text-sm text-zinc-500 max-w-sm mb-6">
            Start listing your vehicles to reach thousands of potential buyers on our marketplace.
          </p>
          <Link 
            to="/dashboard/add-car"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
          >
            Add Your First Car
          </Link>
        </div>
      )}

    </div>
  );
}
