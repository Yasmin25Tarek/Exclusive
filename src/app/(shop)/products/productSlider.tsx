"use client"
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

import type { Swiper as SwiperType } from 'swiper';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export default function ProductSlider({ images }: { images: string[] }) {
const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    return (
        <div className='flex'>
            <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2 lg:col-span-2 order-2 "
            >
                {images.map((img, idx) => (
                    <SwiperSlide key={idx}>
                        <Image src={img} alt={`${img}-${idx}`}
                            width={500} height={500} loading='lazy'
                            className=' h-[37.5rem] object-contain' />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                direction={'vertical'}
                spaceBetween={10}
                slidesPerView={4}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper h-96 gap-3 shrink-0"
            >
                {images.map((img, idx) => (
                    <SwiperSlide key={idx} className='gap-3'>
                        <Image src={img} alt={`${img}-${idx}`}
                            width={170} height={138} loading='lazy'
                            className=' h-[8.625rem] object-contain' />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
