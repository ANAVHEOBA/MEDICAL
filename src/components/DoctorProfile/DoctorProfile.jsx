import deDoctorABI from "@/constants/constants";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState, useCallback } from "react";
import ProfileGeneral from "./ProfileGeneral";
import ProfileTab from "./ProfileTab";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAccount, useSigner, useProvider } from "wagmi";
import { ethers } from "ethers";
import { Dna } from "react-loader-spinner";

const DoctorProfile = () => {
  const router = useRouter();
  const { id } = router.query;
  const [doctorData, setDoctorData] = useState();
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address } = useAccount();

  // Define updateData with useCallback to ensure it's stable
  const updateData = useCallback(async () => {
    const patientRegisterContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_DEDOCTOR_SMART_CONTRACT || "",
      deDoctorABI,
      signer || provider
    );
    console.log(patientRegisterContract);
    const traction = await patientRegisterContract.getDoctorById(id);
    const data = traction;
    let meta = await axios.get(data.profileURI);
    meta = meta.data;
    const jsonData = {
      name: meta.name,
      specialization: meta.specialization,
      image: 'src/public/ADOC.png', // Correct path to the image in the public directory
      address: meta.address,
      chargeStart: meta.minAmount,
      chargeEnd: 0,
      slotTime: "",
      about: meta.description,
      city: meta.city,
      state: meta.state,
      price: meta.minAmount,
      walletAddress: data.docAddress,
      id: data.doctorId.toString(),
    };

    setDoctorData(jsonData);
  }, [id, provider, signer]); // Ensure dependencies are included

  useEffect(() => {
    if (id) {
      updateData();
    }
  }, [id, updateData]); // Add updateData to dependency array

  return (
    <div className="px-5 py-5 m-5">
      <div>
        {doctorData ? (
          <>
            <ProfileGeneral doctorData={doctorData} />
            <div className="flex justify-center items-center my-5">
              <img src={doctorData.image} alt="Doctor" className="w-32 h-32 object-cover rounded-full" />
            </div>
          </>
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
      <div>
        <ProfileTab />
      </div>
      <ToastContainer />
    </div>
  );
};

export default DoctorProfile;
