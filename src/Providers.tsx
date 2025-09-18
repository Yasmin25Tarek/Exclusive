"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { CartContextProvider } from './context/CartContext'
import WishListContextProvider from './context/WishListContext'

export default function Providers({children}:{children: React.ReactNode}) {
  return <>
  <SessionProvider>
    <WishListContextProvider>
    <CartContextProvider>
   {children}
    </CartContextProvider>
    </WishListContextProvider>
   </SessionProvider>
  </>
}
