import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { UploadCloud, CheckCircle, ArrowLeft } from 'lucide-react';
import useTitle from '../../utils/useTitle';
import { toast } from 'react-toastify';

export default function EditCar() {
  const { id } = useParams();
  useTitle(`Edit Car ${id} | Employer Dashboard`);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    price: '',
    mileage: '',
    color: '',
    transmission: 'Automatic',
    location: '',
    description: '',
    available: true,
  });

  useEffect(() => {
    // Simulate fetching car data
    setTimeout(() => {
      setFormData({
        price: '4500000',
        mileage: '15000',
        color: 'Pearl White',
        transmission: 'Automatic',
        location: 'Banani, Dhaka',
        description: 'Excellent condition SUV with all standard features. Single handed driven.',
        available: true,
      });
      setIsLoading(false);
    }, 1000);
  }, [id]);

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
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Car updated successfully!");
      navigate('/dashboard/my-cars');
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-20 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-zinc-400">Loading car details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/dashboard/my-cars" className="w-10 h-10 bg-[#0c0d10] border border-zinc-800 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Edit Car Details</h1>
          <p className="text-sm text-zinc-400">Update specific information for your listing.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#0c0d10]/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 sm:p-8">
        <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
          <p className="text-sm text-amber-400">
            <strong>Note:</strong> Some core fields (Brand, Model, Year, Body Type, Fuel, Engine, etc.) cannot be changed after submission to maintain data integrity. Please contact Admin if you need to modify core details.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Price (BDT) *</label>
            <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full bg-[#111216] border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
          </div>

          {/* Mileage */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Mileage (km) *</label>
            <input required type="number" name="mileage" value={formData.mileage} onChange={handleChange} className="w-full bg-[#111216] border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Color *</label>
            <input required type="text" name="color" value={formData.color} onChange={handleChange} className="w-full bg-[#111216] border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
          </div>

          {/* Transmission */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Transmission *</label>
            <select required name="transmission" value={formData.transmission} onChange={handleChange} className="w-full bg-[#111216] border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors">
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="CVT">CVT</option>
            </select>
          </div>

          {/* Location */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-zinc-300 mb-2">Location *</label>
            <input required type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Banani, Dhaka" className="w-full bg-[#111216] border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-zinc-300 mb-2">Description *</label>
            <textarea required name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full bg-[#111216] border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"></textarea>
          </div>

          {/* Availability */}
          <div className="md:col-span-2 flex items-center justify-between p-4 bg-[#111216] border border-zinc-800 rounded-xl">
            <div>
              <h4 className="text-white font-medium mb-1">Make Available to Public</h4>
              <p className="text-sm text-zinc-400">If checked, this car will be visible to customers (if approved by admin).</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" name="available" checked={formData.available} onChange={handleChange} className="sr-only peer" />
              <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          {/* Images Upload Placeholder */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-zinc-300 mb-2">Update Images</label>
            <div className="w-full border-2 border-dashed border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-[#111216] hover:bg-[#1a1b20] transition-colors cursor-pointer">
              <UploadCloud className="w-10 h-10 text-zinc-500 mb-3" />
              <p className="text-sm font-medium text-white mb-1">Click to upload new images</p>
              <p className="text-xs text-zinc-500">SVG, PNG, JPG or GIF (max. 800x400px)</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-800 flex justify-end gap-4">
          <Link to="/dashboard/my-cars" className="px-6 py-3 rounded-xl font-medium text-zinc-300 hover:text-white transition-colors">
            Cancel
          </Link>
          <button 
            type="submit"
            disabled={isSubmitting}
            className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-70 text-white px-8 py-3 rounded-xl font-medium transition-colors flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Saving Changes...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Update Car
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
