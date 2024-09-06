import React from 'react';

const InventoryAddModal = ({ isOpen, onClose, formData, onInputChange, onFileChange, onCompositionChange, onAddComposition, onRemoveComposition, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg w-1/2 max-h-90vh overflow-y-auto">
        <h2 className="text-2xl mb-6">Add Inventory Data</h2>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={onInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={onInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="batchNo" className="block text-sm font-medium text-gray-700">Batch No</label>
              <input
                type="text"
                id="batchNo"
                name="batchNo"
                value={formData.batchNo}
                onChange={onInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
              <input
                type="date"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={onInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="mrp" className="block text-sm font-medium text-gray-700">MRP (₹)</label>
              <input
                type="number"
                id="mrp"
                name="mrp"
                value={formData.mrp}
                onChange={onInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="demand" className="block text-sm font-medium text-gray-700">Demand</label>
              <input
                type="number"
                id="demand"
                name="demand"
                value={formData.demand}
                onChange={onInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="productionDate" className="block text-sm font-medium text-gray-700">Production Date</label>
              <input
                type="date"
                id="productionDate"
                name="productionDate"
                value={formData.productionDate}
                onChange={onInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="qualityCheck" className="block text-sm font-medium text-gray-700">Quality Check</label>
              <input
                type="checkbox"
                id="qualityCheck"
                name="qualityCheck"
                checked={formData.qualityCheck}
                onChange={onInputChange}
                className="mt-1 mr-2"
              />
            </div>
            <div>
              <label htmlFor="machineNo" className="block text-sm font-medium text-gray-700">Machine No</label>
              <input
                type="text"
                id="machineNo"
                name="machineNo"
                value={formData.machineNo}
                onChange={onInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="barcode" className="block text-sm font-medium text-gray-700">Barcode ID</label>
              <input
                type="text"
                id="barcode"
                name="barcode"
                value={formData.barcode}
                onChange={onInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="rack" className="block text-sm font-medium text-gray-700">Rack</label>
              <input
                type="text"
                id="rack"
                name="rack"
                value={formData.rack}
                onChange={onInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">Temperature</label>
              <input
                type="text"
                id="temperature"
                name="temperature"
                value={formData.temperature}
                onChange={onInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={onInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="cost" className="block text-sm font-medium text-gray-700">Cost (₹)</label>
              <input
                type="number"
                id="cost"
                name="cost"
                value={formData.cost}
                onChange={onInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="sellingPrice" className="block text-sm font-medium text-gray-700">Selling Price (₹)</label>
              <input
                type="number"
                id="sellingPrice"
                name="sellingPrice"
                value={formData.sellingPrice}
                onChange={onInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Composition Fields */}
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-700">Composition</h3>
            {formData.composition.map((comp, index) => (
              <div key={index} className="flex items-center mt-2">
                <input
                  type="text"
                  placeholder="Ingredient"
                  value={comp.ingredient}
                  onChange={(e) => onCompositionChange(index, 'ingredient', e.target.value)}
                  className="mr-2 p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Quantity"
                  value={comp.quantity}
                  onChange={(e) => onCompositionChange(index, 'quantity', e.target.value)}
                  className="mr-2 p-2 border rounded"
                />
                <button
                  type="button"
                  onClick={() => onRemoveComposition(index)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={onAddComposition}
              className="mt-2 bg-blue-500 text-white p-2 rounded"
            >
              Add Composition
            </button>
          </div>

          {/* File Input */}
          <div className="mt-4">
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">Upload Image</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={onFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded mr-2"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white p-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryAddModal;