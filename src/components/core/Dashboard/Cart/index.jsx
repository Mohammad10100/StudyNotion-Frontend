import { useSelector } from "react-redux"

import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";



export default function Cart() {

    const {total, totalItems} = useSelector((state)=>state.cart);
    console.log(total);


    return (
        <div className="text-white">
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">Cart</h1>
            <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">{totalItems} Courses in Cart</p>

            {total > 0 
            ? (<div  className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
                <div className="flex flex-1 flex-col">
                <div className="flex w-full flex-wrap items-start justify-between gap-6 border-b border-b-richblack-400 pb-6 false ">
                <RenderCartCourses />
                <RenderTotalAmount />
                </div>
                </div>
            </div>)
            : (<p>Your Cart is Empty</p>)}
        </div>
    )
}