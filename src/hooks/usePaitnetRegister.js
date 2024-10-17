import { useState, useEffect } from "react";
import { ethers } from "ethers";
import deDoctorABI from "@/constants/constants";

const useContractData = (provider, signer, walletAddress) => {
  const [contract, setContract] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Initialize the contract instance
    const contractInstance = new ethers.Contract(
      process.env.NEXT_PUBLIC_DEDOCTOR_SMART_CONTRACT || "",
      deDoctorABI,
      provider
    );
    
    // Connect the signer if available
    const contractSigner = signer
      ? contractInstance.connect(signer)
      : contractInstance;
    
    setContract(contractSigner);
  }, [provider, signer]);

  const updateData = async (patientData, ipfsUrl) => {
    console.log(patientData);
    console.log(ipfsUrl);

    if (contract) {
      try {
        // Call the smart contract method to update data
        const tx = await contract.registerPatient(
          patientData.name,
          walletAddress,
          patientData.gender,
          patientData.city,
          ipfsUrl
        );
        
        // Wait for the transaction to be mined
        await tx.wait();
        console.log(tx);
      } catch (error) {
        console.error("Error updating data:", error);
      }
    }
  };

  return [data, updateData];
};

export default useContractData;
