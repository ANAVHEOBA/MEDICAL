import Image from "next/image";
import React from "react";
import { GoLocation, GoThumbsup } from "react-icons/go";
import {
  BsChat,
  BsBookmark,
  BsFillTelephoneFill,
  BsFillCameraVideoFill,
} from "react-icons/bs";
import { BiMoney, BiChat } from "react-icons/bi";
import { useRouter } from "next/router";

const ProfileGeneral = (props) => {
  const { doctorData } = props;

  return (
    <div className="flex flex-col md:flex-row space-y-3 justify-between px-5 py-5 border border-[#37055c] rounded-lg dark:border-dark-input-border dark:bg-dark-card">
      {/* Left Side Profile general */}
      <div className="flex flex-col md:flex-row space-x-2 mx-auto md:mx-0">
        <div className="relative h-48 w-48">
          <Image src={doctorData.image} alt="Anavheoba" fill />
        </div>
        <div className="space-y-2">
          <h5 className="text-lg font-medium text-[#37055c] dark:text-white">
            {doctorData.name}
          </h5>
          <p className="text-[#37055c] dark:text-dark-muted">
            {doctorData.specialization}
          </p>
          <p className="text-primary-blue dark:text-primary-yellow">Dentist</p>
          <div className="flex space-x-2 text-[#37055c] items-center dark:text-dark-muted">
            <GoLocation className="h-6 w-6" />
            <span>{doctorData.address}</span>
          </div>
        </div>
      </div>

      {/* Right Feedback, Appointment */}
      <div className="space-y-2 items-center mx-auto md:mx-0">
        <div className="space-y-2 text-[#37055c] dark:text-dark-muted">
          <div className="flex space-x-2 items-center">
            <GoThumbsup className="h-6 w-6" />
            <span>99%</span>
          </div>
          <div className="flex space-x-2 items-center">
            <BsChat className="h-6 w-6" />
            <span>35 Feedback</span>
          </div>
          <div className="flex space-x-2 items-center">
            <GoLocation className="h-6 w-6" />
            <span>
              {doctorData.city}, {doctorData.state}
            </span>
          </div>
          <div className="flex space-x-2 items-center">
            <BiMoney className="h-6 w-6" />
            <span>
              <span className="font-semibold">{doctorData.chargeStart}</span> SH per hour
            </span>
          </div>
        </div>
        <div className="flex space-x-2 text-[#37055c]">
          <div className="border border-[#37055c] rounded-md p-2 hover:bg-primary-green hover:text-white dark:border-dark-input-border dark:text-dark-muted dark:hover:bg-primary-yellow dark:hover:text-black">
            <BsBookmark className="h-5 w-5" />
          </div>
          <div className="border border-[#37055c] rounded-md p-2 hover:bg-primary-green hover:text-white dark:border-dark-input-border dark:text-dark-muted dark:hover:bg-primary-yellow dark:hover:text-black">
            <BiChat className="h-5 w-5" />
          </div>
          <div className="border border-[#37055c] rounded-md p-2 hover:bg-primary-green hover:text-white dark:border-dark-input-border dark:text-dark-muted dark:hover:bg-primary-yellow dark:hover:text-black">
            <BsFillTelephoneFill className="h-5 w-5" />
          </div>
          <div className="border border-[#37055c] rounded-md p-2 hover:bg-primary-green hover:text-white dark:border-dark-input-border dark:text-dark-muted dark:hover:bg-primary-yellow dark:hover:text-black">
            <BsFillCameraVideoFill className="h-5 w-5" />
          </div>
        </div>
        <button className="px-3 py-3 bg-primary-blue text-white rounded-md text-xl font-medium dark:bg-primary-yellow dark:text-black">
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default ProfileGeneral;
