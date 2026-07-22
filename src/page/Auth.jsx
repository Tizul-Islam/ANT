import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import useTitle from '../utils/useTitle';
import { toast } from 'react-toastify';

const ROLES = [
  'Customer', 'Shop Owner', 'Super Admin', 'Regional Admin', 
  'Moderator', 'Vendor', 'Mechanic', 'Service Center', 
  'Workshop Owner', 'Training Instructor', 'Corporate Buyer', 
  'Fleet Manager', 'Delivery Partner', 'Support Agent'
];

export default function Auth() {
  useTitle("Authentication | ANT");
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Customer');
  
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please fill in all fields");
    
    const success = await login(email, role);
    if (success) {
      toast.success(`Logged in successfully as ${role}`);
      const from = location.state?.from?.pathname || (role === 'Shop Owner' ? '/myshop' : '/profile');
      navigate(from, { replace: true });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password || !name) return toast.error("Please fill in all fields");
    
    // Mock registration by just logging them in for now
    const success = await login(email, role);
    if (success) {
      toast.success(`Account created successfully!`);
      const from = role === 'Shop Owner' ? '/myshop' : '/profile';
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#09090b] flex items-center justify-center p-4">
      
      <div className="w-full max-w-[400px] bg-[#111318] border border-zinc-800 rounded-2xl p-8">
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-1">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="text-sm text-zinc-400">
            {isLogin ? 'Sign in to continue to ANT.' : 'Join thousands of automotive enthusiasts.'}
          </p>
        </div>

        <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
          
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300">Full name</label>
              <input 
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0a0a0c] border border-zinc-800 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">Email</label>
            <input 
              type="email"
              autoComplete="username"
              placeholder={isLogin ? "you@example.com" : ""}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0a0a0c] border border-zinc-800 text-white rounded-lg px-4 py-2.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300">Password</label>
            <input 
              type="password"
              placeholder="••••••••"
              autoComplete={isLogin ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0a0a0c] border border-zinc-800 text-white rounded-lg px-4 py-2.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5 pt-1">
            <label className="text-xs font-semibold text-zinc-300">
              {isLogin ? 'Sign in as' : 'I am a'}
            </label>
            <select 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-[#0a0a0c] border border-zinc-800 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 transition-colors appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2371717a'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
            >
              {ROLES.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          
          {isLogin && (
            <p className="text-[10px] text-zinc-500 mt-1">Mock auth — any email works. Role is stored in localStorage.</p>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full mt-4 bg-[#7a73ff] hover:bg-[#6b64ff] text-white font-medium py-2.5 rounded-lg transition-colors flex justify-center items-center h-[42px]"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
            ) : (
              isLogin ? 'Sign in' : 'Create account'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            {isLogin ? (
              <>No account? <span className="text-[#7a73ff]">Create one</span></>
            ) : (
              <>Already have an account? <span className="text-[#7a73ff]">Sign in</span></>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
