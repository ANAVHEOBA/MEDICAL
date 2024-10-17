import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAccount, useProvider, useSigner } from "wagmi";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorRing } from "react-loader-spinner";
import deDoctorABI from "@/constants/constants";
import { pharmacyUpdateStep } from "@/features/pharmacyStepSlice";
import OwnerDetails from "./OwnerDetails";
import PharmacyPersonal from "./PharmacyPersonal";
import PharmacyVerification from "./PharmacyVerification";
import PreferencePharmacy from "./PreferencePharmacy";
import Tesseract from 'tesseract.js';
// @ts-ignore
import WeaveDB from 'weavedb-sdk';

const WEAVEDB_CONTRACT_TX_ID = "DznefHbFhcyqyjZ0aNGqsWwkjcwRDlraUR72EkXames";

function SuccessPopup({ isVisible, onClose, transactionId }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4">Registration Successful!</h2>
        <p>Your pharmacy has been registered successfully.</p>
        <p className="mt-2">Transaction ID: {transactionId}</p>
        <button 
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}

const RegisterPharmacy = () => {
  const doctorStep = useSelector((state) => state.pharmacyStep.value);
  const dispatch = useDispatch();

  const [pharmacyPersonaData, setPharmacyPersonalData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    about: "",
  });
  const [pharmacyImage, setPharmacyImage] = useState(null);

  const [pharmacyOwnerData, setPharmacyOwnerData] = useState({
    name: "",
    gender: "",
    dob: "",
    city: "",
    state: "",
    about: "",
  });
  const [pharmacyOwnerImage, setPharmacyOwnerImage] = useState(null);

  const [pharmacyVerificationData, setPharmacyVerificationData] = useState({
    councilNumber: "",
    medicineSpecialization: "",
  });
  const [pharmacyVerificationDoc, setPharmacyVerificationDoc] = useState(null);

  const [pharmacyPreferenceData, setPharmacyPreferenceData] = useState({
    openDays: [],
    startTime: "",
    endTime: "",
  });

  const [weaveDB, setWeaveDB] = useState(null);
  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address } = useAccount();

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initWeaveDB = async () => {
      const db = new WeaveDB({ contractTxId: WEAVEDB_CONTRACT_TX_ID });
      await db.init();
      setWeaveDB(db);
    };
    initWeaveDB();
  }, []);

  const uploadToAkord = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.cloud.url;
    } catch (error) {
      toast.error('Error uploading file: ' + error.message);
      console.error('Error details:', error);
      return null;
    }
  };

  const fetchImageAsBlob = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    return await response.blob();
  };

  const processImageWithTesseract = async (imageUrl) => {
    try {
      const imageBlob = await fetchImageAsBlob(imageUrl);
      const { data: { text } } = await Tesseract.recognize(imageBlob, 'eng', {
        logger: m => console.log(m)
      });
      return text;
    } catch (error) {
      console.error('Tesseract OCR error:', error);
      return '';
    }
  };

  const onSubmitPharmacy = async () => {
    if (!weaveDB) {
      toast.error("WeaveDB is not initialized.");
      return;
    }

    setLoading(true);

    try {
      const [pharmacyImageUrl, ownerImageUrl, verificationDocUrl] = await Promise.all([
        uploadToAkord(pharmacyImage),
        uploadToAkord(pharmacyOwnerImage),
        uploadToAkord(pharmacyVerificationDoc),
      ]);

      const [pharmacyImageText, ownerImageText, verificationDocText] = await Promise.all([
        processImageWithTesseract(pharmacyImageUrl),
        processImageWithTesseract(ownerImageUrl),
        processImageWithTesseract(verificationDocUrl),
      ]);

      // Save data to WeaveDB
      await weaveDB.add({
        pharmacyData: {
          ...pharmacyPersonaData,
          imageUrl: pharmacyImageUrl,
          imageText: pharmacyImageText,
        },
        ownerData: {
          ...pharmacyOwnerData,
          imageUrl: ownerImageUrl,
          imageText: ownerImageText,
        },
        verificationData: {
          ...pharmacyVerificationData,
          docUrl: verificationDocUrl,
          docText: verificationDocText,
        },
        preferenceData: pharmacyPreferenceData,
        walletAddress: address,
      }, 'anavheoba');

      let patientRegisterContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_DEDOCTOR_SMART_CONTRACT || "",
        deDoctorABI,
        signer || provider
      );

      let transaction = await patientRegisterContract.registerPharmacy(
        pharmacyPersonaData.name,
        pharmacyPersonaData.city,
        pharmacyOwnerData.name,
        address,
        pharmacyVerificationData.councilNumber,
        pharmacyImageUrl
      );
      let tx = await transaction.wait();

      setTransactionId(tx.transactionHash);
      setShowSuccessPopup(true);
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  const registrationSteps = [
    {
      id: 1,
      title: "Registration",
      subTitle: "Enter Pharmacy Details",
      component: (
        <PharmacyPersonal
          pharmacyPersonaData={pharmacyPersonaData}
          setPharmacyPersonalData={setPharmacyPersonalData}
          pharmacyImage={pharmacyImage}
          setPharmacyImage={setPharmacyImage}
        />
      ),
      step: 1,
    },
    {
      id: 2,
      title: "Owner Details",
      subTitle: "Enter pharmacy owner Details",
      component: (
        <OwnerDetails
          pharmacyOwnerData={pharmacyOwnerData}
          setPharmacyOwnerData={setPharmacyOwnerData}
          pharmacyOwnerImage={pharmacyOwnerImage}
          setPharmacyOwnerImage={setPharmacyOwnerImage}
        />
      ),
      step: 2,
    },
    {
      id: 3,
      title: "Pharmacy Verification",
      subTitle: "Identification of your Pharmacy",
      component: (
        <PharmacyVerification
          pharmacyVerificationData={pharmacyVerificationData}
          setPharmacyVerificationData={setPharmacyVerificationData}
          pharmacyVerificationDoc={pharmacyVerificationDoc}
          setPharmacyVerificationDoc={setPharmacyVerificationDoc}
        />
      ),
      step: 3,
    },
    {
      id: 4,
      title: "Preferences",
      subTitle: "Setup Your Preferences for your Account",
      component: (
        <PreferencePharmacy
          pharmacyPreferenceData={pharmacyPreferenceData}
          setPharmacyPreferenceData={setPharmacyPreferenceData}
          onSubmitPharmacy={onSubmitPharmacy}
        />
      ),
      step: 4,
    },
  ];

  return (
    <div className="px-5 py-3">
      <ToastContainer theme="light" />
      <div className="flex flex-col md:flex-row space-x-5 space-y-5">
        <div className="space-y-3 md:w-[24rem]">
          {registrationSteps.map((registrationStep) => (
            <div
              key={registrationStep.id}
              className="flex space-x-2 px-5 py-3 bg-white border rounded-lg shadow-md"
            >
              <div className="flex items-center justify-center w-10 h-10 text-white bg-blue-500 rounded-full">
                {registrationStep.id}
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-lg font-semibold">{registrationStep.title}</h2>
                <p className="text-sm text-gray-600">{registrationStep.subTitle}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="md:flex-grow p-5 bg-white rounded-lg shadow-md">
          {registrationSteps[doctorStep - 1].component}
        </div>
      </div>
      <SuccessPopup 
        isVisible={showSuccessPopup} 
        onClose={() => setShowSuccessPopup(false)} 
        transactionId={transactionId} 
      />
      {loading && (
        <div className="flex justify-center mt-5">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#4fa94d', '#f57c00', '#e50000', '#00bfff', '#b200b2']}
          />
        </div>
      )}
    </div>
  );
};

export default RegisterPharmacy;
