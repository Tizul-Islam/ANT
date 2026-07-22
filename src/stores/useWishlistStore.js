import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      toggleItem: (product) => {
        const currentItems = get().items;
        const exists = currentItems.find(item => item.id === product.id);
        
        if (exists) {
          set({ items: currentItems.filter(item => item.id !== product.id) });
        } else {
          set({ items: [...currentItems, product] });
        }
      },
      
      removeItem: (productId) => {
        set({ items: get().items.filter(item => item.id !== productId) });
      },

      clearWishlist: () => set({ items: [] }),

      isInWishlist: (productId) => {
        return get().items.some(item => item.id === productId);
      }
    }),
    {
      name: 'ant-wishlist-storage',
    }
  )
);
