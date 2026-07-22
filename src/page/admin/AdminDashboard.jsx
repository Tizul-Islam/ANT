import React from 'react';
import useTitle from '../../utils/useTitle';
import { Users, Car, CheckSquare, AlertCircle, TrendingUp, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
  useTitle("Admin Dashboard | ANT");

  const stats = [
    { label: "Total Users", value: "1,245", icon: Users, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Total Cars", value: "342", icon: Car, color: "text-indigo-400", bg: "bg-indigo-400/10" },
    { label: "Pending Approvals", value: "12", icon: CheckSquare, color: "text-amber-400", bg: "bg-amber-400/10" },
    { label: "Total Revenue", value: "৳ 45M", icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-400/10" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Overview</h1>
        <p className="text-sm text-zinc-400">Welcome to the ANT Admin Dashboard.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-[#0c0d10] border border-zinc-800 rounded-2xl p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-400 mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Placeholder for Charts */}
        <div className="bg-[#0c0d10] border border-zinc-800 rounded-2xl p-6 h-80 flex flex-col items-center justify-center">
          <TrendingUp className="w-12 h-12 text-zinc-600 mb-4" />
          <p className="text-zinc-500 font-medium">Revenue Chart (Coming Soon)</p>
        </div>
        <div className="bg-[#0c0d10] border border-zinc-800 rounded-2xl p-6 h-80 flex flex-col items-center justify-center">
          <AlertCircle className="w-12 h-12 text-zinc-600 mb-4" />
          <p className="text-zinc-500 font-medium">Recent Activity (Coming Soon)</p>
        </div>
      </div>
    </div>
  );
}
