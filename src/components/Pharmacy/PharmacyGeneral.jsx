import Image from "next/image";
import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { HiLocationMarker } from "react-icons/hi";
import { useRouter } from "next/router";

const PharmacyGeneral = ({ pharmacyData }) => {
  const router = useRouter();

  const handleSendMessage = () => {
    // Logic to handle sending a message
    console.log("Send message clicked");
  };

  const handleCallNow = () => {
    // Logic to handle calling
    console.log("Call now clicked");
  };

  return (
    <div className="flex flex-col md:flex-row space-y-3 justify-between px-5 py-5 border border-purple-600 rounded-lg bg-gradient-to-br from-purple-900 to-gray-900 dark:border-dark-input-border dark:bg-dark-card">
      {/* Left Side Profile general */}
      <div className="flex flex-col md:flex-row space-x-2 mx-auto md:mx-0">
        <div className="relative h-48 w-48">
          <Image src={pharmacyData.image} alt={pharmacyData.name} fill className="rounded-md" />
        </div>
        <div className="space-y-2">
          <h5 className="text-lg font-medium text-purple-600 dark:text-white hover:text-primary-yellow transition duration-300">
            {pharmacyData.name}
          </h5>
          <div className="flex space-x-2 items-center dark:text-dark-muted">
            <FiPhoneCall className="h-6 w-6" />
            <span>{pharmacyData.phone}</span>
          </div>
          <div className="flex space-x-2 items-center">
            <HiLocationMarker className="h-6 w-6" />
            <span>{pharmacyData.address}</span>
          </div>
          <div className="flex space-x-2 items-center">
            <AiOutlineRight className="h-6 w-6" />
            <span>{pharmacyData.dealer}</span>
          </div>
          <div className="flex space-x-2 items-center">
            <AiOutlineRight className="h-6 w-6" />
            <span>{pharmacyData.openTime}</span>
          </div>
        </div>
      </div>

      {/* Right Feedback, Appointment */}
      <div className="space-y-2 items-center mx-auto md:mx-0 flex flex-col">
        <button
          className="px-8 py-2 border-2 w-56 border-primary-blue text-primary-blue rounded-lg hover:bg-primary-blue hover:text-white transition transform ease-out duration-300 dark:border-primary-yellow dark:text-white dark:hover:bg-primary-yellow dark:hover:text-black"
          onClick={handleSendMessage}
        >
          Send Message
        </button>
        <button
          className="px-8 py-2 border-2 w-56 border-primary-blue text-white bg-primary-blue rounded-lg hover:bg-white hover:text-primary-blue transition transform ease-out duration-300 dark:bg-primary-yellow dark:text-black dark:border-none"
          onClick={handleCallNow}
        >
          Call Now
        </button>
      </div>
    </div>
  );
};

export default PharmacyGeneral;
