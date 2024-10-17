import React from 'react';
import { BsFillTelephoneFill, BsFillMicFill, BsFillMicMuteFill, BsFillPersonFill } from 'react-icons/bs';
import { MdCallEnd } from 'react-icons/md';

const CallPage = () => {
  const [isMuted, setIsMuted] = React.useState(false);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-slate-900">
      <div className="text-center mb-10">
        <BsFillPersonFill className="text-9xl text-primary-green dark:text-primary-yellow" />
        <h2 className="text-2xl font-semibold mt-5 dark:text-white">Calling...</h2>
      </div>
      <div className="flex space-x-5">
        <button
          className="p-4 bg-red-600 text-white rounded-full hover:bg-red-700"
          onClick={() => console.log('Call Ended')}
        >
          <MdCallEnd className="h-8 w-8" />
        </button>
        <button
          className="p-4 bg-gray-300 text-white rounded-full hover:bg-gray-400 dark:hover:bg-gray-600"
          onClick={toggleMute}
        >
          {isMuted ? <BsFillMicMuteFill className="h-8 w-8" /> : <BsFillMicFill className="h-8 w-8" />}
        </button>
      </div>
    </div>
  );
};

export default CallPage;
