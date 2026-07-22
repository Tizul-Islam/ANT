import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import { ArrowLeft, MapPin, Phone, Calendar, Download, Search, Filter, AlertCircle, Loader2 } from 'lucide-react';
import useTitle from '../utils/useTitle';

export default function ShopDetails() {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  
  useTitle(`Shop Details | ANT`);
  const qrRef = useRef(null);

  const currentUrl = (() => {
    if (typeof window === 'undefined') return '';
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    const search = window.location.search;
    let finalUrl = origin + pathname + search;
    if (!origin.includes('localhost') && !origin.includes('127.0.0.1') && !finalUrl.startsWith('https://')) {
      finalUrl = finalUrl.replace('http://', 'https://');
    }
    return finalUrl;
  })();

  const handleDownloadQR = () => {
    try {
      const container = qrRef.current;
      if (!container) return;
      const canvas = container.querySelector('canvas');
      if (!canvas) return;
      const pngData = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.download = `shop-${id}-qr.png`;
      a.href = pngData;
      a.click();
    } catch (err) {
      console.error('QR download failed', err);
    }
  };

  const fetchShopDetails = useCallback(async () => {
    try {
      setError('');
      const response = await axios.get(`/shops`);
      const shopData = response.data.find(s => String(s.id) === String(id));
      if (!shopData) throw new Error("Shop not found");
      setShop(shopData);
    } catch (error) {
      console.error('Error fetching shop details:', error);
      setError('Failed to load shop details. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchShopProducts = useCallback(async () => {
    try {
      setError('');
      const response = await axios.get(`/products`);
      
      let shopProducts = [];
      let allProducts = [];

      if (response.data && response.data.results) {
        allProducts = response.data.results;
      } else if (Array.isArray(response.data)) {
        allProducts = response.data;
      }

      shopProducts = allProducts.filter(product =>
        product.shop_name === shop?.name || String(product.shop) === String(id)
      );

      setProducts(shopProducts);
      const uniqueCategories = [...new Set(shopProducts.map(product => product.category).filter(Boolean))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching shop products:', error);
      setError('Failed to load shop products. Please try again.');
      setProducts([]);
    } finally {
      setProductsLoading(false);
    }
  }, [id, shop?.name]);

  const filterProducts = useCallback(() => {
    let filtered = products;
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
  };

  useEffect(() => {
    if (id) {
      fetchShopDetails();
    }
  }, [id, fetchShopDetails]);

  useEffect(() => {
    fetchShopProducts();
  }, [fetchShopProducts]);

  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#09090b] flex justify-center items-center">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (error && !shop) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#09090b] flex justify-center items-center">
        <div className="text-center bg-[#0c0d10] border border-zinc-800 rounded-2xl p-8 max-w-md w-full">
          <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-rose-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Error Loading Shop</h3>
          <p className="text-zinc-400 mb-6">{error}</p>
          <Link
            to="/shops"
            className="inline-flex items-center justify-center w-full px-4 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-medium"
          >
            ← Back to Shops
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#09090b] text-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        
        {/* Back Button */}
        <div className="mb-8">
          <Link
            to="/shops"
            className="inline-flex items-center text-zinc-400 hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shops
          </Link>
        </div>

        {/* Shop Details Header */}
        {shop && (
          <div className="bg-[#0c0d10] border border-zinc-800 rounded-2xl p-6 lg:p-10 mb-12">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start justify-between">
              
              <div className="flex flex-col sm:flex-row gap-6 lg:gap-10">
                {/* Shop Image / Logo */}
                <div className="w-32 sm:w-48 h-32 sm:h-48 bg-zinc-900 rounded-2xl flex-shrink-0 relative overflow-hidden group border border-zinc-800">
                  <img
                    src={shop.shop_image || 'https://placehold.co/300x300'}
                    alt={shop.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { e.target.src = 'https://placehold.co/300x300'; }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                    Verified
                  </div>
                </div>
                
                {/* Shop Info */}
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 tracking-tight">{shop.name}</h1>
                    <div className="flex items-center gap-2">
                      <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold">
                        Registered Shop
                      </span>
                      <span className="text-zinc-500 text-sm">Owner: <span className="text-white">{shop.owner_name}</span></span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-zinc-300">Address</p>
                        <p className="text-sm text-zinc-500 mt-0.5">{shop.address}</p>
                      </div>
                    </div>
                    {shop.owner_phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-zinc-500 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-zinc-300">Phone</p>
                          <a href={`tel:${shop.owner_phone}`} className="text-sm text-indigo-400 hover:text-indigo-300 mt-0.5 inline-block">{shop.owner_phone}</a>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-zinc-500 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-zinc-300">Established</p>
                        <p className="text-sm text-zinc-500 mt-0.5">{shop.created_at ? new Date(shop.created_at).toLocaleDateString() : 'Not specified'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="flex flex-col items-center justify-center gap-4 bg-[#09090b] border border-zinc-800 rounded-xl p-6 w-full lg:w-auto">
                <div ref={qrRef} className="p-3 bg-white rounded-xl">
                  <a href={currentUrl} target="_blank" rel="noopener noreferrer" className="block outline-none">
                    <QRCodeCanvas
                      value={currentUrl || 'https://example.com'}
                      size={140}
                      bgColor="#ffffff"
                      fgColor="#000000"
                      level="M"
                      includeMargin={false}
                    />
                  </a>
                </div>
                <div className="text-center space-y-3">
                  <p className="text-[11px] text-zinc-500 tracking-wider uppercase font-medium">Scan to open shop</p>
                  <button
                    onClick={handleDownloadQR}
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 bg-[#111216] hover:bg-[#1a1b20] border border-zinc-800 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Save QR
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Products Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Available Products</h2>
              <p className="text-sm text-zinc-400">
                Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} in this shop
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 bg-[#0c0d10] border border-zinc-800 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full sm:w-48 bg-[#0c0d10] border border-zinc-800 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 appearance-none transition-colors"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 mb-8 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
              <p className="text-rose-400 text-sm">{error}</p>
            </div>
          )}

          {productsLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            </div>
          ) : (
            <>
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="bg-[#0c0d10] border border-zinc-800 rounded-2xl overflow-hidden group hover:border-zinc-700 transition-colors flex flex-col">
                      <div className="aspect-[4/3] bg-zinc-900 relative overflow-hidden">
                        <img
                          src={product.image || 'https://placehold.co/300x300'}
                          alt={product.name}
                          className="w-full h-full object-cover mix-blend-overlay opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                          onError={(e) => { e.target.src = 'https://placehold.co/300x300'; }}
                        />
                        {product.category && (
                          <div className="absolute top-2 left-2">
                            <span className="bg-black/60 backdrop-blur-md text-white border border-white/10 text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded">
                              {product.category}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2 leading-snug">
                          {product.name}
                        </h3>
                        
                        <div className="mt-auto pt-4">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-lg font-bold text-white">
                              ৳{product.price}
                            </span>
                            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-sm ${
                              product.stock && product.stock !== '0'
                                ? 'bg-emerald-500/10 text-emerald-400'
                                : 'bg-rose-500/10 text-rose-400'
                            }`}>
                              {product.stock && product.stock !== '0' ? `Stock: ${product.stock}` : 'Out'}
                            </span>
                          </div>
                          <Link
                            to={`/product/${product.id}`}
                            className="block w-full bg-[#111216] hover:bg-indigo-500 text-zinc-300 hover:text-white border border-zinc-800 hover:border-indigo-500 text-center py-2.5 rounded-lg text-sm font-medium transition-all"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[#0c0d10] border border-dashed border-zinc-800 rounded-2xl py-24 text-center px-4">
                  <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-zinc-600" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">No products found</h3>
                  <p className="text-sm text-zinc-500 max-w-sm mx-auto mb-6">
                    {searchTerm || selectedCategory
                      ? 'Try adjusting your search criteria or clearing filters.'
                      : 'This shop hasn\'t added any products yet.'}
                  </p>
                  {(searchTerm || selectedCategory) && (
                    <button
                      onClick={clearFilters}
                      className="bg-[#111216] border border-zinc-800 hover:border-zinc-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
