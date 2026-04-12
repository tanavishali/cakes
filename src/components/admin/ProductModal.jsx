import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { categories } from '../../data/categories';

export default function ProductModal({ isOpen, onClose, onSave, product, isViewOnly = false }) {
  const [formData, setFormData] = useState({
    name: '',
    category: categories[0]?.name || '',
    price: '',
    image: '',
    rating: 5.0,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || categories[0]?.name || '',
        price: product.price || '',
        image: product.image || '',
        rating: product.rating || 5.0,
      });
    } else {
      setFormData({
        name: '',
        category: categories[0]?.name || '',
        price: '',
        image: '',
        rating: 5.0,
      });
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    if (isViewOnly) return;
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isViewOnly) return;
    onSave({
      ...formData,
      price: parseFloat(formData.price) || 0,
      rating: parseFloat(formData.rating) || 0,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">
            {isViewOnly ? 'View Product' : product ? 'Edit Product' : 'Add New Product'}
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
              Product Name *
            </label>
            <input
              type="text"
              required
              disabled={isViewOnly}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 text-sm disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="e.g., Chocolate Cake"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              required
              disabled={isViewOnly}
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 text-sm disabled:bg-gray-50 disabled:text-gray-500"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (PKR) *
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              disabled={isViewOnly}
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 text-sm disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="e.g., 29.99"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Image
            </label>
            <div className="flex items-center gap-4">
              {formData.image && (
                <img src={formData.image} alt="Preview" className="h-16 w-16 object-cover rounded-lg border border-gray-200" />
              )}
              {!isViewOnly && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 text-sm file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 transition-colors"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              disabled={isViewOnly}
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600 text-sm disabled:bg-gray-50 disabled:text-gray-500"
            />
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
                {product ? 'Save Changes' : 'Add Product'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
