import React from "react";
import { IconType } from "react-icons";
import { TbStethoscope } from "react-icons/tb";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { MdLocalPharmacy } from "react-icons/md";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import RegisterCard from "./RegisterCard";

function SelectRegister() {
  // Define the structure for register type items
  const registerTypeList = [
    {
      id: 1,
      icon: TbStethoscope,
      title: "Sign/Login in as Doctor",
      description:
        "Connect with your patients and manage your clinic with ease. Get started with deDoctor today.",
      routeRegister: "/doctor_registration",
      routeLogin: "/doctor_dashboard",
    },
    {
      id: 2,
      icon: BsFillPersonPlusFill,
      title: "Sign/Login In as Patient",
      description:
        "Connect with your doctors and manage your health with ease. Get started with deDoctor today.",
      routeRegister: "/register_patient",
      routeLogin: "/patient_dashboard",
    },
    {
      id: 3,
      icon: MdLocalPharmacy,
      title: "Register/Login Pharmacy",
      description: "Pharmacy show our user and buy and sell with contact you",
      routeRegister: "/register_pharmacy",
      routeLogin: "/register_pharmacy",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-purple-900 to-slate-900 min-h-screen">
      <Breadcrumb heading="Register/Login" subHeading="Home / Register-Login" />
      <div className="container mx-auto px-6 mt-10 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-4 gap-x-4">
          {registerTypeList.map((registerTypeItem) => {
            return (
              <RegisterCard key={registerTypeItem.id} {...registerTypeItem} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SelectRegister;
