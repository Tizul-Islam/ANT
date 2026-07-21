import React from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

export default function SellerListing({ product }) {
  const { addToCart } = useCart();

  // Mock vendors selling this product
  const sellers = [
    {
      id: 1,
      name: "Auto Masters BD",
      rating: 4.8,
      reviews: 120,
      price: product?.price || 0,
      condition: "New",
      warranty: "6 Months",
      shippingTime: "2-3 Days",
      isVerified: true
    },
    {
      id: 2,
      name: "Dhaka Motors",
      rating: 4.5,
      reviews: 85,
      price: (product?.price || 0) * 0.95, // 5% cheaper
      condition: "New",
      warranty: "3 Months",
      shippingTime: "3-5 Days",
      isVerified: true
    },
    {
      id: 3,
      name: "Karim Mechanics",
      rating: 4.2,
      reviews: 32,
      price: (product?.price || 0) * 0.80, // 20% cheaper
      condition: "Refurbished",
      warranty: "No Warranty",
      shippingTime: "1-2 Days",
      isVerified: false
    }
  ];

  const handleAddToCart = (seller) => {
    // We pass the product, but inject the seller's specific price/condition for this cart item
    const cartItemProduct = {
      ...product,
      price: seller.price, 
      condition: seller.condition,
      warranty: seller.warranty
    };
    
    addToCart(cartItemProduct, seller, 1);
    toast.success(`Added to cart from ${seller.name}`);
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Available from 3 Sellers</h3>
      <div className="space-y-4">
        {sellers.map((seller) => (
          <div key={seller.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-xl hover:border-green-500 transition-colors bg-white shadow-sm">
            
            {/* Seller Info */}
            <div className="flex-1 mb-4 sm:mb-0">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-lg text-gray-900">{seller.name}</h4>
                {seller.isVerified && (
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="flex items-center text-sm text-gray-500 mt-1 gap-4">
                <span className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span> {seller.rating} ({seller.reviews})
                </span>
                <span>•</span>
                <span>{seller.condition}</span>
                <span>•</span>
                <span>{seller.shippingTime}</span>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Warranty: <span className="font-medium text-gray-700">{seller.warranty}</span>
              </div>
            </div>

            {/* Price & Action */}
            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 sm:border-l pt-4 sm:pt-0 sm:pl-6 border-gray-100">
              <div className="text-2xl font-bold text-gray-900">৳{seller.price.toLocaleString()}</div>
              <button 
                onClick={() => handleAddToCart(seller)}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm transition-colors"
              >
                Add to Cart
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
