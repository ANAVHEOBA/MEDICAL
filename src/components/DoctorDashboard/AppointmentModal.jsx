import React from "react";
import { MdClose } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { useRouter } from "next/router";

const AppointmentModal = ({ isShowModal, setIsModal }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gradient-to-r from-purple-700 via-pink-500 to-purple-600">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-[#37055c] outline-none focus:outline-none dark:border dark:border-[#6b21a8]">
            <div className="flex items-start justify-between p-5 border-b border-solid border-[#6b21a8] rounded-t">
              <h3 className="text-3xl font-semibold dark:text-primary-yellow">
                Patient Info
              </h3>
              <button
                className="bg-transparent border-0 text-black float-right"
                onClick={() => setIsModal(false)}
              >
                <span className="text-black opacity-7 px-2 py-2 text-xl block bg-purple-500 rounded-full">
                  <MdClose className="h-5 w-5" />
                </span>
              </button>
            </div>
            <div className="relative p-6 flex-auto space-y-1">
              <div className="flex space-x-2">
                <FiUser className="h-6 w-6" />
                <span className="text-xl dark:text-primary-yellow">
                  Nayan Radadiya
                </span>
              </div>
              <div className="flex space-x-2 dark:text-pink-300">
                <span className="text-muted dark:text-pink-300 dark:font-semibold">
                  Wallet Address:
                </span>
                <span className="modal-heading">
                  0x78CbEcC95172Aacb79F60Ae3d1f074D2e48207c4
                </span>
              </div>
              <div className="flex space-x-2 dark:text-pink-300">
                <span className="text-muted dark:text-pink-300 dark:font-semibold">
                  Address:
                </span>
                <span className="modal-heading">
                  Near National Stadium, Surulere, Lagos, Nigeria
                </span>
              </div>
              <div className="flex space-x-2 dark:text-pink-300">
                <span className="text-muted dark:text-pink-300 dark:font-semibold">
                  Gender:
                </span>
                <span className="modal-heading">male</span>
              </div>
              <div className="flex space-x-2 dark:text-pink-300">
                <span className="text-muted dark:text-pink-300 dark:font-semibold">
                  Date of Birth:
                </span>
                <span className="modal-heading">23/07/1775</span>
              </div>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-[#6b21a8] rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => setIsModal(false)}
              >
                Close
              </button>
              <button
                className="submit-btn bg-gradient-to-r from-purple-700 via-pink-500 to-purple-600 text-white"
                type="button"
                onClick={() => {
                  router.push('/meet_room');
                  setIsModal(false);
                }}
              >
                Join Meeting
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentModal;
