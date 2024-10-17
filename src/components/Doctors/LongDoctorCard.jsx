import Image from "next/image";
import React from "react";
import { BiChat, BiMoney } from "react-icons/bi";
import { BsChat, BsFillCameraVideoOffFill, BsTelephoneFill } from "react-icons/bs";
import { GoLocation, GoThumbsup } from "react-icons/go";
import { useRouter } from "next/router";

function LongDoctorCard({ id, name, category, image, address, slotTime, chargeStart, chargeEnd, city, state }) {
  const router = useRouter();
  return (
    <div className="px-4 py-4 border border-nav-border flex justify-between rounded-md dark:border-dark-input-border dark:bg-dark-card shadow-light transition-transform duration-300 hover:scale-105">
      <div className="flex space-x-2">
        <div className="relative h-32 w-32">
          <Image
            src={image}
            alt={name}
            fill
            className="rounded-lg"
          />
        </div>
        <div>
          <h3 
            className="text-primary-green dark:text-white cursor-pointer hover:text-primary-yellow duration-300 transition-transform ease-out"
            onClick={() => router.push(`/doctor/${id}`)}
          >
            {name}
          </h3>
          <p className="dark:text-dark-muted">{category}</p>
          <div className="flex space-x-2 text-primary-blue items-center dark:text-dark-muted">
            <GoLocation className="h-6 w-6" />
            <span>{address}</span>
          </div>
        </div>
      </div>
      <div>
        <div className="space-y-2 items-center mx-auto md:mx-0">
          <div className="space-y-2 text-primary-blue dark:text-dark-muted">
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
              <span>{city}, {state}</span>
            </div>
            <div className="flex space-x-2 items-center">
              <BiMoney className="h-6 w-6" />
              <span><span className="font-semibold">{chargeStart}</span> SH per hour</span>
            </div>
          </div>
          <button className="px-3 py-2 bg-gradient-accent text-white rounded-md text-xl transition-transform duration-300 hover:scale-105">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

export default LongDoctorCard;
