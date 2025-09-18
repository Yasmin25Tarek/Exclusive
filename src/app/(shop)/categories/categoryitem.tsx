import React from 'react'
import Image from 'next/image';
import { Star } from "lucide-react";
import Link from 'next/link';
import { ICategory } from '@/interfaces/category.interface';
import AddToCartBtn from '../products/AddToCartBtn';


export default function CategoryItem({ category }: { category: ICategory }) {
  return (
    <div>
      <picture >
        <Link href={`/categories/${category._id}`}>
          <Image src={category.image} alt={category.slug}
          width={1920} height={344} loading='lazy'
          className='w-full  object-fill ' />
        </Link>
      </picture>


      <div className="flex justify-between ">
        <h3 className='font-medium mt-2 line-clamp-1 hover:text-red-500'>{category.name}</h3>
        </div>
      </div>
  )
}
