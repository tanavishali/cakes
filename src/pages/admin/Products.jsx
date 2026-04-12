import { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiEye } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { products as initialProducts } from '../../data/products';
import ProductModal from '../../components/admin/ProductModal';
import DealModal from '../../components/admin/DealModal';
import OfferModal from '../../components/admin/OfferModal';

const initialDeals = [
  { id: 1, title: 'Summer Special', type: 'Discount Percentage', targetProduct: 'All Products', discountValue: '20', validUntil: '2026-06-01', status: 'Active' },
];

const initialOffers = [
  { id: 1, code: 'WELCOME10', description: '10% off first order', type: 'Percentage', value: 10, minOrderValue: 0, validUntil: '2026-12-31', status: 'Active' },
];

export default function Products() {
  const [activeTab, setActiveTab] = useState('Products'); // 'Products', 'Deals', 'Offers'
  const [search, setSearch] = useState('');
  
  // States for Data
  const [productsList, setProductsList] = useState(initialProducts);
  const [dealsList, setDealsList] = useState(initialDeals);
  const [offersList, setOffersList] = useState(initialOffers);

  // States for Modals
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isDealModalOpen, setIsDealModalOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  
  // States for Editing/Viewing
  const [editingItem, setEditingItem] = useState(null);
  const [isViewOnly, setIsViewOnly] = useState(false);

  // Filters
  const filteredProducts = productsList.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  const filteredDeals = dealsList.filter((d) => d.title.toLowerCase().includes(search.toLowerCase()));
  const filteredOffers = offersList.filter((o) => o.code.toLowerCase().includes(search.toLowerCase()));

  // ================= CRUD Handlers =================

  // Generic Delete
  const handleDelete = (id, listType) => {
    if (window.confirm(`Are you sure you want to delete this ${listType}?`)) {
      if (listType === 'product') setProductsList(productsList.filter((p) => p.id !== id));
      if (listType === 'deal') setDealsList(dealsList.filter((d) => d.id !== id));
      if (listType === 'offer') setOffersList(offersList.filter((o) => o.id !== id));
      
      toast.success(`${listType.charAt(0).toUpperCase() + listType.slice(1)} deleted successfully!`);
    }
  };

  // Generic View Open
  const handleView = (item, type) => {
    setEditingItem(item);
    setIsViewOnly(true);
    if (type === 'product') setIsProductModalOpen(true);
    if (type === 'deal') setIsDealModalOpen(true);
    if (type === 'offer') setIsOfferModalOpen(true);
  };

  // Generic Edit Open
  const handleEdit = (item, type) => {
    setEditingItem(item);
    setIsViewOnly(false);
    if (type === 'product') setIsProductModalOpen(true);
    if (type === 'deal') setIsDealModalOpen(true);
    if (type === 'offer') setIsOfferModalOpen(true);
  };

  // Generic Add Open
  const handleAddNew = (type) => {
    setEditingItem(null);
    setIsViewOnly(false);
    if (type === 'product') setIsProductModalOpen(true);
    if (type === 'deal') setIsDealModalOpen(true);
    if (type === 'offer') setIsOfferModalOpen(true);
  };

  // Save Handlers
  const handleSaveProduct = (data) => {
    if (editingItem) {
      setProductsList(productsList.map((p) => p.id === editingItem.id ? { ...p, ...data } : p));
      toast.success('Product updated successfully!');
    } else {
      setProductsList([{ ...data, id: Date.now(), reviews: 0, badge: 'New', image: data.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop' }, ...productsList]);
      toast.success('Product added successfully!');
    }
    setIsProductModalOpen(false);
  };

  const handleSaveDeal = (data) => {
    if (editingItem) {
      setDealsList(dealsList.map((d) => d.id === editingItem.id ? { ...d, ...data } : d));
      toast.success('Deal updated successfully!');
    } else {
      setDealsList([{ ...data, id: Date.now() }, ...dealsList]);
      toast.success('Deal added successfully!');
    }
    setIsDealModalOpen(false);
  };

  const handleSaveOffer = (data) => {
    if (editingItem) {
      setOffersList(offersList.map((o) => o.id === editingItem.id ? { ...o, ...data } : o));
      toast.success('Offer updated successfully!');
    } else {
      setOffersList([{ ...data, id: Date.now() }, ...offersList]);
      toast.success('Offer added successfully!');
    }
    setIsOfferModalOpen(false);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Promotions & Products</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your bakery products, deals, and offers</p>
        </div>
        <button
          onClick={() => handleAddNew(activeTab === 'Products' ? 'product' : activeTab === 'Deals' ? 'deal' : 'offer')}
          className="flex items-center gap-2 px-5 py-2.5 bg-teal-800 hover:bg-teal-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
        >
          <FiPlus size={16} /> Add {activeTab === 'Products' ? 'Product' : activeTab === 'Deals' ? 'Deal' : 'Offer'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 border-b border-gray-200 mb-6">
        {['Products', 'Deals', 'Offers'].map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setSearch(''); }}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="p-4 border-b border-gray-50">
          <div className="relative max-w-sm">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder={`Search ${activeTab.toLowerCase()}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-600 transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {activeTab === 'Products' && (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Product</th>
                  <th className="px-6 py-3 text-left font-medium">Category</th>
                  <th className="px-6 py-3 text-left font-medium">Price</th>
                  <th className="px-6 py-3 text-left font-medium">Rating</th>
                  <th className="px-6 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                        <span className="font-medium text-gray-800">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-gray-500">{p.category}</td>
                    <td className="px-6 py-3 font-medium text-gray-800">PKR {Math.floor(p.price).toLocaleString()}</td>
                    <td className="px-6 py-3 text-gray-500">⭐ {p.rating}</td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleView(p, 'product')} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                          <FiEye size={15} />
                        </button>
                        <button onClick={() => handleEdit(p, 'product')} className="p-1.5 text-gray-400 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors" title="Edit">
                          <FiEdit2 size={15} />
                        </button>
                        <button onClick={() => handleDelete(p.id, 'product')} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                          <FiTrash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">No products found.</td></tr>
                )}
              </tbody>
            </table>
          )}

          {activeTab === 'Deals' && (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Title</th>
                  <th className="px-6 py-3 text-left font-medium">Target</th>
                  <th className="px-6 py-3 text-left font-medium">Type</th>
                  <th className="px-6 py-3 text-left font-medium">Value</th>
                  <th className="px-6 py-3 text-left font-medium">Valid Until</th>
                  <th className="px-6 py-3 text-left font-medium">Status</th>
                  <th className="px-6 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredDeals.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3 font-medium text-gray-800">{d.title}</td>
                    <td className="px-6 py-3 text-gray-500">{d.targetProduct}</td>
                    <td className="px-6 py-3 text-gray-500">{d.type}</td>
                    <td className="px-6 py-3 font-medium text-teal-600">{d.type === 'Discount Percentage' ? `${d.discountValue}%` : `PKR ${Math.floor(d.discountValue).toLocaleString()}`}</td>
                    <td className="px-6 py-3 text-gray-500">{d.validUntil}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${d.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleView(d, 'deal')} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                          <FiEye size={15} />
                        </button>
                        <button onClick={() => handleEdit(d, 'deal')} className="p-1.5 text-gray-400 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors" title="Edit">
                          <FiEdit2 size={15} />
                        </button>
                        <button onClick={() => handleDelete(d.id, 'deal')} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                          <FiTrash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredDeals.length === 0 && (
                  <tr><td colSpan="7" className="px-6 py-8 text-center text-gray-500">No deals found.</td></tr>
                )}
              </tbody>
            </table>
          )}

          {activeTab === 'Offers' && (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Code</th>
                  <th className="px-6 py-3 text-left font-medium">Description</th>
                  <th className="px-6 py-3 text-left font-medium">Type</th>
                  <th className="px-6 py-3 text-left font-medium">Value</th>
                  <th className="px-6 py-3 text-left font-medium">Valid Until</th>
                  <th className="px-6 py-3 text-left font-medium">Status</th>
                  <th className="px-6 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredOffers.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3 font-bold text-teal-700">{o.code}</td>
                    <td className="px-6 py-3 text-gray-500">{o.description}</td>
                    <td className="px-6 py-3 text-gray-500">{o.type}</td>
                    <td className="px-6 py-3 font-medium text-teal-600">{o.type === 'Percentage' ? `${o.value}%` : o.type === 'Free Shipping' ? '-' : `PKR ${o.value}`}</td>
                    <td className="px-6 py-3 text-gray-500">{o.validUntil}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${o.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleView(o, 'offer')} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                          <FiEye size={15} />
                        </button>
                        <button onClick={() => handleEdit(o, 'offer')} className="p-1.5 text-gray-400 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors" title="Edit">
                          <FiEdit2 size={15} />
                        </button>
                        <button onClick={() => handleDelete(o.id, 'offer')} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                          <FiTrash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredOffers.length === 0 && (
                  <tr><td colSpan="7" className="px-6 py-8 text-center text-gray-500">No offers found.</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modals */}
      <ProductModal isOpen={isProductModalOpen} onClose={() => setIsProductModalOpen(false)} onSave={handleSaveProduct} product={editingItem} isViewOnly={isViewOnly} />
      <DealModal isOpen={isDealModalOpen} onClose={() => setIsDealModalOpen(false)} onSave={handleSaveDeal} deal={editingItem} isViewOnly={isViewOnly} />
      <OfferModal isOpen={isOfferModalOpen} onClose={() => setIsOfferModalOpen(false)} onSave={handleSaveOffer} offer={editingItem} isViewOnly={isViewOnly} />
    </div>
  );
}


