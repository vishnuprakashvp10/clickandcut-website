import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <section id='speciality' className='flex flex-col items-center gap-3 py-10 text-[#262626]'>
            <h1 className='text-2xl sm:text-3xl font-semibold'>Find by Service</h1>
            <p className='sm:w-1/3 text-center text-sm'>
                Discover trusted salons and parlours around you. Choose your service and lock in your time.
            </p>
            <div className='flex flex-wrap justify-center gap-4 pt-4 w-full'>
                {specialityData.map((item, index) => (
                    <Link
                        to={`/doctors/${item.speciality}`}
                        onClick={() => scrollTo(0, 0)}
                        className='flex flex-col items-center text-xs cursor-pointer hover:translate-y-[-8px] transition-all duration-300'
                        key={index}
                    >
                        <img className='w-16 sm:w-24 mb-2' src={item.image} alt={item.speciality} />
                        <p className='font-semibold'>{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default SpecialityMenu
