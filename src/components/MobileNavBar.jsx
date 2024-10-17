import React, { useState } from "react";
import Image from "next/image";
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

function MobileNavBar() {
  // State to toggle the visibility of the navigation menu
  const [isVisibleNav, setIsVisibleNav] = useState(false);

  // Navigation item list
  const navItemList = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "Doctors", url: "/doctors" },
    { id: 3, name: "Pharmacy", url: "/pharmacy" },
    { id: 4, name: "Register/Login", url: "/register" },
    { id: 5, name: "Profile", url: "/q" },
    { id: 6, name: "Chat", url: "/Chat" },
  ];

  // Toggle the visibility of the navigation menu
  const handleNavToggle = () => {
    setIsVisibleNav(!isVisibleNav);
  };

  return (
    <nav className="px-3 py-2 bg-gradient-to-br from-purple-900 to-gray-900 dark:from-purple-800 dark:to-gray-800">
      <div className="flex items-center justify-between">
        <div className="relative h-16 w-16">
          <Image src="/logo-no-background.svg" alt="DeDoctor" fill />
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 rounded-md border-2 border-primary-green text-primary-green transition transform ease duration-300 hover:text-white hover:bg-primary-green">
            Connect Wallet
          </button>
          {isVisibleNav ? (
            <AiOutlineClose
              className="h-10 w-10 cursor-pointer text-white"
              onClick={handleNavToggle}
            />
          ) : (
            <BiMenu
              className="h-10 w-10 cursor-pointer text-white"
              onClick={handleNavToggle}
            />
          )}
        </div>
      </div>

      <div
        className={`${
          isVisibleNav ? "block" : "hidden"
        } transition-transform ease-linear duration-300 z-10 mt-4 bg-white dark:bg-gray-900 rounded-md shadow-lg`}
      >
        <ul className="space-y-2 p-4">
          {navItemList.map((navItem) => {
            return (
              <li
                key={navItem.id}
                className="px-4 py-2 cursor-pointer hover:text-white hover:bg-gray-300 transition transform duration-300 ease-linear rounded-md"
              >
                <a href={navItem.url} className="flex items-center">
                  {navItem.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default MobileNavBar;
