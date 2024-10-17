import React, { useState, useEffect } from "react";
import { useAccount, useProvider, useSigner } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorRing } from "react-loader-spinner";
import { ethers } from "ethers";
import deDoctorABI from "@/constants/constants";
// @ts-ignore
import WeaveDB from 'weavedb-sdk';

const WEAVEDB_CONTRACT_TX_ID = "DznefHbFhcyqyjZ0aNGqsWwkjcwRDlraUR72EkXames";

function LoginPatient() {
  const [loading, setLoading] = useState(false);
  const [db, setDb] = useState(null);

  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address } = useAccount();

  useEffect(() => {
    const initWeaveDB = async () => {
      const weaveDB = new WeaveDB({ contractTxId: WEAVEDB_CONTRACT_TX_ID });
      await weaveDB.init();
      setDb(weaveDB);
    };
    initWeaveDB();
  }, []);

  const onLoginHandle = async () => {
    if (!address) {
      toast.error("Please connect your wallet.");
      return;
    }

    try {
      setLoading(true);

      // Check if the user exists in WeaveDB
      const user = await db.get('anavheoba', ['walletAddress', '==', address]);

      if (user.length === 0) {
        toast.error("User not found. Please register first.");
        setLoading(false);
        return;
      }

      // Verify user on the smart contract
      let patientContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_DEDOCTOR_SMART_CONTRACT || "",
        deDoctorABI,
        signer || provider
      );

      let isRegistered = await patientContract.isPatientRegistered(address);

      if (!isRegistered) {
        toast.error("User not found on the blockchain. Please register first.");
        setLoading(false);
        return;
      }

      // If user exists and is registered, proceed with login
      // Here you would typically set some state or redirect the user
      toast.success("Login successful!");

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="px-5 py-3">
      <ToastContainer />
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Login to DeDoctor</h2>
        <p className="mb-4">Connect your wallet to login</p>
        <button
          className="submit-btn flex space-x-2 items-center h-14"
          onClick={onLoginHandle}
        >
          {loading ? (
            <ColorRing
              visible={true}
              height="40"
              width="40"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          ) : (
            ""
          )}
          <span>Login with Wallet</span>
        </button>
      </div>
    </div>
  );
}

export default LoginPatient;