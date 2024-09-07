import React, { useState, useEffect } from 'react';

const gstCategories = [
  {
    rate: "2%",
    categories: [
      "Human Blood and Elements",
      "Contraceptives",
      "Human Vaccines",
      "Animal Vaccines"
    ]
  },
  {
    rate: "5%",
    categories: [
      "Vaccines",
      "Hepatitis",
      "Desferriox",
      "Cyclosporin",
      "Biochemic",
      "Rehydration",
      "Test Kits",
      "Bulk Drugs"
    ]
  },
  {
    rate: "12%",
    categories: [
      "Antibiotics",
      "Antifungals",
      "Analgesics",
      "Antiseptics",
      "Antivirals"
    ]
  },
  {
    rate: "18%",
    categories: [
      "Hormones",
      "Diuretics",
      "Antacids",
      "Sedatives",
      "Pain Relievers"
    ]
  },
  {
    rate: "28%",
    categories: [
      "Biologics",
      "Specialty Drugs",
      "Oncology",
      "Neurology",
      "Cardiovascular"
    ]
  }
];

const InventoryAddModal = ({ isOpen, onClose, formData, onInputChange, onFileChange, onCompositionChange, onAddComposition, onRemoveComposition, onSubmit }) => {
  const [rate, setRate] = useState("");

  useEffect(() => {
    // Set initial rate when formData.category changes
    handleCategoryChange({ target: { value: formData.category } });
  }, [formData.category]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    let selectedRate = "";
    for (let group of gstCategories) {
      if (group.categories.includes(selectedCategory)) {
        selectedRate = group.rate;
        break;
      }
    }
    onInputChange(e);
    setRate(selectedRate);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg w-1/2 max-h-90vh overflow-y-auto">
        <h2 className="text-2xl mb-6">Add Inventory Data</h2>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <div className="grid grid-cols-3 gap-4">
            {/* Input fields */}
            <InputField id="name" label="Name" value={formData.name} onChange={onInputChange} required />
            <SelectField id="category" label="Category" value={formData.category} onChange={handleCategoryChange} required>
              <option value="">Select Category</option>
              {gstCategories.map((gstGroup, groupIndex) => (
                <optgroup key={groupIndex} label={`GST Rate: ${gstGroup.rate}`}>
                  {gstGroup.categories.map((category, catIndex) => (
                    <option key={catIndex} value={category}>{category}</option>
                  ))}
                </optgroup>
              ))}
            </SelectField>
            <InputField id="batchNo" label="Batch No" value={formData.batchNo} onChange={onInputChange} />
            <InputField id="expiryDate" label="Expiry Date" type="date" value={formData.expiryDate} onChange={onInputChange} />
            <InputField id="mrp" label="MRP (₹)" type="number" value={formData.mrp} onChange={onInputChange} />
            <InputField id="demand" label="Demand" type="number" value={formData.demand} onChange={onInputChange} />
            <InputField id="productionDate" label="Production Date" type="date" value={formData.productionDate} onChange={onInputChange} />
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
            <InputField id="machineNo" label="Machine No" value={formData.machineNo} onChange={onInputChange} />
            <InputField id="barcode" label="Barcode ID" value={formData.barcode} onChange={onInputChange} />
            <InputField id="rack" label="Rack" value={formData.rack} onChange={onInputChange} />
            <InputField id="temperature" label="Temperature" value={formData.temperature} onChange={onInputChange} />
            <InputField id="quantity" label="Quantity" type="number" value={formData.quantity} onChange={onInputChange} />
            <InputField id="cost" label="Cost (₹)" type="number" value={formData.cost} onChange={onInputChange} />
            <InputField id="sellingPrice" label="Selling Price (₹)" type="number" value={formData.sellingPrice} onChange={onInputChange} />
            <InputField id="rate" label="GST Rate" value={rate} readOnly className="bg-gray-200" />
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
              name="qualityImages"
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

const InputField = ({ id, label, value, onChange, type = "text", required = false, className = "" }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required={required}
      className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
    />
  </div>
);

const SelectField = ({ id, label, value, onChange, required = false, children }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      {children}
    </select>
  </div>
);

export default InventoryAddModal;