import React from "react";
import Image from "next/image"; // Import Image component from Next.js
import { MdLocationOn } from "react-icons/md";
import { BiTime, BiMoney } from "react-icons/bi";

function DoctorCard({ id, name, category, image, address, slotTime, chargeStart, chargeEnd }) {
  return (
    <div className="p-3 bg-gradient-to-br from-purple-900 via-gray-900 to-slate-900 rounded-md shadow-lg space-y-2 dark:border dark:border-dark-input-border dark:bg-dark-card dark:text-dark-muted">
      <div className="relative h-36 w-full">
        {/* Use Next.js Image component for automatic image optimization */}
        <Image 
          src={image} 
          alt={name} 
          className="rounded-md object-cover" 
          layout="fill" 
          objectFit="cover" 
        />
      </div>
      <h4 className="text-[#37055c] font-medium text-lg dark:text-white">{name}</h4>
      <p className="text-[#37055c] text-sm dark:text-dark-muted">{category}</p>
      <div className="text-[#37055c] space-y-2 dark:text-dark-muted">
        <div className="flex items-center space-x-2">
          <MdLocationOn className="h-5 w-5" />
          <span>{address}</span>
        </div>
        <div className="flex items-center space-x-2">
          <BiTime className="h-5 w-5" />
          <span>{slotTime}</span>
        </div>
        <div className="flex items-center space-x-2">
          <BiMoney className="h-5 w-5" />
          <span>{`$${chargeStart} - $${chargeEnd}`}</span>
        </div>
      </div>
      <div className="flex space-x-3">
        <button className="px-2 py-2 border border-primary-blue rounded-md text-primary-blue dark:text-primary-yellow dark:border-dark-input-border">View Profile</button>
        <button className="px-2 py-2 bg-primary-blue rounded-md text-white dark:bg-primary-yellow dark:text-black">Book Now</button>
      </div>
    </div>
  );
}

export default DoctorCard;
