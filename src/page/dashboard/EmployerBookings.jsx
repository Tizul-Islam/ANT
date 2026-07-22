import React, { useState } from 'react';
import useTitle from '../../utils/useTitle';
import { CalendarCheck, Check, X, CheckCircle2, Clock } from 'lucide-react';
import { toast } from 'react-toastify';

const mockBookings = [
  {
    id: 'b-1',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    carName: 'Toyota Corolla Cross 2024',
    bookingDate: '2024-11-20',
    status: 'Pending',
    price: 4500000,
  },
  {
    id: 'b-2',
    customerName: 'Sarah Smith',
    customerEmail: 'sarah@example.com',
    carName: 'Hyundai Tucson 2024',
    bookingDate: '2024-11-18',
    status: 'Accepted',
    price: 5200000,
  },
  {
    id: 'b-3',
    customerName: 'Mike Johnson',
    customerEmail: 'mike@example.com',
    carName: 'Nissan X-Trail 2022',
    bookingDate: '2024-11-15',
    status: 'Completed',
    price: 4100000,
  }
];

export default function EmployerBookings() {
  useTitle("Bookings | Employer Dashboard");
  const [bookings, setBookings] = useState(mockBookings);

  const handleStatusChange = (id, newStatus) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
    toast.success(`Booking marked as ${newStatus}`);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Pending': return <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</span>;
      case 'Accepted': return <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1"><Check className="w-3 h-3" /> Accepted</span>;
      case 'Completed': return <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Completed</span>;
      case 'Rejected': return <span className="bg-rose-500/10 text-rose-500 border border-rose-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1"><X className="w-3 h-3" /> Rejected</span>;
      default: return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Booking Requests</h1>
          <p className="text-sm text-zinc-400">Manage test drive and purchase bookings for your cars.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map(booking => (
          <div key={booking.id} className="bg-[#0c0d10]/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 flex flex-col hover:border-zinc-700 transition-colors">
            
            <div className="flex items-start justify-between mb-4">
              {getStatusBadge(booking.status)}
              <span className="text-sm font-medium text-zinc-500">{booking.bookingDate}</span>
            </div>

            <h3 className="text-lg font-bold text-white mb-1">{booking.carName}</h3>
            <p className="text-indigo-400 font-bold mb-4">৳ {booking.price.toLocaleString()}</p>

            <div className="bg-[#111216] rounded-xl p-4 mb-6 border border-zinc-800/50">
              <p className="text-sm font-medium text-white mb-1">{booking.customerName}</p>
              <p className="text-sm text-zinc-400">{booking.customerEmail}</p>
            </div>

            <div className="mt-auto pt-4 border-t border-zinc-800 flex gap-2">
              {booking.status === 'Pending' && (
                <>
                  <button onClick={() => handleStatusChange(booking.id, 'Accepted')} className="flex-1 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 py-2 rounded-lg text-sm font-medium transition-colors">Accept</button>
                  <button onClick={() => handleStatusChange(booking.id, 'Rejected')} className="flex-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 py-2 rounded-lg text-sm font-medium transition-colors">Reject</button>
                </>
              )}
              {booking.status === 'Accepted' && (
                <button onClick={() => handleStatusChange(booking.id, 'Completed')} className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 py-2 rounded-lg text-sm font-medium transition-colors">Mark as Completed</button>
              )}
              {(booking.status === 'Completed' || booking.status === 'Rejected') && (
                <div className="w-full text-center py-2 text-sm font-medium text-zinc-500 bg-[#111216] rounded-lg border border-zinc-800">
                  No further actions available
                </div>
              )}
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
