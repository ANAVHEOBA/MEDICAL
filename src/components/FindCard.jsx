import Image from "next/image";
import React from "react";

function FindCard({ id, title, image, btnName }) {
  return (
    <div className="relative rounded-lg" key={id}>
      <div className="relative h-60 w-72 bg-gradient-to-br from-purple-900 via-gray-900 to-slate-900 rounded-lg overflow-hidden shadow-lg">
        <Image
          src={image}
          alt={title}
          fill
          className="brightness-90 rounded-md"
        />
        <div className="absolute top-[50%] left-[10%] transform -translate-y-1/2">
          <p className="text-white text-2xl font-semibold">{title}</p>
          <button className="bg-primary-blue font-semibold px-2 py-2 text-white rounded-md dark:bg-primary-yellow dark:text-black">
            {btnName}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FindCard;
