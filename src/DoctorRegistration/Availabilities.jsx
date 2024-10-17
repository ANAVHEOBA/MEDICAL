import React, { useState } from 'react';

// Type definitions for preferences and props
const daysList = [
  { key: 1, day: 'Monday', shortDay: 'M' },
  { key: 2, day: 'Tuesday', shortDay: 'T' },
  { key: 3, day: 'Wednesday', shortDay: 'W' },
  { key: 4, day: 'Thursday', shortDay: 'T' },
  { key: 5, day: 'Friday', shortDay: 'F' },
  { key: 6, day: 'Saturday', shortDay: 'S' },
  { key: 7, day: 'Sunday', shortDay: 'S' },
];

function Availabilities({ preference, setPreference, submitIpfs }) {
  const [selectedDays, setSelectedDays] = useState(preference.days);

  // Handles changes in the date input
  const handleDateChange = (e) => {
    setPreference({ ...preference, date: e.currentTarget.value });
  };

  // Handles changes in the start time input
  const handleStartTimeChange = (e) => {
    setPreference({ ...preference, startTime: e.currentTarget.value });
  };

  // Handles changes in the end time input
  const handleEndTimeChange = (e) => {
    setPreference({ ...preference, endTime: e.currentTarget.value });
  };

  // Handles day selection for availability
  const handleDayClick = (day) => {
    const newDays = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];
    setSelectedDays(newDays);
    setPreference({ ...preference, days: newDays });
  };

  return (
    <div className="space-y-3 flex flex-col p-4 bg-gradient-to-br from-purple-900 to-gray-900 dark:from-purple-800 dark:to-gray-800 rounded-lg shadow-md">
      <h5 className="font-semibold text-2xl text-white">Add Availability*</h5>
      <p className="text-gray-300">
        Visitors will only be able to schedule appointments during available hours.
      </p>

      <div className="input-group mb-4">
        <label className="input-label text-white" htmlFor="date">
          Date *
        </label>
        <input
          type="date"
          id="date"
          className="input-box"
          placeholder="Enter Date"
          value={preference.date}
          onChange={handleDateChange}
        />
      </div>

      <label className="input-label mb-2 text-white">
        Time will you be available?
      </label>
      <div className="flex flex-col md:flex-row space-x-2">
        <div className="input-group mb-4">
          <label className="input-label text-white" htmlFor="startTime">
            Start Time *
          </label>
          <input
            type="time"
            id="startTime"
            className="input-box"
            placeholder="Start Time"
            value={preference.startTime}
            onChange={handleStartTimeChange}
          />
        </div>
        <div className="input-group mb-4">
          <label className="input-label text-white" htmlFor="endTime">
            End Time *
          </label>
          <input
            type="time"
            id="endTime"
            className="input-box"
            placeholder="End Time"
            value={preference.endTime}
            onChange={handleEndTimeChange}
          />
        </div>
      </div>

      <div className="input-group mb-4">
        <label className="input-label text-white">
          Choose any day of the week to repeat this availability.
        </label>
        <div className="flex flex-wrap space-y-2 space-x-2">
          {daysList.map((dayItem) => (
            <div
              key={dayItem.key}
              title={dayItem.day}
              className={`border rounded-md px-3 py-2 cursor-pointer ${
                selectedDays.includes(dayItem.day) 
                ? 'bg-blue-500 text-white border-blue-500' 
                : 'border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-700'
              }`}
              onClick={() => handleDayClick(dayItem.day)}
            >
              {dayItem.shortDay}
            </div>
          ))}
        </div>
      </div>

      <button
        className="submit-btn w-40 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
        onClick={submitIpfs}
      >
        Save
      </button>
    </div>
  );
}

export default Availabilities;
