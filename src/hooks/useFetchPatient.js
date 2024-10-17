import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import deDoctorABI from "@/constants/constants";

const useContractData = (provider, walletAddress) => {
  const [contract, setContract] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!provider) return;

    // Create an instance of the contract using the ABI and provider
    const contractInstance = new ethers.Contract(
      process.env.NEXT_PUBLIC_DEDOCTOR_SMART_CONTRACT || "",
      deDoctorABI,
      provider
    );
    setContract(contractInstance);
  }, [provider]);

  const fetchData = useCallback(async () => {
    if (contract && walletAddress) {
      try {
        // Call the smart contract method to fetch data
        const result = await contract.getPatientByWalletAddress(walletAddress);
        setData(result);
      } catch (error) {
        console.error("Error fetching data from contract:", error);
      }
    }
  }, [contract, walletAddress]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return data;
};

export default useContractData;
