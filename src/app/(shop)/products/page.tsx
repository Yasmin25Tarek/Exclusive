
import React from 'react'
import getProducts from '@/services/product.services';
import { IProduct } from '@/interfaces/product.interface';
import Image from 'next/image';
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button"
import ProductItem from './productitem';


export default async function ProductsPage() {
  const { data: Products }: { data: IProduct[] } = await getProducts();

  return (
    <section className='py-12'>
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center">Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {Products && Products.map((product) => (
          <ProductItem key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
