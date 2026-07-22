import React, { useState, useEffect } from 'react';
import useTitle from '../utils/useTitle';
import { motion } from 'framer-motion';
import { Car, Clock, CheckCircle2, XCircle, Eye, CalendarCheck, TrendingUp, Key, Banknote } from 'lucide-react';
import { getCurrentUser } from '../utils/auth';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const SkeletonCard = () => (
  <div className="bg-[#0c0d10]/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 relative overflow-hidden">
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
    <div className="flex items-center justify-between mb-4">
      <div className="w-24 h-4 bg-zinc-800/50 rounded-md"></div>
      <div className="w-10 h-10 bg-zinc-800/50 rounded-xl"></div>
    </div>
    <div className="w-16 h-8 bg-zinc-800/50 rounded-lg mb-2"></div>
    <div className="w-32 h-3 bg-zinc-800/50 rounded-md"></div>
  </div>
);

// Mock Data for Charts
const monthlyData = [
  { name: 'Jan', listings: 4, bookings: 2 },
  { name: 'Feb', listings: 7, bookings: 4 },
  { name: 'Mar', listings: 5, bookings: 6 },
  { name: 'Apr', listings: 12, bookings: 8 },
  { name: 'May', listings: 8, bookings: 12 },
  { name: 'Jun', listings: 15, bookings: 14 }
];

const statusDistribution = [
  { name: 'Approved', value: 8, color: '#10b981' }, // Emerald
  { name: 'Pending', value: 3, color: '#f59e0b' }, // Amber
  { name: 'Rejected', value: 1, color: '#f43f5e' } // Rose
];

export default function Myshop() {
  useTitle("Dashboard Overview | Employer");
  const user = getCurrentUser();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setStats({
        totalCars: 12,
        approvedCars: 8,
        pendingCars: 3,
        rejectedCars: 1,
        availableCars: 6,
        soldCars: 2,
        views: '24.5k',
        viewsTrend: '+12%',
        bookings: 45,
        bookingsTrend: '+5%'
      });
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  const cards = [
    { title: "Total Cars", value: stats?.totalCars, icon: Car, color: "text-blue-400", bg: "bg-blue-400/10", border: "group-hover:border-blue-500/50", subtitle: "Total listings created" },
    { title: "Approved Cars", value: stats?.approvedCars, icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "group-hover:border-emerald-500/50", subtitle: "Live on platform" },
    { title: "Pending Cars", value: stats?.pendingCars, icon: Clock, color: "text-amber-400", bg: "bg-amber-400/10", border: "group-hover:border-amber-500/50", subtitle: "Awaiting review" },
    { title: "Rejected Cars", value: stats?.rejectedCars, icon: XCircle, color: "text-rose-400", bg: "bg-rose-400/10", border: "group-hover:border-rose-500/50", subtitle: "Needs correction" },
    { title: "Available Cars", value: stats?.availableCars, icon: Key, color: "text-cyan-400", bg: "bg-cyan-400/10", border: "group-hover:border-cyan-500/50", subtitle: "Ready to sell" },
    { title: "Sold Cars", value: stats?.soldCars, icon: Banknote, color: "text-green-400", bg: "bg-green-400/10", border: "group-hover:border-green-500/50", subtitle: "Completed sales" },
    { title: "Total Views", value: stats?.views, icon: Eye, color: "text-indigo-400", bg: "bg-indigo-400/10", border: "group-hover:border-indigo-500/50", subtitle: <span className="flex items-center gap-1 text-emerald-400"><TrendingUp className="w-3 h-3" /> {stats?.viewsTrend} this month</span> },
    { title: "Total Bookings", value: stats?.bookings, icon: CalendarCheck, color: "text-purple-400", bg: "bg-purple-400/10", border: "group-hover:border-purple-500/50", subtitle: <span className="flex items-center gap-1 text-emerald-400"><TrendingUp className="w-3 h-3" /> {stats?.bookingsTrend} this month</span> },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Dashboard Overview</h1>
          <p className="text-zinc-400">Welcome back, {user?.name || 'Partner'}. Here's what's happening with your dealership.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            Live Updates
          </div>
        </div>
      </div>

      {/* Grid Section */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div 
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={`group bg-[#0c0d10]/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-${card.color.split('-')[1]}-500/10 ${card.border}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm font-medium text-zinc-400 mb-1">{card.title}</p>
                    <h3 className="text-3xl font-bold text-white tracking-tight">{card.value}</h3>
                  </div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.bg} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <Icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                </div>
                <div className="text-sm text-zinc-500 mt-4 flex items-center gap-1.5 border-t border-zinc-800/50 pt-4">
                  {card.subtitle}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Charts Section */}
      {!isLoading && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8"
        >
          {/* Main Chart: Listings & Bookings */}
          <div className="lg:col-span-2 bg-[#0c0d10]/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Performance Overview</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorListings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ color: '#e4e4e7' }}
                  />
                  <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#a1a1aa' }}/>
                  <Area type="monotone" dataKey="listings" name="Car Listings" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorListings)" />
                  <Area type="monotone" dataKey="bookings" name="Bookings" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorBookings)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart: Status Distribution */}
          <div className="bg-[#0c0d10]/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 flex flex-col">
            <h3 className="text-lg font-bold text-white mb-2">Car Status Distribution</h3>
            <div className="flex-1 min-h-[250px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ color: '#e4e4e7' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Custom Legend for Pie */}
              <div className="flex flex-col gap-3 mt-4">
                {statusDistribution.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-zinc-400">{item.name}</span>
                    </div>
                    <span className="text-sm font-bold text-white">{item.value} Cars</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
    </div>
  );
}