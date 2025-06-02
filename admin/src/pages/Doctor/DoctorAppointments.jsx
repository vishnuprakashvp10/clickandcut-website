import React, { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);

  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  const isSameDate = (date1, date2) => {
    const parseCustomDate = (dateStr) => {
      const [day, month, year] = dateStr.split("_");
      return new Date(`${year}-${month}-${day}`); // yyyy-mm-dd format
    };

    const d1 =
      typeof date1 === "string" ? parseCustomDate(date1) : new Date(date1);
    const d2 =
      typeof date2 === "string" ? parseCustomDate(date2) : new Date(date2);

    return d1.toDateString() === d2.toDateString();
  };

  const filteredAppointments = selectedDate
    ? appointments.filter((item) => isSameDate(item.slotDate, selectedDate))
    : appointments;

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Bookings</p>

      <div className="mb-4">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileClassName={() => "calendar-tile-custom"}
        />
        {selectedDate && (
          <p className="text-sm mt-2">
            Showing appointments for:{" "}
            <strong>{new Date(selectedDate).toDateString()}</strong>
            <button
              className="ml-4 text-blue-600 underline"
              onClick={() => setSelectedDate(null)}
            >
              Clear Filter
            </button>
          </p>
        )}
      </div>

      <div className="bg-white border rounded text-sm max-h-[60vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {filteredAppointments.length === 0 ? (
          <div className="text-center py-5 text-gray-500">
            No appointments found for selected date.
          </div>
        ) : (
          filteredAppointments.map((item, index) => (
            <div
              className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
              key={index}
            >
              <p className="max-sm:hidden">{index}</p>
              <div className="flex items-center gap-2">
                <img
                  src={item.userData.image}
                  className="w-8 rounded-full"
                  alt=""
                />
                <p>{item.userData.name}</p>
              </div>
              <div>
                <p className="text-xs inline border border-primary px-2 rounded-full">
                  {item.payment ? "Online" : "CASH"}
                </p>
              </div>
              <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
              <p>
                {slotDateFormat(item.slotDate)}, {item.slotTime}
              </p>
              <p>
                {currency}
                {item.amount}
              </p>
              {item.cancelled ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-xs font-medium">Completed</p>
              ) : (
                <div className="flex">
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-10 cursor-pointer"
                    src={assets.cancel_icon}
                    alt=""
                  />
                  <img
                    onClick={() => completeAppointment(item._id)}
                    className="w-10 cursor-pointer"
                    src={assets.tick_icon}
                    alt=""
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
