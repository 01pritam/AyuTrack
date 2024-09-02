import React from 'react';

function Dashboard() {
  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <h1 className='text-3xl font-bold text-center text-blue-600 mb-6'>
  Supply Chain Monitoring Dashboard
</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
        {/* Statistics Cards */}
        <div className='bg-white shadow-lg rounded-lg p-4'>
          <h2 className='text-xl font-semibold'>Total Orders</h2>
          <p className='text-2xl font-bold text-blue-500'>12,345</p>
        </div>
        <div className='bg-white shadow-lg rounded-lg p-4'>
          <h2 className='text-xl font-semibold'>Pending Deliveries</h2>
          <p className='text-2xl font-bold text-yellow-500'>1,234</p>
        </div>
        <div className='bg-white shadow-lg rounded-lg p-4'>
          <h2 className='text-xl font-semibold'>Out of Stock</h2>
          <p className='text-2xl font-bold text-red-500'>56</p>
        </div>
      </div>

      <div className='bg-white shadow-lg rounded-lg p-4 mb-6'>
        {/* Sample Chart */}
        <h2 className='text-xl font-semibold mb-4'>Order Fulfillment Rate</h2>
        <div className='h-64 bg-gray-200 rounded-lg'>Chart Placeholder</div>
      </div>

      <div className='bg-white shadow-lg rounded-lg p-4'>
        {/* Table */}
        <h2 className='text-xl font-semibold mb-4'>Recent Orders</h2>
        <table className='w-full table-auto'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='px-4 py-2'>Order ID</th>
              <th className='px-4 py-2'>Product</th>
              <th className='px-4 py-2'>Quantity</th>
              <th className='px-4 py-2'>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border px-4 py-2'>ORD1234</td>
              <td className='border px-4 py-2'>Paracetamol</td>
              <td className='border px-4 py-2'>1000</td>
              <td className='border px-4 py-2 text-green-500'>Delivered</td>
            </tr>
            <tr>
              <td className='border px-4 py-2'>ORD5678</td>
              <td className='border px-4 py-2'>Ibuprofen</td>
              <td className='border px-4 py-2'>500</td>
              <td className='border px-4 py-2 text-yellow-500'>Pending</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;