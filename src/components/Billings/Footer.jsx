// Footer.js
import React from "react";

const Footer = ({ name, address, website, email, phone, bankAccount, bankName }) => (
  <div className="bg-gray-100 p-6 rounded-lg mt-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
        <p className="text-gray-600">Name: {name}</p>
        <p className="text-gray-600">Address: {address}</p>
        <p className="text-gray-600">Email: {email}</p>
        <p className="text-gray-600">Phone: {phone}</p>
      </div>
      <div className="text-right">
        <h3 className="text-lg font-semibold text-gray-800">Bank Details</h3>
        <p className="text-gray-600">Bank Name: {bankName}</p>
        <p className="text-gray-600">Account Number: {bankAccount}</p>
        <p className="text-gray-600">Website: {website}</p>
      </div>
    </div>
    <p className="mt-6 text-center text-gray-500 text-sm">Thank you for your business!</p>
  </div>
);

export default Footer;
