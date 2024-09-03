import React from 'react';

const MInventoryRow = ({ serialNumber, data }) => (
  <tr>
    <td className="px-4 py-3 border-b">{serialNumber}</td>
    <td className="px-4 py-3 border-b">{data.name}</td>
    <td className="px-4 py-3 border-b">{data.category}</td>
    <td className="px-4 py-3 border-b">{data.batchNo}</td>
    <td className="px-4 py-3 border-b">{data.expiryDate}</td>
    <td className="px-4 py-3 border-b">{data.mrp}</td>
    <td className="px-4 py-3 border-b">{data.stockStatus}</td>
    <td className="px-4 py-3 border-b">{data.demand}</td>
    <td className="px-4 py-3 border-b">{data.productionDate}</td>
    <td className="px-4 py-3 border-b">{data.qualityCheck ? 'Yes' : 'No'}</td>
    <td className="px-4 py-3 border-b">{data.machineNo}</td>
    <td className="px-4 py-3 border-b">{data.barcode}</td>
    <td className="px-4 py-3 border-b">{data.rack}</td>
    <td className="px-4 py-3 border-b">{data.temperature}</td>
    <td className="px-4 py-3 border-b">{data.qty}</td> {/* Display qty as Quantity */}
    
  </tr>
);

export default MInventoryRow;