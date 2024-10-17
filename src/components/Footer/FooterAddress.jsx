import React from "react";
import { GoLocation } from "react-icons/go";
import { AiOutlinePhone } from "react-icons/ai";
import { BiMessage } from "react-icons/bi";

function FooterAddress() {
  return (
    <div className="text-gray-300">
      <h5 className="text-white font-medium text-lg">Contact Us</h5>
      <ul className="mt-5 space-y-4">
        <li className="flex space-x-2 items-center">
          <GoLocation className="h-8 w-8 p-2 rounded-full bg-purple-600 text-white" />
          <span>123 Ugbowo, Benin EDO State, Nigeria 100001</span>
        </li>
        <li className="flex space-x-2 items-center">
          <AiOutlinePhone className="h-8 w-8 p-2 rounded-full bg-purple-600 text-white" />
          <span>+2348160899603</span>
        </li>
        <li className="flex space-x-2 items-center">
          <BiMessage className="h-8 w-8 p-2 rounded-full bg-purple-600 text-white" />
          <span>dedoctor@example.com</span>
        </li>
      </ul>
    </div>
  );
}
export default FooterAddress;
