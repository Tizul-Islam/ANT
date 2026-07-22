import React from 'react';
import useTitle from '../../utils/useTitle';
import { User, Bell, Lock, Shield } from 'lucide-react';

export default function Settings() {
  useTitle("Settings | ANT");

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
        <p className="text-sm text-zinc-400">Manage your account preferences and security.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Settings Nav */}
        <div className="space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#111216] text-white rounded-lg font-medium text-sm transition-colors">
            <User className="w-4 h-4 text-indigo-400" />
            Profile Details
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-[#111216] rounded-lg font-medium text-sm transition-colors">
            <Bell className="w-4 h-4" />
            Notifications
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-[#111216] rounded-lg font-medium text-sm transition-colors">
            <Lock className="w-4 h-4" />
            Security
          </button>
        </div>

        {/* Settings Form Placeholder */}
        <div className="md:col-span-2 bg-[#0c0d10] border border-zinc-800 rounded-2xl p-6 lg:p-8">
          <h2 className="text-lg font-bold text-white mb-6">Profile Details</h2>
          
          <div className="space-y-6">
            <div className="flex items-center gap-6 pb-6 border-b border-zinc-800">
              <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center text-2xl text-indigo-400 font-bold border border-indigo-500/20">
                JD
              </div>
              <div>
                <button className="bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors mb-2">
                  Change Avatar
                </button>
                <p className="text-xs text-zinc-500">JPG, GIF or PNG. Max size of 800K</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400">First Name</label>
                <input type="text" defaultValue="John" className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400">Last Name</label>
                <input type="text" defaultValue="Doe" className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500" />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-400">Email Address</label>
              <input type="email" defaultValue="john.doe@example.com" disabled className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-500 cursor-not-allowed" />
            </div>

            <div className="pt-4 flex justify-end">
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-6 py-2.5 rounded-lg transition-colors text-sm">
                Save Changes
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
