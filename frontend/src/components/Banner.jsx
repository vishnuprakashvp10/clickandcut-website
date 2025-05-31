import React from 'react'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate()

    return (
        <div className='flex bg-gradient-to-r from-pink-400 via-purple-700 to-blue-900 rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-10 md:mx-10 justify-center'>

            {/* ------- Left Side ------- */}
            <div className='flex-1 py-6 sm:py-8 md:py-10 lg:py-12 text-center'>
                <div className='text-xl sm:text-2xl md:text-3xl font-semibold text-white'>
                    <p>Dont Wait!</p>
                    <p className='mt-2'>Just Click... And Cut</p>
                </div>
                <button
                    onClick={() => { navigate('/login'); scrollTo(0, 0) }}
                    className='bg-white text-sm sm:text-base text-[#595959] px-6 py-2 rounded-full mt-4 hover:scale-105 transition-all'
                >
                    Refer & Get 50% OFF
                </button>
            </div>
        </div>
    )
}

export default Banner
