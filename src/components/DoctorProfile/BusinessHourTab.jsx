import React from "react";

function BusinessHourTab() {
  const businessHourList = [
    {
      id: 1,
      day: "Monday",
      timeSlot: "07:00 AM - 09:00 PM",
    },
    {
      id: 2,
      day: "Tuesday",
      timeSlot: "07:00 AM - 09:00 PM",
    },
    {
      id: 3,
      day: "Wednesday",
      timeSlot: "07:00 AM - 09:00 PM",
    },
    {
      id: 4,
      day: "Thursday",
      timeSlot: "07:00 AM - 09:00 PM",
    },
    {
      id: 5,
      day: "Friday",
      timeSlot: "07:00 AM - 09:00 PM",
    },
    {
      id: 6,
      day: "Saturday",
      timeSlot: "07:00 AM - 09:00 PM",
    },
    {
      id: 7,
      day: "Sunday",
      timeSlot: "Closed",
    },
  ];

  return (
    <div className="px-3 md:px-10 mx-1 md:mx-56 py-5 border border-primary-purple rounded-lg dark:border-dark-input-border bg-gradient-to-r from-primary-purple to-primary-pink">
  <div>
    {businessHourList.map((hourSlot) => (
      <div key={hourSlot.id} className="flex justify-between">
        <span className="text-black font-semibold dark:text-dark-muted">
          {hourSlot.day}
        </span>
        <span className="text-primary-purple dark:text-dark-muted">
          {hourSlot.timeSlot}
        </span>
      </div>
    ))}
  </div>
</div>

  );
}

export default BusinessHourTab;
