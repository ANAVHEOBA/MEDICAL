// src/components/VideoCallPage.js
import React from 'react';
import { BsFillCameraVideoFill, BsFillCameraVideoOffFill, BsFillMicFill, BsFillMicMuteFill, BsFillPersonFill } from 'react-icons/bs';
import { MdCallEnd } from 'react-icons/md';

const VideoCallPage = () => {
  const [isMuted, setIsMuted] = React.useState(false);
  const [isCameraOn, setIsCameraOn] = React.useState(true);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-900 to-gray-900 dark:from-purple-800 dark:to-gray-800">
      <div className="text-center mb-10">
        <div className="relative h-64 w-64 bg-gray-200 dark:bg-dark-muted rounded-full flex items-center justify-center">
          {isCameraOn ? (
            <BsFillPersonFill className="text-9xl text-primary-green dark:text-primary-yellow" />
          ) : (
            <BsFillCameraVideoOffFill className="text-9xl text-gray-400 dark:text-dark-muted" />
          )}
        </div>
        <h2 className="text-2xl font-semibold mt-5 dark:text-white">In Call...</h2>
      </div>
      <div className="flex space-x-5">
        <button
          className="p-4 bg-red-600 text-white rounded-full hover:bg-red-700"
          onClick={() => console.log('Call Ended')}
        >
          <MdCallEnd className="h-8 w-8" />
        </button>
        <button
          className="p-4 bg-gray-300 dark:bg-dark-muted text-black dark:text-white rounded-full hover:bg-gray-400 dark:hover:bg-gray-600"
          onClick={toggleMute}
        >
          {isMuted ? <BsFillMicMuteFill className="h-8 w-8" /> : <BsFillMicFill className="h-8 w-8" />}
        </button>
        <button
          className="p-4 bg-gray-300 dark:bg-dark-muted text-black dark:text-white rounded-full hover:bg-gray-400 dark:hover:bg-gray-600"
          onClick={toggleCamera}
        >
          {isCameraOn ? <BsFillCameraVideoFill className="h-8 w-8" /> : <BsFillCameraVideoOffFill className="h-8 w-8" />}
        </button>
      </div>
    </div>
  );
};

export default VideoCallPage;
