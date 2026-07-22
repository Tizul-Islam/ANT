import React, { useState } from 'react';
import useTitle from '../../utils/useTitle';
import { User, Bell, Lock, Trash2, Camera, Shield, Mail, Calendar, Building2, MapPin, Phone } from 'lucide-react';
import { getCurrentUser } from '../../utils/auth';
import { toast } from 'react-toastify';

export default function Settings() {
  useTitle("Settings & Profile | Employer Dashboard");
  const user = getCurrentUser();
  const [activeTab, setActiveTab] = useState('profile');
  
  const [formData, setFormData] = useState({
    name: user?.name || 'ANT Dealership',
    phone: '+880 1700 000000',
    address: 'Banani, Dhaka',
    companyName: 'ANT Motors Ltd.',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Account Settings</h1>
        <p className="text-sm text-zinc-400">Manage your profile, dealership details, and security preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Navigation Sidebar */}
        <div className="space-y-2">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-colors ${activeTab === 'profile' ? 'bg-[#111216] border border-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/30 border border-transparent'}`}
          >
            <User className={`w-4 h-4 ${activeTab === 'profile' ? 'text-indigo-400' : ''}`} />
            Profile Details
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-colors ${activeTab === 'security' ? 'bg-[#111216] border border-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/30 border border-transparent'}`}
          >
            <Lock className={`w-4 h-4 ${activeTab === 'security' ? 'text-indigo-400' : ''}`} />
            Security
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-colors ${activeTab === 'notifications' ? 'bg-[#111216] border border-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/30 border border-transparent'}`}
          >
            <Bell className={`w-4 h-4 ${activeTab === 'notifications' ? 'text-indigo-400' : ''}`} />
            Notifications
          </button>
        </div>

        {/* Content Area */}
        <div className="md:col-span-3">
          
          {activeTab === 'profile' && (
            <div className="bg-[#0c0d10]/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-zinc-800/80 flex items-start gap-6">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full bg-indigo-500/10 border-2 border-indigo-500/20 flex items-center justify-center text-3xl font-bold text-indigo-400 overflow-hidden">
                    {formData.name.charAt(0)}
                  </div>
                  <button className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-6 h-6 text-white" />
                  </button>
                </div>
                <div className="mt-2">
                  <h3 className="text-xl font-bold text-white">{formData.name}</h3>
                  <div className="flex items-center gap-3 mt-2 text-sm text-zinc-400">
                    <span className="flex items-center gap-1 bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded uppercase text-xs font-bold tracking-wider border border-indigo-500/20">
                      <Shield className="w-3 h-3" /> Employer
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> Member since Nov 2024
                    </span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className="p-6 space-y-6">
                {/* Read Only Field */}
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5 flex items-center gap-1.5"><Mail className="w-4 h-4"/> Email Address (Read Only)</label>
                  <input type="email" readOnly value={user?.email || 'employer@ant.com'} className="w-full bg-[#0a0a0c] border border-zinc-800/50 rounded-xl px-4 py-3 text-zinc-500 cursor-not-allowed focus:outline-none" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-[#111216] border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5"><Phone className="w-4 h-4 text-zinc-500"/> Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-[#111216] border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5"><Building2 className="w-4 h-4 text-zinc-500"/> Company / Dealership Name</label>
                    <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full bg-[#111216] border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1.5 flex items-center gap-1.5"><MapPin className="w-4 h-4 text-zinc-500"/> Location / Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full bg-[#111216] border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-xl font-medium transition-colors">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-[#0c0d10]/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-zinc-800/80">
                <h3 className="text-lg font-bold text-white mb-1">Change Password</h3>
                <p className="text-sm text-zinc-400">Ensure your account is using a long, random password to stay secure.</p>
              </div>
              <form className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1.5">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full max-w-md bg-[#111216] border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1.5">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full max-w-md bg-[#111216] border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1.5">Confirm New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full max-w-md bg-[#111216] border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors" />
                </div>
                <div className="pt-2">
                  <button type="button" className="bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border border-indigo-500/20 px-6 py-2.5 rounded-xl font-medium transition-colors">
                    Update Password
                  </button>
                </div>
              </form>

              <div className="p-6 border-t border-rose-500/20 bg-rose-500/5 mt-8">
                <h3 className="text-lg font-bold text-rose-500 mb-2 flex items-center gap-2"><Trash2 className="w-5 h-5" /> Delete Account</h3>
                <p className="text-sm text-rose-400/80 mb-4 max-w-xl">
                  Once you delete your account, there is no going back. All your cars, bookings, and analytics will be permanently deleted. Please be certain.
                </p>
                <button className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2.5 rounded-xl font-medium transition-colors">
                  Delete my account
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-[#0c0d10]/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl overflow-hidden p-6">
              <h3 className="text-lg font-bold text-white mb-6">Notification Preferences</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium mb-1">Email Alerts</h4>
                    <p className="text-sm text-zinc-400">Receive emails for new bookings and reviews.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium mb-1">Marketing Emails</h4>
                    <p className="text-sm text-zinc-400">Receive offers, promotions, and updates from ANT.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
