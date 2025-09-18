import { IProduct } from '@/interfaces/product.interface'
import { getProductsDetails } from '@/services/product.services'
import { RecycleIcon, Star, Truck } from 'lucide-react';
import React from 'react'
import ProductSlider from '../productSlider';

import AddToCartBtn from '../AddToCartBtn';
import AddToWishListBtn from '@/app/(Producted)/wishlist/AddToWishListBtn';


export default async function ProductDetails({params: {productId}}:{params: {productId: string};}){
   const {data: product}: {data: IProduct} = await getProductsDetails(productId);
   
  
  return (
    <section className='py-20'>
         <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <picture className="lg:col-span-2">
                    <ProductSlider images={product.images} />
                </picture>
                <div >
                    <h3 className='text-2xl font-semibold'>{product.title}</h3>
                    <div className="flex items-center gap-x-1 py-4">
                        <Star className='text-yellow-300 fill-yellow-300' />
                        <span className='text-sm font-semibold text-gray-600 '>{product.ratingsAverage}</span>
                    </div>
                    <span className='text-2xl font-semibold'>{product.price} EGP</span>
                    <p className='text-sm py-6 border-b-2 border-black'>{product.description}</p>
                    <div className="flex gap-5 my-10">
                        <AddToCartBtn productId={product._id}  className='grow-1' variant={"destructive"}/>
                        <AddToWishListBtn productId={product._id} variant={"outline"} />
                    </div>
                    <ul className='border-2 border-black divide-y'>
                        <li className='flex items-center gap-4 p-5 border-b-2 border-black'>
                            <Truck size={40}/>
                            <div className="">
                                <h3 className='font-medium'>Free Delivery</h3>
                                <p className='font-medium underline'>Enter your postal code for Delivery Availability</p>
                            </div>
                        </li>
                        <li className='flex items-center gap-4 p-5'>
                            <RecycleIcon size={40}/>
                            <div className="">
                                <h3 className='font-medium'>Return Delivery</h3>
                                <p className='font-medium '>Free 30 Days Delivery Returns. <span className='underline'>Details</span></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div> 

    </section>
  )
}

