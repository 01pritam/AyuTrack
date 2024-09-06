import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Package, TrendingUp, Clock, Star, ChevronRight } from 'lucide-react';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const profileData = {
    name: "John Doe",
    role: "Manufacturer",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    bio: "Experienced manufacturer with a passion for quality and efficiency. Specializing in pharmaceutical products with over 15 years of industry experience.",
    stats: [
      { label: "Orders", value: 1234 },
      { label: "Products", value: 56 },
      { label: "Revenue", value: "₹54,32,100" },
    ],
    skills: ["Quality Control", "Supply Chain Management", "GMP Compliance", "Process Optimization"],
    recentOrders: [
      { id: "ORD1234", product: "Paracetamol", quantity: 10000, status: "Delivered" },
      { id: "ORD5678", product: "Ibuprofen", quantity: 5000, status: "Processing" },
      { id: "ORD9101", product: "Aspirin", quantity: 7500, status: "Shipped" },
      { id: "ORD1122", product: "Amoxicillin", quantity: 3000, status: "Pending" },
    ],
    topProducts: [
      { name: "Paracetamol", sales: 50000, rating: 4.8 },
      { name: "Ibuprofen", sales: 45000, rating: 4.7 },
      { name: "Aspirin", sales: 40000, rating: 4.9 },
      { name: "Amoxicillin", sales: 35000, rating: 4.6 },
    ]
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-teal-600 h-40"></div>
          <div className="px-4 py-6 md:px-8">
            <div className="flex flex-wrap">
              <div className="w-full md:w-3/12 md:pr-4">
                <div className="-mt-24">
                  <div className="bg-white p-3 rounded-lg shadow-xl inline-block">
                    <div className="w-32 h-32 bg-teal-200 rounded-full flex items-center justify-center">
                      <User className="w-16 h-16 text-teal-600" />
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
                <div className="mt-6">
                  <h2 className="text-lg font-semibold mb-2">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill, index) => (
                      <span key={index} className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-full md:w-9/12 mt-8 md:mt-0">
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <p className="text-gray-600 mb-6">{profileData.bio}</p>
                <h2 className="text-xl font-semibold mb-4">Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {profileData.stats.map((stat, index) => (
                    <StatCard key={index} label={stat.label} value={stat.value} />
                  ))}
                </div>
                <div className="mb-4">
                  <div className="flex border-b">
                    <button
                      className={`py-2 px-4 ${activeTab === 'orders' ? 'border-b-2 border-teal-500 text-teal-600' : 'text-gray-500'}`}
                      onClick={() => setActiveTab('orders')}
                    >
                      Recent Orders
                    </button>
                    <button
                      className={`py-2 px-4 ${activeTab === 'products' ? 'border-b-2 border-teal-500 text-teal-600' : 'text-gray-500'}`}
                      onClick={() => setActiveTab('products')}
                    >
                      Top Products
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto">
                  {activeTab === 'orders' ? (
                    <div className="space-y-4">
                      {profileData.recentOrders.map((order, index) => (
                        <OrderCard key={index} order={order} />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {profileData.topProducts.map((product, index) => (
                        <ProductCard key={index} product={product} />
                      ))}
                    </div>
                  )}
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
    <p className="text-2xl font-bold text-teal-600">{value}</p>
  </div>
);

const OrderCard = ({ order }) => (
  <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
    <div>
      <h3 className="font-semibold">{order.product}</h3>
      <p className="text-sm text-gray-600">Order ID: {order.id}</p>
      <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
    </div>
    <div className="flex items-center">
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
        order.status === 'Shipped' ? 'bg-teal-100 text-teal-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {order.status}
      </span>
      <ChevronRight className="w-5 h-5 text-gray-400 ml-2" />
    </div>
  </div>
);

const ProductCard = ({ product }) => (
  <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
    <div>
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600">Sales: {product.sales}</p>
    </div>
    <div className="flex items-center">
      <div className="flex items-center mr-2">
        <Star className="w-4 h-4 text-yellow-400 mr-1" />
        <span className="text-sm font-semibold">{product.rating}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </div>
  </div>
);

export default ProfilePage;