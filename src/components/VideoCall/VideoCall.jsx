import Image from "next/image";
import React from "react";
import { FiSettings } from "react-icons/fi";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { BsFillMicFill } from "react-icons/bs";
import { MdCallEnd, MdCall } from "react-icons/md";

// VideoCall component
function VideoCall() {
  return (
    <div className="px-5 py-5 border border-purple-600 m-5 dark:border-dark-input-border dark:bg-dark-card rounded-lg shadow-lg">
      {/* Header section */}
      <div className="flex justify-between items-center border-b pb-2 dark:border-dark-input-border mb-4">
        <div className="flex space-x-2 items-center">
          <div className="relative w-14 h-14">
            <Image
              src="https://doccure.dreamguystech.com/react/template/bc4e8d916b11472fc8050d8ff94e9a9a.jpg"
              alt="user-avatar"
              fill
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-white dark:text-white font-medium">00089895dsgdsg09ff</span>
            <span className="text-green-400">Online</span>
          </div>
        </div>
        <div>
          <FiSettings className="h-6 w-6 text-gray-300 dark:text-gray-300 cursor-pointer hover:text-white transition-colors duration-200" />
        </div>
      </div>
      
      {/* Video section */}
      <div className="flex justify-center mt-10 mb-6">
        <div className="relative h-64 w-full max-w-md">
          <Image
            src="https://doccure.dreamguystech.com/react/template/16f6e25302c81711232d1da23315b38a.jpg"
            alt="video-stream"
            fill
            className="object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
      
      {/* Controls section */}
      <div className="flex justify-between px-2 py-2 items-center bg-gray-800 dark:bg-dark-card rounded-lg shadow-md">
        <div className="text-gray-300 dark:text-white">
          <span className="font-medium">00:59</span>
        </div>
        <div className="flex space-x-2">
          <div className="rounded-full text-center border p-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white cursor-pointer hover:opacity-90 transition-opacity duration-200">
            <AiOutlineVideoCamera className="w-8 h-8" />
          </div>
          <div className="rounded-full text-center border p-3 bg-gradient-to-r from-green-600 to-green-700 text-white cursor-pointer hover:opacity-90 transition-opacity duration-200">
            <BsFillMicFill className="w-8 h-8" />
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="rounded-full text-center border p-3 bg-green-700 text-white cursor-pointer hover:bg-green-800 transition-colors duration-200">
            <MdCall className="w-8 h-8" />
          </div>
          <div className="rounded-full text-center border p-3 bg-red-600 text-white cursor-pointer hover:bg-red-700 transition-colors duration-200">
            <MdCallEnd className="w-8 h-8" />
          </div>
        </div>
      </div>
      
      {/* Footer section */}
      <footer className="mt-4 px-4 py-2 bg-gray-700 dark:bg-dark-card text-center text-gray-300 dark:text-gray-300">
        <p className="text-sm">Thank you for using our video call service. For support, visit our help center.</p>
      </footer>
    </div>
  );
}

export default VideoCall;
