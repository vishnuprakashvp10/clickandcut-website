import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm'>

        <div>
          <img className='mb-5 w-40 mx-auto lg:mx-0' src={assets.logo} alt="" />
          <p className='w-full md:w-2/3 text-gray-600 text-justify leading-6'>Click and Cut is your trusted platform for booking salon and parlour appointments easily and quickly. Say goodbye to long waits and enjoy a seamless booking experience right from your phone. Your perfect look is just a few clicks away!</p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+91-7904445263</li>
            <li>contact@clickandcut.in</li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025 @ Clickandcut.in - All Right Reserved.</p>
      </div>

    </div>
  )
}

export default Footer
