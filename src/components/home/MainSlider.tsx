"use client";
import Image from 'next/image';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'
import slider1 from '@/assests/images/slider-image-1.jpeg'
import slider2 from '@/assests/images/slider-image-2.jpeg'
import slider3 from '@/assests/images/slider-image-3.jpeg'

const SwiperOptions = {
  pagination: {
    clickable: true,
    bulletClass: 'swiper-pagination-bullet !size-4 border-2',
    bulletActiveClass: 'swiper-pagination-bullet-activ !bg-red-700 border-white'
  },
  autoplay:{
          delay: 2500,
          disableOnInteraction: false,
  },
  modules: [Pagination, Autoplay],
}
const images = [
  {
    path: slider1,
    label: 'Slider1',
  },
  {
    path: slider2,
    label: 'Slider2',
  },
  {
    path: slider3,
    label: 'Slider3',
  },
]

export default function MainSlider() {

  return (
    <>
      <section className='py-12'>
        <div className="container m-auto">
          <Swiper {...SwiperOptions}>
            {images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <Image src={img.path} alt={img.label}
                  width={1920} height={344} loading='lazy'
                  className='w-full h-[21.5rem] object-cover' />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  )
}
