import { updateStep } from "@/features/doctorStepSlice";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { GrDocumentText } from "react-icons/gr";

const UploadIdentification = ({
  identificationData,
  setIdentificationData,
  identificationDoc,
  setIdentificationDoc,
}) => {
  const doctorStep = useSelector((state) => state.doctorStep.value);
  const dispatch = useDispatch();

  return (
    <div className="p-5 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
      <h5 className="font-semibold text-2xl dark:text-white">Upload Identification</h5>
      <p className="text-[#37055c] dark:text-dark-muted">
        We need to determine if an identity document is authentic and belongs to you. You just need to go through some steps which will help us to build a secure system together.
      </p>
      <div className="input-group">
        <label className="input-label font-medium" htmlFor="docType">
          Document Type *
        </label>
        <select
          name="docType"
          className="input-box md:w-[35rem] border rounded-lg p-2 dark:bg-dark-input-border dark:text-white"
          value={identificationData.docType}
          onChange={(e) =>
            setIdentificationData({
              ...identificationData,
              docType: e.currentTarget.value,
            })
          }
          id="docType"
        >
          <option value={"none"}>Select Document Type</option>
          <option value={"pdf"}>PDF</option>
          <option value={"txt"}>TXT</option>
          <option value={"jpeg"}>JPEG</option>
        </select>
      </div>
      <div className="input-group">
        <label className="input-label font-medium" htmlFor="docNumber">
          Document Number *
        </label>
        <input
          type="text"
          id="docNumber"
          className="input-box md:w-[35rem] border rounded-lg p-2 dark:bg-dark-input-border dark:text-white"
          placeholder="Enter Document Number"
          value={identificationData.docNumber}
          onChange={(e) =>
            setIdentificationData({
              ...identificationData,
              docNumber: e.currentTarget.value,
            })
          }
        />
      </div>
      <div className="flex w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-96 h-32 border-2 border-[#37055c] border-dashed rounded-lg cursor-pointer bg-[#F5F6FA] hover:bg-gray-200 dark:bg-dark-blue-input dark:border-dark-input-border dark:hover:bg-gray-800 transition-colors"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <GrDocumentText className="w-10 h-10 mb-3 dark:text-white" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Upload Document</span>
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={(e) =>
              setIdentificationDoc(
                e.currentTarget.files && e.currentTarget.files[0]
              )
            }
          />
        </label>
      </div>
      <button 
        className="submit-btn bg-[#37055c] text-white px-4 py-2 rounded hover:bg-[#4f0072] transition-colors"
        onClick={() => dispatch(updateStep(2))}
      >
        Continue
      </button>
    </div>
  );
};

export default UploadIdentification;
