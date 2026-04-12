import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { products } from '../../data/products';

export default function DealModal({ isOpen, onClose, onSave, deal, isViewOnly = false }) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'Discount Percentage',
    targetProduct: products[0]?.name || '',
    discountValue: '',
    validUntil: '',
    status: 'Active',
  });

  useEffect(() => {
    if (deal) {
      setFormData({
        title: deal.title || '',
        type: deal.type || 'Discount Percentage',
        targetProduct: deal.targetProduct || products[0]?.name || '',
        discountValue: deal.discountValue || '',
        validUntil: deal.validUntil || '',
        status: deal.status || 'Active',
      });
    } else {
      setFormData({
        title: '',
        type: 'Discount Percentage',
        targetProduct: products[0]?.name || '',
        discountValue: '',
        validUntil: '',
        status: 'Active',
      });
    }
  }, [deal, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isViewOnly) return;
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">
            {isViewOnly ? 'View Deal' : deal ? 'Edit Deal' : 'Create New Deal'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deal Title *
            </label>
            <input
              type="text"
              required
              disabled={isViewOnly}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 text-sm disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="e.g., Summer Special Cake Sale"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Product *
            </label>
            <select
              required
              disabled={isViewOnly}
              value={formData.targetProduct}
              onChange={(e) => setFormData({ ...formData, targetProduct: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 text-sm disabled:bg-gray-50 disabled:text-gray-500"
            >
              <option value="All Products">All Products</option>
              {products.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deal Type
              </label>
              <select
                required
                disabled={isViewOnly}
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 text-sm disabled:bg-gray-50 disabled:text-gray-500"
              >
                <option value="Discount Percentage">Discount %</option>
                <option value="Fixed Amount">Fixed Amount Discount</option>
                <option value="BOGO">Buy 1 Get 1</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Value/Amount *
              </label>
              <input
                type="text"
                required
                disabled={isViewOnly}
                value={formData.discountValue}
                onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 text-sm disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="e.g., 20% or PKR 1,000"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valid Until *
              </label>
              <input
                type="date"
                required
                disabled={isViewOnly}
                value={formData.validUntil}
                onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 text-sm disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                required
                disabled={isViewOnly}
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 text-sm disabled:bg-gray-50 disabled:text-gray-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isViewOnly ? 'Close' : 'Cancel'}
            </button>
            {!isViewOnly && (
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-teal-800 hover:bg-teal-700 rounded-lg transition-colors"
              >
                {deal ? 'Save Changes' : 'Create Deal'}
              </button>
            )}
           </div>
        </form>
      </div>
    </div>
  );
}
