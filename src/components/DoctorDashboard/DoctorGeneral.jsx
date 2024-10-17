import generateIpfsMediaLink from "@/utils/generateIpfsLink";
import Image from "next/image";
import React from "react";
import { GoLocation } from "react-icons/go";

const DoctorGeneral = ({ doctorData }) => {
  return (
    <div className="px-4 py-4 border border-[#6b21a8] rounded space-y-2 flex flex-col justify-between dark:border-[#6b21a8] dark:bg-[#37055c]">
      <div className="relative w-36 h-36">
        <Image
          src={generateIpfsMediaLink(doctorData.image)}
          fill
          alt="logo"
          className="rounded-full"
        />
      </div>
      <h5 className="dark:text-primary-yellow cursor-pointer hover:text-primary-green duration-300 transition transform ease-out">
        {doctorData.name}
      </h5>
      <p className="dark:text-pink-300">{doctorData.specialization}</p>
      <div className="flex space-x-2 text-[#6b21a8] items-center dark:text-pink-300">
        <GoLocation className="h-6 w-6" />
        <span>{`${doctorData.city} ${doctorData.state}`}</span>
      </div>
    </div>
  );
};

export default DoctorGeneral;
