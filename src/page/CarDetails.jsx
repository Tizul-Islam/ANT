import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Heart, Calendar, Settings, Fuel, Gauge, CheckCircle2, MessageSquare, ShieldCheck } from 'lucide-react';
import useTitle from '../utils/useTitle';
import { toast } from 'react-toastify';

const mockCar = {
  id: 'car-1',
  make: 'Toyota',
  model: 'Corolla Cross',
  year: 2024,
  price: 4500000,
  type: 'SUV',
  fuel: 'Hybrid',
  transmission: 'Automatic',
  mileage: '0 km',
  engine: '1.8L 4-Cylinder',
  exteriorColor: 'Pearl White',
  interiorColor: 'Black Leather',
  description: 'The Toyota Corolla Cross brings a new level of versatility to the legendary Corolla name. With its spacious interior, advanced safety features, and efficient hybrid powertrain, it is the perfect vehicle for both city commuting and weekend adventures.',
  images: [
    'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&q=80&w=1200'
  ],
  rating: 4.8,
  reviews: [
    { id: 1, user: 'John Doe', rating: 5, date: '2 days ago', text: 'Amazing driving experience. The hybrid system is incredibly smooth and fuel-efficient.' },
    { id: 2, user: 'Sarah Smith', rating: 4, date: '1 week ago', text: 'Great family car. Lots of cargo space, but the infotainment system could be a bit more responsive.' }
  ]
};

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  useTitle(`${mockCar.make} ${mockCar.model} | ANT`);

  const [activeImage, setActiveImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  // Booking Form State
  const [bookingDate, setBookingDate] = useState('');
  const [bookingType, setBookingType] = useState('test_drive'); // or 'purchase'

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      toast.success('Added to Wishlist!');
    } else {
      toast.info('Removed from Wishlist.');
    }
  };

  const handleBookSubmit = (e) => {
    e.preventDefault();
    if (!bookingDate) return toast.error("Please select a date.");
    
    // Process booking (mock)
    setIsBookingModalOpen(false);
    toast.success(`Successfully requested a ${bookingType === 'test_drive' ? 'Test Drive' : 'Purchase consultation'} for ${bookingDate}!`);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#09090b] text-white py-8 lg:py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/cars')}
            className="inline-flex items-center text-zinc-400 hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cars
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left: Gallery & Specs */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Main Gallery */}
            <div className="space-y-4">
              <div className="aspect-[16/9] md:aspect-[21/9] lg:aspect-[16/9] bg-zinc-900 rounded-2xl overflow-hidden relative border border-zinc-800">
                <img 
                  src={mockCar.images[activeImage]} 
                  alt={mockCar.make}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white tracking-wider uppercase">Verified Vehicle</span>
                </div>
              </div>
              
              {/* Thumbnails */}
              <div className="flex gap-4 overflow-x-auto pb-2">
                {mockCar.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-24 h-16 md:w-32 md:h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-zinc-800 opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Overview & Description */}
            <div className="bg-[#0c0d10] border border-zinc-800 rounded-2xl p-6 lg:p-8">
              <h2 className="text-xl font-bold text-white mb-4">Overview</h2>
              <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                {mockCar.description}
              </p>
            </div>

            {/* Specifications */}
            <div className="bg-[#0c0d10] border border-zinc-800 rounded-2xl p-6 lg:p-8">
              <h2 className="text-xl font-bold text-white mb-6">Specifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-zinc-500 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs uppercase font-semibold tracking-wider">Year</span>
                  </div>
                  <p className="font-bold text-white">{mockCar.year}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-zinc-500 mb-1">
                    <Settings className="w-4 h-4" />
                    <span className="text-xs uppercase font-semibold tracking-wider">Transmission</span>
                  </div>
                  <p className="font-bold text-white">{mockCar.transmission}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-zinc-500 mb-1">
                    <Fuel className="w-4 h-4" />
                    <span className="text-xs uppercase font-semibold tracking-wider">Fuel Type</span>
                  </div>
                  <p className="font-bold text-white">{mockCar.fuel}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-zinc-500 mb-1">
                    <Gauge className="w-4 h-4" />
                    <span className="text-xs uppercase font-semibold tracking-wider">Mileage</span>
                  </div>
                  <p className="font-bold text-white">{mockCar.mileage}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs uppercase font-semibold text-zinc-500 tracking-wider mb-1">Engine</p>
                  <p className="font-medium text-white text-sm">{mockCar.engine}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs uppercase font-semibold text-zinc-500 tracking-wider mb-1">Body Type</p>
                  <p className="font-medium text-white text-sm">{mockCar.type}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs uppercase font-semibold text-zinc-500 tracking-wider mb-1">Ext. Color</p>
                  <p className="font-medium text-white text-sm">{mockCar.exteriorColor}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs uppercase font-semibold text-zinc-500 tracking-wider mb-1">Int. Color</p>
                  <p className="font-medium text-white text-sm">{mockCar.interiorColor}</p>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-[#0c0d10] border border-zinc-800 rounded-2xl p-6 lg:p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-indigo-400" />
                  Customer Reviews
                </h2>
                <div className="flex items-center gap-2 bg-[#111216] px-4 py-2 rounded-lg border border-zinc-800">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-white">{mockCar.rating}</span>
                  <span className="text-zinc-500 text-sm">({mockCar.reviews.length} reviews)</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {mockCar.reviews.map(review => (
                  <div key={review.id} className="border-b border-zinc-800 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400 font-bold border border-indigo-500/20">
                          {review.user.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-white text-sm">{review.user}</p>
                          <p className="text-xs text-zinc-500">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-700 fill-zinc-700'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-zinc-400 text-sm pl-13 mt-3">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Booking Widget */}
          <div className="w-full">
            <div className="bg-[#0c0d10] border border-zinc-800 rounded-2xl p-6 lg:p-8 sticky top-24">
              
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-1">{mockCar.make} {mockCar.model}</h1>
                  <p className="text-zinc-400 text-sm">{mockCar.year} • {mockCar.type}</p>
                </div>
                <button 
                  onClick={handleWishlist}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${isWishlisted ? 'bg-rose-500/10 border-rose-500/30 text-rose-500' : 'bg-[#111216] border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'}`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              <div className="mt-8 mb-8">
                <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-1">Asking Price</p>
                <div className="text-4xl font-bold text-indigo-400 tracking-tight">
                  <span className="text-2xl mr-1">৳</span>
                  {mockCar.price.toLocaleString()}
                </div>
                <p className="text-xs text-zinc-500 mt-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Price is negotiable directly with seller
                </p>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]"
                >
                  Book this Car
                </button>
                <button className="w-full bg-[#111216] hover:bg-zinc-800 border border-zinc-800 text-white font-medium py-3.5 rounded-xl transition-colors">
                  Contact Seller
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center">
                    <img src="https://placehold.co/100x100" alt="Dealer" className="w-full h-full rounded-full opacity-80" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400">Sold by</p>
                    <p className="font-bold text-white text-sm">ANT Verified Dealership</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Booking Modal Overlay */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0c0d10] border border-zinc-800 rounded-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Book Vehicle</h2>
              <button onClick={() => setIsBookingModalOpen(false)} className="text-zinc-500 hover:text-white">
                ✕
              </button>
            </div>
            
            <form onSubmit={handleBookSubmit} className="p-6 space-y-6">
              
              <div className="space-y-4">
                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${bookingType === 'test_drive' ? 'bg-indigo-500/10 border-indigo-500' : 'bg-[#0a0a0c] border-zinc-800 hover:border-zinc-700'}`}>
                  <input type="radio" checked={bookingType === 'test_drive'} onChange={() => setBookingType('test_drive')} className="hidden" />
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${bookingType === 'test_drive' ? 'border-indigo-500' : 'border-zinc-600'}`}>
                    {bookingType === 'test_drive' && <div className="w-3 h-3 bg-indigo-500 rounded-full" />}
                  </div>
                  <div>
                    <h3 className="font-medium text-white text-sm">Test Drive</h3>
                    <p className="text-xs text-zinc-500">Book a date to test drive</p>
                  </div>
                </label>
                
                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${bookingType === 'purchase' ? 'bg-indigo-500/10 border-indigo-500' : 'bg-[#0a0a0c] border-zinc-800 hover:border-zinc-700'}`}>
                  <input type="radio" checked={bookingType === 'purchase'} onChange={() => setBookingType('purchase')} className="hidden" />
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${bookingType === 'purchase' ? 'border-indigo-500' : 'border-zinc-600'}`}>
                    {bookingType === 'purchase' && <div className="w-3 h-3 bg-indigo-500 rounded-full" />}
                  </div>
                  <div>
                    <h3 className="font-medium text-white text-sm">Purchase Consultation</h3>
                    <p className="text-xs text-zinc-500">Meet to discuss purchase options</p>
                  </div>
                </label>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Select Date & Time</label>
                <input 
                  type="datetime-local" 
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full bg-[#0a0a0c] border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 [color-scheme:dark]"
                  required
                />
              </div>

              <div className="pt-4 border-t border-zinc-800 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
                  className="flex-1 px-4 py-3 bg-[#111216] border border-zinc-800 hover:bg-zinc-800 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Confirm Booking
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
