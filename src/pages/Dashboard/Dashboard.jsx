import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, Truck, AlertTriangle } from 'lucide-react';

const data = [
  { name: 'Jan', orders: 4000 },
  { name: 'Feb', orders: 3000 },
  { name: 'Mar', orders: 2000 },
  { name: 'Apr', orders: 2780 },
  { name: 'May', orders: 1890 },
  { name: 'Jun', orders: 2390 },
];

function Dashboard() {
  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <h1 className='text-3xl font-bold text-center text-blue-600 mb-8'>
        Supply Chain Monitoring Dashboard
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        <StatCard title="Total Orders" value="12,345" icon={Package} color="blue" />
        <StatCard title="Pending Deliveries" value="1,234" icon={Truck} color="yellow" />
        <StatCard title="Out of Stock" value="56" icon={AlertTriangle} color="red" />
      </div>

      <div className='bg-white shadow-lg rounded-lg p-6 mb-8'>
        <h2 className='text-xl font-semibold mb-4'>Order Fulfillment Rate</h2>
        <div className='h-64'>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className='bg-white shadow-lg rounded-lg p-6'>
        <h2 className='text-xl font-semibold mb-4'>Recent Orders</h2>
        <div className='overflow-x-auto'>
          <table className='w-full table-auto'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='px-4 py-2 text-left'>Order ID</th>
                <th className='px-4 py-2 text-left'>Product</th>
                <th className='px-4 py-2 text-left'>Quantity</th>
                <th className='px-4 py-2 text-left'>Status</th>
              </tr>
            </thead>
            <tbody>
              <TableRow id="ORD1234" product="Paracetamol" quantity="1000" status="Delivered" />
              <TableRow id="ORD5678" product="Ibuprofen" quantity="500" status="Pending" />
              <TableRow id="ORD9101" product="Aspirin" quantity="750" status="In Transit" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className={`bg-white shadow-lg rounded-lg p-6 border-l-4 border-${color}-500`}>
    <div className="flex items-center justify-between">
      <div>
        <h2 className='text-xl font-semibold text-gray-700'>{title}</h2>
        <p className={`text-2xl font-bold text-${color}-500 mt-2`}>{value}</p>
      </div>
      <Icon className={`w-12 h-12 text-${color}-500 opacity-20`} />
    </div>
  </div>
);

const TableRow = ({ id, product, quantity, status }) => {
  const statusColor = status === 'Delivered' ? 'green' : status === 'Pending' ? 'yellow' : 'blue';
  return (
    <tr>
      <td className='border-b px-4 py-2'>{id}</td>
      <td className='border-b px-4 py-2'>{product}</td>
      <td className='border-b px-4 py-2'>{quantity}</td>
      <td className='border-b px-4 py-2'>
        <span className={`inline-block px-2 py-1 text-xs font-semibold text-${statusColor}-700 bg-${statusColor}-100 rounded-full`}>
          {status}
        </span>
      </td>
    </tr>
  );
};

export default Dashboard;