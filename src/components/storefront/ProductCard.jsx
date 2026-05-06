import { useState } from 'react';
import { createPortal } from 'react-dom';
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import ProductQuickView from './ProductQuickView';

export default function ProductCard({ product }) {
  const name = product?.name;
  const price = product?.price;
  const originalPrice = product?.originalPrice;
  const rating = product?.rating;
  const reviews = product?.reviews;
  const image = product?.image;
  const badge = product?.badge;
  
  const { addToCart } = useCart();
  const { toggleWishlist, isFavorite } = useWishlist();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  
  const favorited = product?.id ? isFavorite(product.id) : false;

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

        {/* Hover actions - always visible on mobile, hover on desktop */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-100 md:opacity-0 md:translate-x-4 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-300">
          <button 
            onClick={() => product && toggleWishlist(product)}
            className={`w-9 h-9 rounded-full shadow-md flex items-center justify-center transition-all ${
              favorited 
                ? 'bg-terracotta-500 text-white' 
                : 'bg-white text-warm-gray-300 hover:text-terracotta-500 hover:bg-terracotta-50'
            }`}
          >
            <FiHeart size={16} fill={favorited ? "currentColor" : "none"} />
          </button>
          <button 
            onClick={() => setIsQuickViewOpen(true)}
            className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-warm-gray-300 hover:text-teal-700 hover:bg-teal-700 hover:text-white transition-colors"
          >
            <FiEye size={16} />
          </button>
        </div>

        {/* Quick add to cart - always visible on mobile, hover on desktop */}
        <div className="absolute bottom-0 left-0 right-0 opacity-100 md:opacity-0 md:translate-y-full md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300">
          <button 
            onClick={(e) => {
              e.preventDefault();
              product && addToCart(product);
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
              className={i < Math.floor(rating || 0) ? 'text-amber-400' : 'text-warm-gray-200'}
            />
          ))}
          <span className="text-xs text-warm-gray-300 ml-1">({reviews || 0})</span>
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <span className="text-lg font-bold text-teal-800">PKR {Math.floor(price || 0).toLocaleString()} <span className="text-xs font-normal text-gray-400 lowercase">per pound</span></span>
          {originalPrice && (
            <span className="text-sm text-warm-gray-300 line-through">PKR {Math.floor(originalPrice).toLocaleString()}</span>
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
