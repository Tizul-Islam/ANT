import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, ShieldCheck, ChevronRight, Star } from 'lucide-react';
import { apiClient } from '../lib/api/client';
import { useCartStore } from '../stores/useCartStore';
import { useWishlistStore } from '../stores/useWishlistStore';
import { useRecentlyViewedStore } from '../stores/useRecentlyViewedStore';
import { Button } from '../components/ui/Button';
import useTitle from '../utils/useTitle';
import { toast } from 'react-toastify';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const { addToCart } = useCartStore();
  const { toggleItem: toggleWishlist, isInWishlist } = useWishlistStore();
  const { addViewedItem } = useRecentlyViewedStore();

  useTitle(product ? `${product.name} | ANT` : "Loading...");

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get(`/products/${id}`);
        setProduct(res.data);
        addViewedItem(res.data);
      } catch (error) {
        console.error("Error fetching product", error);
        toast.error("Product not found");
        navigate('/product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate, addViewedItem]);

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto animate-pulse flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 h-[500px] bg-gray-200 rounded-2xl"></div>
          <div className="w-full md:w-1/2 space-y-4">
            <div className="h-10 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded w-full mt-8"></div>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-sm text-gray-500 flex items-center gap-2">
          <button onClick={() => navigate('/')} className="hover:text-gray-900">Home</button>
          <ChevronRight className="w-4 h-4" />
          <button onClick={() => navigate('/product')} className="hover:text-gray-900">Marketplace</button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-12 bg-white p-6 lg:p-10 rounded-2xl shadow-sm border border-gray-100">
          
          {/* Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 relative group cursor-zoom-in">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {!product.in_stock && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide shadow-md">
                  Out of Stock
                </div>
              )}
            </div>
            {/* Thumbnails (Mocked for now since API gives 1 image) */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {[1, 2, 3, 4].map(num => (
                <button key={num} className={`w-20 h-20 rounded-xl overflow-hidden border-2 ${num === 1 ? 'border-[var(--color-primary)]' : 'border-gray-200'} shrink-0 opacity-80 hover:opacity-100 transition-opacity`}>
                  <img src={product.image} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="mb-2 text-sm text-[var(--color-primary)] font-bold uppercase tracking-wider">{product.brand}</div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center text-yellow-500">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-bold ml-1 text-gray-900">{product.rating}</span>
                <span className="text-gray-500 ml-1 text-sm underline cursor-pointer">({product.reviews} reviews)</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="text-gray-500 text-sm flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-green-500" /> Genuine Part
              </div>
            </div>

            <div className="text-4xl font-bold text-gray-900 mb-6">
              ৳{product.price.toLocaleString()}
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Premium automotive part designed for optimal performance and longevity. Guaranteed direct fit with your vehicle specifications. Supplied by verified vendor {product.vendor}.
            </p>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden h-12">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 text-gray-600 hover:bg-gray-100 transition-colors h-full"
                >-</button>
                <div className="w-12 text-center font-bold text-gray-900">{quantity}</div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 text-gray-600 hover:bg-gray-100 transition-colors h-full"
                >+</button>
              </div>

              <Button 
                onClick={handleAddToCart}
                disabled={!product.in_stock}
                className="flex-1 h-12 rounded-xl bg-[var(--color-primary)] hover:bg-opacity-90 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-[var(--color-primary)]/20"
              >
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </Button>
            </div>

            <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
              <button 
                onClick={() => toggleWishlist(product)}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl border font-medium transition-all ${isInWishlist(product.id) ? 'border-red-200 bg-red-50 text-red-600' : 'border-gray-300 hover:bg-gray-50 text-gray-700'}`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} /> 
                {isInWishlist(product.id) ? 'Saved' : 'Save to Wishlist'}
              </button>
              <button className="flex items-center justify-center p-3 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabbed Info */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {['description', 'specifications', 'compatibility', 'reviews'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 font-semibold text-sm whitespace-nowrap capitalize transition-colors ${activeTab === tab ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]' : 'text-gray-500 hover:text-gray-900'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="p-8 min-h-[300px]">
            {activeTab === 'description' && (
              <div className="prose max-w-none text-gray-600">
                <p>Ensure your vehicle runs at peak performance with the {product.name}. Engineered by {product.brand}, this part meets or exceeds OEM specifications, offering superior durability and reliability under extreme driving conditions.</p>
                <ul className="mt-4 space-y-2">
                  <li>Direct fit replacement for your original part</li>
                  <li>Manufactured using premium grade materials</li>
                  <li>Rigorous quality control and testing</li>
                  <li>Backed by {product.vendor}'s warranty</li>
                </ul>
              </div>
            )}
            
            {activeTab === 'specifications' && (
              <table className="w-full max-w-2xl text-left border-collapse">
                <tbody>
                  <tr className="border-b border-gray-100">
                    <th className="py-4 text-gray-900 font-semibold w-1/3">Brand</th>
                    <td className="py-4 text-gray-600">{product.brand}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <th className="py-4 text-gray-900 font-semibold">Category</th>
                    <td className="py-4 text-gray-600">{product.category}</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <th className="py-4 text-gray-900 font-semibold">Part Number</th>
                    <td className="py-4 text-gray-600">ANT-{product.id}-OEM</td>
                  </tr>
                  <tr>
                    <th className="py-4 text-gray-900 font-semibold">Warranty</th>
                    <td className="py-4 text-gray-600">1 Year Limited</td>
                  </tr>
                </tbody>
              </table>
            )}

            {activeTab === 'compatibility' && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Confirmed to fit the following vehicles:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {product.compatible_vehicles?.map((v, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <ShieldCheck className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="text-gray-900 font-medium">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="text-5xl font-black text-gray-900 mb-2">{product.rating}</div>
                <div className="flex text-yellow-500 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-6 h-6 fill-current" />)}
                </div>
                <p className="text-gray-500 mb-6">Based on {product.reviews} reviews from verified buyers.</p>
                <Button variant="outline">Write a Review</Button>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Sticky Mobile Add To Cart */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 sm:hidden z-50 flex items-center justify-between shadow-2xl">
        <div>
          <div className="text-xs text-gray-500 font-medium uppercase">{product.brand}</div>
          <div className="text-lg font-bold text-gray-900">৳{product.price.toLocaleString()}</div>
        </div>
        <Button 
          onClick={handleAddToCart}
          disabled={!product.in_stock}
          className="bg-[var(--color-primary)] text-white px-8 rounded-xl shadow-lg"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
