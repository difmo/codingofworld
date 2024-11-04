import React from "react";
import aboutImg from "../assets/images/about.jpg";
import aboutImgBanner from "../assets/images/about-banner.jpg";
import imgs from "../assets/images/join1.png";
import { FaBookDead } from "react-icons/fa";
import { AiOutlineCheck } from "react-icons/ai";

export const About = () => {
  return (
    <>
      <section className='py-4 about'>
        <div className='container'>
          <div className='py-12 text-center heading'>
            <h1 className='text-3xl font-semibold text-black'>Why An Scholercity Out Of The Ordinary</h1>
            <span className='block mt-2 text-sm'>You don't have to struggle alone; you've got our assistance and help.</span>
          </div>
          <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'>
            <AboutCard color='bg-[#000]' icon={<FaBookDead size={50} />} title='4,000 Online Courses' desc="You don't have to struggle alone, you've " />
            <AboutCard color='bg-[#000]' icon={<FaBookDead size={50} />} title='Expert Instructors' desc="Learn from industry leaders." />
            <AboutCard color='bg-[#000]' icon={<FaBookDead size={50} />} title='Flexible Learning' desc="Study at your own pace." />
            <AboutCard color='bg-[#000]' icon={<FaBookDead size={50} />} title='Certification' desc="Earn recognized certificates." />
          </div>
        </div>
      </section>
      <AboutContent />
    </>
  );
}

export const AboutCard = (props) => {
  return (
    <div className={`box shadow-md p-5 py-8 rounded-md text-white ${props.color} cursor-pointer transition ease-in-out delay-150 hover:-translate-y-4 duration-300`}>
      <div className='text-white icon '>{props.icon}</div>
      <div className='mt-5 text'>
        <h4 className='my-3 text-lg font-semibold'>{props.title}</h4>
        <p className='text-sm'>{props.desc}</p>
      </div>
    </div>
  );
}

export const AboutContent = () => {
  return (
    <section className='mb-16'>
      <div className='container flex flex-col md:flex-row md:gap-8'>
        <div className='relative w-full left md:w-1/3'>
          <img src={aboutImg} alt='About' className='rounded-xl' />
          <img src={aboutImgBanner} alt='About Banner' className='absolute h-56 rounded-xl -bottom-14 -left-24 md:left-20 md:-bottom-20' />
          <div className='flex items-center mt-3 ml-0 img-group'>
            <img src={imgs} alt='Join Us' className='w-16 h-16' />
            <span className='text-[14px] ml-2'>
              Join over <span className='text-sm text-black'>4,000+</span> students
            </span>
          </div>
        </div>
        <div className='w-full right md:w-2/3 md:mt-16'>
          <div className='heading'>
            <h1 className='text-3xl font-semibold text-black'>Achieve Your Goals With Educal</h1>
            <span className='block mt-2 text-sm leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam officia, reiciendis sapiente adipisci nulla non consequuntur eos repellendus laborum veritatis obcaecati neque est id porro voluptatum.</span>
            <ul className='my-5'>
              <li className='flex items-center gap-5 text-sm'>
                <AiOutlineCheck className='text-green-500' /> Upskill your organization.
              </li>
              <li className='flex items-center gap-5 my-2 text-sm'>
                <AiOutlineCheck className='text-green-500' />
                Access more than 100K online courses.
              </li>
              <li className='flex items-center gap-5 text-sm'>
                <AiOutlineCheck className='text-green-500' />
                Learn the latest skills.
              </li>
            </ul>
            <button className='px-5 py-2 text-sm border border-gray-300 rounded-md'>Apply Now</button>
          </div>
        </div>
      </div>
    </section>
  );
}
