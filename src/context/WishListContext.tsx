"use client"
import { IWishListResponse } from '@/interfaces/wishlist.interface';
import { getUserWishList } from '@/services/wishlist.services';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'

interface IWishListContext {
  wishListDetails: IWishListResponse | null;
  setwishListDetails: Dispatch<SetStateAction<IWishListResponse | null>>;
  getWishListDetails: () => Promise<void>;
}

const wishListContext =  createContext<IWishListContext | undefined>(undefined);

export default function WishListContextProvider({children} : {children: ReactNode}) {
    const [wishListDetails, setwishListDetails] = useState<IWishListResponse | null>(null);
    async function getWishListDetails() {
        try {
            const { data }: { data: IWishListResponse | null } = await getUserWishList();
            setwishListDetails(data);
        } catch (error) {
          console.error("Failed to fetch wish list details:", error);

        }
    }
    useEffect(() => {
    getWishListDetails()
    }, [])
    

  return (
    <wishListContext.Provider value={{wishListDetails, setwishListDetails, getWishListDetails }}>{children}</wishListContext.Provider>
  )
};

export function useWishList():IWishListContext {
  const context =  useContext(wishListContext);
  if(context === undefined){
    throw new Error("use WishList must be used within a WishListContextProvider");
  };
  return context;
}
