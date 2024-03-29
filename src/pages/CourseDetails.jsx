import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import GetAvgRating from '../utils/avgRating';
import Error from "./Error"
import ConfirmationModal from "../components/common/ConfirmationModal"
import RatingStars from "../components/common/RatingStars"
import Footer from "../components/common/Footer"
import { formatDate } from '../services/formatDate';
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';

const CourseDetails = () => {

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { loading } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId } = useParams();

    const [courseData, setCourseData] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);
    useEffect(() => {
        const getCourseFullDetails = async () => {
            try {
                const result = await fetchCourseDetails(courseId);
                console.log("Printing CourseData-> ", result);
                setCourseData(result);
            }
            catch (error) {
                console.log("Could not fetch coursse details");
            }
        }
        getCourseFullDetails();

    }, [courseId]);

    const [avgReviewCount, setAverageReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(courseData?.data?.courseDetails.ratingAndReviews);
        setAverageReviewCount(count);
    }, [courseData])

    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
    useEffect(() => {
        let lectures = 0;
        courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length || 0
        })
        setTotalNoOfLectures(lectures);

    }, [courseData]);


    const [isActive, setIsActive] = useState(Array(0));
    const handleActive = (id) => {
        setIsActive(
            !isActive.includes(id)
                ? isActive.concat(id)
                : isActive.filter((e) => e !== id)

        )
    }

    const handleBuyCourse = () => {

        if (token) {
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }
        setConfirmationModal({
            text1: "you are not Logged in",
            text2: "Please login to purchase the course",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })

    }

    if (loading || !courseData) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    if (!courseData.success) {
        return (
            <div>
                <Error />
            </div>
        )
    }
    const {
        _id: course_id,
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        createdAt,
    } = courseData.data?.courseDetails;

    return (
        <div className='bg-richblack-900'>
            <div className='relative w-full bg-richblack-800'>
                <div className='mx-auto box-content px-4 lg:w-[1260px] 2xl:relative '>
                    <div className='mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]'>
                        <div class="relative max-h-[30rem] hidden">
                            <div class="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
                            <img src={courseData?.data?.courseDetails.thumbnail} alt="course thumbnail" class="aspect-auto w-full" />
                        </div>
                        <div className='z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5'>

                            <div>
                                <p className='text-4xl font-bold text-richblack-5 sm:text-[42px]'>{courseName}</p>
                            </div>
                            <p className='text-richblack-200'>{courseDescription}</p>
                            <div className='text-md flex flex-wrap items-center gap-2'>
                                <span className='text-yellow-25'>{avgReviewCount}</span>
                                <div className='flex gap-1 text-yellow-100'>
                                    <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                                </div>
                                <span>{`(${ratingAndReviews.length} reviews) `}</span>
                                <span>{`(${studentsEnrolled.length} students enrolled)`}</span>
                            </div>

                            <div>
                                <p>Created By {`${instructor.firstName} ${instructor.lastName}`} </p>
                            </div>

                            <div className='flex flex-wrap gap-5 text-lg'>
                                <p className='flex items-center gap-2'>
                                <BiInfoCircle /> Created At {formatDate(createdAt)}
                                </p>
                                <p className='flex items-center gap-2'>
                                    {" "} 
                                    <HiOutlineGlobeAlt />English
                                </p>
                            </div>


                        </div>
                        <div>
                            <CourseDetailsCard
                                course={courseData?.data?.courseDetails}
                                setConfirmationModal={setConfirmationModal}
                                handleBuyCourse={handleBuyCourse}
                            />
                        </div>
                    </div>

                </div>
            </div>

            <div className='mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]'>
                <div className='mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]'>
                    <div className='my-8 border border-richblack-600 p-8'>
                        <p className='text-3xl font-semibold'> What You WIll learn</p>
                        <div className=' mt-5'>
                            {whatYouWillLearn}
                        </div>
                    </div>


                    <div className='max-w-[830px] '>
                        <div className='flex flex-col gap-3'>
                            <p className='text-[28px] font-semibold'>Course Content:</p>

                            <div className='flex flex-wrap justify-between gap-2'>

                                <div className='flex gap-2'>
                                    <span>{courseContent.length} section(s)</span>

                                    <span>
                                        {totalNoOfLectures} lectures
                                    </span>
                                    <span>
                                        {courseData.data?.totalDuration} total length
                                    </span>
                                </div>

                                <div>
                                    <button className='text-yellow-25'
                                        onClick={() => setIsActive([])}>
                                        Collapse all Sections
                                    </button>
                                </div>

                            </div>
                        </div>



                        {/* Course Details Accordion */}
                        <div className="py-4">
                            {courseContent?.map((course, index) => (
                                <CourseAccordionBar
                                    course={course}
                                    key={index}
                                    isActive={isActive}
                                    handleActive={handleActive}
                                />
                            ))}
                        </div>

                        {/* Author Details */}
                        <div className="mb-12 py-4">
                            <p className="text-[28px] font-semibold">Author</p>
                            <div className="flex items-center gap-4 py-4">
                                <img
                                    src={
                                        instructor.image
                                            ? instructor.image
                                            : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                                    }
                                    alt="Author"
                                    className="h-14 w-14 rounded-full object-cover"
                                />
                                <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
                            </div>
                            <p className="text-richblack-50">
                                {instructor?.additionalDetails?.about}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    )
}

export default CourseDetails
