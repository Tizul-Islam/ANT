import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, UploadCloud, Car, CheckCircle } from 'lucide-react';
import useTitle from '../../utils/useTitle';
import { toast } from 'react-toastify';
import { getCurrentUser } from '../../utils/auth';

export default function AddCar() {
  useTitle("Add Car | Employer Dashboard");
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    price: '',
    color: '',
    bodyType: 'SUV',
    fuel: 'Petrol',
    transmission: 'Automatic',
    mileage: '',
    engine: '',
    horsepower: '',
    seats: '5',
    description: '',
    location: '',
    available: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate backend processing
    setTimeout(() => {
      const newCar = {
        ...formData,
        // Backend auto-assigned fields
        sellerId: user?.id || 'emp-123',
        sellerName: user?.name || 'ANT Dealership',
        sellerEmail: user?.email || 'dealer@ant.com',
        createdAt: new Date().toISOString(),
        status: 'Approved',
        views: 0,
        featured: false,
        // Mock image
        image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&q=80&w=800'
      };

      console.log('Submitted Car to Backend:', newCar);
      
      setIsSubmitting(false);
      toast.success("Car added successfully! It is now Pending approval.");
      navigate('/dashboard/my-cars');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Add New Car</h1>
        <p className="text-sm text-zinc-400">Fill in the details below to list a new vehicle for sale or rent.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Basic Information */}
        <div className="bg-[#0c0d10] border border-zinc-800 rounded-2xl p-6 lg:p-8">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Car className="w-5 h-5 text-indigo-400" />
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-400">Brand *</label>
              <input type="text" name="brand" required value={formData.brand} onChange={handleChange} placeholder="e.g. Toyota" className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-400">Model *</label>
              <input type="text" name="model" required value={formData.model} onChange={handleChange} placeholder="e.g. Corolla Cross" className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-400">Year *</label>
              <input type="number" name="year" required value={formData.year} onChange={handleChange} placeholder="e.g. 2024" className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-400">Price (BDT) *</label>
              <input type="number" name="price" required value={formData.price} onChange={handleChange} placeholder="e.g. 4500000" className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500" />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-zinc-400">Location *</label>
              <input type="text" name="location" required value={formData.location} onChange={handleChange} placeholder="e.g. Banani, Dhaka" className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500" />
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="bg-[#0c0d10] border border-zinc-800 rounded-2xl p-6 lg:p-8">
          <h2 className="text-lg font-bold text-white mb-6">Technical Specifications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-400">Body Type</label>
              <select name="bodyType" value={formData.bodyType} onChange={handleChange} className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 appearance-none">
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Coupe">Coupe</option>
                <option value="Pickup">Pickup</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-400">Fuel Type</label>
              <select name="fuel" value={formData.fuel} onChange={handleChange} className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 appearance-none">
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
                <option value="Octane">Octane</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-400">Transmission</label>
              <select name="transmission" value={formData.transmission} onChange={handleChange} className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 appearance-none">
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
                <option value="CVT">CVT</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-400">Color</label>
              <input type="text" name="color" value={formData.color} onChange={handleChange} placeholder="e.g. Pearl White" className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-400">Mileage</label>
              <input type="text" name="mileage" value={formData.mileage} onChange={handleChange} placeholder="e.g. 15,000 km" className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-400">Seats</label>
              <input type="number" name="seats" value={formData.seats} onChange={handleChange} placeholder="e.g. 5" className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-400">Engine Details</label>
              <input type="text" name="engine" value={formData.engine} onChange={handleChange} placeholder="e.g. 1.8L 4-Cylinder" className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-400">Horsepower</label>
              <input type="text" name="horsepower" value={formData.horsepower} onChange={handleChange} placeholder="e.g. 138 hp" className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500" />
            </div>
          </div>
        </div>

        {/* Media & Description */}
        <div className="bg-[#0c0d10] border border-zinc-800 rounded-2xl p-6 lg:p-8">
          <h2 className="text-lg font-bold text-white mb-6">Media & Additional Details</h2>
          
          <div className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-400">Description</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange}
                rows="4" 
                placeholder="Write a detailed description of the car..." 
                className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
              ></textarea>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-400">Upload Images</label>
              <div className="border-2 border-dashed border-zinc-800 hover:border-indigo-500 rounded-2xl p-8 text-center transition-colors cursor-pointer bg-[#0a0a0c]">
                <UploadCloud className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
                <p className="text-sm text-zinc-300 font-medium">Click to upload or drag and drop</p>
                <p className="text-xs text-zinc-500 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-[#0a0a0c] border border-zinc-800 rounded-xl">
              <input 
                type="checkbox" 
                id="available" 
                name="available"
                checked={formData.available}
                onChange={handleChange}
                className="w-5 h-5 accent-indigo-500 bg-[#0c0d10] border-zinc-800 rounded" 
              />
              <label htmlFor="available" className="text-sm font-medium text-white cursor-pointer select-none">
                Make this car Available to public immediately after approval
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit"
            disabled={isSubmitting}
            className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-70 text-white font-medium px-8 py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] flex items-center gap-2"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                Submitting...
              </span>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Submit Car for Review
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
