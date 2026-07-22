import React, { useState, useEffect } from 'react';
import useTitle from '../../utils/useTitle';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Banknote, Car, Eye, CalendarCheck, Star } from 'lucide-react';

const monthlyData = [
  { name: 'Jan', revenue: 1500000, cars: 2, bookings: 1, views: 1200 },
  { name: 'Feb', revenue: 3200000, cars: 4, bookings: 3, views: 2400 },
  { name: 'Mar', revenue: 2800000, cars: 3, bookings: 2, views: 1800 },
  { name: 'Apr', revenue: 4500000, cars: 6, bookings: 5, views: 3600 },
  { name: 'May', revenue: 3800000, cars: 5, bookings: 4, views: 3100 },
  { name: 'Jun', revenue: 5200000, cars: 8, bookings: 6, views: 4800 }
];

const SkeletonAnalytics = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="h-28 bg-[#0c0d10] border border-zinc-800 rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="h-[400px] bg-[#0c0d10] border border-zinc-800 rounded-2xl"></div>
      <div className="h-[400px] bg-[#0c0d10] border border-zinc-800 rounded-2xl"></div>
    </div>
  </div>
);

export default function EmployerAnalytics() {
  useTitle("Analytics | Employer Dashboard");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const summaryCards = [
    { title: 'Total Revenue', value: '৳ 2.1 Cr', icon: Banknote, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { title: 'Total Cars', value: '28', icon: Car, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { title: 'Total Views', value: '16.9k', icon: Eye, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
    { title: 'Total Bookings', value: '21', icon: CalendarCheck, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { title: 'Avg Rating', value: '4.8', icon: Star, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  ];

  if (isLoading) {
    return <div className="max-w-7xl mx-auto pb-10"><SkeletonAnalytics /></div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Performance Analytics</h1>
        <p className="text-sm text-zinc-400">Deep dive into your dealership's growth and metrics.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {summaryCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="bg-[#0c0d10]/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-5 hover:border-zinc-700 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <p className="text-xs font-medium text-zinc-400">{card.title}</p>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${card.bg}`}>
                  <Icon className={`w-4 h-4 ${card.color}`} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white">{card.value}</h3>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Revenue Chart */}
        <div className="bg-[#0c0d10]/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Revenue Trend</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `৳${val/100000}L`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#10b981' }}
                  formatter={(value) => [`৳ ${value.toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cars Added vs Bookings */}
        <div className="bg-[#0c0d10]/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Cars Added vs Bookings</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', color: '#fff' }}
                  cursor={{ fill: '#27272a', opacity: 0.4 }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#a1a1aa' }}/>
                <Bar dataKey="cars" name="Cars Added" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="bookings" name="Bookings" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Views Trend */}
        <div className="lg:col-span-2 bg-[#0c0d10]/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Profile & Listing Views</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#6366f1' }}
                />
                <Area type="monotone" dataKey="views" name="Total Views" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
