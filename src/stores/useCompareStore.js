import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-toastify';

export const useCompareStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      toggleItem: (product) => {
        const currentItems = get().items;
        const exists = currentItems.find(item => item.id === product.id);
        
        if (exists) {
          set({ items: currentItems.filter(item => item.id !== product.id) });
        } else {
          if (currentItems.length >= 4) {
            toast.warning("You can only compare up to 4 items at a time.");
            return;
          }
          set({ items: [...currentItems, product] });
          toast.success("Added to Compare");
        }
      },
      
      removeItem: (productId) => {
        set({ items: get().items.filter(item => item.id !== productId) });
      },

      clearCompare: () => set({ items: [] }),

      isInCompare: (productId) => {
        return get().items.some(item => item.id === productId);
      }
    }),
    {
      name: 'ant-compare-storage',
    }
  )
);
