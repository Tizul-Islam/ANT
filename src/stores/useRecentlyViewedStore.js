import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useRecentlyViewedStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addViewedItem: (product) => {
        const currentItems = get().items;
        // Remove it if it already exists so we can push it to the top
        const filtered = currentItems.filter(item => item.id !== product.id);
        
        // Add to front, keep max 10 items
        const newItems = [product, ...filtered].slice(0, 10);
        
        set({ items: newItems });
      },

      clearRecentlyViewed: () => set({ items: [] }),
    }),
    {
      name: 'ant-recently-viewed',
    }
  )
);
