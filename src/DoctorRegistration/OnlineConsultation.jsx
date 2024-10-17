import React from "react";
import {
  AiTwotoneAudio,
  AiOutlineVideoCameraAdd,
  AiOutlineWechat,
} from "react-icons/ai";

const OnlineConsultation = ({ preference, setPreference }) => {
  const callTypeList = [
    {
      key: 1,
      title: "Audio call",
      icon: AiTwotoneAudio,
    },
    {
      key: 2,
      title: "Video call",
      icon: AiOutlineVideoCameraAdd,
    },
    {
      key: 3,
      title: "Chat",
      icon: AiOutlineWechat,
    },
  ];

  return (
    <div className="p-5 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md space-y-3 flex flex-col">
      <h5 className="font-semibold text-2xl dark:text-white">
        Which are your preferred means of online consultation?
      </h5>
      <p className="text-[#37055c] dark:text-dark-muted">
        You can select more than one from the below. These will show up as
        options for the patient when booking an appointment.
      </p>
      <div className="flex space-x-2">
        {callTypeList.map((callTypeItem) => (
          <div
            key={callTypeItem.key}
            className="flex space-x-2 px-4 py-2 border border-[#37055c] rounded-md dark:border-dark-input-border hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <callTypeItem.icon className="h-6 w-6" />
            <span className="dark:text-white">{callTypeItem.title}</span>
          </div>
        ))}
      </div>
      <p className="text-[#37055c] dark:text-dark-muted">
        Choose your preferred language for Audio, Video calls, and chat. You can
        select more than one option.
      </p>
      <div className="input-group">
        <label className="input-label" htmlFor="language">
          Language *
        </label>
        <select
          className="input-box dark:bg-dark-input-border dark:text-white rounded-md border p-2"
          value={preference.language}
          onChange={(e) =>
            setPreference({
              ...preference,
              language: e.currentTarget.value,
            })
          }
          id="language"
        >
          <option value="french">French</option>
          <option value="Portugese">Portugese</option>
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
        </select>
      </div>
      <button 
        className="submit-btn w-40 bg-[#37055c] text-white hover:bg-[#4f0072] transition-colors rounded-lg py-2"
      >
        Save
      </button>
    </div>
  );
};

export default OnlineConsultation;
