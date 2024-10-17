import React, { useState } from "react";
import { useAccount, useSigner } from "wagmi";
import { ethers } from "ethers";
import deDoctorABI from "@/constants/constants"; // Import your smart contract ABI

function Login() {
  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [patient, setPatient] = useState(null);

  const checkPatientStatus = async () => {
    if (!address) {
      setError("Please connect your wallet.");
      return;
    }

    setLoading(true);
    try {
      let patientContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_DEDOCTOR_SMART_CONTRACT || "",
        deDoctorABI,
        signer
      );

      const patientData = await patientContract.getPatientByWalletAddress(address);
      if (patientData.walletAddress) {
        setPatient(patientData);
        setError("");
      } else {
        setError("You are not registered as a patient.");
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {isConnected ? (
        <div>
          <p>Connected as: {address}</p>
          <button onClick={checkPatientStatus} className="check-btn">
            Check Patient Status
          </button>
          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
          {patient && (
            <div>
              <h3>Welcome, {patient.name}!</h3>
              {/* Display additional patient info if necessary */}
            </div>
          )}
        </div>
      ) : (
        <p>Please connect your wallet to log in.</p>
      )}
    </div>
  );
}

export default Login;
