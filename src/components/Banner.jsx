import React from "react";
import { BsSearch } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";

function Banner() {
  return (
    <div className="py-20 px-4 bg-gradient-to-br from-purple-900 via-gray-900 to-slate-900 items-center flex flex-col space-y-4 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl hover:shadow-black">
      {/* Header Section */}
      <header className="text-center mb-6">
        <h4 className="text-4xl font-bold text-white mb-2">
          Search Doctor, Make an Appointment
        </h4>
        <p className="text-gray-300 text-lg">
          Find top doctors, clinics, and hospitals located near you. Effortlessly locate and reach out to the healthcare professionals who can assist you with your health concerns.
        </p>
      </header>

      {/* Search Section */}
      <div className="flex gap-x-4 gap-y-4 flex-col md:flex-row">
        {/* Location Search */}
        <div className="flex-1 text-gray-300">
          <div className="border border-purple-600 rounded-md flex items-center bg-gray-800 space-x-2 px-3 py-2 shadow-sm">
            <BsSearch className="h-6 w-6 text-white" />
            <input
              type="text"
              className="outline-transparent bg-transparent focus:outline-none w-full md:w-64 h-10 text-white placeholder-gray-500"
              placeholder="Search Location"
            />
          </div>
          <span className="text-sm text-gray-400 mt-2">Based on your Location</span>
        </div>

        {/* Medical Search */}
        <div className="flex-1 text-gray-300">
          <div className="border border-purple-600 rounded-md flex items-center bg-gray-800 space-x-2 px-3 py-2 shadow-sm">
            <GrLocation className="h-6 w-6 text-white" />
            <input
              type="text"
              className="outline-transparent bg-transparent focus:outline-none w-full md:w-64 h-10 text-white placeholder-gray-500"
              placeholder="Search Doctors, Clinics, Hospitals, Diseases Etc"
            />
          </div>
          <span className="text-sm text-gray-400 mt-2">E.g., Dental, Sugar Check-up, etc.</span>
        </div>

        {/* Search Button */}
        <div className="flex items-center justify-center mt-4">
          <button className="bg-gradient-to-r from-purple-800 to-pink-400 text-white h-12 w-full md:w-48 rounded-md flex items-center justify-center space-x-2 shadow-lg hover:opacity-90 transition-opacity duration-300">
            <span className="flex items-center space-x-2">
              <BsSearch className="h-6 w-6 font-semibold" />
              <span className="hidden md:block">Search</span>
            </span>
          </button>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-8 text-center">
        <p className="text-gray-400 mb-2">
          For any assistance, please contact our support team. We are here to help you 24/7 with all your queries and concerns related to finding the right medical care.
        </p>
        <a href="/contact" className="text-purple-400 hover:underline">Contact Us</a>
      </div>
    </div>
  );
}

export default Banner;
