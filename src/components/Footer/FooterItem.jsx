import React from 'react';
import { BiChevronsRight } from "react-icons/bi";

function FooterItem({ id, name, route }) {
  return (
    <li className="flex space-x-2 items-center cursor-pointer text-gray-300">
      <BiChevronsRight className="h-6 w-6 text-pink-400" />
      <span className="hover:text-white hover:pl-2 transition transform duration-300 ease-linear">
        {name}
      </span>
    </li>
  );
}
export default FooterItem;
