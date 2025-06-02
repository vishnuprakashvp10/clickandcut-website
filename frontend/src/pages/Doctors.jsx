import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const Doctors = () => {
  const { speciality } = useParams()
  const { doctors, search, setSearch } = useContext(AppContext)

  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(true) // Show filters by default
  const location = useLocation()
  const navigate = useNavigate()
  const inputRef = useRef(null)

  // Autofocus on input when user lands on /doctors
  useEffect(() => {
    if (inputRef.current && location.pathname.includes('/doctors')) {
      inputRef.current.focus()
    }
  }, [location])

  // Apply filtering based on speciality and search
  useEffect(() => {
    let result = doctors

    if (speciality) {
      result = result.filter(doc => doc.speciality === speciality)
    }

    if (search.trim() !== '') {
      result = result.filter(doc =>
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.speciality.toLowerCase().includes(search.toLowerCase())
      )
    }

    setFilterDoc(result)
  }, [doctors, speciality, search])

  return (
    <div>
      {/* Search Bar */}
      <div className='border-t border-b bg-gray-50 text-center'>
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
          <input
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='flex-1 outline-none bg-inherit text-xs sm:text-sm'
            type='text'
            placeholder='Search for Salons, Parlours, Services & more'
          />
        </div>
      </div>

      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        {/* Mobile Filter Toggle Button */}
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? 'bg-gradient-to-r from-pink-400 via-purple-700 to-blue-900 text-white' : ''
          }`}
        >
          Filters
        </button>

        {/* Filters Section */}
        <div className={`flex-col gap-4 text-sm text-gray-600 ${
          showFilter ? 'flex' : 'hidden'
        } sm:flex`}>
          {['General physician', 'Gynecologist'].map((item, index) => (
            <p
              key={index}
              onClick={() => speciality === item ? navigate('/doctors') : navigate(`/doctors/${item}`)}
              className={`w-64vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === item ? 'bg-[#E2E5FF] text-black' : ''
              }`}
            >
              {item}
            </p>
          ))}
        </div>

        {/* Doctors Listing */}
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {filterDoc.map((item, index) => (
            <div
              onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
              className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
              key={index}
            >
              <img className='bg-[#EAEFFF]' src={item.image} alt='' />
              <div className='p-4'>
                <div className={`flex items-center gap-2 text-sm text-center ${
                  item.available ? 'text-green-500' : 'text-gray-500'
                }`}>
                  <p className={`w-2 h-2 rounded-full ${
                    item.available ? 'bg-green-500' : 'bg-gray-500'
                  }`}></p>
                  <p>{item.available ? 'Available' : 'Not Available'}</p>
                </div>
                <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors
