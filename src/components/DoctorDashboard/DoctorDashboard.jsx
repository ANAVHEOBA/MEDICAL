import React, { useEffect, useState } from "react";
import DoctorAppointments from "./DoctorAppointments";
import DoctorGeneral from "./DoctorGeneral";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers } from "ethers";
import { useAccount, useSigner } from "wagmi";
import { useProvider } from "wagmi";
import deDoctorABI from "@/constants/constants";
import { Dna } from "react-loader-spinner";

function DoctorDashboard() {
  const provider = useProvider();
  const { data: signer, isError, isLoading } = useSigner();
  const { address, isConnecting, isDisconnected } = useAccount();
  const [doctorData, setDoctorData] = useState();
  const [doctorAppointmentList, setDoctorAppointmentList] = useState();

  const fetchDoctorData = async () => {
    const patientRegisterContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_DEDOCTOR_SMART_CONTRACT || "",
      deDoctorABI,
      signer || provider
    );
    const traction = await patientRegisterContract.getDoctorByWalletAddress(
      address
    );
    let meta = await axios.get(traction.profileURI);
    meta = meta.data;
    const doctorId = traction.doctorId.toString();
    setDoctorData({ ...meta, doctorId });
  };

  const fetchDoctorAppointments = async () => {
    const patientRegisterContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_DEDOCTOR_SMART_CONTRACT || "",
      deDoctorABI,
      signer || provider
    );
    const traction = await patientRegisterContract.getAppointmentsByDoctorId(
      doctorData.doctorId
    );
    const newItems = await Promise.all(
      traction.map(async (d) => {
        return {
          doctorId: d.doctorId.toString(),
          patientId: d.patientId.toString(),
          pastSymptoms: d.pastSymptoms,
          symptoms: d.symptoms,
          time: d.time,
          date: d.date,
          appointmentId: d.id.toString(),
        };
      })
    );
    setDoctorAppointmentList(newItems);
  };

  useEffect(() => {
    if (address) {
      fetchDoctorData();
      if (doctorData && doctorData.doctorId) {
        fetchDoctorAppointments();
      }
    }
  }, [doctorData]);

  return (
    <div className="flex space-x-5 my-8 mx-5">
      <div>
        {doctorData ? (
          <DoctorGeneral doctorData={doctorData} />
        ) : (
          <div className="flex justify-end items-center">
            <Dna
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        )}
      </div>
      <div>
        {doctorAppointmentList ? (
          <DoctorAppointments doctorAppointmentList={doctorAppointmentList} />
        ) : (
          <div className="flex justify-end items-center">
            <Dna
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorDashboard;
