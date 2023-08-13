import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {GiNinjaStar} from "react-icons/gi"
import {RiDeleteBin6Line} from "react-icons/ri"
import { removeFromCart } from '../../../../slices/cartSlice'
import ReactStars from "react-rating-stars-component";

const RenderCartCourses = () => {

    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    
    
    return (
        <div>
    {
        cart.map((course, index) => (

                    <div className='flex flex-1 flex-col gap-4 xl:flex-row'>
                    <img className='h-[148px] w-[220px] rounded-lg object-cover' alt='course thumnail' src={course?.thumbnail} />
                    
                    <div className='flex flex-col space-y-1'>
                        <p className='text-lg font-medium text-richblack-5'>{course?.courseName}</p>
                        <p className='text-sm text-richblack-300'>{course?.category?.name}</p>
                        <div className='flex items-center gap-2'>
                            <span className='text-yellow-5'>4.8</span>
                            <ReactStars
                                count={5}
                                size={20}
                                edit={false}
                                activeColor="#ffd700"
                                emtpyIcon={<GiNinjaStar />}
                                fullIcon={<GiNinjaStar />}
                            /> 

                            <span className='text-richblack-400'>{course?.ratingAndReviews?.length} Ratings</span>

                        </div>

                </div>

                <div className='flex flex-col items-end space-y-2'>
                    <button className='flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200'
                    onClick={() => dispatch(removeFromCart(course._id))}
                    >
                        <RiDeleteBin6Line/>
                        <span >Remove</span>
                    </button>

                    <p className='mb-6 text-3xl font-medium text-yellow-100'>Rs {course?.price} </p>
                </div>
            </div>
        ))
    }
      
    </div>
  )
}

export default RenderCartCourses
