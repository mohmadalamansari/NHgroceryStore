import React, { useState } from 'react'
import logo from "../assest/logo.jpg"
import { Link } from "react-router-dom"
import { HiOutlineUserCircle } from "react-icons/hi"
import { BsCartFill } from "react-icons/bs"
import { useDispatch, useSelector } from 'react-redux'
import { logoutRedux } from '../redux/userSlice'
import toast from 'react-hot-toast'
import { configureStore } from '@reduxjs/toolkit'

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const userData = useSelector((state) => state.user);
    console.log(userData.email)
    const dispatch = useDispatch();



    const handleShowMenu = () => {
        setShowMenu(preve => !preve)
    }

    const handleLogout = () => {
        dispatch(logoutRedux());
        toast("Logout successfully");
    }
    console.log(process.env.REACT_APP_ADMIN_EMAIL)

    const cartItemNumber = useSelector((state) => state.product.cartItem)
    return (
        <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
            {/* desktop */}
            <div className="flex items-center h-full justify-between">
                <Link to={""}>
                    <div className="h-10">
                        <img src={logo} className="h-full" />
                    </div>
                </Link>

                <div className='flex item-center gap-4 md:gap-7'>
                    <nav className=' gap-4 md:gap-6 text-base md:text-lg  hidden md:flex'>
                        <Link to={""}>Home</Link>
                        <Link to={"Menu/661e4ed3aaccdd0591567750"}>Menu</Link>
                        <Link to={"About"}>About</Link>
                        <Link to={"Contact"}>Contact</Link>

                    </nav>
                    <div className='text-2xl text-slate-600 relative flex  justify-center'>
                        <Link to={"Cart"}>
                            < BsCartFill />
                            <div className='absolute -top-1 -right-1 text-white bg-red-700 h-4 w-4 rounded-full m-0 p-0 text-sm text-center'>
                                {
                                    cartItemNumber.length
                                }
                            </div>
                        </Link>
                    </div>
                    <div className=' text-slate-600' onClick={handleShowMenu}>
                        <div className='text-3xl cursor-pointer w-11 h-12 rounded-full overflow-hidden drop-shadow-md'>

                            {userData.image ? (
                                <img src={userData.image} className="h-full w-full" />
                            ) : (
                                <HiOutlineUserCircle />
                            )}

                        </div>
                        {
                            showMenu && (
                                <div className='absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col '>
                                    {
                                        userData.email === process.env.REACT_APP_ADMIN_EMAIL && <Link to={"newproduct"} className='whitespace-nowrap  cursor-pointer'>new product</Link>
                                    }

                                    {
                                        userData.image ? <p className="cursor-pointer text-white px-2 rounded-full bg-blue-500 text-center" onClick={handleLogout}>logout ({userData.firstName})</p> : <Link to={"login"} className='whitespace-nowrap cursor-pointer '>login</Link>

                                    }
                                    <nav className=' gap-4 md:gap-6 text-base md:text-lg flex flex-col md:hidden'>
                                        <Link to={""} >Home</Link>
                                        <Link to={"Menu/661e4ed3aaccdd0591567750"}>Menu</Link>
                                        <Link to={"About"}>About</Link>
                                        <Link to={"Contact"}>Contact</Link>

                                    </nav>
                                </div>

                            )
                        }

                    </div>
                </div>
            </div>
            {/* mobile */}
        </header>
    )
}

export default Header