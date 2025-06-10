import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopParlours = () => {
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)
    const scrollRef = useRef(null)

    const handleScroll = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
        }
    }

    return (
        <div className='mt-14'>
            <div className='flex flex-col bg-gray-50 my-5 p-6 text-[#262626] rounded-lg px-6 md:px-10 lg:px-20'>
                <div className='flex justify-between items-center py-4'>
                    <h1 className='text-2xl sm:text-3xl font-semibold'>Book a Parlour Near You</h1>
                    <p
                        onClick={handleScroll}
                        className='text-xl font-semibold bg-gradient-to-r from-purple-700 via-purple-700 to-blue-900 bg-clip-text text-transparent whitespace-nowrap hidden sm:block cursor-pointer'
                    >
                        Swipe &gt;&gt;
                    </p>
                </div>

                {/* Scrollable container */}
                <div
                    ref={scrollRef}
                    className='w-full flex gap-4 pt-2 overflow-x-scroll no-scrollbar'
                >
                    {doctors.slice(0, 10).map((item, index) => (
                        <div
                            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
                            className='min-w-[200px] sm:min-w-[250px] border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500'
                            key={index} 
                        >
                            <img className='bg-[#EAEFFF] w-full h-[150px] object-cover' src={item.image} alt="" />
                            <div className='p-4'>
                                <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
                                    <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                                    <p>{item.available ? 'Available' : 'Not Available'}</p>
                                </div>
                                <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                                <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Keep "more" button below */}
                <button
                    onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
                    className='bg-gradient-to-r from-pink-400 via-purple-700 to-blue-900 text-white font-bold px-12 py-3 rounded-full mt-10 self-center'
                >
                    SEE ALL
                </button>
            </div>
        </div>
    )
}

export default TopParlours
