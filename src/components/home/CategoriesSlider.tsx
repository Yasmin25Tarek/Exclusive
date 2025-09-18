"use client"
import { ICategory } from '@/interfaces/category.interface'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';

export default function CategoriesSlider({ categories }: { categories: ICategory[] }) {
    return (
        <section className='container mx-auto pb-12'>
            <Swiper
                scrollbar={{
                    hide: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 50,
                    },
                }}
                modules={[Scrollbar, Autoplay]}

                className="mySwiper"
            >
                {categories && categories.map((category) => (
                    <SwiperSlide key={category._id}>
                        <Link href={`/categories/${category._id}`}>
                        <Image src={category.image} alt={category.name}
                            width={1920} height={344} loading='lazy'
                            className='w-full h-[15.625rem] object-contain bg-gray-200' />
                        <h3>{category.name}</h3>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}
