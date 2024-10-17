import React from 'react';
import DeskNavbar from './DeskNavbar';
import MobileNavBar from './MobileNavBar';

function Navbar() {
  return (
    <div className="navbar-container">
      {/* Mobile Navigation Bar: Visible on mobile screens */}
      <div className="block md:hidden">
        <MobileNavBar />
      </div>
      {/* Desktop Navigation Bar: Visible on larger screens */}
      <div className="hidden md:block">
        <DeskNavbar />
      </div>
    </div>
  );
}

export default Navbar;
