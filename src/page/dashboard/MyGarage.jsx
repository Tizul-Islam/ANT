import React, { useState } from 'react';
import { Car, Plus, Edit2, Trash2, Settings, PenTool } from 'lucide-react';
import useTitle from '../../utils/useTitle';
import { toast } from 'react-toastify';

export default function MyGarage() {
  useTitle("My Garage | ANT");
  
  const [vehicles, setVehicles] = useState([
    { id: 1, make: 'Toyota', model: 'Corolla', year: '2019', trim: 'XLE', vin: 'JTD1234567890ABCD' },
    { id: 2, make: 'Honda', model: 'Civic', year: '2021', trim: 'Touring', vin: '2HG1234567890WXYZ' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    trim: '',
    vin: ''
  });

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ make: '', model: '', year: '', trim: '', vin: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (vehicle) => {
    setEditingId(vehicle.id);
    setFormData({ ...vehicle });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to remove this vehicle from your garage?")) {
      setVehicles(vehicles.filter(v => v.id !== id));
      toast.success("Vehicle removed");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.make || !formData.model || !formData.year) {
      return toast.error("Make, Model, and Year are required");
    }

    if (editingId) {
      setVehicles(vehicles.map(v => v.id === editingId ? { ...formData, id: editingId } : v));
      toast.success("Vehicle updated");
    } else {
      setVehicles([...vehicles, { ...formData, id: Date.now() }]);
      toast.success("Vehicle added to garage");
    }
    
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">My Garage</h1>
          <p className="text-sm text-zinc-400">Manage your vehicles to find compatible parts quickly.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-4 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Vehicle
        </button>
      </div>

      {vehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {vehicles.map(vehicle => (
            <div key={vehicle.id} className="bg-[#0c0d10] border border-zinc-800 rounded-xl overflow-hidden group">
              
              <div className="h-32 bg-zinc-900 relative overflow-hidden flex items-center justify-center">
                {/* Fallback pattern/icon */}
                <Car className="w-16 h-16 text-zinc-800 absolute" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] to-transparent"></div>
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEditModal(vehicle)} className="w-8 h-8 bg-zinc-800/80 backdrop-blur rounded flex items-center justify-center text-zinc-300 hover:text-white hover:bg-indigo-500 transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(vehicle.id)} className="w-8 h-8 bg-zinc-800/80 backdrop-blur rounded flex items-center justify-center text-zinc-300 hover:text-white hover:bg-rose-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-1 text-xs font-semibold text-indigo-400">
                  <Settings className="w-3.5 h-3.5" />
                  {vehicle.year}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{vehicle.make} {vehicle.model}</h3>
                <p className="text-sm text-zinc-400 mb-4">{vehicle.trim || 'Standard Trim'}</p>
                
                <div className="bg-[#0a0a0c] border border-zinc-800 rounded-lg p-3">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">VIN</div>
                  <div className="font-mono text-sm text-zinc-300">{vehicle.vin || 'Not specified'}</div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-zinc-800">
                  <button className="text-sm text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-2">
                    <PenTool className="w-4 h-4" />
                    Find Compatible Parts
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#0c0d10] border border-dashed border-zinc-800 rounded-2xl py-24 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4">
            <Car className="w-8 h-8 text-zinc-600" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">No vehicles in your garage</h2>
          <p className="text-sm text-zinc-500 mb-8 max-w-sm">
            Add your car's details to easily find parts that are guaranteed to fit.
          </p>
          <button 
            onClick={openAddModal}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
          >
            Add your first vehicle
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0c0d10] border border-zinc-800 rounded-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">
                {editingId ? 'Edit Vehicle' : 'Add New Vehicle'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white">
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400">Make *</label>
                  <input 
                    type="text" 
                    value={formData.make}
                    onChange={(e) => setFormData({...formData, make: e.target.value})}
                    placeholder="e.g. Toyota"
                    className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400">Model *</label>
                  <input 
                    type="text" 
                    value={formData.model}
                    onChange={(e) => setFormData({...formData, model: e.target.value})}
                    placeholder="e.g. Corolla"
                    className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400">Year *</label>
                  <input 
                    type="number" 
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: e.target.value})}
                    placeholder="e.g. 2019"
                    className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400">Trim Level</label>
                  <input 
                    type="text" 
                    value={formData.trim}
                    onChange={(e) => setFormData({...formData, trim: e.target.value})}
                    placeholder="e.g. XLE"
                    className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400">VIN (Vehicle Identification Number)</label>
                <input 
                  type="text" 
                  value={formData.vin}
                  onChange={(e) => setFormData({...formData, vin: e.target.value})}
                  placeholder="17-character VIN"
                  className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white font-mono uppercase focus:outline-none focus:border-indigo-500"
                  maxLength={17}
                />
                <p className="text-[10px] text-zinc-500 mt-1">Optional, but recommended for perfect part matching.</p>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex justify-end gap-3 mt-6">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-lg text-sm font-medium text-white hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-5 py-2.5 rounded-lg transition-colors text-sm"
                >
                  {editingId ? 'Save Changes' : 'Add Vehicle'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
