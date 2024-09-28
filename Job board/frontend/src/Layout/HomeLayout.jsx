import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/logo.png';  // Assuming you have a logo in the assets folder
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/Slices/AuthSlice';
import ProfileMenu from './ProfileMenu';

function HomeLayout() {
    const [nav, setNav] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

    async function handleLogout(e) {
        if (e) e.preventDefault(); // Prevent default behavior if an event is provided
        try {
            const res = await dispatch(logout());
            if (res?.payload?.success) {
                navigate("/");
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    }

    const handleClick = () => setNav(!nav);

    return (
        <div className="w-full sticky top-0 h-[80px] flex justify-between items-center px-4 bg-blue-950 text-white">
            {/* Logo */}
            <div>
                <img src={logo} alt="Logo" style={{ width: '200px' }} />
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex">
                <li className="px-4 hover:text-green-400 cursor-pointer">Home</li>
                <li className="px-4 hover:text-green-400 cursor-pointer">About</li>
                <li className="px-4 hover:text-green-400 cursor-pointer">Services</li>
                <li className="px-4 hover:text-green-400 cursor-pointer">Contact</li>
            </ul>

            {/* Right Side: Profile Menu and Buttons */}
            <div className="hidden md:flex items-center space-x-4">
                {isLoggedIn ? (
                    <>
                        <ProfileMenu onLogout={handleLogout} />
                        <Link to='/post-job'>
                            <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300">
                                Post Job
                            </button>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to='/login'>
                            <button className="px-6 py-2 text-white border border-green-500 rounded-md hover:bg-green-500 transition duration-300">
                                Login
                            </button>
                        </Link>
                        <Link to='/post-job'>
                            <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300">
                                Post Job
                            </button>
                        </Link>
                    </>
                )}
            </div>

            {/* Hamburger Menu Icon */}
            <div onClick={handleClick} className="md:hidden z-10" aria-expanded={nav}>
                {!nav ? <FaBars /> : <FaTimes />}
            </div>

            {/* Mobile Menu */}
            <ul
                className={`fixed top-0 left-0 w-full h-screen bg-blue-950 flex flex-col justify-center items-center transform transition-transform duration-500 ${nav ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <li className="py-4 text-xl hover:text-green-400 cursor-pointer" onClick={handleClick}>Home</li>
                <li className="py-4 text-xl hover:text-green-400 cursor-pointer" onClick={handleClick}>About</li>
                <li className="py-4 text-xl hover:text-green-400 cursor-pointer" onClick={handleClick}>Services</li>
                <li className="py-4 text-xl hover:text-green-400 cursor-pointer" onClick={handleClick}>Contact</li>

                {/* Mobile Buttons */}
                <div className="flex flex-col mt-6 space-y-4">
                    {isLoggedIn ? (
                        <ProfileMenu onLogout={handleLogout} />
                    ) : (
                        <>
                            <Link to='/login'>
                                <button className="px-8 py-3 text-white border border-green-500 rounded-md hover:bg-green-500 transition duration-300" onClick={handleClick}>
                                    Login
                                </button>
                            </Link>
                            <Link to='/post-job'>
                                <button className="px-8 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300" onClick={handleClick}>
                                    Post Job
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </ul>
        </div>
    );
}

export default HomeLayout;
