import React from 'react';

const DistributorInputs = ({ onChange }) => (
  <>
    <label>Distributor ID
      <input type="text" name="distributorId" onChange={onChange} />
    </label>
    <label>License Number
      <input type="text" name="licenseNumber" onChange={onChange} />
    </label>
    <label>Warehouse Locations
      <input type="text" name="warehouseLocations" onChange={onChange} />
    </label>
    <label>Vehicle Fleet Details
      <input type="text" name="vehicleFleet" onChange={onChange} />
    </label>
    <label>Regions Covered
      <select name="regionsCovered" onChange={onChange} multiple>
        <option value="Region1">Region1</option>
        <option value="Region2">Region2</option>
      </select>
    </label>
    <label>Preferred Shipping Method
      <select name="shippingMethod" onChange={onChange}>
        <option value="Air">Air</option>
        <option value="Road">Road</option>
        <option value="Sea">Sea</option>
      </select>
    </label>
  </>
);

export default DistributorInputs;