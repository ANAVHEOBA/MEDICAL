import React, { useState } from "react";

const PreferencePharmacy = ({
  pharmacyPreferenceData,
  setPharmacyPreferenceData,
  onSubmitPharmacy,
}) => {
  // List of days for the weekly schedule
  const daysList = [
    { key: 1, day: "Monday", shortDay: "M" },
    { key: 2, day: "Tuesday", shortDay: "T" },
    { key: 3, day: "Wednesday", shortDay: "W" },
    { key: 4, day: "Thursday", shortDay: "T" },
    { key: 5, day: "Friday", shortDay: "F" },
    { key: 6, day: "Saturday", shortDay: "S" },
    { key: 7, day: "Sunday", shortDay: "S" },
  ];

  // State for selected days
  const [selectedDays, setSelectedDays] = useState(pharmacyPreferenceData.openDays);

  // Handler for day selection
  const handleDayClick = (day) => {
    setSelectedDays((prevDays) => {
      if (prevDays.includes(day)) {
        return prevDays.filter((d) => d !== day);
      } else {
        return [...prevDays, day];
      }
    });
  };

  // Update pharmacy preference data
  const handleUpdatePharmacyPreference = (newData) => {
    setPharmacyPreferenceData({
      ...pharmacyPreferenceData,
      ...newData,
    });
  };

  // Handler for start time change
  const handleStartTimeChange = (e) => {
    handleUpdatePharmacyPreference({
      startTime: e.currentTarget.value,
    });
  };

  // Handler for end time change
  const handleEndTimeChange = (e) => {
    handleUpdatePharmacyPreference({
      endTime: e.currentTarget.value,
    });
  };

  return (
    <div className="form-group space-y-4">
      <h5 className="font-semibold text-2xl dark:text-primary-yellow">
        Add availability*
      </h5>
      <p className="text-[#37055c] dark:text-white">
        Visitors will only be able to schedule appointments during available hours.
      </p>

      {/* Days of the week selection */}
      <div className="input-group">
        <label className="input-label">
          Choose any day of the week to repeat this availability.
        </label>
        <div className="flex flex-wrap space-y-2 gap-x-2">
          {daysList.map((dayItem) => (
            <div
              key={dayItem.key}
              title={dayItem.day}
              onClick={() => handleDayClick(dayItem.day)}
              className={`border rounded-md px-3 py-2 cursor-pointer dark:border-dark-input-border ${
                selectedDays.includes(dayItem.day) ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {dayItem.shortDay}
            </div>
          ))}
        </div>
      </div>

      {/* Start and End Time Inputs */}
      <div className="flex flex-col md:flex-row space-x-2">
        <div className="input-group">
          <label className="input-label" htmlFor="startTime">
            Start Time *
          </label>
          <input
            type="time"
            id="startTime"
            className="input-box border border-purple-600 rounded-lg p-2 focus:outline-none focus:ring focus:ring-purple-300"
            value={pharmacyPreferenceData.startTime}
            onChange={handleStartTimeChange}
          />
        </div>
        <div className="input-group">
          <label className="input-label" htmlFor="endTime">
            End Time *
          </label>
          <input
            type="time"
            id="endTime"
            className="input-box border border-purple-600 rounded-lg p-2 focus:outline-none focus:ring focus:ring-purple-300"
            value={pharmacyPreferenceData.endTime}
            onChange={handleEndTimeChange}
          />
        </div>
      </div>

      {/* Save Button */}
      <button
        className="submit-btn w-40 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300"
        onClick={onSubmitPharmacy}
      >
        Save
      </button>
    </div>
  );
};

export default PreferencePharmacy;
