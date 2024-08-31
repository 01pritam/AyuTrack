import React, { useContext } from 'react';
import InventoryRow from '../../components/InventoryRow';
import { InventoryContext } from '../../context/InventoryContext';
import { UserRoleContext } from '../../context/UserRoleContext';

const Inventory = () => {
  const { InventoryData, loading } = useContext(InventoryContext);
    const {role} = useContext(UserRoleContext);
  if (loading) return <div>Loading...</div>;
    // if(role!="Pharmacy") return <div>Data Empty...</div>
  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch No</th>
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MRP (₹)</th>
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Status</th>
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Demand</th>
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Order Date</th>
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Barcode ID</th>
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount (%)</th>
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rack</th>
              <th className="px-4 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retailer</th>
            </tr>
          </thead>
          <tbody>
            {InventoryData.map((item, index) => (
              <InventoryRow
                key={item.barcodeId} // Use unique identifier if available
                serialNumber={index + 1}
                data={item}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;