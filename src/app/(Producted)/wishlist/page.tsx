"use client"
import React, { useEffect } from 'react'
import WishListItem from './wishlistitem';
import { useWishList } from '@/context/WishListContext';


export default  function WishListPage() {
  const { wishListDetails, getWishListDetails } = useWishList();

  useEffect(() => {
    getWishListDetails(); 
  }, []);


  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">Wish List</h2>

        {wishListDetails? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
              {wishListDetails.data.map((product)=>(
              <WishListItem key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Your wishlist is empty.</p>

        )}
      </div>
    </section>
  )
}
