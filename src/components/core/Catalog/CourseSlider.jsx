import React from 'react'

import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/autoplay"
import "swiper/css/navigation"
import "swiper/css/scrollbar"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay,FreeMode, Scrollbar,Navigation, Pagination,}  from 'swiper'

import Course_Card from './Course_Card'

const CourseSlider = ({Courses}) => {
  return (
    <>
        {
            Courses?.length ? (
                <Swiper
                modules={[Navigation, Pagination, Scrollbar,Autoplay,FreeMode, ]}
                    slidesPerView={1}
                    loop={true}
                    spaceBetween={25}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}              
                    autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                    }}
                    breakpoints={{
                        1024:{slidesPerView:3}
                    }}
                >
                    {
                        Courses?.map((course, index)=> (
                            <SwiperSlide key={index} className=' mx-12 md:w-full lg:w-1/3 ' >
                                <Course_Card course={course} Height={"h-[250px]"} />
                            </SwiperSlide>
                        ))
                    }   
                </Swiper>
            ) : (
                <p className='text-xl text-richblack-5'>No Course Found</p>

            )

        }
    </>
  )
}

export default CourseSlider
