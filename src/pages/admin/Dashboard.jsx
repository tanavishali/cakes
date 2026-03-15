import { FiPackage, FiShoppingBag, FiDollarSign, FiUsers, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { orders, products } from '../../data/products';

const stats = [
  { label: 'Total Orders', value: '1,248', change: '+12.5%', up: true, icon: FiShoppingBag, color: 'bg-teal-700' },
  { label: 'Revenue', value: '$48,295', change: '+8.2%', up: true, icon: FiDollarSign, color: 'bg-terracotta-500' },
  { label: 'Products', value: '156', change: '+3', up: true, icon: FiPackage, color: 'bg-amber-500' },
  { label: 'Customers', value: '3,842', change: '-2.1%', up: false, icon: FiUsers, color: 'bg-violet-500' },
];

const statusColors = {
  Delivered: 'bg-emerald-100 text-emerald-700',
  Processing: 'bg-blue-100 text-blue-700',
  Shipped: 'bg-cyan-100 text-cyan-700',
  Pending: 'bg-amber-100 text-amber-700',
  Cancelled: 'bg-red-100 text-red-700',
};

export default function Dashboard() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome back! Here's what's happening with your bakery.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${s.color} text-white flex items-center justify-center`}>
                <s.icon size={20} />
              </div>
              <span className={`text-xs font-medium flex items-center gap-1 ${s.up ? 'text-emerald-600' : 'text-red-500'}`}>
                {s.up ? <FiTrendingUp size={14} /> : <FiTrendingDown size={14} />}
                {s.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-800">Recent Orders</h2>
          <a href="#" className="text-sm text-teal-700 hover:text-teal-800 font-medium">View All →</a>
        </div>
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
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-3.5 font-medium text-gray-800">{order.id}</td>
                  <td className="px-6 py-3.5 text-gray-600">{order.customer}</td>
                  <td className="px-6 py-3.5 text-gray-500">{order.date}</td>
                  <td className="px-6 py-3.5 text-gray-500">{order.items}</td>
                  <td className="px-6 py-3.5 font-medium text-gray-800">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-3.5">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Products */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Top Products</h2>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.slice(0, 6).map((p) => (
            <div key={p.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{p.name}</p>
                <p className="text-xs text-gray-500">{p.category}</p>
              </div>
              <span className="text-sm font-bold text-teal-800">${p.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
