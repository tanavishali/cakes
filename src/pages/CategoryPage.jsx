import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiFilter, FiShoppingCart } from 'react-icons/fi';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { useCart } from '../contexts/CartContext';

// Map URL slugs to product category names
const slugToCategoryMap = {
  'cookies': 'Cookies',
  'cakes': 'Cakes',
  'bento-cakes': 'Bento Cakes',
  'pastry': 'Pastry',
  'cup-cakes': 'Cup Cakes',
  'donuts': 'Donuts',
  'party-items': 'Party Items',
  'baby-cakes': 'Baby Cakes',
  'boys-cakes': 'Boys Cakes',
  'mens-cakes': "Men's Cakes",
  'deals': 'Deals',
  'nikka-cakes': 'Nikka Cakes',
  'pound-cakes': 'Pound Cakes',
};

import { CardSkeleton } from '../components/storefront/Skeleton';

// ... (slugToCategoryMap is same)

export default function CategoryPage() {
  const { categoryId, weight } = useParams();
  const { addToCart } = useCart();
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortBy, setSortBy] = useState('Default sorting');
  const [isLoading, setIsLoading] = useState(true);
  
  // Use the slug map to get the display name, fallback to formatted param
  const baseCategoryName = slugToCategoryMap[categoryId] || (categoryId?.charAt(0).toUpperCase() + categoryId?.slice(1)) || 'Category';
  const categoryName = weight ? `${weight}lb ${baseCategoryName}` : baseCategoryName;
  
  // Find the category data for the icon
  const categoryData = categories?.find(
    (cat) => cat.slug === categoryId || cat.name?.toLowerCase() === categoryId?.toLowerCase()
  );
  
  // Filter products by category name and optionally weight
  const categoryProducts = products?.filter((product) => {
    const categoryMatch = product?.category?.toLowerCase() === baseCategoryName?.toLowerCase();
    if (!categoryMatch) return false;
    
    if (weight) {
      return product.weight === parseInt(weight);
    }
    return true;
  }) || [];

  useEffect(() => {
    setIsLoading(true);
    // Simulate loading for smoother UX
    const timer = setTimeout(() => {
      let result = [...categoryProducts];
      
      if (sortBy === 'Sort by price: low to high') {
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
      } else if (sortBy === 'Sort by price: high to low') {
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
      } else if (sortBy === 'Sort by popularity') {
        result.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
      } else if (sortBy === 'Sort by newness') {
        result.sort((a, b) => (a.badge === 'New' ? -1 : 1));
      }
      
      setSortedProducts(result);
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [categoryId, sortBy, weight]);

  return (
    <div className="bg-warm-gray-50 min-h-screen pb-20">
      {/* Category Header */}
      <div className="bg-teal-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          {categoryData && (
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4 text-3xl text-terracotta-400">
              <categoryData.icon />
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">{categoryName}</h1>
          <p className="text-cream-200/80 max-w-2xl mx-auto text-lg">
            Browse our delicious selection of freshly baked {categoryName.toLowerCase()}.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 mt-[-3rem] relative z-10">
          <p className="text-gray-600 font-medium mb-4 sm:mb-0">
            Showing all <span className="font-bold text-teal-900">{categoryProducts.length}</span> results for {categoryName}
          </p>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <FiFilter size={16} /> Filter
            </button>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg focus:outline-none focus:border-teal-500 bg-white"
            >
              <option>Default sorting</option>
              <option>Sort by popularity</option>
              <option>Sort by newness</option>
              <option>Sort by price: low to high</option>
              <option>Sort by price: high to low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => <CardSkeleton key={i} />)}
          </div>
        ) : sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                <div className="relative aspect-square mb-4 overflow-hidden rounded-xl bg-warm-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-terracotta-500 text-white text-xs font-bold rounded-full">
                      {product.badge}
                    </span>
                  )}
                  {/* Quick Add Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        product && addToCart(product);
                      }}
                      className="w-full py-2.5 bg-white text-teal-900 font-semibold rounded-lg shadow-lg flex items-center justify-center gap-2 hover:bg-teal-50 transition-colors"
                    >
                      <FiShoppingCart size={18} /> Quick Add
                    </button>
                  </div>
                </div>
                <div className="mb-1 text-xs font-medium text-terracotta-500 uppercase tracking-wider">
                  {product.category}
                </div>
                <h3 className="font-bold text-teal-900 text-lg mb-2 line-clamp-1">{product.name}</h3>
                <div className="flex flex-col">
                  <span className="font-bold text-teal-900 text-lg">PKR {Math.floor(product.price || 0).toLocaleString()} <span className="text-xs font-normal text-gray-400 lowercase italic">per pound</span></span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      PKR {Math.floor(product.originalPrice).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-teal-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">We currently don't have any products in the {categoryName} category.</p>
            <Link to="/" className="inline-block px-6 py-3 bg-teal-800 text-white rounded-lg hover:bg-teal-900 transition-colors">
              Return to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
