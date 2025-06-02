import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    getDashData,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);
  const { slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="m-5">
        {/* Summary Cards */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.earning_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {currency} {dashData.earnings}
              </p>
              <p className="text-gray-400">Revenue</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Bookings</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients}
              </p>
              <p className="text-gray-400">Chairs</p>
            </div>
          </div>
        </div>

        {/* Latest Bookings Section */}
        <div className="bg-white mt-8">
          <div className="flex items-center gap-2.5 px-4 py-4 rounded-t border">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Bookings</p>
          </div>

          <div className="pt-4 border border-t-0">
            {dashData.latestAppointments && dashData.latestAppointments.length > 0 ? (
              dashData.latestAppointments.slice(0, 5).map((item, index) => (
                <Link
                  to="/doctor-appointments"
                  key={index}
                  className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                >
                  <img
                    className="rounded-full w-10"
                    src={item.userData.image}
                    alt=""
                  />
                  <div className="flex-1 text-sm">
                    <p className="text-gray-800 font-medium">{item.userData.name}</p>
                    <p className="text-gray-600">
                      Booking on {slotDateFormat(item.slotDate)}
                    </p>
                  </div>
                  {item.cancelled ? (
                    <p className="text-red-400 text-xs font-medium">Cancelled</p>
                  ) : item.isCompleted ? (
                    <p className="text-green-500 text-xs font-medium">Completed</p>
                  ) : (
                    <div className="flex">
                      <img
                        onClick={(e) => {
                          e.preventDefault();
                          cancelAppointment(item._id);
                        }}
                        className="w-10 cursor-pointer"
                        src={assets.cancel_icon}
                        alt=""
                      />
                      <img
                        onClick={(e) => {
                          e.preventDefault();
                          completeAppointment(item._id);
                        }}
                        className="w-10 cursor-pointer"
                        src={assets.tick_icon}
                        alt=""
                      />
                    </div>
                  )}
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-400 py-4">No recent bookings</p>
            )}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="bg-white mt-8">
          <Link to="/time-line">
            <div className="flex items-center gap-2.5 px-4 py-4 rounded-t border">
              <img src={assets.list_icon} alt="" />
              <p className="font-semibold">Update Your Timeline</p>
            </div>
            <div className="px-6 py-4 border border-t-0 hover:bg-gray-100 transition-all">
              <p className="text-gray-600 text-sm">
                Manage your bookings, breaks, holidays and more.
              </p>
            </div>
          </Link>
        </div>

        {/* Offer Creation Section */}
        <div className="bg-white mt-8">
          <Link to="/time-line">
            <div className="flex items-center gap-2.5 px-4 py-4 rounded-t border">
              <img src={assets.list_icon} alt="" />
              <p className="font-semibold">Create Your Offers</p>
            </div>
            <div className="px-6 py-4 border border-t-0 hover:bg-gray-100 transition-all">
              <p className="text-gray-600 text-sm">
                Launch limited-time offers, create exclusive deals, and attract more customers effortlessly.
              </p>
            </div>
          </Link>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
