import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User as UserIcon, LogIn, UserPlus, AlertCircle, Briefcase, CheckCircle2, RefreshCw } from 'lucide-react';
import useTitle from '../utils/useTitle';
import { toast } from 'react-toastify';
import { loginWithFirebase, registerWithFirebase, resendVerificationEmail } from '../lib/firebase/auth';

export default function Auth() {
  useTitle("Authentication | ANT");
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // State to track if user needs to verify email (shows resend button)
  const [needsVerification, setNeedsVerification] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'customer' // default role
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
    setNeedsVerification(false);
    setSuccessMessage('');
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setNeedsVerification(false);
    setSuccessMessage('');

    try {
      // 🚨 BACKDOOR FOR ADMIN LOGIN (Development Only) 🚨
      if (formData.email === 'admin@ant.com' && formData.password === 'admin123') {
        const mockAdminUser = { uid: 'admin-123', email: 'admin@ant.com' };
        const mockAdminRole = 'admin';
        
        // Use a dummy JWT for admin
        const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const payload = btoa(JSON.stringify({
          user_id: mockAdminUser.uid,
          email: mockAdminUser.email,
          name: "Super Admin",
          role: mockAdminRole,
          exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
        }));
        const signature = btoa('dummy');
        const adminToken = `${header}.${payload}.${signature}`;
        
        // Need to import storeTokens from utils/auth... wait, we can just save it to localStorage
        localStorage.setItem('authTokens', JSON.stringify({ access: adminToken, refresh: adminToken }));
        
        toast.success("Welcome, Super Admin!");
        window.dispatchEvent(new Event('userStatusChanged'));
        navigate('/admin');
        setIsLoading(false);
        return;
      }

      if (activeTab === 'login') {
        // Login Flow
        await loginWithFirebase(formData.email, formData.password);
        toast.success("Welcome back to ANT!");
        
        // Force dispatch to update layout
        window.dispatchEvent(new Event('userStatusChanged'));

        // Redirect logic
        const origin = location.state?.from?.pathname || '/';
        navigate(origin);

      } else {
        // Register Flow
        const res = await registerWithFirebase(formData.email, formData.password, formData.role, formData.fullName);
        if (res.requireVerification) {
          setSuccessMessage("Registration successful! We've sent a verification link to your email. Please verify your email before logging in.");
          setActiveTab('login'); // Switch to login tab but show success message
        }
      }
      
    } catch (err) {
      console.error(err);
      const errMsg = err.message || "An error occurred during authentication.";
      setError(errMsg);
      
      // Check if error is related to email verification
      if (errMsg.includes("verify your email")) {
        setNeedsVerification(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setIsLoading(true);
    setError('');
    try {
      await resendVerificationEmail(formData.email, formData.password);
      toast.success("Verification email resent! Please check your inbox (and spam folder).");
      setNeedsVerification(false);
    } catch (err) {
      setError(err.message || "Failed to resend verification email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#09090b] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0c0d10] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl relative">
        
        {/* Top Decorative Gradients */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none"></div>

        <div className="p-8 relative z-10">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-sm text-zinc-400">
              {activeTab === 'login' ? 'Enter your details to access your account' : 'Join ANT to start buying or selling'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex bg-[#111216] border border-zinc-800 p-1 rounded-xl mb-8">
            <button
              onClick={() => { setActiveTab('login'); setError(''); setSuccessMessage(''); }}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'login' 
                  ? 'bg-zinc-800 text-white shadow-sm' 
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setActiveTab('register'); setError(''); setSuccessMessage(''); }}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'register' 
                  ? 'bg-zinc-800 text-white shadow-sm' 
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Register
            </button>
          </div>

          {/* Success Message (e.g. after Registration) */}
          {successMessage && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-sm text-emerald-400">{successMessage}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <p className="text-sm text-rose-400">{error}</p>
              </div>
              
              {needsVerification && (
                <button 
                  onClick={handleResendVerification}
                  disabled={isLoading}
                  className="mt-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 text-xs font-medium py-2 px-4 rounded-lg self-start flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Resend Verification Email
                </button>
              )}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-5">
            
            {activeTab === 'register' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="e.g. John Doe"
                      className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">I want to register as a</label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className={`flex flex-col items-center justify-center p-4 rounded-xl border cursor-pointer transition-colors ${formData.role === 'customer' ? 'bg-indigo-500/10 border-indigo-500' : 'bg-[#0a0a0c] border-zinc-800 hover:border-zinc-700'}`}>
                      <input type="radio" name="role" value="customer" checked={formData.role === 'customer'} onChange={handleChange} className="hidden" />
                      <UserIcon className={`w-6 h-6 mb-2 ${formData.role === 'customer' ? 'text-indigo-400' : 'text-zinc-500'}`} />
                      <span className={`text-sm font-medium ${formData.role === 'customer' ? 'text-white' : 'text-zinc-400'}`}>Customer</span>
                    </label>
                    <label className={`flex flex-col items-center justify-center p-4 rounded-xl border cursor-pointer transition-colors ${formData.role === 'shop_owner' ? 'bg-indigo-500/10 border-indigo-500' : 'bg-[#0a0a0c] border-zinc-800 hover:border-zinc-700'}`}>
                      <input type="radio" name="role" value="shop_owner" checked={formData.role === 'shop_owner'} onChange={handleChange} className="hidden" />
                      <Briefcase className={`w-6 h-6 mb-2 ${formData.role === 'shop_owner' ? 'text-indigo-400' : 'text-zinc-500'}`} />
                      <span className={`text-sm font-medium ${formData.role === 'shop_owner' ? 'text-white' : 'text-zinc-400'}`}>Employer</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className={`space-y-5 ${activeTab === 'login' ? 'animate-in fade-in slide-in-from-left-4 duration-300' : ''}`}>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Password</label>
                  {activeTab === 'login' && (
                    <a href="#" className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                      Forgot Password?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                    className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-70 text-white font-medium py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                  Processing...
                </>
              ) : (
                <>
                  {activeTab === 'login' ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                  {activeTab === 'login' ? 'Sign In' : 'Create Account'}
                </>
              )}
            </button>

          </form>
          
        </div>
      </div>
    </div>
  );
}
