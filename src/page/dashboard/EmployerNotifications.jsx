import React, { useState } from 'react';
import useTitle from '../../utils/useTitle';
import { Bell, CalendarCheck, CheckCircle2, XCircle, Star, Sparkles } from 'lucide-react';
import { toast } from 'react-toastify';

const mockNotifications = [
  {
    id: 'n-1',
    type: 'booking_new',
    title: 'New Booking Request',
    message: 'John Doe requested a test drive for Toyota Corolla Cross.',
    time: '10 mins ago',
    isRead: false,
  },
  {
    id: 'n-2',
    type: 'car_approved',
    title: 'Car Approved',
    message: 'Your listing for Hyundai Tucson has been approved by admin.',
    time: '2 hours ago',
    isRead: false,
  },
  {
    id: 'n-3',
    type: 'review_new',
    title: 'New 5-Star Review',
    message: 'Arafat Rahman left a review on your Nissan X-Trail.',
    time: '1 day ago',
    isRead: true,
  },
  {
    id: 'n-4',
    type: 'car_rejected',
    title: 'Action Required: Car Rejected',
    message: 'Your listing for Honda Civic was rejected. Please update images.',
    time: '2 days ago',
    isRead: true,
  },
  {
    id: 'n-5',
    type: 'car_featured',
    title: 'Congratulations!',
    message: 'Your Toyota Corolla Cross is now a Featured listing.',
    time: '3 days ago',
    isRead: true,
  }
];

export default function EmployerNotifications() {
  useTitle("Notifications | Employer Dashboard");
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    toast.success("All notifications marked as read");
  };

  const getIcon = (type) => {
    switch (type) {
      case 'booking_new': return <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0"><CalendarCheck className="w-5 h-5" /></div>;
      case 'car_approved': return <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0"><CheckCircle2 className="w-5 h-5" /></div>;
      case 'car_rejected': return <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-400 shrink-0"><XCircle className="w-5 h-5" /></div>;
      case 'review_new': return <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0"><Star className="w-5 h-5" /></div>;
      case 'car_featured': return <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0"><Sparkles className="w-5 h-5" /></div>;
      default: return <div className="w-10 h-10 rounded-full bg-zinc-500/10 flex items-center justify-center text-zinc-400 shrink-0"><Bell className="w-5 h-5" /></div>;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
            Notifications
            {unreadCount > 0 && (
              <span className="bg-indigo-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                {unreadCount} New
              </span>
            )}
          </h1>
          <p className="text-sm text-zinc-400">Stay updated with your dealership activities.</p>
        </div>
        {unreadCount > 0 && (
          <button 
            onClick={markAllAsRead}
            className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="bg-[#0c0d10]/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl overflow-hidden">
        {notifications.length > 0 ? (
          <div className="divide-y divide-zinc-800/50">
            {notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`p-4 sm:p-6 flex items-start gap-4 transition-colors hover:bg-zinc-800/20 ${!notification.isRead ? 'bg-indigo-500/5' : ''}`}
              >
                {getIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className={`text-sm sm:text-base font-semibold ${!notification.isRead ? 'text-white' : 'text-zinc-300'}`}>
                      {notification.title}
                    </h4>
                    <span className="text-xs text-zinc-500 whitespace-nowrap shrink-0">{notification.time}</span>
                  </div>
                  <p className={`text-sm ${!notification.isRead ? 'text-zinc-300' : 'text-zinc-500'}`}>
                    {notification.message}
                  </p>
                </div>
                {!notification.isRead && (
                  <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0 mt-2"></div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mb-4">
              <Bell className="w-8 h-8 text-zinc-600" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">No notifications yet</h3>
            <p className="text-sm text-zinc-500">We'll notify you when something important happens.</p>
          </div>
        )}
      </div>
    </div>
  );
}
