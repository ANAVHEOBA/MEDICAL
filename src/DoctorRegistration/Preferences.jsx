import React, { useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import Availabilities from "./Availabilities";
import CostConsultation from "./CostConsultation";
import OnlineConsultation from "./OnlineConsultation";

const Preferences = ({ preference, setPreference, submitIpfs }) => {
  const preferenceList = [
    {
      id: 1,
      title: "Cost of Consultation",
      component: (
        <CostConsultation
          preference={preference}
          setPreference={setPreference}
        />
      ),
    },
    {
      id: 2,
      title: "Preferred means for online consultations",
      component: (
        <OnlineConsultation
          preference={preference}
          setPreference={setPreference}
        />
      ),
    },
    {
      id: 3,
      title: "Availabilities",
      component: (
        <Availabilities
          preference={preference}
          setPreference={setPreference}
          submitIpfs={submitIpfs}
        />
      ),
    },
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="form-group p-5 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md space-y-4">
      <h5 className="font-semibold text-2xl dark:text-primary-yellow">Preferences</h5>
      <p className="text-[#37055c] dark:text-dark-muted">
        This can be edited later on from the account settings.
      </p>
      <div className="space-y-5">
        {preferenceList.map((preferenceItem) => (
          <div
            key={preferenceItem.id}
            className={`px-4 py-3 border border-[#37055c] rounded-md dark:border-dark-input-border dark:bg-dark-blue-input transition-colors hover:bg-gray-200 dark:hover:bg-gray-800`}
          >
            <div className="flex justify-between items-center dark:text-dark-muted">
              <span>{preferenceItem.title}</span>
              <AiOutlineRight
                className={`h-6 w-6 cursor-pointer dark:text-primary-yellow transform transition-transform ${
                  activeTab === preferenceItem.id ? "rotate-90" : ""
                }`}
                onClick={() =>
                  setActiveTab(activeTab === preferenceItem.id ? 0 : preferenceItem.id)
                }
              />
            </div>
            <div className={`mt-4 ${activeTab === preferenceItem.id ? "" : "hidden"}`}>
              {preferenceItem.component}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Preferences;
