import Image from "next/image";
import React from "react";
import FindCard from "./FindCard";

const FindSection = () => {
  const findList = [
    {
      id: 1,
      title: "Visit Doctor",
      btnName: "Book now",
      image: "/images.jpeg",
      path: "",
    },
    {
      id: 2,
      title: "Find a Pharmacy",
      btnName: "Find Now",
      image: "/pharma.jpg",
      path: "",
    },
    {
      id: 3,
      title: "Find a Lab",
      btnName: "Find Now",
      image: "/lab.jpg",
      path: "",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-purple-900 to-gray-900 dark:from-purple-800 dark:to-gray-800 py-10">
      <p className="text-center text-3xl font-semibold text-white">
        What are you looking for?
      </p>
      <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 lg:grid-cols-3 px-12 md:mx-20 mt-5">
        {findList.map((findItem) => (
          <FindCard key={findItem.id} {...findItem} />
        ))}
      </div>
    </div>
  );
};

export default FindSection;
