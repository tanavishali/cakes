import { useState } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { orders as allOrders } from '../../data/products';

const statusColors = {
  Delivered: 'bg-emerald-100 text-emerald-700',
  Processing: 'bg-blue-100 text-blue-700',
  Shipped: 'bg-cyan-100 text-cyan-700',
  Pending: 'bg-amber-100 text-amber-700',
  Cancelled: 'bg-red-100 text-red-700',
};

export default function Orders() {
  const [filter, setFilter] = useState('All');
  const [orders, setOrders] = useState(allOrders);

  const statuses = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  const filtered = filter === 'All' ? orders : orders.filter((o) => o.status === filter);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
        <p className="text-sm text-gray-500 mt-1">Manage and track customer orders</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === s
                ? 'bg-teal-800 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-teal-600 hover:text-teal-700'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Orders table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 text-left font-medium">Order ID</th>
                <th className="px-6 py-3 text-left font-medium">Customer</th>
                <th className="px-6 py-3 text-left font-medium">Date</th>
                <th className="px-6 py-3 text-left font-medium">Items</th>
                <th className="px-6 py-3 text-left font-medium">Total</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-3.5 font-medium text-gray-800">{order.id}</td>
                  <td className="px-6 py-3.5 text-gray-600">{order.customer}</td>
                  <td className="px-6 py-3.5 text-gray-500">{order.date}</td>
                  <td className="px-6 py-3.5 text-gray-500">{order.items}</td>
                  <td className="px-6 py-3.5 font-medium text-gray-800">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-3.5">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer border-none outline-none focus:ring-2 focus:ring-teal-500/50 ${statusColors[order.status]}`}
                    >
                      <option value="Pending" className="bg-white text-gray-800">Pending</option>
                      <option value="Processing" className="bg-white text-gray-800">Processing</option>
                      <option value="Shipped" className="bg-white text-gray-800">Shipped</option>
                      <option value="Delivered" className="bg-white text-gray-800">Delivered</option>
                      <option value="Cancelled" className="bg-white text-gray-800">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">No orders found</p>
            <p className="text-sm mt-1">Try a different filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
