import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import DoctorProfile from "@/components/DoctorProfile/DoctorProfile";
import React from "react";

function DoctorProfilePage() {
  return (
    <div>
      <Breadcrumb subHeading="Home/ Doctor Profile" heading="Doctor Profile" />
      <DoctorProfile />
    </div>
  );
}

export default DoctorProfilePage;
