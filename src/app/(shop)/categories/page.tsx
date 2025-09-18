import { ICategory } from '@/interfaces/category.interface';
import getCategories from '@/services/categories.services';
import React from 'react'
import CategoryItem from './categoryitem';

export default async function CategoriesPage() {
    const { data: category }: { data: ICategory[] } = await getCategories();
  return (
      <section className='py-12'>
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-10">Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
              {category && category.map((category) => (
              <CategoryItem key={category._id} category={category} />
              ))}
            </div>
          </div>
        </section>
  )
}
