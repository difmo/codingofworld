import React from 'react';
import { FaBars, FaChevronDown, FaArrowRight, FaHome, FaRegUser } from 'react-icons/fa';
import { MdContactMail } from 'react-icons/md';

const JobsOfferPage = () => {
  return (
    <>
      <body className="font-inter">
        <section className="">
          <div className="w-full">
        
            <div className="xl:py-28 md:py-20 py-10 xl:px-0 px-10">
              <span className="w-fit mx-auto flex items-center justify-center bg-emerald-50 rounded-full text-emerald-600 text-center text-sm font-medium leading-5 px-3 py-1 mb-5">
                Careers at Coding of world
              </span>
              <h1 className="text-gray-900 text-center font-manrope lg:text-5xl text-4xl font-bold leading-tight mb-8">
                Unlock new career <br /> opportunities at Coding of world and others as well.
              </h1>
              <p className="text-gray-900 text-center text-lg font-normal leading-7">
                Coding of world embraces a youthful and flexible spirit, enabling us to swiftly adapt to market research,
                <br /> conditions, and customer demands through our advanced technology.
              </p>
            </div>
            <div className="lg:py-24 md:py-16 py-10 bg-slate-50 xl:px-0 px-10">
              <h2 className="text-gray-900 text-center font-manrope lg:text-4xl text-3xl font-bold leading-10 mb-14">
                Open positions
              </h2>
              <div className="lg:max-w-3xl md:max-w-xl sm:max-w-md max-w-sm mx-auto border border-slate-200 bg-white rounded-2xl p-12">
                {['UX Designer', 'Motion Designer', 'iOS Developer', 'Product Designer', 'UX Researcher', 'Project Manager'].map(
                  (job, index) => (
                    <div
                      key={index}
                      className={`flex justify-between gap-x-8 ${index !== 0 ? 'py-6' : 'pb-6'} border-b border-gray-200`}
                    >
                      <h3 className="text-gray-900 text-xl font-medium leading-8">{job}</h3>
                      <button className="w-20 h-9 rounded-full bg-primary/20 hover:bg-primary/100 transition-all duration-700 text-primary hover:text-white text-xs font-semibold leading-4">
                        Apply
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="xl:max-w-6xl w-auto mx-auto xl:py-28 md:py-16 py-10 xl:px-0 px-10">
              <h3 className="text-gray-900 text-center lg:text-4xl text-3xl font-bold leading-10 mb-5">
                Coding of world thrives on a spirit of agility
              </h3>
              <p className="text-gray-500 text-center text-lg font-normal leading-7 lg:mb-14 mb-6">
                We want to provide a user-friendly experience with the eyes capture design and develop product
                <br /> quickly with the ability to solve user problems.
              </p>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-4 lg:gap-x-8 gap-y-4 lg:pb-24 pb-10 border-b border-gray-200 max-w-lg mx-auto md:max-w-3xl lg:max-w-full">
                <div className="p-8 group hover:rounded-2xl transition-all duration-500 hover:shadow-md cursor-pointer">
                  <div className="w-20 h-20 bg-primary/20 rounded-xl flex items-center justify-center mb-5 max-lg:mx-auto transition-all duration-500 group-hover:bg-secondaryblue">
                    <FaHome className="w-8 h-8 text-primary group-hover:text-white" />
                  </div>
                  <h4 className="text-gray-900 text-lg font-semibold leading-7 mb-3 max-lg:text-center">Leadership</h4>
                  <p className="text-gray-500 text-sm font-normal leading-5 max-lg:text-center">
                    Build your beautiful agency website with us that converts more visitors than any other website and
                    the ability to interact and rotate products to solve user problems.
                  </p>
                </div>
                <div className="p-8 group hover:rounded-2xl transition-all duration-500 hover:shadow-md cursor-pointer">
                  <div className="w-20 h-20 bg-primary/20 rounded-xl flex items-center justify-center mb-5 max-lg:mx-auto transition-all duration-500 group-hover:bg-secondaryblue">
                    <FaRegUser className="w-8 h-8 text-primary group-hover:text-white" />
                  </div>
                  <h4 className="text-gray-900 text-lg font-semibold leading-7 mb-3 max-lg:text-center">Commitment</h4>
                  <p className="text-gray-500 text-sm font-normal leading-5 max-lg:text-center">
                    Build your beautiful agency website with us that converts more visitors than any other website and
                    the ability to interact and rotate products to solve user problems.
                  </p>
                </div>
              </div>
              <div className="lg:mt-24 mt-10 bg-gradient-to-l to-primary from-secondary p-12 rounded-2xl">
                <div className="lg:flex items-center justify-between gap-6">
                  <div className="lg:mb-0 mb-10">
                    <h3 className="text-white font-manrope lg:text-4xl text-3xl font-semibold leading-10 mb-5">
                      Don't see the role you're interested in?
                    </h3>
                    <p className="text-indigo-100 text-xl font-normal leading-8">
                      We’re always looking for talented people to join our team. Send us your CV and we will contact you
                      for any future roles.
                    </p>
                  </div>
                  <button className="px-2.5 h-14 flex items-center justify-center text-primary text-lg font-semibold leading-7 gap-2 rounded-full bg-white whitespace-nowrap">
                    Send Your CV <FaArrowRight />
                  </button>
                </div>
              </div>
              <div className="py-7 border-t border-gray-200">
                <div className="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
                  <span className="text-sm text-gray-500 lg:mb-0 mb-4">©Coding of world 2024, All rights reserved.</span>
                  <div className="flex mt-4 space-x-4 sm:justify-center sm:mt-0">
                    <a
                      href="javascript:;"
                      className="w-9 h-9 rounded-full bg-gray-700 flex justify-center items-center hover:bg-indigo-600"
                    >
                      <MdContactMail className="w-6 h-6 text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </body>
    </>
  );
};

export default JobsOfferPage;
