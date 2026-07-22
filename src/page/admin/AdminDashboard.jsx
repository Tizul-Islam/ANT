import React, { useState, useEffect } from 'react';
import useTitle from '../../utils/useTitle';
import { motion } from 'framer-motion';
import { Users, UserCircle, Briefcase, Car, Clock, CheckCircle2, DollarSign, CalendarCheck, TrendingUp, AlertCircle } from 'lucide-react';
import { getCurrentUser } from '../../utils/auth';

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

export default function AdminDashboard() {
  useTitle("Admin Dashboard | ANT Enterprise");
  const user = getCurrentUser();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setStats({
        totalUsers: '1,245',
        customers: '1,102',
        employers: '143',
        totalCars: '342',
        pendingCars: '12',
        approvedCars: '330',
        revenue: '৳ 4.5M',
        revenueTrend: '+15%',
        bookings: '89',
        bookingsTrend: '+8%'
      });
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  const cards = [
    { title: "Total Users", value: stats?.totalUsers, icon: Users, color: "text-blue-400", bg: "bg-blue-400/10", border: "hover:border-blue-500/50", subtitle: "All registered users" },
    { title: "Customers", value: stats?.customers, icon: UserCircle, color: "text-cyan-400", bg: "bg-cyan-400/10", border: "hover:border-cyan-500/50", subtitle: "Active buyers" },
    { title: "Employers", value: stats?.employers, icon: Briefcase, color: "text-indigo-400", bg: "bg-indigo-400/10", border: "hover:border-indigo-500/50", subtitle: "Registered sellers" },
    
    { title: "Total Revenue", value: stats?.revenue, icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "hover:border-emerald-500/50", subtitle: <span className="flex items-center gap-1 text-emerald-400"><TrendingUp className="w-3 h-3" /> {stats?.revenueTrend} vs last month</span> },
    
    { title: "Total Cars", value: stats?.totalCars, icon: Car, color: "text-purple-400", bg: "bg-purple-400/10", border: "hover:border-purple-500/50", subtitle: "Total listings" },
    { title: "Pending Cars", value: stats?.pendingCars, icon: Clock, color: "text-amber-400", bg: "bg-amber-400/10", border: "hover:border-amber-500/50", subtitle: <span className="flex items-center gap-1 text-amber-400"><AlertCircle className="w-3 h-3" /> Action required</span> },
    { title: "Approved Cars", value: stats?.approvedCars, icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "hover:border-emerald-500/50", subtitle: "Live on website" },
    
    { title: "Bookings", value: stats?.bookings, icon: CalendarCheck, color: "text-rose-400", bg: "bg-rose-400/10", border: "hover:border-rose-500/50", subtitle: <span className="flex items-center gap-1 text-emerald-400"><TrendingUp className="w-3 h-3" /> {stats?.bookingsTrend} vs last month</span> },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Super Admin Overview</h1>
          <p className="text-zinc-400">Complete platform analytics and system status.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-[#111216] border border-zinc-800 rounded-full text-zinc-300 text-sm font-medium flex items-center gap-2">
            System Status: 
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Healthy
            </span>
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

      {/* Ambient Glow */}
      <div className="fixed top-[20%] left-[80%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed top-[80%] left-[20%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
    </div>
  );
}
