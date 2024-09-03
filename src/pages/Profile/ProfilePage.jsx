import React from 'react';
import { User, Mail, Phone, MapPin, Briefcase } from 'lucide-react';

const ProfilePage = () => {
  const profileData = {
    name: "John Doe",
    role: "Manufacturer",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    bio: "Experienced manufacturer with a passion for quality and efficiency.",
    stats: [
      { label: "Orders", value: 1234 },
      { label: "Products", value: 56 },
      { label: "Revenue", value: "₹54,32,100" },
    ]
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-blue-600 h-40"></div>
          <div className="px-4 py-6 md:px-8">
            <div className="flex flex-wrap">
              <div className="w-full md:w-3/12 md:pr-4">
                <div className="-mt-24">
                  <div className="bg-white p-3 rounded-lg shadow-xl inline-block">
                    <div className="w-32 h-32 bg-blue-200 rounded-full flex items-center justify-center">
                      <User className="w-16 h-16 text-blue-600" />
                    </div>
                  </div>
                </div>
                <h1 className="text-2xl font-bold mt-4">{profileData.name}</h1>
                <p className="text-gray-600">{profileData.role}</p>
                <div className="mt-4 space-y-3">
                  <ProfileInfoItem icon={Mail} text={profileData.email} />
                  <ProfileInfoItem icon={Phone} text={profileData.phone} />
                  <ProfileInfoItem icon={MapPin} text={profileData.location} />
                </div>
              </div>
              <div className="w-full md:w-9/12 mt-8 md:mt-0">
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <p className="text-gray-600 mb-6">{profileData.bio}</p>
                <h2 className="text-xl font-semibold mb-4">Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {profileData.stats.map((stat, index) => (
                    <StatCard key={index} label={stat.label} value={stat.value} />
                  ))}
                </div>
                <h2 className="text-xl font-semibold mt-8 mb-4">Recent Activity</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-600">No recent activity to display.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileInfoItem = ({ icon: Icon, text }) => (
  <div className="flex items-center text-gray-600">
    <Icon className="w-5 h-5 mr-2" />
    <span>{text}</span>
  </div>
);

const StatCard = ({ label, value }) => (
  <div className="bg-white rounded-lg shadow p-4">
    <h3 className="text-lg font-semibold text-gray-700">{label}</h3>
    <p className="text-2xl font-bold text-blue-600">{value}</p>
  </div>
);

export default ProfilePage;