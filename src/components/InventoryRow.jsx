import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const InventoryRow = ({ serialNumber, data, deleteHandler }) => {
  // Example: Handling Expiry Date Color based on whether it's expired or not
  const isExpired = new Date(data.expiryDate) < new Date();

  return (
    <tr>
      <td className="px-3 py-3 border-b text-sm text-gray-900">{serialNumber}</td>
      <td className="px-3 py-3 border-b text-sm text-gray-900">{data.name}</td>
      <td className="px-3 py-3 border-b text-sm text-gray-900">{data.category}</td>
      <td className="px-3 py-3 border-b text-sm text-gray-900">{data.batchNo}</td>
      <td className={`px-3 py-3 border-b text-sm ${isExpired ? 'text-red-500' : 'text-gray-900'}`}>
        {data.expiryDate}
      </td>
      <td className="px-3 py-3 border-b text-sm text-gray-900">₹{data.mrp.toFixed(2)}</td>
      <td className="px-3 py-3 border-b text-sm text-gray-900">
        {data.stockStatus === 'In Stock' ? (
          <div className="flex items-center text-green-600">
            <FaCheckCircle className="mr-2" />
            In Stock
          </div>
        ) : (
          <div className="flex items-center text-red-600">
            <FaTimesCircle className="mr-2" />
            Out of Stock
          </div>
        )}
      </td>
      <td className="px-3 py-3 border-b text-sm text-gray-900">{data.demand}</td>
      {/* Add an 'Order Now' Button */}
      
      <td className="px-3 py-3 border-b text-sm text-gray-900">{data.lastOrderDate}</td>
      <td className="px-3 py-3 border-b text-sm text-gray-900">{data.barcodeId}</td>
      <td className="px-3 py-3 border-b text-sm text-gray-900">{data.discount}%</td>
      <td className="px-3 py-3 border-b text-sm text-gray-900">{data.rack}</td>
      <td className="px-3 py-3 border-b text-sm text-gray-900">{data.retailer}</td>
      
    </tr>
  );
};

export default InventoryRow;