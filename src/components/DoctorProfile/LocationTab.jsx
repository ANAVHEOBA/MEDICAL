import React from "react";
import { GoLocation, GoThumbsup } from "react-icons/go";


function LocationTab() {
  const timeSlot = [
    {
      id: 1,
      days: "Mon - Sat",
      time: ["10:00 AM - 2:00 PM", "4:00 PM - 9:00 PM"],
    },
    {
      id: 2,
      days: "Sun",
      time: ["10:00 AM - 2:00 PM"],
    },
  ];

  return (
    <div className="px-5 py-5 border border-primary-purple rounded-lg dark:border-dark-input-border flex flex-col md:flex-row space-y-3 justify-between bg-gradient-radial from-primary-purple via-primary-pink to-primary-green">
  <div className="space-y-3">
    <h5 className="text-lg font-semibold dark:text-white">UBTH</h5>
    <p className="text-primary-purple dark:text-dark-muted">
      MDS - Periodontology and Oral Implantology, BDS
    </p>
    <div className="flex items-center space-x-2 text-primary-purple dark:text-dark-muted">
      <GoLocation className="h-6 w-6" />
      <span>Ugbowo, UBTH, BENIN, EDO, Nigeria</span>
    </div>
  </div>
      {/* Center - time slot */}
      <div>
        {timeSlot.map((slotItem) => (
          <div key={slotItem.id}>
            <p className="font-semibold text-xl">{slotItem.days}</p>
            {slotItem.time.map((timeItem, index) => (
              <p key={index}>{timeItem}</p>
            ))}
          </div>
        ))}
      </div>
      {/* Right */}
      <div>
        <p className="font-medium text-lg">$ 250</p>
      </div>
    </div>
  );
}

export default LocationTab;
