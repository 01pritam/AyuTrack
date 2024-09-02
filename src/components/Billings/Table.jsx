import React from 'react';

export default function Table({ list, total }) {
    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {list.map(({ id, description, quantity, price, amount }) => (
                        <tr key={id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quantity}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{price}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 text-right">
                <h2 className="text-2xl font-bold text-gray-900">Total: ₹{total.toLocaleString()}</h2>
            </div>
        </div>
    );
}
