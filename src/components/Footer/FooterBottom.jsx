import React from 'react';

function FooterBottom() {
  return (
    <div className="py-5 border-t border-purple-600 flex flex-col md:flex-row justify-between text-gray-300 space-y-2">
      <div>
        <p>© 2024 DMED. All rights reserved.</p>
      </div>
      <div>
        <ul className="flex space-x-2">
          <li className="hover:text-white cursor-pointer transition transform duration-300 ease-linear">
            Terms and Conditions
          </li>
          <li className="hover:text-white cursor-pointer transition transform duration-300 ease-linear">
            Policy
          </li>
        </ul>
      </div>
    </div>
  );
}
export default FooterBottom;
