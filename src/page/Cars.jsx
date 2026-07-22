import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Car, Star, Fuel, Gauge, CheckCircle2 } from 'lucide-react';
import useTitle from '../utils/useTitle';

const mockCars = [
  {
    id: 'car-1',
    make: 'Toyota',
    model: 'Corolla Cross',
    year: 2024,
    price: 4500000,
    type: 'SUV',
    fuel: 'Hybrid',
    mileage: '0 km',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    approved: true
  },
  {
    id: 'car-2',
    make: 'Honda',
    model: 'Civic',
    year: 2023,
    price: 3800000,
    type: 'Sedan',
    fuel: 'Petrol',
    mileage: '15,000 km',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=800',
    rating: 4.5,
    approved: true
  },
  {
    id: 'car-3',
    make: 'Hyundai',
    model: 'Tucson',
    year: 2024,
    price: 5200000,
    type: 'SUV',
    fuel: 'Petrol',
    mileage: '5,000 km',
    image: 'https://images.unsplash.com/photo-1633505676353-ce20194091a1?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    approved: true
  },
  {
    id: 'car-4',
    make: 'Nissan',
    model: 'X-Trail',
    year: 2022,
    price: 4100000,
    type: 'SUV',
    fuel: 'Hybrid',
    mileage: '25,000 km',
    image: 'https://images.unsplash.com/photo-1629897048514-3dd74142dff0?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    approved: true
  }
];

export default function Cars() {
  useTitle("Browse Cars | ANT");

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const makes = [...new Set(mockCars.map(car => car.make))];
  const types = [...new Set(mockCars.map(car => car.type))];

  const filteredCars = mockCars.filter(car => {
    const matchSearch = (car.make + ' ' + car.model).toLowerCase().includes(searchTerm.toLowerCase());
    const matchMake = selectedMake ? car.make === selectedMake : true;
    const matchType = selectedType ? car.type === selectedType : true;
    return matchSearch && matchMake && matchType && car.approved;
  });

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#09090b] text-white py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Find Your Perfect Car</h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Browse our collection of verified, top-quality vehicles. Book directly through our platform.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-[#0c0d10] border border-zinc-800 rounded-2xl p-6 mb-12 shadow-xl">
          <div className="flex flex-col md:flex-row gap-4">
            
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search by make or model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <div className="relative w-full md:w-48">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <select
                  value={selectedMake}
                  onChange={(e) => setSelectedMake(e.target.value)}
                  className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer"
                >
                  <option value="">All Makes</option>
                  {makes.map(make => (
                    <option key={make} value={make}>{make}</option>
                  ))}
                </select>
              </div>
              <div className="relative w-full md:w-48">
                <Car className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer"
                >
                  <option value="">All Types</option>
                  {types.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            
          </div>
        </div>

        {/* Cars Grid */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCars.map(car => (
              <div key={car.id} className="bg-[#0c0d10] border border-zinc-800 rounded-2xl overflow-hidden group hover:border-zinc-700 transition-all hover:shadow-2xl flex flex-col">
                
                {/* Image */}
                <div className="aspect-[16/10] bg-zinc-900 relative overflow-hidden">
                  <img
                    src={car.image}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/10">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-white">{car.rating}</span>
                  </div>
                  <div className="absolute top-3 left-3 bg-indigo-500/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 border border-indigo-400/50">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    <span className="text-[10px] uppercase font-bold text-white tracking-wider">Approved</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{car.make} {car.model}</h3>
                    <span className="text-sm font-semibold text-zinc-400">{car.year}</span>
                  </div>
                  
                  <div className="text-2xl font-bold text-indigo-400 mb-6">
                    ৳ {car.price.toLocaleString()}
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6 mt-auto">
                    <div className="flex items-center gap-2 text-zinc-400 bg-[#0a0a0c] p-2.5 rounded-lg border border-zinc-800">
                      <Fuel className="w-4 h-4 text-zinc-500" />
                      <span className="text-xs font-medium">{car.fuel}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 bg-[#0a0a0c] p-2.5 rounded-lg border border-zinc-800">
                      <Gauge className="w-4 h-4 text-zinc-500" />
                      <span className="text-xs font-medium">{car.mileage}</span>
                    </div>
                  </div>

                  <Link
                    to={`/cars/${car.id}`}
                    className="block w-full bg-indigo-500 hover:bg-indigo-600 text-white text-center py-3 rounded-xl font-medium transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#0c0d10] border border-dashed border-zinc-800 rounded-3xl py-24 text-center px-4">
            <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <Car className="w-10 h-10 text-zinc-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">No cars found</h3>
            <p className="text-zinc-400 max-w-md mx-auto mb-8">
              We couldn't find any cars matching your current filters. Try adjusting your search criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedMake('');
                setSelectedType('');
              }}
              className="bg-[#111216] border border-zinc-800 hover:border-zinc-700 text-white px-8 py-3 rounded-xl font-medium transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
