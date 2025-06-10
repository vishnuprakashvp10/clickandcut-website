// ⬇️ All your imports remain the same
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointment = () => {
    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState(false)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')
    const [duration, setDuration] = useState(60)

    const navigate = useNavigate()

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId)
        setDocInfo(docInfo)
    }

    const getAvailableSolts = async () => {
        setDocSlots([])
        let today = new Date()

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = []

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })

                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = `${day}_${month}_${year}`
                const isSlotAvailable = docInfo.slots_booked[slotDate]?.includes(formattedTime) ? false : true

                timeSlots.push({
                    datetime: new Date(currentDate),
                    time: formattedTime,
                    available: isSlotAvailable
                })

                currentDate.setMinutes(currentDate.getMinutes() + 15)
            }

            setDocSlots(prev => [...prev, timeSlots])
        }
    }

    const bookAppointment = async () => {
        if (!token) {
            toast.warning('Login to book appointment')
            return navigate('/login')
        }

        const date = docSlots[slotIndex][0].datetime
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        const slotDate = `${day}_${month}_${year}`

        try {
            const { data } = await axios.post(
                backendUrl + '/api/user/book-appointment',
                { docId, slotDate, slotTime },
                { headers: { token } }
            )
            if (data.success) {
                toast.success(data.message)
                getDoctosData()
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo()
        }
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) {
            getAvailableSolts()
        }
    }, [docInfo])

    const renderTimeline = () => {
        if (!docSlots.length) return null

        const slots = docSlots[slotIndex]

        return (
            <div className="relative my-4 overflow-x-scroll w-full">
                <div className="flex items-center relative h-20 border-t border-gray-400">
                    {slots.map((slot, index) => {
                        const hour = slot.datetime.getHours()
                        const minute = slot.datetime.getMinutes()
                        const showHourMark = minute === 0
                        const fits = slots.slice(index, index + duration / 15).every(s => s?.available)
                        const isSelected = slot.time === slotTime

                        return (
                            <div
                                key={index}
                                className="flex flex-col items-center justify-start text-xs mr-4 cursor-pointer group"
                                onClick={() => fits && setSlotTime(slot.time)}
                            >
                                {showHourMark && (
                                    <span className="mb-2 text-[10px] text-gray-500">
                                        {slot.datetime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                                    </span>
                                )}
                                <div
                                    className={`
                                        h-6 w-1 rounded 
                                        transition duration-200 
                                        ${fits ? 'bg-green-500' : 'bg-red-400'} 
                                        group-hover:scale-125 
                                        ${isSelected ? 'ring-2 ring-primary scale-125' : ''}
                                    `}
                                ></div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    return docInfo ? (
        <div>
            {/* ---------- Doctor Details ----------- */}
            <div className='flex flex-col sm:flex-row gap-4'>
                <div>
                    <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
                </div>

                <div className='flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
                    <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" /></p>
                    <div className='flex items-center gap-2 mt-1 text-gray-600'>
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
                    </div>

                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>About <img className='w-3' src={assets.info_icon} alt="" /></p>
                        <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{docInfo.about}</p>
                    </div>

                    <p className='text-gray-600 font-medium mt-4'>Appointment fee: <span className='text-gray-800'>{currencySymbol}{docInfo.fees}</span> </p>
                </div>
            </div>

            {/* Booking Slots */}
            <div className='sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]'>
                <p>Booking slots</p>

                {/* Date Selector */}
                <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
                    {docSlots.length && docSlots.map((item, index) => (
                        <div onClick={() => setSlotIndex(index)} key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-[#DDDDDD]'}`}>
                            <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                            <p>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))}
                </div>

                {/* Duration Control */}
                <div className="flex items-center gap-3 mt-6">
                    <span>Duration:</span>
                    <button onClick={() => setDuration(prev => Math.max(15, prev - 15))} className="px-2 py-1 border rounded">-</button>
                    <span>{duration} min</span>
                    <button onClick={() => setDuration(prev => prev + 15)} className="px-2 py-1 border rounded">+</button>
                </div>

                {/* Timeline UI */}
                {renderTimeline()}

                {/* Book Button */}
                <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6'>Book an appointment</button>
            </div>

            {/* Related Doctors */}
            <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
        </div>
    ) : null
}

export default Appointment
