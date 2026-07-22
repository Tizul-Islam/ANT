import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, ShieldCheck, Zap, Wrench } from 'lucide-react';
import { Button } from './ui/Button';

export default function Hero() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/product', { state: { searchQuery: searchQuery.trim() } });
    }
  };

  const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <section className="relative overflow-hidden bg-black text-white min-h-[90vh] flex flex-col justify-center">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-[var(--color-primary)]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-blue-600/20 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial="hidden"
          animate="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="flex justify-center mb-6">
            <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-sm text-zinc-300 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-[var(--color-primary)] mr-2" />
              <span>The Next Generation Automotive Marketplace</span>
            </div>
          </motion.div>

          <motion.h1 
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-8"
          >
            Find exactly what your <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">
              vehicle needs.
            </span>
          </motion.h1>

          <motion.p 
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="text-lg sm:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto"
          >
            Access millions of verified OEM and aftermarket parts, connect with top-rated mechanics, and manage your garage in one unified ecosystem.
          </motion.p>

          <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="max-w-2xl mx-auto mb-16">
            <form onSubmit={handleSearch} className="relative flex items-center group">
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative flex w-full bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-md">
                <div className="pl-6 flex items-center justify-center">
                  <Search className="w-6 h-6 text-zinc-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search by part name, VIN, or OEM number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent px-4 py-5 text-zinc-100 outline-none placeholder:text-zinc-500 text-lg"
                />
                <div className="pr-2 flex items-center">
                  <Button type="submit" size="lg" className="rounded-xl px-8 bg-[var(--color-primary)] hover:bg-opacity-90 text-white font-semibold flex items-center gap-2">
                    Search <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </form>
          </motion.div>

          <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="flex flex-wrap justify-center gap-8 text-zinc-500 text-sm font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              Verified Vendors Only
            </div>
            <div className="flex items-center gap-2">
              <Wrench className="w-5 h-5 text-blue-500" />
              Expert Mechanics
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Fast Delivery
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Fade into next section */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[var(--color-background)] to-transparent z-10 pointer-events-none"></div>
    </section>
  );
}