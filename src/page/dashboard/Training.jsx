import React from 'react';
import useTitle from '../../utils/useTitle';
import { GraduationCap, PlayCircle } from 'lucide-react';

export default function Training() {
  useTitle("My Training | ANT");

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">My Training</h1>
        <p className="text-sm text-zinc-400">Access your enrolled courses and certifications.</p>
      </div>

      <div className="bg-[#0c0d10] border border-dashed border-zinc-800 rounded-2xl py-24 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4">
          <GraduationCap className="w-8 h-8 text-indigo-400" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">No active courses</h2>
        <p className="text-sm text-zinc-500 mb-8 max-w-sm">
          You haven't enrolled in any automotive training programs yet. Explore our marketplace to upgrade your skills.
        </p>
        <button 
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2"
        >
          <PlayCircle className="w-4 h-4" />
          Browse Courses
        </button>
      </div>

    </div>
  );
}
