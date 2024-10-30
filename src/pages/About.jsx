import React from "react";
import aboutImg from "../assets/images/about.jpg";
import aboutImgBanner from "../assets/images/about-banner.jpg";
import imgs from "../assets/images/join1.png";
import { FaBookDead } from "react-icons/fa";
import { AiOutlineCheck } from "react-icons/ai";

export const About = () => {
  return (
    <>
      <section className='about py-28'>
        <div className='container'>
          <div className='heading text-center py-12'>
            <h1 className='text-3xl font-semibold text-black'>Why An Scholercity Out Of The Ordinary</h1>
            <span className='text-sm mt-2 block'>You don't have to struggle alone; you've got our assistance and help.</span>
          </div>
          <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'>
            <AboutCard color='bg-[#2D69F0]' icon={<FaBookDead size={50} />} title='4,000 Online Courses' desc="You don't have to struggle alone, you've " />
            <AboutCard color='bg-[#DD246E]' icon={<FaBookDead size={50} />} title='Expert Instructors' desc="Learn from industry leaders." />
            <AboutCard color='bg-[#8007E6]' icon={<FaBookDead size={50} />} title='Flexible Learning' desc="Study at your own pace." />
            <AboutCard color='bg-[#0CAE74]' icon={<FaBookDead size={50} />} title='Certification' desc="Earn recognized certificates." />
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
      <div className='icon'>{props.icon}</div>
      <div className='text mt-5'>
        <h4 className='text-lg font-semibold my-3'>{props.title}</h4>
        <p className='text-sm'>{props.desc}</p>
      </div>
    </div>
  );
}

export const AboutContent = () => {
  return (
    <section className='mb-16'>
      <div className='container flex flex-col md:flex-row md:gap-8'>
        <div className='left w-full md:w-1/3 relative'>
          <img src={aboutImg} alt='About' className='rounded-xl' />
          <img src={aboutImgBanner} alt='About Banner' className='rounded-xl absolute -bottom-14 -left-24 h-56 md:left-20 md:-bottom-20' />
          <div className='img-group ml-0 mt-3 flex items-center'>
            <img src={imgs} alt='Join Us' className='w-16 h-16' />
            <span className='text-[14px] ml-2'>
              Join over <span className='text-black text-sm'>4,000+</span> students
            </span>
          </div>
        </div>
        <div className='right w-full md:w-2/3 md:mt-16'>
          <div className='heading'>
            <h1 className='text-3xl font-semibold text-black'>Achieve Your Goals With Educal</h1>
            <span className='text-sm mt-2 block leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam officia, reiciendis sapiente adipisci nulla non consequuntur eos repellendus laborum veritatis obcaecati neque est id porro voluptatum.</span>
            <ul className='my-5'>
              <li className='text-sm flex items-center gap-5'>
                <AiOutlineCheck className='text-green-500' /> Upskill your organization.
              </li>
              <li className='text-sm flex items-center gap-5 my-2'>
                <AiOutlineCheck className='text-green-500' />
                Access more than 100K online courses.
              </li>
              <li className='text-sm flex items-center gap-5'>
                <AiOutlineCheck className='text-green-500' />
                Learn the latest skills.
              </li>
            </ul>
            <button className='px-5 py-2 border border-gray-300 rounded-md text-sm'>Apply Now</button>
          </div>
        </div>
      </div>
    </section>
  );
}
