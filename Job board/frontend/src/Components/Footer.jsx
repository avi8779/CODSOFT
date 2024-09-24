import React from 'react'
import logo from '../assets/logo.png'
import { BsFacebook, BsInstagram, BsTwitter, BsLinkedin } from 'react-icons/bs'

function Footer() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();

    return (
        <>
            <footer className='flex flex-col items-center bg-blue-950 w-full h-auto py-10 px-5 md:px-20'>
                <section className='flex flex-col md:flex-row justify-around w-full gap-10'>
                    {/* Logo and Contact Info */}
                    <div className='text-center md:text-left md:w-1/3'>
                        <img src={logo} alt="Job Board" className='mx-auto md:mx-0'/>
                        <div className='mt-8 text-gray-400'>
                            <p>custommer@support.com</p>
                            <p>+919898989989</p>
                            <p>23d Mumbai</p>
                        </div>
                        {/* Social Icons */}
                        <div className='flex justify-center md:justify-start gap-5 text-gray-400 mt-8'>
                            <a className='w-10 p-3 border rounded-full hover:bg-green-600 hover:border-none transition duration-300 hover:text-white'>
                                <BsFacebook />
                            </a>
                            <a className='w-10 p-3 border rounded-full hover:bg-green-600 hover:border-none transition duration-300 hover:text-white'>
                                <BsInstagram />
                            </a>
                            <a className='w-10 p-3 border rounded-full hover:bg-green-600 hover:border-none transition duration-300 hover:text-white'>
                                <BsTwitter />
                            </a>
                            <a className='w-10 p-3 border rounded-full hover:bg-green-600 hover:border-none transition duration-300 hover:text-white'>
                                <BsLinkedin />
                            </a>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div className='flex flex-col text-center md:text-left md:w-1/3'>
                        <h2 className='text-2xl text-white'>Company</h2>
                        <div className='mt-5 text-gray-400'>
                            <a className='mt-3 cursor-pointer block hover:text-green-500 transition duration-300'>About</a>
                            <a className='mt-3 cursor-pointer block hover:text-green-500 transition duration-300'>Pricing</a>
                            <a className='mt-3 cursor-pointer block hover:text-green-500 transition duration-300'>Career Tips</a>
                            <a className='mt-3 cursor-pointer block hover:text-green-500 transition duration-300'>FAQ</a>
                        </div>
                    </div>

                    {/* Category Links */}
                    <div className='flex flex-col text-center md:text-left md:w-1/3'>
                        <h2 className='text-2xl text-white'>Category</h2>
                        <div className='mt-5 text-gray-400'>
                            <a className='mt-3 cursor-pointer block hover:text-green-500 transition duration-300'>Design & Art</a>
                            <a className='mt-3 cursor-pointer block hover:text-green-500 transition duration-300'>Engineering</a>
                            <a className='mt-3 cursor-pointer block hover:text-green-500 transition duration-300'>Sales & Marketing</a>
                            <a className='mt-3 cursor-pointer block hover:text-green-500 transition duration-300'>Finance</a>
                        </div>
                    </div>


                     {/* Subscribe Section */}
                <div className='w-full md:w-1/3 mt-10 md:mt-0 text-center md:text-left'>
                    <h2 className='text-2xl text-white'>Subscribe</h2>
                    <div className='mt-5 flex justify-center md:justify-start'>
                        <input type="text" className='p-4 w-[18rem] md:w-[23rem] rounded-md relative' placeholder='Enter your email' />
                        <button className='p-3 ml-2 font-semibold bg-green-500 hover:bg-green-600 transition duration-300 text-white rounded-md'>
                            Subscribe
                        </button>
                    </div>
                    <p className='text-gray-400 mt-5'>
                        Esteem spirit temper too say adieus who direct esteem esteems luckily.
                    </p>
                </div>

                </section>

               

                {/* Copyright Section at the Bottom */}
                <div className='w-full text-center mt-10 border-t border-gray-600 pt-5'>
                    <p className='text-gray-400'>
                        © {year} Job Board. All rights reserved.
                    </p>
                </div>
            </footer>
        </>
    )
}

export default Footer;
