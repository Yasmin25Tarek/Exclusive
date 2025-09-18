"use client";

import { ICartResponse } from "@/interfaces/cart.interface";
import { getUserCart } from "@/services/cart.services";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface ICartContext {
  cartDetails: ICartResponse | null;
  setCartDetails: Dispatch<SetStateAction<ICartResponse | null>>;
  getCartDetails: () => Promise<void>;
}

const CartContext = createContext<ICartContext | undefined>(undefined);

export function CartContextProvider({ children }: { children: ReactNode }) {
  const [cartDetails, setCartDetails] = useState<ICartResponse | null>(null);

  async function getCartDetails() {
    try {
      const { data }: { data: ICartResponse | null } = await getUserCart();
      setCartDetails(data);
    } catch (error) {
      console.error("Failed to fetch cart details:", error);
    }
  }

  useEffect(() => {
    getCartDetails();
  }, []);

  return (
    <CartContext.Provider
      value={{ cartDetails, setCartDetails, getCartDetails }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): ICartContext {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart must be used within a CartContextProvider");
  }

  return context;
}
