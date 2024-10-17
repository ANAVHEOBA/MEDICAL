import React from "react";
import { useDispatch } from "react-redux";
import { pharmacyUpdateStep } from "@/features/pharmacyStepSlice";

const PharmacyPersonal = ({
  pharmacyPersonaData,
  setPharmacyPersonalData,
  pharmacyImage,
  setPharmacyImage,
}) => {
  const dispatch = useDispatch();

  // Handler for image file input change
  const handleImageChange = (e) => {
    const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
    setPharmacyImage(file);
  };

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    setPharmacyPersonalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Render the form group component
  const renderFormGroup = (label, id, name, value, placeholder, type = "text") => (
    <div className="input-group">
      <label className="input-label text-purple-600 dark:text-white" htmlFor={id}>
        {label} *
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className="input-box border border-purple-600 rounded-lg p-2 focus:outline-none focus:ring focus:ring-purple-300"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );

  // Render the form text area component
  const renderTextArea = (label, id, name, value, placeholder) => (
    <div className="input-group">
      <label className="input-label text-purple-600 dark:text-white" htmlFor={id}>
        {label} *
      </label>
      <textarea
        name={name}
        id={id}
        className="input-box border border-purple-600 rounded-lg p-2 focus:outline-none focus:ring focus:ring-purple-300 md:w-[30rem] h-[6rem]"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );

  return (
    <div className="form-group space-y-4">
      <div className="flex w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-96 h-32 border-2 border-purple-600 border-dashed rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-dark-blue-input dark:border-dark-input-border"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            name="image"
            onChange={handleImageChange}
          />
        </label>
      </div>
      {renderFormGroup(
        "Pharmacy Legal Name",
        "name",
        "name",
        pharmacyPersonaData.name,
        "Enter Pharmacy Name"
      )}
      {renderTextArea(
        "Address",
        "address",
        "address",
        pharmacyPersonaData.address,
        "Enter Address"
      )}
      <div className="flex flex-col md:flex-row space-x-2">
        {renderFormGroup(
          "City",
          "city",
          "city",
          pharmacyPersonaData.city,
          "City"
        )}
        {renderFormGroup(
          "State",
          "state",
          "state",
          pharmacyPersonaData.state,
          "State"
        )}
      </div>
      {renderTextArea(
        "About Pharmacy",
        "about",
        "about",
        pharmacyPersonaData.about,
        "Describe the Pharmacy"
      )}
      <button
        className="submit-btn px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300"
        onClick={() => dispatch(pharmacyUpdateStep(1))}
      >
        Continue
      </button>
    </div>
  );
};

export default PharmacyPersonal;
