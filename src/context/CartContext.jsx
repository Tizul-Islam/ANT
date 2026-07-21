import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    // Load from local storage on mount
    const saved = localStorage.getItem('ant_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    // Save to local storage whenever cart changes
    localStorage.setItem('ant_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, vendor, quantity = 1) => {
    setCartItems(prev => {
      // Check if exact product from exact vendor is already in cart
      const existingItem = prev.find(
        item => item.product.id === product.id && item.vendor.id === vendor.id
      );

      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id && item.vendor.id === vendor.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { product, vendor, quantity }];
    });
    setIsCartOpen(true); // Open drawer on add
  };

  const updateQuantity = (productId, vendorId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId && item.vendor.id === vendorId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId, vendorId) => {
    setCartItems(prev =>
      prev.filter(item => !(item.product.id === productId && item.vendor.id === vendorId))
    );
  };

  const clearCart = () => setCartItems([]);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  
  const openCart = () => setIsCartOpen(true);
  
  const closeCart = () => setIsCartOpen(false);

  // Group items by vendor for checkout
  const getGroupedCart = () => {
    return cartItems.reduce((acc, item) => {
      const vId = item.vendor.id;
      if (!acc[vId]) {
        acc[vId] = {
          vendor: item.vendor,
          items: [],
          subtotal: 0
        };
      }
      acc[vId].items.push(item);
      acc[vId].subtotal += item.product.price * item.quantity; // Assuming price is numeric
      return acc;
    }, {});
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      toggleCart,
      openCart,
      closeCart,
      getGroupedCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
