import React, { useState } from "react";

const DoctorTimeline = () => {
  const [breaks, setBreaks] = useState([
    { label: "Lunch Break", start: "01:00 PM", end: "02:00 PM" },
    { label: "Tea Break", start: "04:00 PM", end: "04:15 PM" },
  ]);

  const [chairs, setChairs] = useState(["Chair 1", "Chair 2", "Chair 3"]);

  const [services, setServices] = useState([
    { name: "Hair Cut", price: 25, time: 30 },
    { name: "Shave", price: 15, time: 20 },
    { name: "Facial", price: 40, time: 45 },
  ]);

  const [weeklyHolidays, setWeeklyHolidays] = useState({
    Monday: true,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  // Handle break input changes
  const handleBreakChange = (index, field, value) => {
    const newBreaks = [...breaks];
    newBreaks[index][field] = value;
    setBreaks(newBreaks);
  };

  // Handle service input changes
  const handleServiceChange = (index, field, value) => {
    const newServices = [...services];
    // If price or time, convert to number if possible
    if (field === "price" || field === "time") {
      newServices[index][field] = value === "" ? "" : Number(value);
    } else {
      newServices[index][field] = value;
    }
    setServices(newServices);
  };

  // Delete service
  const deleteService = (index) => {
    setServices(services.filter((_, i) => i !== index));
  };

  // Delete chair
  const deleteChair = (index) => {
    setChairs(chairs.filter((_, i) => i !== index));
  };

  // Handle weekly holiday toggle
  const toggleHoliday = (day) => {
    setWeeklyHolidays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  // Add break
  const handleAddBreak = () => {
    if (breaks.length < 4)
      setBreaks([...breaks, { label: "", start: "", end: "" }]);
  };

  // Add service
  const handleAddService = () => {
    setServices([...services, { name: "", price: "", time: "" }]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10 text-sm">
      {/* Working Time */}
      <section>
        <h2 className="text-xl font-bold border-l-4 border-blue-500 pl-2 mb-4">
          Working Time
        </h2>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1">Opening Hours</label>
            <input
              type="text"
              defaultValue="09:00 AM"
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1">Closing Hours</label>
            <input
              type="text"
              defaultValue="06:00 PM"
              className="border p-2 w-full rounded"
            />
          </div>
        </div>
        <p className="text-gray-500 text-xs mt-2">
          Set your shop's daily opening and closing hours
        </p>
      </section>

      {/* Break Time */}
      <section>
        <h2 className="text-xl font-bold border-l-4 border-green-600 pl-2 mb-4">
          Break Time
        </h2>
        {breaks.map((brk, index) => (
          <div className="flex gap-4 mb-2" key={index}>
            <div className="flex-1">
              <label className="block mb-1">Label</label>
              <input
                type="text"
                value={brk.label}
                onChange={(e) =>
                  handleBreakChange(index, "label", e.target.value)
                }
                className="border p-2 w-full rounded"
                placeholder={`Break ${index + 1} Label`}
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1">Start Time</label>
              <input
                type="text"
                value={brk.start}
                onChange={(e) =>
                  handleBreakChange(index, "start", e.target.value)
                }
                className="border p-2 w-full rounded"
                placeholder="Start Time"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1">End Time</label>
              <input
                type="text"
                value={brk.end}
                onChange={(e) =>
                  handleBreakChange(index, "end", e.target.value)
                }
                className="border p-2 w-full rounded"
                placeholder="End Time"
              />
            </div>
          </div>
        ))}
        <button
          onClick={handleAddBreak}
          className="text-center w-full border-dashed border-2 p-2 mt-2 text-sm text-gray-600 rounded"
          disabled={breaks.length >= 4}
        >
          + Add Break Time
        </button>
        <p className="text-xs text-gray-500 mt-2">
          You can add up to 2 additional break times (lunch and tea breaks are
          default)
        </p>
      </section>

      {/* Holidays */}
      <section>
        <h2 className="text-xl font-bold border-l-4 border-purple-500 pl-2 mb-4">
          Holidays
        </h2>
        <p className="mb-2 font-semibold">Weekly Holidays</p>
        <div className="grid grid-cols-4 gap-2 text-sm">
          {Object.keys(weeklyHolidays).map((day) => (
            <label
              key={day}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={weeklyHolidays[day]}
                onChange={() => toggleHoliday(day)}
              />{" "}
              {day}
            </label>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          * These are recurring holidays every week
        </p>
        <div className="mt-4">
          <p className="mb-1 font-semibold">Custom Holiday Dates</p>
          <input
            type="text"
            placeholder="Select custom holiday dates"
            className="border p-2 w-full rounded"
          />
          <p className="text-xs text-gray-500 mt-1">
            Select specific dates for festivals, personal holidays, etc.
          </p>
        </div>
      </section>

      {/* Chairs */}
      <section>
        <h2 className="text-xl font-bold border-l-4 border-orange-500 pl-2 mb-4">
          Chairs
        </h2>
        {chairs.map((chair, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-gray-50 p-2 mb-2 rounded"
          >
            <input
              type="text"
              value={chair}
              onChange={(e) => {
                const newChairs = [...chairs];
                newChairs[i] = e.target.value;
                setChairs(newChairs);
              }}
              className="flex-1 border p-2 rounded mr-4"
            />
            <button onClick={() => deleteChair(i)} className="text-red-500">
              🗑
            </button>
          </div>
        ))}
        <button
          onClick={() => setChairs([...chairs, `Chair ${chairs.length + 1}`])}
          className="text-center w-full border-dashed border-2 p-2 text-sm text-gray-600 rounded"
        >
          + Add Chair
        </button>
      </section>

      {/* Services */}
      <section>
        <h2 className="text-xl font-bold border-l-4 border-pink-500 pl-2 mb-4">
          Your Services
        </h2>
        {services.map((srv, idx) => (
          <div
            key={idx}
            className="grid grid-cols-12 gap-4 mb-2 bg-gray-50 p-2 rounded items-end"
          >
            <div className="col-span-4">
              <label className="block mb-1">Name</label>
              <input
                type="text"
                value={srv.name}
                onChange={(e) =>
                  handleServiceChange(idx, "name", e.target.value)
                }
                className="border p-2 w-full rounded"
                placeholder="Service Name"
              />
            </div>
            <div className="col-span-4">
              <label className="block mb-1">Price ($)</label>
              <input
                type="number"
                min="0"
                value={srv.price}
                onChange={(e) =>
                  handleServiceChange(idx, "price", e.target.value)
                }
                className="border p-2 w-full rounded"
                placeholder="Price"
              />
            </div>
            <div className="col-span-3">
              <label className="block mb-1">Time (minutes)</label>
              <input
                type="number"
                min="0"
                value={srv.time}
                onChange={(e) =>
                  handleServiceChange(idx, "time", e.target.value)
                }
                className="border p-2 w-full rounded"
                placeholder="Duration"
              />
            </div>
            <div className="col-span-1 flex justify-center">
              <button
                onClick={() => deleteService(idx)}
                className="text-red-500 text-xl font-bold leading-none"
              >
                ×
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={handleAddService}
          className="text-center w-full border-dashed border-2 p-2 text-sm text-gray-600 rounded"
        >
          + Add Service
        </button>
      </section>

      <div className="text-right">
        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          Submit
        </button>
      </div>
    </div>
  );
};

export default DoctorTimeline;
