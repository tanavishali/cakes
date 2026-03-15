import { useState } from 'react';
import { createPortal } from 'react-dom';
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';
import ProductQuickView from './ProductQuickView';

export default function ProductCard({ product }) {
  const { name, price, originalPrice, rating, reviews, image, badge } = product;
  const { addToCart } = useCart();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  return (
    <div className="group bg-white rounded-xl border border-warm-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-cream-50">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Badge */}
        {badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${
              badge === 'Bestseller'
                ? 'bg-teal-700 text-white'
                : badge === 'New'
                ? 'bg-terracotta-500 text-white'
                : badge === 'Popular'
                ? 'bg-amber-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            {badge}
          </span>
        )}

        {/* Hover actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <button className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-warm-gray-300 hover:text-terracotta-500 hover:bg-terracotta-500 hover:text-white transition-colors">
            <FiHeart size={16} />
          </button>
          <button 
            onClick={() => setIsQuickViewOpen(true)}
            className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-warm-gray-300 hover:text-teal-700 hover:bg-teal-700 hover:text-white transition-colors"
          >
            <FiEye size={16} />
          </button>
        </div>

        {/* Quick add to cart */}
        <div className="absolute bottom-0 left-0 right-0 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="w-full py-3 bg-teal-800/95 backdrop-blur-sm text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-teal-700 transition-colors"
          >
            <FiShoppingCart size={16} /> Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-1 group-hover:text-teal-800 transition-colors">{name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              size={12}
              className={i < Math.floor(rating) ? 'text-amber-400' : 'text-warm-gray-200'}
            />
          ))}
          <span className="text-xs text-warm-gray-300 ml-1">({reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-teal-800">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-sm text-warm-gray-300 line-through">${originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>

      {/* Quick View Modal Portal */}
      {isQuickViewOpen && createPortal(
        <ProductQuickView 
          isOpen={isQuickViewOpen} 
          onClose={() => setIsQuickViewOpen(false)} 
          product={product} 
        />,
        document.body
      )}
    </div>
  );
}
