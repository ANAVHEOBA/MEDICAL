import { useRouter } from "next/router";
import React from "react";
import { IconType } from "react-icons";

function RegisterCard({ id, icon: Icon, title, description, routeRegister, routeLogin }) {
  const router = useRouter();

  return (
    <div className="px-6 py-4 border border-purple-600 flex flex-col space-y-2 rounded-md bg-gray-800 justify-center shadow-md transition-transform transform hover:scale-105">
      <Icon className="h-10 w-10 text-purple-400" />
      <h5 className="font-semibold text-xl text-white">{title}</h5>
      <p className="text-gray-300">{description}</p>
      <div className="flex space-x-3">
        <button
          className="px-4 py-2 text-lg font-medium rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 transition-opacity"
          onClick={() => router.push(routeRegister)}
        >
          Register
        </button>
        <button
          className="px-4 py-2 text-lg font-medium rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 transition-opacity"
          onClick={() => router.push(routeLogin)}
        >
          Login/View Dashboard
        </button>
      </div>
    </div>
  );
}

export default RegisterCard;
