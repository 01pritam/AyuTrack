import React from 'react';

const SupplierInputs = ({ onChange }) => (
  <>
    <label>Supplier ID
      <input type="text" name="supplierId" onChange={onChange} />
    </label>
    <label>Business Registration Number
      <input type="text" name="businessRegNumber" onChange={onChange} />
    </label>
    <label>Type of Products Supplied
      <select name="productsSupplied" onChange={onChange} multiple>
        <option value="Pharmaceuticals">Pharmaceuticals</option>
        <option value="Medical Devices">Medical Devices</option>
      </select>
    </label>
    <label>License Number
      <input type="text" name="licenseNumber" onChange={onChange} />
    </label>
    <label>Years in Operation
      <input type="number" name="yearsInOperation" onChange={onChange} />
    </label>
    <label>Preferred Payment Method
      <select name="paymentMethod" onChange={onChange}>
        <option value="Bank Transfer">Bank Transfer</option>
        <option value="Credit Card">Credit Card</option>
      </select>
    </label>
    <label>Bank Account Details
      <input type="text" name="bankAccountDetails" onChange={onChange} />
    </label>
  </>
);

export default SupplierInputs;