import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ShoppingCart, Wallet, Award, Car } from 'lucide-react';
import useTitle from '../utils/useTitle';
import dashboardData from '../data/mock/dashboard.json';
import { getCurrentUser } from '../utils/auth';

export default function Profile() {
  useTitle("Customer Dashboard | ANT Enterprise");
  const [data, setData] = useState(null);
  const user = getCurrentUser();

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setData(dashboardData.customer_dashboard);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  const { overview, recentOrders } = data;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name || 'User'}!</h1>
          <p className="text-gray-500 mt-1">Here is what's happening with your account.</p>
        </div>
        <Badge variant="warning" className="px-3 py-1 hidden sm:inline-flex">Mock Data Mode</Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{overview.totalOrders}</h3>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <ShoppingCart className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Wallet Balance</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">৳{overview.walletBalance.toLocaleString()}</h3>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <Wallet className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Reward Points</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{overview.rewardPoints}</h3>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                <Award className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Saved Vehicles</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{overview.savedVehicles}</h3>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                <Car className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Recent Orders Tracking Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Track your active and recent shipments.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentOrders.map((order) => (
                <div key={order.id} className="border border-gray-100 rounded-lg p-4 bg-gray-50/50">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 pb-4 border-b border-gray-100 gap-2">
                    <div>
                      <p className="font-semibold text-gray-900">Order #{order.id}</p>
                      <p className="text-xs text-gray-500 mt-1">Placed on {order.date} • Sold by <span className="font-medium text-gray-700">{order.shop}</span></p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-bold text-green-600">৳{order.amount.toLocaleString()}</p>
                      <div className="mt-1">
                        <Badge 
                          variant={
                            order.status === 'Delivered' ? 'default' : 
                            order.status === 'Processing' ? 'warning' : 
                            'secondary'
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mock Visual Timeline */}
                  <div className="relative pt-2">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                      <div 
                        style={{ width: order.status === 'Delivered' ? '100%' : order.status === 'Processing' ? '50%' : '10%' }} 
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-500"
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 font-medium">
                      <span className={order.status === 'Delivered' || order.status === 'Processing' ? 'text-green-600' : ''}>Placed</span>
                      <span className={order.status === 'Delivered' || order.status === 'Processing' ? 'text-green-600' : ''}>Processing</span>
                      <span className={order.status === 'Delivered' ? 'text-green-600' : ''}>Shipped</span>
                      <span className={order.status === 'Delivered' ? 'text-green-600' : ''}>Delivered</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
