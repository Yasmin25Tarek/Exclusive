import { ICategory } from '@/interfaces/category.interface';
import getCategories from '@/services/categories.services';
import React from 'react'
import CategoriesSlider from './CategoriesSlider';
import SectionTitle from '../shared/SectionTitle';
import { Separator } from '../ui/separator';

export default async function CategoriesSection() {
    const {data: categories}:{data: ICategory[]} = await getCategories();
    
  return (
    <section className='py-12'>
        <div className="container mx-auto">
          <SectionTitle title={'Today’s'} subtitle={"Flash Sales"} />
            <CategoriesSlider categories={categories}/>
            <Separator />
        </div>
    </section>
  )
}
