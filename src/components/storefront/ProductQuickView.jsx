import { FiX, FiShoppingCart, FiHeart, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useEffect, useState } from 'react';

export default function ProductQuickView({ isOpen, onClose, product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isFavorite } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const favorited = product ? isFavorite(product.id) : false;

  // If product doesn't have multiple images, mock them for the demo
  const images = product?.images || [
    product?.image,
    'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=400&h=400&fit=crop', // generic dessert
    'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=400&h=400&fit=crop'  // generic pastry
  ];

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose();
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    setIsAdding(true);
    // Add multiple items 
    for(let i=0; i<quantity; i++) {
        addToCart(product);
    }
    setTimeout(() => {
      setIsAdding(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-scaleIn z-10 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
        >
          <FiX size={20} />
        </button>

        {/* Left: Image Slider */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-cream-50 group/slider">
          <img 
            src={images[currentImageIndex]} 
            alt={`${product.name} - view ${currentImageIndex + 1}`} 
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          
          {product.badge && (
            <span className="absolute top-4 left-4 z-10 bg-terracotta-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              {product.badge}
            </span>
          )}

          {/* Slider Controls */}
          {images.length > 1 && (
            <>
              <button 
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/80 backdrop-blur text-teal-900 rounded-full flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 shadow-md hover:bg-white hover:text-terracotta-500"
              >
                <FiChevronLeft size={20} />
              </button>
              <button 
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/80 backdrop-blur text-teal-900 rounded-full flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 shadow-md hover:bg-white hover:text-terracotta-500"
              >
                <FiChevronRight size={20} />
              </button>
              
              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentImageIndex === idx ? 'w-6 bg-terracotta-500' : 'w-2 bg-white/70 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col overflow-y-auto">
          <div className="mb-2 uppercase text-xs font-bold tracking-widest text-terracotta-500">
            {product.category || 'Bakery Category'}
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-teal-900 mb-2">
            {product.name}
          </h2>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} size={14} className={i < Math.floor(product.rating || 5) ? 'text-amber-400' : 'text-gray-200'} />
              ))}
            </div>
            <span className="text-sm text-gray-500 font-medium">({product.reviews || 0} reviews)</span>
          </div>

          <div className="flex flex-col mb-6">
            <span className="text-3xl font-bold text-teal-800">PKR {Math.floor(product.price || 0).toLocaleString()} <span className="text-xs font-normal text-gray-400 lowercase">per pound</span></span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">PKR {Math.floor(product.originalPrice).toLocaleString()}</span>
            )}
          </div>

          <div className="prose prose-sm text-gray-600 mb-8 max-w-none">
            <p>
              Experience the perfect blend of rich flavors and artisanal craftsmanship. 
              Our {product.name.toLowerCase()} is freshly made daily using premium ingredients,
              ensuring every bite is an unforgettable delight. Perfect for sharing or treating yourself!
            </p>
            <ul className="mt-4 space-y-1">
              <li>✓ Freshly baked daily</li>
              <li>✓ Premium quality ingredients</li>
              <li>✓ 100% vegetarian-friendly</li>
            </ul>
          </div>

          <div className="mt-auto pt-6 border-t border-gray-100">
            {/* Quantity and Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border-2 border-gray-200 rounded-xl bg-white w-full sm:w-32 h-12">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 text-gray-500 hover:text-teal-700 transition-colors h-full"
                >-</button>
                <span className="flex-1 text-center font-bold text-gray-800">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 text-gray-500 hover:text-teal-700 transition-colors h-full"
                >+</button>
              </div>

              <button 
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`flex-1 flex items-center justify-center gap-2 h-12 rounded-xl font-bold text-white transition-all duration-300 ${
                  isAdding ? 'bg-teal-600 scale-95' : 'bg-teal-800 hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-800/20'
                }`}
              >
                {isAdding ? (
                  <span className="animate-pulse">Adding...</span>
                ) : (
                  <>
                    <FiShoppingCart size={18} /> Add to Cart
                  </>
                )}
              </button>

              <button 
                onClick={() => toggleWishlist(product)}
                className={`w-12 h-12 flex items-center justify-center rounded-xl border-2 transition-all flex-shrink-0 ${
                  favorited 
                    ? 'border-terracotta-500 bg-terracotta-500 text-white' 
                    : 'border-gray-200 text-gray-400 hover:border-terracotta-500 hover:text-terracotta-500'
                }`}
              >
                <FiHeart size={20} fill={favorited ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
