import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

export default function OfferModal({ isOpen, onClose, onSave, offer, isViewOnly = false }) {
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    type: 'Percentage',
    value: '',
    minOrderValue: '',
    validUntil: '',
    status: 'Active',
  });

  useEffect(() => {
    if (offer) {
      setFormData({
        code: offer.code || '',
        description: offer.description || '',
        type: offer.type || 'Percentage',
        value: offer.value || '',
        minOrderValue: offer.minOrderValue || '',
        validUntil: offer.validUntil || '',
        status: offer.status || 'Active',
      });
    } else {
      setFormData({
        code: '',
        description: '',
        type: 'Percentage',
        value: '',
        minOrderValue: '',
        validUntil: '',
        status: 'Active',
      });
    }
  }, [offer, isOpen]);

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
            {isViewOnly ? 'View Offer' : offer ? 'Edit Offer (Coupon)' : 'Create New Offer'}
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
              Promo Code *
            </label>
            <input
              type="text"
              required
              disabled={isViewOnly}
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 text-sm uppercase disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="e.g., WELCOME20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <input
              type="text"
              required
              disabled={isViewOnly}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 text-sm disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="e.g., 20% off your entire order"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount Type
              </label>
              <select
                required
                disabled={isViewOnly}
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 text-sm disabled:bg-gray-50 disabled:text-gray-500"
              >
                <option value="Percentage">Percentage %</option>
                <option value="Fixed Amount">Fixed Amount (PKR)</option>
                <option value="Free Shipping">Free Shipping</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Value *
              </label>
              <input
                type="number"
                required={formData.type !== 'Free Shipping'}
                disabled={formData.type === 'Free Shipping' || isViewOnly}
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 text-sm disabled:bg-gray-50 disabled:text-gray-500"
                placeholder={formData.type === 'Percentage' ? "e.g., 20" : "e.g., 10"}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min. Order Value (PKR)
              </label>
              <input
                type="number"
                disabled={isViewOnly}
                value={formData.minOrderValue}
                onChange={(e) => setFormData({ ...formData, minOrderValue: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 text-sm disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="e.g., 5000 (optional)"
              />
            </div>
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
                {offer ? 'Save Changes' : 'Create Offer'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
