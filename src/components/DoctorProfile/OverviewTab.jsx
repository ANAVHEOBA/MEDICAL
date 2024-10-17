import React from "react";
import { BsArrowRight } from "react-icons/bs";
import Image from 'next/image'; // Importing Image from Next.js for optimization

function OverviewTab() {
  const serviceList = [
    "Tooth cleaning",
    "Root Canal Therapy",
    "Implants",
    "Composite Bonding",
    "Fissure Sealants",
    "Surgical Extractions",
  ];
  const specializationList = [
    "Children Care",
    "Dental Care",
    "Oral and Maxillofacial Surgery",
    "Orthodontist",
    "Periodontist",
    "Prosthodontics",
  ];

  return (
    <div className="space-y-3 text-[#37055c]">
      <h5 className="text-[#37055c] text-lg font-medium dark:text-white">
        About Me
      </h5>
      <p className="text-[#37055c] dark:text-dark-muted">
        Dr. Jessica Anavheoba has been working in the field of Obstetrics and
        Gynaecology since 2016. She specializes in Reproductive medicine as well
        as general obstetrics and gynaecology. Prior to joining our practice, Dr
        Anavheoba attended University Of Benin, where she earned her
        postgraduate degree. She was trained in infertility procedures in
        Advanced Fertility Center, University Of Lagos, Nigeria.
        Her special interest is in treating infertility patients. Before joining
        us, Dr. Anavheoba worked in reputed hospitals like mercy Hospital,
        wesave Hospitals Nigeria, and UBTH Hospital. She is now a
        Consultant Obstetrician and Gynaecologist at Koshy's Hospital, Nigeria.
      </p>
      <div className="space-y-2">
        <h5 className="font-medium text-lg dark:text-white">Services</h5>
        <ul className="grid grid-cols-1 md:grid-cols-3 dark:text-dark-muted">
          {serviceList.map((serviceItem, index) => (
            <li key={index} className="space-x-2 flex">
              <BsArrowRight className="h-6 w-6" />
              <span>{serviceItem}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h5 className="font-medium text-lg dark:text-white">Specialization</h5>
        <ul className="grid grid-cols-1 md:grid-cols-3 dark:text-dark-muted">
          {specializationList.map((specializationItem, index) => (
            <li key={index} className="space-x-2 flex">
              <BsArrowRight className="h-6 w-6" />
              <span>{specializationItem}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default OverviewTab;
