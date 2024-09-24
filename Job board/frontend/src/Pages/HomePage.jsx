import React from 'react';
import HomeLayout from '../Layout/HomeLayout';
import Footer from '../Components/Footer';
import banner from '../assets/banner.png';
import illustration from '../assets/illustration.png';

function HomePage() {
  return (
    <>
      <HomeLayout />
      <div className="flex flex-col min-h-screen">
        {/* Main content */}
        <div className="flex-grow">
          {/* Dynamic background height */}
          <div className="p-8 bg-cover bg-center" style={{ backgroundImage: `url(${banner})` }}>
            <div className='flex flex-col md:flex-row items-center justify-between py-16 md:py-24'>
              <div className='flex flex-col justify-center items-start md:w-[50%]'>
                <p className='text-white text-lg md:text-2xl font-semibold'>4536+ Jobs listed</p>
                <h1 className="text-4xl md:text-6xl text-white leading-tight">Find your Dream Job</h1>
                <p className='pt-4 md:pt-6 text-white max-w-md'>
                  We provide online instant cash loans with quick approval that suit your term length.
                </p>
                <button className='px-4 py-2 md:px-6 md:py-4 mt-4 md:mt-6 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300'>
                  Upload your Resume
                </button>
              </div>

              {/* Ensure the image stays visible */}
              <div className='flex justify-center w-full md:w-[50%] mt-8 md:mt-0'>
                <img className='object-contain w-full h-auto' src={illustration} alt="Illustration" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default HomePage;
