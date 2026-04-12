import { FiX, FiHeart, FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { useWishlist } from '../../contexts/WishlistContext';
import { useCart } from '../../contexts/CartContext';

export default function WishlistSidebar() {
  const { wishlist, isWishlistOpen, toggleWishlistSidebar, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isWishlistOpen) return null;

  const handleMoveToCart = (product) => {
    addToCart(product);
    toggleWishlist(product); // Remove from wishlist after adding to cart
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-teal-900/50 backdrop-blur-sm z-[60] transition-opacity"
        onClick={toggleWishlistSidebar}
      />
      
      {/* Sidebar */}
      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl z-[70] flex flex-col transform transition-transform duration-300 translate-x-0">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-display font-bold text-teal-900 flex items-center gap-3">
            <FiHeart className="text-terracotta-500" fill="currentColor" /> 
            My Wishlist
          </h2>
          <button 
            onClick={toggleWishlistSidebar}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Wishlist Items Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-24 h-24 bg-terracotta-50 text-terracotta-200 rounded-full flex items-center justify-center mb-4">
                <FiHeart size={48} />
              </div>
              <h3 className="text-xl font-bold text-teal-900">Your wishlist is empty</h3>
              <p className="text-gray-500 max-w-[250px]">Save items you love to your wishlist and buy them later.</p>
              <button 
                onClick={toggleWishlistSidebar}
                className="mt-4 px-8 py-3 bg-teal-800 hover:bg-teal-900 text-white font-medium rounded-full transition-colors"
              >
                Go Back
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {wishlist.map((item) => (
                <li key={item.id} className="flex gap-4">
                  {/* Item Image */}
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-warm-gray-50 flex-shrink-0 border border-gray-100">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-teal-900 line-clamp-1">{item.name}</h4>
                        <p className="text-sm font-bold text-terracotta-500 mt-1">PKR {Math.floor(item.price).toLocaleString()}</p>
                      </div>
                      <button 
                        onClick={() => toggleWishlist(item)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="Remove from wishlist"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                    
                    <div className="flex justify-end mt-4">
                      <button 
                        onClick={() => handleMoveToCart(item)}
                        className="flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-800 hover:bg-teal-800 hover:text-white text-xs font-bold rounded-lg transition-all"
                      >
                        <FiShoppingCart size={14} /> Add to Cart
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer Area */}
        <div className="p-6 bg-gray-50 border-t border-gray-100">
           <p className="text-xs text-center text-gray-400">
            Total Items in Wishlist: <span className="font-bold">{wishlist.length}</span>
          </p>
        </div>
      </div>
    </>
  );
}
