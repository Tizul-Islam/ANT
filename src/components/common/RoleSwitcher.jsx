import React, { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { Settings, X } from 'lucide-react';

const ALL_ROLES = [
  'Customer', 'Shop Owner', 'Super Admin', 'Regional Admin', 
  'Moderator', 'Vendor', 'Mechanic', 'Service Center', 
  'Workshop Owner', 'Training Instructor', 'Corporate Buyer', 
  'Fleet Manager', 'Delivery Partner', 'Support Agent'
];

export default function RoleSwitcher() {
  const { user, switchRole, isAuthenticated } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  // Only show in development mode and if user is logged in
  if (!isAuthenticated || import.meta.env.PROD) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[100]">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 w-64 overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between p-3 border-b bg-gray-50">
            <span className="font-semibold text-sm text-gray-700">Dev Role Switcher</span>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-2 max-h-64 overflow-y-auto">
            {ALL_ROLES.map(role => (
              <button
                key={role}
                onClick={() => {
                  switchRole(role);
                  setIsOpen(false);
                  window.location.reload(); // Quick refresh to re-evaluate route guards
                }}
                className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                  user?.role === role 
                    ? 'bg-green-100 text-green-800 font-medium' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-10 h-10 bg-gray-900 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-800 transition-colors opacity-50 hover:opacity-100 group"
          title="Switch Role"
        >
          <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      )}
    </div>
  );
}
