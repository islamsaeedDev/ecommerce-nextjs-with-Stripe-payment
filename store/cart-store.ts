import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getCartItemsQuanitiy: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item: CartItem) => {
        const existingitem = get().items.find((i) => i.id === item.id);
        if (existingitem) {
          set({
            items: get().items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({
            items: [...get().items, item],
          });
        }
      },
      removeItem: (id: string) => {
        set((state) => {
          return {
            items: state.items
              .map((i) =>
                i.id === id ? { ...i, quantity: i.quantity - 1 } : i
              )
              .filter((i) => i.quantity > 0),
          };
        });
      },
      clearCart: () => {
        set(() => ({
          items: [],
        }));
      },
      getCartItemsQuanitiy: () => {
        return get().items?.reduce((accu, item) => accu + item?.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
