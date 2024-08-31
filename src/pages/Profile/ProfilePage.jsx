import React from 'react';
import AccountDashboard from './AccountDashboard';
import LeftSide from './LeftSide';
import { ProfileData } from './profileData';

const ProfilePage = () => {
  return (
    <div className="bg-gray-200 overflow-hidden">
      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2">
          <div className="w-full md:w-3/12 md:mx-2">
            <LeftSide profileData={ProfileData} /> 
          </div>
          <div className="w-full md:w-9/12 md:mx-2">
            <AccountDashboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;