import React from "react";
import FooterAddress from "./FooterAddress";
import FooterBottom from "./FooterBottom";
import FooterCol1 from "./FooterCol1";
import FooterItemList from "./FooterItemList";

function Footer() {
  const footerList1 = {
    heading: "For Patients",
    items: [
      { id: 1, name: "Search for Doctors", route: "" },
      { id: 2, name: "Login", route: "" },
      { id: 3, name: "Register", route: "" },
      { id: 4, name: "Booking", route: "" },
      { id: 5, name: "Patient Dashboard", route: "" },
    ],
  };
  const footerList2 = {
    heading: "For Doctors",
    items: [
      { id: 1, name: "Appointments", route: "" },
      { id: 2, name: "Chat", route: "" },
      { id: 3, name: "Login", route: "" },
      { id: 4, name: "Register", route: "" },
      { id: 5, name: "Doctor Dashboard", route: "" },
    ],
  };

  return (
    <footer className="py-10 px-5 bg-gradient-to-br from-purple-900 via-gray-900 to-slate-900 text-white space-y-4">
      <div className="gap-y-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div>
          <FooterCol1 />
        </div>
        <div>
          <FooterItemList {...footerList1} />
        </div>
        <div>
          <FooterItemList {...footerList2} />
        </div>
        <div>
          <FooterAddress />
        </div>
      </div>
      <FooterBottom />
    </footer>
  );
}
export default Footer;
