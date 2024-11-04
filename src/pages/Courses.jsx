import React from "react";
import { courses } from "../assets/data/dummydata";
import { FaBook } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export const Courses = () => {
  const navigate = useNavigate();
  return (
    <section className='courses bg-[#F3F4F8] pt-40 '>
      <div className='w-4/5 m-auto'>
        <div className='heading mb-16'>
          <h1 className='text-3xl font-semibold text-black'>
            Find The Right <br />
            Online Course For You With Certificates by <span className="text-primary">Diffmo Technologies</span> 
          </h1>
          <span className='text-sm mt-2 block'>you don't have to struggle alone, you've got our assistance and help.</span>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {courses.map((item) => (
            <div onClick={()=>navigate(item.path)} key={item.id} className='box rounded-lg cursor-pointer shadow-shadow1 border'>
              <div className='images rounded-t-lg relative overflow-hidden h-40 w-full'>
                <img src={item.cover} alt='' className='rounded-t-lg object-cover w-full h-full transition ease-in-out delay-150 cursor-pointer hover:scale-125 duration-300' />
                <div className='categ flex gap-4 absolute left-2 top-0 m-3' >
                  <span className='text-[14px] bg-primary p-1 px-3 text-white rounded-[5px] shadow-md'>From Experts </span>
                  <span className='text-[14px] bg-black p-1 px-3 text-white rounded-[5px] shadow-md'>Diffmo Tech </span>
                </div>
              </div>
              <div className='text p-3'>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center'>
                    <FaBook />
                    <span className='text-[14px] ml-2'> 10 lessons</span>
                  </div>
                  <div className='flex items-center'>
                    <AiFillStar className='text-orange-500' />
                    <span className='text-[14px] ml-2'> 4.50(2)</span>
                  </div>
                </div>
                <h3 className='text-black my-4 font-medium h-10'>{item.title}</h3>
             
              </div>
              <div className='flex items-center justify-between border-t border-gray-200 p-3'>
                <span className='text-sm text-primary'>Free</span>
                <NavLink to='/' className='text-[14px] ml-2 flex items-center'>
                  Know Details <HiOutlineArrowNarrowRight />
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
