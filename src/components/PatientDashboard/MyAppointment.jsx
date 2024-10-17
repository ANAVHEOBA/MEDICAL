import React, { useState } from "react";
import JoinAppointment from "./JoinAppointment";

const MyAppointment = ({ myAppointmentList }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [activeDoctorId, setActiveDoctorId] = useState();

  return (
    <div className="px-6 py-6 border border-purple-600 rounded-lg flex flex-col bg-gradient-to-br from-purple-900 to-gray-900">
      <h4 className="text-2xl font-semibold text-white">
        My Appointments
      </h4>
      <table className="mt-6 w-full text-gray-200">
        <thead>
          <tr className="text-left border-b border-purple-600">
            <th className="py-2">Doctor Id</th>
            <th className="py-2">Symptoms</th>
            <th className="py-2">Past Medical History</th>
            <th className="py-2">Appointment Date</th>
            <th className="py-2">Appointment Time</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {myAppointmentList &&
            myAppointmentList.map((appointmentItem) => (
              <tr
                key={appointmentItem.appointmentId}
                className="text-left border-b border-purple-600 hover:bg-purple-600 hover:text-white transition-colors"
              >
                <td className="py-2">{appointmentItem.doctorId}</td>
                <td className="py-2 px-1">{appointmentItem.symptoms}</td>
                <td className="py-2 px-1">{appointmentItem.pastSymptoms}</td>
                <td className="py-2 px-1">{appointmentItem.date}</td>
                <td className="py-2 px-1">{appointmentItem.time}</td>
                <td
                  className="py-2 px-1 cursor-pointer text-pink-400 hover:text-pink-300"
                  onClick={() => {
                    setActiveDoctorId(appointmentItem.doctorId);
                    setIsShowModal(true);
                  }}
                >
                  View
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {isShowModal && (
        <JoinAppointment
          activeDoctorId={activeDoctorId}
          isShowModal={isShowModal}
          setIsShowModal={setIsShowModal}
        />
      )}
    </div>
  );
};

export default MyAppointment;
