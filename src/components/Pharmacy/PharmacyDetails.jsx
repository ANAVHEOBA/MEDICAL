import React, { useEffect, useState, useCallback } from "react";
import ProfileTab from "../DoctorProfile/ProfileTab";
import PharmacyGeneral from "./PharmacyGeneral";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAccount, useSigner } from "wagmi";
import { useProvider } from "wagmi";
import { ethers } from "ethers";
import deDoctorABI from "@/constants/constants";
import generateIpfsMediaLink from "@/utils/generateIpfsLink";
import { Dna } from "react-loader-spinner";

function PharmacyDetails() {
  const router = useRouter();
  const { pharmacyId } = router.query;
  const provider = useProvider();
  const { data: signer, isError, isLoading } = useSigner();
  const { address, isConnecting, isDisconnected } = useAccount();
  const [pharmacyData, setPharmacyData] = useState(null);

  // Wrap getFetchPharmacyData in useCallback
  const getFetchPharmacyData = useCallback(async () => {
    try {
      const patientRegisterContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_DEDOCTOR_SMART_CONTRACT || "",
        deDoctorABI,
        signer || provider
      );
      const traction = await patientRegisterContract.getPharmacyById(pharmacyId);
      const data = traction;
      const metaResponse = await axios.get(data.uri);
      const meta = metaResponse.data;
      const jsonData = {
        id: data.id.toString(),
        name: meta.name,
        address: meta.address,
        openTime: meta.startTime,
        dealer: meta.medicineSpecialization,
        image: generateIpfsMediaLink(meta.image),
        phone: "8877889988",
        state: meta.state,
        city: meta.city,
      };

      setPharmacyData(jsonData);
    } catch (error) {
      console.error("Error fetching pharmacy data:", error);
      toast.error("Failed to fetch pharmacy data.");
    }
  }, [pharmacyId, provider, signer]);

  useEffect(() => {
    if (pharmacyId) {
      getFetchPharmacyData();
    }
  }, [pharmacyId, getFetchPharmacyData]);

  return (
    <div className="px-5 py-5 m-5">
      <div>
        {pharmacyData ? (
          <PharmacyGeneral pharmacyData={pharmacyData} />
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
      <ToastContainer /> {/* Ensure ToastContainer is rendered */}
    </div>
  );
}

export default PharmacyDetails;
