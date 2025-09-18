import React from 'react'
import Image from 'next/image';
import { Star } from "lucide-react";
import { IProduct } from '@/interfaces/product.interface';
import Link from 'next/link';
import AddToCartBtn from './AddToCartBtn';


export default function ProductItem({ product }: { product: IProduct }) {
  return (
    <div>
      <picture >
        <Link href={`/products/${product._id}`}>
          <Image src={product.imageCover} alt={product.title}
          width={1920} height={344} loading='lazy'
          className='w-full  object-fill ' />
        </Link>
      </picture>
      <div className="flex flex-col">
        <AddToCartBtn productId={product._id} />
        <h3 className='font-medium mt-2 line-clamp-1 hover:text-red-500'>
        <Link href={`/products/${product._id}`}>
        {product.title}
        </Link>
        </h3>
      </div>

      <div className="flex justify-between ">
        <span className='text-main'>${product.price}</span>
        <div className="flex items-center gap-1 me-3">
          <Star className='text-yellow-300 fill-yellow-300' />
          <span>{product.ratingsAverage}</span>
        </div>
      </div>
    </div>
  )
}
