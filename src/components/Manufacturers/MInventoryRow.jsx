import React from 'react';

const MInventoryRow = ({ serialNumber, data }) => {
  const handleUploadClick = () => {
    // Handle image upload
    alert('Upload functionality to be implemented');
  };

  return (
    <tr>
      <td className="px-4 py-3 border-b text-gray-700">{serialNumber}</td>
      <td className="px-4 py-3 border-b text-gray-700">{data.name}</td>
      <td className="px-4 py-3 border-b text-gray-700">{data.category}</td>
      <td className="px-4 py-3 border-b text-gray-700">{data.batchNo}</td>
      <td className="px-4 py-3 border-b text-gray-700">{new Date(data.expiryDate).toLocaleDateString()}</td>
      <td className="px-4 py-3 border-b text-gray-700">{data.mrp}</td>
      <td className="px-4 py-3 border-b text-gray-700">{data.qty > 0 ? 'In Stock' : 'Out of Stock'}</td>
      <td className="px-4 py-3 border-b text-gray-700">{data.demand}</td>
      <td className="px-4 py-3 border-b text-gray-700">{data.productionDate ? new Date(data.productionDate).toLocaleDateString() : 'N/A'}</td>
      <td className="px-4 py-3 border-b text-gray-700">{data.qualityCheck ? 'Yes' : 'No'}</td>
      <td className="px-4 py-3 border-b text-gray-700">{data.machineNo || 'N/A'}</td>
      <td className="px-4 py-3 border-b text-gray-700">{data.barcode}</td>
      <td className="px-4 py-3 border-b text-gray-700">{data.rack || 'N/A'}</td>
      <td className="px-4 py-3 border-b text-gray-700">{data.temperature || 'N/A'}</td>
      <td className="px-4 py-3 border-b text-gray-700">
        {data.qualityCheckImages && data.qualityCheckImages.length > 0 ? (
          <span>Images Uploaded</span>
        ) : (
          <button
            onClick={handleUploadClick}
            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Upload Images
          </button>
        )}
      </td>
    </tr>
  );
};

export default MInventoryRow;