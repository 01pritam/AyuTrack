// Header.js
import React from "react";

const Header = ({ handlePrint }) => (
  <div className="bg-white shadow-md rounded-lg p-6 mb-6">
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <svg className="w-12 h-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path d="M12 2l1.553 3.146 3.465.504-2.507 2.447.592 3.448L12 8.875l-3.103 1.641.592-3.448-2.507-2.447 3.465-.504L12 2z" className="text-blue-600" />
        </svg>
        <h1 className="text-2xl font-semibold text-gray-800">Invoice</h1>
      </div>
      <div className="text-right">
      </div>
    </div>
    <div className="mt-4">
      <h2 className="text-xl font-semibold text-gray-800">Your Company Name</h2>
      <p className="text-gray-600">1234 Main Street, City, State, ZIP</p>
      <p className="text-gray-600">info@yourcompany.com</p>
    </div>
  </div>
);

export default Header;
