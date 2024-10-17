import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GrDocument } from "react-icons/gr";
import { pharmacyUpdateStep } from "@/features/pharmacyStepSlice";
import { RootState } from "@/store";

const PharmacyVerification = ({
  pharmacyVerificationData,
  setPharmacyVerificationData,
  pharmacyVerificationDoc,
  setPharmacyVerificationDoc,
}) => {
  const dispatch = useDispatch();

  // Retrieve the current step from the Redux store
  const doctorStep = useSelector((state) => state.pharmacyStep.value);

  // List of documents required for verification
  const verificationList = [
    "Certificate of Registration with the Maltese Medical Council OR Registration from the appropriate Professional Council",
    "Certificate of Good Standing (from the Maltese Medical Council - valid for 3 months from the date of issue). Doctors applying from overseas are to provide a Certificate of Good Standing issued from the most recent country of residence / practice (valid for 3 months from the date of issue) (only applicable for Medical Doctors)",
    "Curriculum Vitae",
    "Specialist Registration Certificate",
    "Digital signature: copy of the signature and registration number",
  ];

  // Handler for file input change
  const handleFileChange = (e) => {
    const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
    setPharmacyVerificationDoc(file);
  };

  // Handler for input field change
  const handleInputChange = (e) => {
    const { id, value } = e.currentTarget;
    setPharmacyVerificationData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div className="form-group space-y-4">
      {/* Heading for the verification section */}
      <h5 className="font-semibold text-2xl dark:text-primary-yellow">
        Pharmacy Verification
      </h5>

      {/* Instructions for the user */}
      <p className="text-[#37055c] dark:text-white">
        Please provide the details below and attach copies for your:
      </p>

      {/* List of required documents */}
      <ul className="space-y-2 list-disc pl-8">
        {verificationList.map((verificationItem, index) => (
          <li key={index}>{verificationItem}</li>
        ))}
      </ul>

      {/* File upload section */}
      <div className="flex w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-96 h-32 border-2 border-purple-600 border-dashed rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-dark-blue-input dark:border-dark-input-border"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <GrDocument className="w-10 h-10 mb-3 text-purple-600 dark:text-white" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Upload Document</span>
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {/* Input for Pharmacy Council Registration Number */}
      <div className="input-group">
        <label className="input-label font-medium text-purple-600 dark:text-white" htmlFor="councilNumber">
          Pharmacy council registration number*
        </label>
        <input
          type="text"
          id="councilNumber"
          className="input-box border border-purple-600 rounded-lg p-2 focus:outline-none focus:ring focus:ring-purple-300 md:w-[35rem]"
          placeholder="Pharmacy council registration number"
          value={pharmacyVerificationData.councilNumber}
          onChange={handleInputChange}
        />
      </div>

      {/* Input for Area of Specialisation */}
      <div className="input-group">
        <label className="input-label font-medium text-purple-600 dark:text-white" htmlFor="medicineSpecialization">
          Area of Specialisation*
        </label>
        <input
          type="text"
          id="medicineSpecialization"
          className="input-box border border-purple-600 rounded-lg p-2 focus:outline-none focus:ring focus:ring-purple-300 md:w-[35rem]"
          placeholder="Enter Area of Specialisation"
          value={pharmacyVerificationData.medicineSpecialization}
          onChange={handleInputChange}
        />
      </div>

      {/* Continue button */}
      <button
        className="submit-btn px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300"
        onClick={() => dispatch(pharmacyUpdateStep(2))}
      >
        Continue
      </button>
    </div>
  );
};

export default PharmacyVerification;
