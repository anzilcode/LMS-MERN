import { assets } from '../../assets/assets'
import React from 'react'

const Footer = () => {
  return (
    <footer className='flex md:flex-row flex-col-reverse items-center justify-between text-left
    w-full px-8 border-t'>
      <div className='flex items-center gap-4'>
        <img src={assets.logo} className='hidden md:block w-20'/>
        <div className='hidden md:block h-7 w-px bg-gray-500/60'></div>
        <p className='py-4 text-center text-xs md:text-sm text-gray-500'>
          Credit greetstack tutorials
        </p>
      </div>
      <div className='flex items-center gap-3 max-md:mt-4'>
        <a href=""><img src={assets.facebook_icon}/></a>
        <a href=""><img src={assets.instagram_icon}/></a>
        <a href=""><img src={assets.twitter_icon}/></a>
      </div>
    </footer>
  )
}

export default Footer
