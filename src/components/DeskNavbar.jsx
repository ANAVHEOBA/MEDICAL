import React from "react";
import { useTheme } from "next-themes";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { MdOutlineDarkMode, MdLightMode } from "react-icons/md";
import Image from "next/image"; // Import Image from next/image for better performance
import Link from "next/link";
import { Chat } from "@pushprotocol/uiweb";

function DeskNavbar() {
  // List of navigation items
  const navItemList = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "Doctors", url: "/doctors" },
    { id: 3, name: "Pharmacy", url: "/pharmacies" },
    { id: 4, name: "Register/Login", url: "/register" },
    { id: 5, name: "Profile", url: "/q" },
    { id: 6, name: "Chat", url: "/Chat" },
  ];

  // Use theme hook for theme management
  const { theme, setTheme } = useTheme();

  // Toggle theme function
  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="flex justify-between items-center px-4 py-3 border-b border-gray-200 shadow-lg dark:border-gray-700 bg-gradient-to-br from-purple-900 via-gray-900 to-slate-900">
      {/* Logo Section */}
      <div className="relative h-16 w-16">
        <Image
          src="/logo-no-background.svg"
          alt="DeDoctor"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Navigation Links */}
      <div>
        <ul className="flex space-x-4">
          {navItemList.map((navItem) => (
            <li key={navItem.id}>
              <Link href={navItem.url} legacyBehavior>
                <a className="text-gray-800 dark:text-white hover:text-green-500 dark:hover:text-yellow-400 transition-colors duration-300">
                  {navItem.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Theme Toggle and Connect Button */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleThemeToggle}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300"
        >
          {theme === "light" ? (
            <MdOutlineDarkMode className="w-6 h-6" />
          ) : (
            <MdLightMode className="w-6 h-6" />
          )}
        </button>
        <ConnectButton />
        {/* Commented out button for wallet connection */}
        {/* <button className="px-4 py-2 rounded-md border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-colors duration-300">
          Connect Wallet
        </button> */}
      </div>
    </nav>
  );
}

export default DeskNavbar;
