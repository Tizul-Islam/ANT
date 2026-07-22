import React, { useState } from 'react';
import useTitle from '../../utils/useTitle';
import { Star, MessageCircle, Reply, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';

const mockReviews = [
  {
    id: 'r-1',
    customerName: 'Arafat Rahman',
    carName: 'Toyota Corolla Cross 2024',
    rating: 5,
    comment: 'Amazing car, the condition was exactly as described. The dealership was very cooperative during the test drive.',
    date: '2024-11-20',
    reply: null,
  },
  {
    id: 'r-2',
    customerName: 'Samira Islam',
    carName: 'Hyundai Tucson 2024',
    rating: 4,
    comment: 'Great vehicle, but the delivery took a bit longer than expected. Overall satisfied with the purchase.',
    date: '2024-11-18',
    reply: 'We apologize for the delay, Samira. Thank you for your feedback and we hope you enjoy your new ride!',
  }
];

export default function EmployerReviews() {
  useTitle("Reviews | Employer Dashboard");
  const [reviews, setReviews] = useState(mockReviews);
  const [replyText, setReplyText] = useState({});
  const [activeReply, setActiveReply] = useState(null);

  const handleReplySubmit = (id) => {
    if (!replyText[id]) return;
    setReviews(reviews.map(r => r.id === id ? { ...r, reply: replyText[id] } : r));
    setActiveReply(null);
    toast.success("Reply posted successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Customer Reviews</h1>
          <p className="text-sm text-zinc-400">View and respond to feedback from your customers.</p>
        </div>
        <div className="flex items-center gap-4 bg-[#111216] border border-zinc-800 rounded-xl px-4 py-2">
          <div className="flex items-center gap-1 text-amber-400">
            <Star className="w-5 h-5 fill-current" />
            <span className="font-bold">4.5</span>
          </div>
          <span className="text-sm text-zinc-500 border-l border-zinc-800 pl-4">Overall Rating</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reviews.map(review => (
          <div key={review.id} className="bg-[#0c0d10]/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 flex flex-col hover:border-zinc-700 transition-colors">
            
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{review.customerName}</h3>
                <p className="text-sm text-indigo-400 font-medium">{review.carName}</p>
              </div>
              <span className="text-sm text-zinc-500">{review.date}</span>
            </div>

            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-amber-400 fill-current' : 'text-zinc-700'}`} />
              ))}
            </div>

            <p className="text-zinc-300 text-sm leading-relaxed mb-6">"{review.comment}"</p>

            {review.reply ? (
              <div className="mt-auto bg-[#111216] border border-indigo-500/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Reply className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Your Reply</span>
                </div>
                <p className="text-sm text-zinc-400">{review.reply}</p>
              </div>
            ) : (
              <div className="mt-auto">
                {activeReply === review.id ? (
                  <div className="space-y-3">
                    <textarea 
                      autoFocus
                      rows="3" 
                      placeholder="Write your response..."
                      value={replyText[review.id] || ''}
                      onChange={(e) => setReplyText({...replyText, [review.id]: e.target.value})}
                      className="w-full bg-[#111216] border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none text-sm"
                    ></textarea>
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setActiveReply(null)} className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white transition-colors">Cancel</button>
                      <button onClick={() => handleReplySubmit(review.id)} className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">Post Reply</button>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => setActiveReply(review.id)}
                    className="flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Write a reply
                  </button>
                )}
              </div>
            )}
            
          </div>
        ))}
      </div>
    </div>
  );
}
