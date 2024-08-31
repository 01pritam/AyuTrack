import React from 'react';
import data from './profdata.json'; // Import the JSON file
import AccountSectionCard from './AccountSectionCard'; // Import the new component

const AccountDashboard = () => {
  return (
    <div>
      {/* Profile Section */}
      <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-white shadow rounded-lg border-t-4 border-green-400">
        <div className="flex items-center">
          <img
            src="https://plus.unsplash.com/premium_photo-1683288446478-d998f96592e0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with the actual profile image path
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
          <div className="ml-4">
            <h2 className="text-xl font-bold">{data.profile.name}</h2>
            <p className="text-gray-500">{data.profile.specialization}</p>
            <p className="text-sm">{data.profile.qualifications}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold">{data.profile.workplace.role}</p>
          <p>{data.profile.workplace.clinic}</p>
          <p>{data.profile.workplace.department}</p>
          <p>{data.profile.address}</p>
        </div>
      </div>

      {/* Account Sections */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.accountSections.map((section, index) => (
          <AccountSectionCard
            key={index}
            title={section.title}
            description={section.description}
            image={section.image}
          />
        ))}
      </div>
    </div>
  );
};

export default AccountDashboard;
