import React from 'react'
import Image from 'next/image';
import { Star } from "lucide-react";
import Link from 'next/link';

import { IBrand } from '@/interfaces/brand.interface';


export default function BrandItem({ brand }: { brand: IBrand }) {
  return (
    <div>
      <picture >
        <Link href={`/brands/${brand._id}`}>
          <Image src={brand.image} alt={brand.slug}
          width={1920} height={344} loading='lazy'
          className=' border-4 border-black rounded ' />
        </Link>
      </picture>
      <div className="flex justify-between ">
        <h3 className='font-medium mt-2 line-clamp-1 hover:text-red-500'>{brand.name}</h3>
        </div>
      </div>
  )
}
