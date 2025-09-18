import React from 'react'
import SectionTitle from '../shared/SectionTitle';
import getProducts from '@/services/product.services';
import { IProduct } from '@/interfaces/product.interface';
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import ProductItem from './../../app/(shop)/products/productitem';


export default async function ProductsSection() {
  const { data: Products }: { data: IProduct[] } = await getProducts(8);

  return (
    <section className='py-12'>
      <div className="container mx-auto">
        <SectionTitle title={'This Month'} subtitle={"Best Selling Products"} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {Products && Products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
        <div className="flex justify-center pt-16">
          <Button className='py-4 px-12 rounded-sm bg-main ' variant={'destructive'} asChild>
            <Link href="/products">View All Product</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
