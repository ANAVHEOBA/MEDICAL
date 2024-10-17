import React, { useState } from "react";
import AppointmentModal from "./AppointmentModal";

const DoctorAppointments = ({ doctorAppointmentList }) => {
  const [isShowModal, setIsModal] = useState(false);

  return (
    <div className="px-4 py-4 border border-[#6b21a8] rounded space-y-2 flex flex-col md:flex-row justify-between dark:border-[#6b21a8] dark:bg-[#37055c]">
      <table>
        <thead>
          <tr className="text-left border-b border-[#6b21a8] dark:border-[#6b21a8]">
            <th className="text-left">Patient Id</th>
            <th>Symptoms</th>
            <th>Past Medical History</th>
            <th>Appointment Date</th>
            <th>Appointment Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {doctorAppointmentList &&
            doctorAppointmentList.map((appointmentItem) => {
              return (
                <tr
                  key={appointmentItem.id}
                  className="text-left border-b border-[#6b21a8] dark:border-[#6b21a8]"
                >
                  <td className="text-left">1.</td>
                  <td>{appointmentItem.symptoms}</td>
                  <td>{appointmentItem.pastSymptoms}</td>
                  <td>{appointmentItem.date}</td>
                  <td>{appointmentItem.time}</td>
                  <td
                    className="text-primary-green cursor-pointer"
                    onClick={() => setIsModal(true)}
                  >
                    View
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {isShowModal && (
        <AppointmentModal isShowModal={isShowModal} setIsModal={setIsModal} />
      )}
    </div>
  );
};

export default DoctorAppointments;
