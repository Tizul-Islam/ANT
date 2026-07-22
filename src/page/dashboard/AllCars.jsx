import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Building2, Car } from 'lucide-react';
import useTitle from '../../utils/useTitle';

const mockAllCars = [
  {
    id: 'car-1',
    make: 'Toyota',
    model: 'Corolla Cross',
    year: 2024,
    price: 4500000,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&q=80&w=800',
    sellerName: 'ANT Dealership',
    location: 'Banani, Dhaka'
  },
  {
    id: 'car-2',
    make: 'Honda',
    model: 'Civic',
    year: 2023,
    price: 3800000,
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=800',
    sellerName: 'Auto World',
    location: 'Gulshan, Dhaka'
  },
  {
    id: 'car-4',
    make: 'Nissan',
    model: 'X-Trail',
    year: 2022,
    price: 4100000,
    image: 'https://images.unsplash.com/photo-1629897048514-3dd74142dff0?auto=format&fit=crop&q=80&w=800',
    sellerName: 'Premium Cars BD',
    location: 'Uttara, Dhaka'
  }
];

export default function AllCars() {
  useTitle("All Cars | Employer Dashboard");

  const [searchTerm, setSearchTerm] = useState('');

  const filteredCars = mockAllCars.filter(car => 
    (car.make + ' ' + car.model).toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.sellerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-10">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">All Platform Cars</h1>
          <p className="text-sm text-zinc-400">View approved vehicles from all sellers on the platform.</p>
        </div>
        
        <div className="w-full md:w-72 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by car or seller..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0c0d10] border border-zinc-800 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map(car => (
            <div key={car.id} className="bg-[#0c0d10] border border-zinc-800 rounded-2xl overflow-hidden group hover:border-zinc-700 transition-colors flex flex-col">
              
              {/* Image */}
              <div className="aspect-[16/10] bg-zinc-900 relative overflow-hidden">
                <img
                  src={car.image}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{car.make} {car.model}</h3>
                    <p className="text-sm font-semibold text-zinc-400">{car.year}</p>
                  </div>
                  <div className="text-xl font-bold text-indigo-400">
                    ৳ {(car.price / 100000).toFixed(1)}L
                  </div>
                </div>
                
                <div className="mt-auto space-y-2 pt-4 border-t border-zinc-800/50">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Building2 className="w-4 h-4 text-zinc-500" />
                    <span className="text-sm font-medium">{car.sellerName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400">
                    <MapPin className="w-4 h-4 text-zinc-500" />
                    <span className="text-sm">{car.location}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    to={`/cars/${car.id}`}
                    className="block w-full bg-[#111216] hover:bg-zinc-800 text-white text-center py-2.5 rounded-lg border border-zinc-800 text-sm font-medium transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#0c0d10] border border-dashed border-zinc-800 rounded-3xl py-24 text-center px-4">
          <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Car className="w-8 h-8 text-zinc-600" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No cars found</h3>
          <p className="text-sm text-zinc-500 max-w-sm mx-auto mb-6">
            We couldn't find any cars matching your search.
          </p>
        </div>
      )}

    </div>
  );
}
