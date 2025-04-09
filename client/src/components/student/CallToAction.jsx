import { assets } from '../../assets/assets'
import React from 'react'

const CallToAction = () => {
  return (
    <div className='flex flex-col  items-center gap-4 pb-24 px-8 md:px-0'>
      <h1 className='text-xl md:text-4xl text-gray-800 font-semibold'>Learn anything, anytime, anywhere</h1>
      <p className='text-gray-500 sm:text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit.Rerum similique distinctio quo praesentium ea inventore ut labore?
       Vero, earum culpa vitae pariatur quae exercitationem quo!</p>
       <div className='flex items-center  font-medium gap-6 mt-4'>
        <button className='px-10 py-3 rounded-md text-white bg-blue-600 cursor-pointer'>Get started</button>
        <button className='flex items-center gap-2'>Learn More <img src={assets.arrow_icon}/></button>
       </div>
    </div>
  )
}

export default CallToAction
