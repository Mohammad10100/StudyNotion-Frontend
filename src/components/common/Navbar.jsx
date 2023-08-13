import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import {AiOutlineMenu, AiOutlineShoppingCart } from 'react-icons/ai'
import { IoIosArrowDropdownCircle } from 'react-icons/io'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { ACCOUNT_TYPE } from "../../utils/constants"




export default function Navbar() {

  console.log("Printing base url: ",process.env.REACT_APP_BASE_URL);

  const token = useSelector((state) => state.auth)
  const user = useSelector((state) => state.profile)
  const cart = useSelector((state) => state.cart)

  const [subLinks, setSublinks] = useState([])

  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector('GET', categories.CATEGORIES_API)
      setSublinks(result.data.data)
    } catch (error) {
      console.log('could not fetch categories');
    }
  }

  useEffect(() => {
    fetchSubLinks();
  }, [])




  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
      location.pathname !== "/" ? "bg-richblack-800" : ""
    } transition-all duration-200`}>
      <div className='flex flex-row w-11/12 max-w-maxContent justify-between items-center'>
        <Link to="/">
          <img src={Logo} alt="StudyNotion" width={160} height={42} loading='lazy' />
        </Link>

        <nav className={`flex w-fit hidden md:block`}>
          <ul className='flex gap-x-6 text-richblack-25'>
            {NavbarLinks.map((link, i) => {
              return <li key={i}>
                {
                  link.title === 'Catalog' ?
                    (
                      <div className='relative flex items-center gap-2 group z-10'>
                        <p>{link.title}</p>
                        <IoIosArrowDropdownCircle />
                        <div className='invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]'>
                          <div className='absolute left-[50%] top-0 translate-x-[80%] -translate-y-[50%] rotate-45
                          rounded bg-richblack-5 h-6 w-6'>
                          </div>
                          {
                            subLinks.length ? (
                              subLinks.map((subLink, index) => (
                                <Link to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`} key={index} className=' rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50'>
                                  <p>{subLink.name}</p>
                                </Link>
                              ))
                            ) : (<div></div>)
                          }
                        </div>
                      </div>
                    )
                    :
                    (
                      <Link to={link?.path}>
                        <p className={`${matchRoute(link?.path) ? 'text-yellow-25' : 'text-richblack-25'}`}>
                          {link?.title}
                        </p>
                      </Link>
                    )
                }
              </li>
            })}
          </ul>
        </nav>


        {/* cart/user/login signup butttons */}
        <div className='hidden items-center gap-x-4 md:flex'>
          {
            user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link to='dashboard/cart' className='relative'>
                <AiOutlineShoppingCart className="text-2xl text-richblack-100"  />
                {cart.totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {cart.totalItems}
                </span>
              )}
              </Link>
            )
          }
          {
            token.token === null && (
              <Link to="/login">
                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[6px] text-richblack-100 rounded-md'>
                  LogIn
                </button>
              </Link>
            )
          }
          {
            token.token === null && (
              <Link to="/signup">
                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[6px] text-richblack-100 rounded-md'>
                  SignUp
                </button>
              </Link>
            )
          }
          {
            token.token !== null && <ProfileDropDown />
          }
        </div>
        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  )
}
