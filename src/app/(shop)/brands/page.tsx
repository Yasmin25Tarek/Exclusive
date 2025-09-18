import { IBrand } from '@/interfaces/brand.interface';
import getbrands from '@/services/brands.services';
import React from 'react'
import BrandItem from './branditem';

export default async function brandsPage() {
   const { data: brand }: { data: IBrand[] } = await getbrands();

   return (
        <section className='py-12'>
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-center mb-10">Brands</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                {brand && brand.map((brand) => (
                <BrandItem key={brand._id} brand={brand} />
                ))}
              </div>
            </div>
          </section>
    )

}
