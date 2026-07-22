import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';
import Myshop from '../page/Myshop';
import Profile from '../page/Profile';

export default function DashboardRedirect() {
  const user = getCurrentUser();
  
  if (!user) return <Navigate to="/auth" replace />;
  if (user.role === 'admin') return <Navigate to="/dashboard/analytics" replace />;
  if (user.role === 'shop_owner') return <Myshop />;
  
  return <Profile />;
}
