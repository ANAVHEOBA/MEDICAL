import Image from "next/image";
import React from "react";

function FooterCol1() {
  return (
    <div className="space-y-2">
      <div className="relative h-24 w-36">
        <Image src="/logo_white.png" alt="DeDoctor" layout="fill" />
      </div>
      <p className="text-gray-300">
        We understand that time is valuable, and our service is designed to be
        convenient and efficient. Our service is available 24/7, so patients can
        receive medical advice whenever they need it.
      </p>
    </div>
  );
}
export default FooterCol1;

