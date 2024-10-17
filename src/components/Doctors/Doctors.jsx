import deDoctorABI from "@/constants/constants";
import axios from "axios";
import { ethers } from "ethers";
import React, { useEffect, useState, useCallback } from "react";
import { useContractRead, useProvider, useSigner, useAccount } from "wagmi";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import LongDoctorCard from "./LongDoctorCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dna } from "react-loader-spinner";

function Doctors() {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address, isConnecting, isDisconnected } = useAccount();

  const [doctorData, setDoctorData] = useState([]);

  const updateData = useCallback(async () => {
    try {
      const patientRegisterContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_DEDOCTOR_SMART_CONTRACT || "",
        deDoctorABI,
        signer || provider
      );
      const traction = await patientRegisterContract.getAllDoctors();
      const data = traction;

      const newItems = await Promise.all(
        data.map(async (d) => {
          const meta = await axios.get(d.profileURI);
          const metaData = meta.data;
          return {
            name: metaData.name,
            category: metaData.specialization,
            image: generateIpfsMediaLink(metaData.image),
            address: metaData.address,
            chargeStart: metaData.minAmount,
            chargeEnd: 0,
            slotTime: "",
            city: metaData.city,
            state: metaData.state,
            id: d.doctorId.toString(),
          };
        })
      );

      setDoctorData(newItems);
    } catch (error) {
      console.error("Error fetching doctor data:", error);
      toast.error("Failed to load doctor data.");
    }
  }, [provider, signer]);

  useEffect(() => {
    updateData();
  }, [updateData]);

  return (
    <div>
      <Breadcrumb heading="Doctors" subHeading="Home/ Doctors" />
      {doctorData.length ? (
        <div className="mx-5 my-3 space-y-3">
          {doctorData.map((doctor) => (
            <LongDoctorCard key={doctor.id} {...doctor} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
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
  );
}

export default Doctors;
