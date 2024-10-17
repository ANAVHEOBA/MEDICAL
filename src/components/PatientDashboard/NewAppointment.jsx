import shortAddress from "@/utils/shortAddress";
import React, { useState } from "react";
import CreateAppointmentModal from "./CreateAppointmentModal";

const NewAppointment = ({ doctorList }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState();

  const updateCreateAppointment = () => {
    setIsShowModal(true);
  };

  return (
    <div className="px-6 py-6 border border-purple-600 rounded-lg flex flex-col bg-gradient-to-br from-purple-900 to-gray-900">
      <h4 className="text-2xl font-semibold text-white">
        Create New Appointment
      </h4>
      <table className="mt-6 w-full text-gray-200">
        <thead>
          <tr className="text-left border-b border-purple-600">
            <th className="py-2">Id</th>
            <th className="py-2">Name</th>
            <th className="py-2">Specialization</th>
            <th className="py-2">Consult Fee</th>
            <th className="py-2">Wallet Address</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {doctorList.map((doctorItem) => {
            return (
              <tr key={doctorItem.id} className="border-b border-purple-600 hover:bg-purple-600 hover:text-white transition-colors">
                <td className="py-4 px-2">{doctorItem.id}</td>
                <td className="py-4 px-2 text-center">{doctorItem.name}</td>
                <td className="py-4 px-2 text-center">{doctorItem.category}</td>
                <td className="py-4 px-2 text-center">{doctorItem.chargeStart}</td>
                <td className="py-4 px-2 text-center">
                  {shortAddress(doctorItem.walletAddress)}
                </td>
                <td
                  className="py-4 px-2 cursor-pointer text-pink-400 hover:text-pink-300"
                  onClick={() => {
                    setSelectedDoctor(doctorItem);
                    setIsShowModal(true);
                  }}
                >
                  Create
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isShowModal && (
        <CreateAppointmentModal
          isShowModal={isShowModal}
          setIsShowModal={setIsShowModal}
          selectedDoctor={selectedDoctor}
        />
      )}
    </div>
  );
};

export default NewAppointment;
