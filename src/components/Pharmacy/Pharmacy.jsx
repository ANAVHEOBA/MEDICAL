import deDoctorABI from "@/constants/constants";
import generateIpfsMediaLink from "@/utils/generateIpfsLink";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import PharmacyCard from "./PharmacyCard";
import { useAccount, useSigner, useProvider } from "wagmi";
import { Dna } from "react-loader-spinner";
import { ethers } from "ethers";
import { toast } from "react-toastify"; // Assuming you are using react-toastify

function Pharmacy() {
  // Define the state to hold the list of pharmacies
  const [pharmacyList, setPharmacyList] = useState([]);
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address } = useAccount();

  // Function to fetch and update pharmacy data from the blockchain
  const updateData = useCallback(async () => {
    try {
      // Create an instance of the smart contract
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_DEDOCTOR_SMART_CONTRACT || "",
        deDoctorABI,
        signer || provider
      );

      // Fetch all pharmacy data
      const traction = await contract.getAllPharmacies();
      const data = traction;

      // Process each pharmacy's data
      const newItems = await Promise.all(
        data.map(async (d) => {
          try {
            // Fetch metadata for each pharmacy
            const meta = await axios.get(d.uri);
            return {
              id: d.id.toString(),
              name: meta.data.name,
              address: meta.data.address,
              openTime: meta.data.startTime,
              dealer: meta.data.medicineSpecialization,
              image: generateIpfsMediaLink(meta.data.image),
              phone: "8877889988",
            };
          } catch (metaError) {
            console.error(`Error fetching metadata for pharmacy ${d.id}:`, metaError);
            return null;
          }
        })
      );

      // Filter out any null entries
      const filteredItems = newItems.filter(item => item !== null);
      setPharmacyList(filteredItems);
    } catch (error) {
      console.error("Error fetching pharmacies:", error);
      toast.error("Failed to load pharmacies.");
    }
  }, [signer, provider]); // Add dependencies

  // UseEffect hook to call updateData once on component mount
  useEffect(() => {
    updateData();
  }, [updateData]); // Include updateData in the dependency array

  return (
    <div>
      {/* Breadcrumb component for navigation */}
      <Breadcrumb heading="Pharmacies" subHeading="Home / Pharmacies" />
      <div className="mx-5">
        {pharmacyList.length > 0 ? (
          <div className="space-y-5 my-5">
            {/* Map over the pharmacyList and render a PharmacyCard for each item */}
            {pharmacyList.map((pharmacy) => (
              <PharmacyCard key={pharmacy.id} {...pharmacy} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            {/* Loader component to show while data is being fetched */}
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

export default Pharmacy;
