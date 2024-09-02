import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

export default function TableForm({ list, setList, total,setTotal }) {
  const [newRow, setNewRow] = useState({ description: "", quantity: "", price: "", batchNo: "" });
  const [isEditing, setIsEditing] = useState(null);

  // Refs to manage focus
  const quantityRef = useRef(null);
  const priceRef = useRef(null);
  const addButtonRef = useRef(null);

  useEffect(() => {
    const calculateTotal = () => {
      const totalAmount = list.reduce((acc, item) => acc + parseFloat(item.amount), 0);
      setTotal(totalAmount);
    };
    calculateTotal();
  }, [list, setTotal]);
  console.log("Total : ",total);
  const handleChange = (e, field) => {
    setNewRow({ ...newRow, [field]: e.target.value });
  };

  const handleEditChange = (e, id, field) => {
    const updatedList = list.map(item => item.id === id ? { ...item, [field]: e.target.value } : item);
    setList(updatedList);
  };

  const handleAddRow = () => {
    if (!newRow.description || !newRow.quantity || !newRow.price || !newRow.batchNo) {
      alert("Please fill in all inputs");
      return;
    }
    const amount = parseFloat(newRow.quantity) * parseFloat(newRow.price);
    setList([...list, { ...newRow, id: uuidv4(), amount }]);
    setNewRow({ description: "", quantity: "", price: "", batchNo: "" });
  };

  const handleDeleteRow = (id) => {
    const filteredList = list.filter(item => item.id !== id);
    setList(filteredList);
  };

  const handleEditRow = (id) => {
    setIsEditing(id);
  };

  const handleSaveRow = () => {
    setIsEditing(null);
  };

  const handleKeyDown = (e, field) => {
    if (e.key === "Enter") {
      if (field === "description") {
        quantityRef.current.focus();
      } else if (field === "quantity") {
        priceRef.current.focus();
      } else if (field === "price") {
        handleAddRow();
        setTimeout(() => {
          document.getElementById('description-input').focus();
        }, 100); // Give some time for the state to reset the inputs
      }
    }
  };

  return (
    <div className="relative overflow-x-auto bg-gray-100 shadow-md sm:rounded-lg p-4">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Invoice of Billing</h1>
      <table className="w-full text-sm text-left text-gray-500 bg-white shadow-sm rounded-md">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3 border-b">Description</th>
            <th className="px-6 py-3 border-b">Batch No</th>
            <th className="px-6 py-3 border-b">Quantity</th>
            <th className="px-6 py-3 border-b">Price</th>
            <th className="px-6 py-3 border-b">Amount</th>
            <th className="px-6 py-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {list.map(({ id, description, quantity, price, batchNo, amount }) => (
            <tr key={id} className="border-b odd:bg-gray-50 even:bg-gray-100">
              <td className="px-6 py-4">
                {isEditing === id ? (
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => handleEditChange(e, id, "description")}
                    className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  description
                )}
              </td>
              <td className="px-6 py-4">
                {isEditing === id ? (
                  <input
                    type="text"
                    value={batchNo}
                    onChange={(e) => handleEditChange(e, id, "batchNo")}
                    className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  batchNo
                )}
              </td>
              <td className="px-6 py-4">
                {isEditing === id ? (
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleEditChange(e, id, "quantity")}
                    className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  quantity
                )}
              </td>
              <td className="px-6 py-4">
                {isEditing === id ? (
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => handleEditChange(e, id, "price")}
                    className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  price
                )}
              </td>
              <td className="px-6 py-4">{amount}</td>
              <td className="px-6 py-4 flex space-x-2">
                {isEditing === id ? (
                  <button onClick={handleSaveRow} className="text-green-600 hover:text-green-900"><AiOutlineEdit /></button>
                ) : (
                  <button onClick={() => handleEditRow(id)} className="text-blue-600 hover:text-blue-900"><AiOutlineEdit /></button>
                )}
                <button onClick={() => handleDeleteRow(id)} className="text-red-600 hover:text-red-900"><AiOutlineDelete /></button>
              </td>
            </tr>
          ))}
          <tr>
            <td className="px-6 py-4">
              <input
                type="text"
                id="description-input"
                value={newRow.description}
                onChange={(e) => handleChange(e, "description")}
                onKeyDown={(e) => handleKeyDown(e, "description")}
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Description"
              />
            </td>
            <td className="px-6 py-4">
              <input
                type="text"
                value={newRow.batchNo}
                onChange={(e) => handleChange(e, "batchNo")}
                onKeyDown={(e) => handleKeyDown(e, "batchNo")}
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Batch No"
              />
            </td>
            <td className="px-6 py-4">
              <input
                type="number"
                ref={quantityRef}
                value={newRow.quantity}
                onChange={(e) => handleChange(e, "quantity")}
                onKeyDown={(e) => handleKeyDown(e, "quantity")}
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Quantity"
              />
            </td>
            <td className="px-6 py-4">
              <input
                type="number"
                ref={priceRef}
                value={newRow.price}
                onChange={(e) => handleChange(e, "price")}
                onKeyDown={(e) => handleKeyDown(e, "price")}
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Price"
              />
            </td>
            <td className="px-6 py-4">
              {((parseFloat(newRow.quantity) || 0) * (parseFloat(newRow.price) || 0)).toFixed(2)}
            </td>
            <td className="px-6 py-4">
              <button ref={addButtonRef} onClick={handleAddRow} className="text-green-600 hover:text-green-900 px-3 py-1 border border-green-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">Add</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4 text-right">
  <h2 className="text-2xl font-bold text-gray-900">
    Total: ₹{(total ?? 0).toLocaleString()}
  </h2>
</div>
    </div>
  );
}