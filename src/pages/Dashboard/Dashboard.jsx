import React, { useEffect, useState, useContext } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Package, Truck, AlertTriangle, TrendingUp, Clock, ShoppingCart } from 'lucide-react';
import { AuthContext } from '@/context/AuthContext';
import { InventoryContext } from '../../context/InventoryContext';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const orderData = [
  { name: 'Jan', orders: 4000, returns: 400 },
  { name: 'Feb', orders: 3000, returns: 300 },
  { name: 'Mar', orders: 2000, returns: 200 },
  { name: 'Apr', orders: 2780, returns: 278 },
  { name: 'May', orders: 1890, returns: 189 },
  { name: 'Jun', orders: 2390, returns: 239 },
];

const inventoryData = [
  { name: 'In Stock', value: 70 },
  { name: 'Low Stock', value: 20 },
  { name: 'Out of Stock', value: 10 },
];

const deliveryPerformance = [
  { name: 'Mon', onTime: 85, delayed: 15 },
  { name: 'Tue', onTime: 90, delayed: 10 },
  { name: 'Wed', onTime: 88, delayed: 12 },
  { name: 'Thu', onTime: 92, delayed: 8 },
  { name: 'Fri', onTime: 86, delayed: 14 },
  { name: 'Sat', onTime: 80, delayed: 20 },
  { name: 'Sun', onTime: 95, delayed: 5 },
];
function Dashboard() {
  const [orderData, setOrderData] = useState([]);
  // const [inventoryData, setInventoryData] = useState([]);
  // const [deliveryPerformance, setDeliveryPerformance] = useState([]);
  const [kpiData, setKpiData] = useState({});
  const [recentOrders, setRecentOrders] = useState([]);
  const { token } = useContext(AuthContext);
  const {lowStock,highStock,OutOfStock}=useContext(InventoryContext);
  console.log('OutOfStock:', OutOfStock);
  useEffect(() => {
    // Fetch KPI data from API when component mounts
    const fetchKpiData = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Add Bearer token in Authorization header
        };

        const kpiResponse = await fetch('https://med-tech-server.onrender.com/api/manufacturers/analysis/calculate-totals', { headers });
        if (!kpiResponse.ok) {
          throw new Error('Error fetching KPI data');
        }

        const kpiData = await kpiResponse.json();
        setKpiData(kpiData); // Update state with KPI data
        setOrderData(kpiData.monthlyData.map(item => ({
          name: item.month, // X-axis will display the month
          ordersPlaced: item.ordersPlaced,
          ordersReturned: item.ordersReturned,
        })));
        
      } catch (error) {
        console.error('Error fetching KPI data:', error);
      }
    };

    fetchKpiData();
  }, [token]); // Include token as a dependency to ensure it updates if changed

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <h1 className='text-3xl font-bold text-center text-teal-600 mb-8'>
        Supply Chain Monitoring Dashboard
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        <StatCard title="Total Orders" value={kpiData.totalOrders} icon={Package} color="teal" />
        <StatCard title="Pending Deliveries" value={kpiData.pendingOrders} icon={Truck} color="yellow" />
        <StatCard title="Out of Stock Items" value={OutOfStock} icon={AlertTriangle} color="red" />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
        <ChartCard title="Order Fulfillment Rate">
          <BarChart data={orderData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="ordersPlaced" fill="#3B82F6" name="Orders" />
            <Bar dataKey="ordersReturned" fill="#EF4444" name="Returns" />
          </BarChart>
        </ChartCard>

        <ChartCard title="Delivery Performance">
          <LineChart data={deliveryPerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="onTime" stroke="#10B981" name="On Time" />
            <Line type="monotone" dataKey="delayed" stroke="#F59E0B" name="Delayed" />
          </LineChart>
        </ChartCard>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        <ChartCard title="Inventory Status" className="md:col-span-1">
          <PieChart>
            <Pie
              data={inventoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {inventoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ChartCard>

        <div className='md:col-span-2 bg-white shadow-lg rounded-lg p-6'>
          <h2 className='text-xl font-semibold mb-4'>Key Performance Indicators</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <KpiCard title="Revenue Growth" value={kpiData.revenueGrowth} icon={TrendingUp} />
            <KpiCard title="Avg. Delivery Time" value={kpiData.avgDeliveryTime} icon={Clock} />
            <KpiCard title="Customer Satisfaction" value={kpiData.customerSatisfaction} icon={ShoppingCart} />
            <KpiCard title="Inventory Turnover" value={kpiData.inventoryTurnover} icon={Package} />
          </div>
        </div>
      </div>

      <div className='bg-white shadow-lg rounded-lg p-6'>
        <h2 className='text-xl font-semibold mb-4'>Recent Orders</h2>
        <div className='overflow-x-auto'>
          <table className='w-full table-auto'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='px-4 py-2 text-left'>Order ID</th>
                <th className='px-4 py-2 text-left'>Product</th>
                <th className='px-4 py-2 text-left'>Quantity</th>
                <th className='px-4 py-2 text-left'>Status</th>
                <th className='px-4 py-2 text-left'>Expected Delivery</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <TableRow
                  key={order.id}
                  id={order.id}
                  product={order.product}
                  quantity={order.quantity}
                  status={order.status}
                  delivery={order.expectedDelivery}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className={`bg-white shadow-lg rounded-lg p-6 border-l-4 border-${color}-500`}>
    <div className="flex items-center justify-between">
      <div>
        <h2 className='text-xl font-semibold text-gray-700'>{title}</h2>
        <p className={`text-2xl font-bold text-${color}-500 mt-2`}>{value}</p>
      </div>
      <Icon className={`w-12 h-12 text-${color}-500 opacity-20`} />
    </div>
  </div>
);

const ChartCard = ({ title, children, className = "" }) => (
  <div className={`bg-white shadow-lg rounded-lg p-6 ${className}`}>
    <h2 className='text-xl font-semibold mb-4'>{title}</h2>
    <div className='h-64'>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  </div>
);

const KpiCard = ({ title, value, icon: Icon }) => (
  <div className='bg-gray-50 rounded-lg p-4 flex items-center'>
    <Icon className='w-8 h-8 text-teal-500 mr-4' />
    <div>
      <h3 className='text-sm font-medium text-gray-500'>{title}</h3>
      <p className='text-lg font-semibold text-gray-900'>{value}</p>
    </div>
  </div>
);

const TableRow = ({ id, product, quantity, status, delivery }) => {
  const statusColor = 
    status === 'Delivered' ? 'green' : 
    status === 'Pending' ? 'yellow' : 
    status === 'In Transit' ? 'teal' :
    'gray';
  return (
    <tr>
      <td className='border-b px-4 py-2'>{id}</td>
      <td className='border-b px-4 py-2'>{product}</td>
      <td className='border-b px-4 py-2'>{quantity}</td>
      <td className={`border-b px-4 py-2 text-${statusColor}-500`}>{status}</td>
      <td className='border-b px-4 py-2'>{delivery}</td>
    </tr>
  );
};

export default Dashboard;