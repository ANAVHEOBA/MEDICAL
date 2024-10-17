import React, { useState, useEffect } from "react";
import DoctorVerification from "./DoctorVerification";
import PersonalDetailsForm from "./PersonalDetailsForm";
import Preferences from "./Preferences";
import UploadIdentification from "./UploadIdentification";
import { useSelector, useDispatch } from "react-redux";
import { updateStep } from "@/features/doctorStepSlice";
import { useAccount, useSigner, useProvider } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers } from "ethers";
import Tesseract from 'tesseract.js';
import deDoctorABI from "@/constants/constants";
// @ts-ignore
import WeaveDB from 'weavedb-sdk';
import { ColorRing } from "react-loader-spinner";

const WEAVEDB_CONTRACT_TX_ID = "DznefHbFhcyqyjZ0aNGqsWwkjcwRDlraUR72EkXames";

function SuccessPopup({ isVisible, onClose, transactionId }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4">Registration Successful!</h2>
        <p>Your doctor profile has been registered successfully.</p>
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

const DoctorRegistration = () => {
  const { address } = useAccount();
  const doctorStep = useSelector((state) => state.doctorStep.value);
  const dispatch = useDispatch();

  const [personalData, setPersonalData] = useState({
    name: "",
    about: "",
    address: "",
    city: "",
    dob: "",
    gender: "",
    state: "",
  });
  const [userImage, setUserImage] = useState(null);
  const [identificationData, setIdentificationData] = useState({
    docNumber: "",
    docType: "",
  });
  const [identificationDoc, setIdentificationDoc] = useState(null);
  const [medicalCouncilData, setMedicalCouncilData] = useState({
    councilNumber: "",
    specialization: "",
  });
  const [councilFile, setCouncilFile] = useState(null);
  const [preference, setPreference] = useState({
    minAmount: 0,
    callType: [""],
    date: "",
    days: [""],
    startTime: "",
    language: "",
    endTime: "",
  });

  const [weaveDB, setWeaveDB] = useState(null);
  const { data: signer } = useSigner();
  const provider = useProvider();
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [transactionId, setTransactionId] = useState("");

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

    const arrayBuffer = await file.arrayBuffer();

    try {
      const response = await fetch('https://api.akord.com/files', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Api-Key': process.env.NEXT_PUBLIC_AKORD_API || "",
          'Content-Type': file.type,
        },
        body: arrayBuffer,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.id || result.fileId;
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

  const submitAkord = async () => {
    if (!userImage) {
      toast.error("Please upload an image.");
      return;
    }

    setLoading(true);

    try {
      const [userImageId, identificationDocId, councilFileId] = await Promise.all([
        uploadToAkord(userImage),
        uploadToAkord(identificationDoc),
        uploadToAkord(councilFile),
      ]);

      const [userImageText, identificationDocText, councilFileText] = await Promise.all([
        processImageWithTesseract(`https://api.akord.com/files/${userImageId}`),
        processImageWithTesseract(`https://api.akord.com/files/${identificationDocId}`),
        processImageWithTesseract(`https://api.akord.com/files/${councilFileId}`),
      ]);

      if (weaveDB) {
        await weaveDB.add({
          personalData,
          userImageId,
          userImageText,
          identificationData,
          identificationDocId,
          identificationDocText,
          medicalCouncilData,
          councilFileId,
          councilFileText,
          preference,
          walletAddress: address,
        }, 'anavheoba');

        const price = ethers.utils.parseUnits(preference.minAmount.toString(), "ether");
        const patientRegisterContract = new ethers.Contract(
          process.env.NEXT_PUBLIC_DEDOCTOR_SMART_CONTRACT || "",
          deDoctorABI,
          signer || provider
        );
        const transaction = await patientRegisterContract.registerDoctor(
          personalData.name,
          personalData.gender,
          personalData.city,
          preference.language,
          address,
          price,
          userImageId
        );
        const tx = await transaction.wait();

        setTransactionId(tx.transactionHash);
        setShowSuccessPopup(true);
      } else {
        toast.error("WeaveDB is not initialized.");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const registrationSteps = [
    {
      id: 1,
      title: "Registration",
      subTitle: "Enter Details for Registration",
      component: (
        <PersonalDetailsForm
          personalData={personalData}
          setPersonalData={setPersonalData}
          userImage={userImage}
          setUserImage={setUserImage}
        />
      ),
    },
    {
      id: 2,
      title: "Upload Identity",
      subTitle: "Upload your Identity for Verification",
      component: (
        <UploadIdentification
          identificationData={identificationData}
          setIdentificationData={setIdentificationData}
          identificationDoc={identificationDoc}
          setIdentificationDoc={setIdentificationDoc}
        />
      ),
    },
    {
      id: 3,
      title: "Doctor Verification",
      subTitle: "Setup Your Payment Details",
      component: (
        <DoctorVerification
          medicalCouncilData={medicalCouncilData}
          setMedicalCouncilData={setMedicalCouncilData}
          councilFile={councilFile}
          setCouncilFile={setCouncilFile}
        />
      ),
    },
    {
      id: 4,
      title: "Preferences",
      subTitle: "Setup Your Preferences for your Account",
      component: (
        <Preferences
          preference={preference}
          setPreference={setPreference}
          submitAkord={submitAkord}
        />
      ),
    },
  ];

  return (
    <div className="px-5 py-3 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <ToastContainer theme="dark" />
      <div className="flex flex-col md:flex-row space-x-5 space-y-5">
        <div className="space-y-3 md:w-[24rem]">
          {registrationSteps.map((registrationStep) => (
            <div
              key={registrationStep.id}
              className="flex space-x-2 px-2 py-3 shadow-lg rounded-md cursor-pointer border border-[#37055c] dark:border-dark-input-border dark:bg-dark-card hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              onClick={() => dispatch(updateStep(registrationStep.id - 1))}
            >
              <div className="rounded-full p-2 bg-[#37055c] text-white w-10 h-10 text-center dark:bg-primary-yellow dark:text-black">
                {registrationStep.id}
              </div>
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{registrationStep.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">{registrationStep.subTitle}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-1 border-l border-gray-300 dark:border-dark-input-border">
          {registrationSteps[doctorStep]?.component}
        </div>
      </div>
      <SuccessPopup isVisible={showSuccessPopup} onClose={() => setShowSuccessPopup(false)} transactionId={transactionId} />
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#4fa94d', '#f4a300', '#3d7f2a', '#65c9ff', '#6c63ff']}
          />
        </div>
      )}
    </div>
  );
};

export default DoctorRegistration;
