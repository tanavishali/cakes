import { FiX, FiMinus, FiPlus, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartSidebar() {
  const { 
    cartItems, 
    isCartOpen, 
    toggleCart, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    shipping, 
    total 
  } = useCart();
  
  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCart(); // Close sidebar
    navigate('/checkout'); // Go to checkout page
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-teal-900/50 backdrop-blur-sm z-[60] transition-opacity"
        onClick={toggleCart}
      />
      
      {/* Sidebar */}
      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl z-[70] flex flex-col transform transition-transform duration-300 translate-x-0">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-display font-bold text-teal-900 flex items-center gap-3">
            <FiShoppingBag className="text-terracotta-500" /> 
            Your Cart
          </h2>
          <button 
            onClick={toggleCart}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Cart Items Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-24 h-24 bg-teal-50 text-teal-200 rounded-full flex items-center justify-center mb-4">
                <FiShoppingBag size={48} />
              </div>
              <h3 className="text-xl font-bold text-teal-900">Your cart is empty</h3>
              <p className="text-gray-500 max-w-[250px]">Looks like you haven't added any delicious treats yet.</p>
              <button 
                onClick={toggleCart}
                className="mt-4 px-8 py-3 bg-teal-800 hover:bg-teal-900 text-white font-medium rounded-full transition-colors"
              >
                Keep Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {cartItems.map((item) => (
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
                        <p className="text-xs text-terracotta-500 font-medium tracking-wider uppercase mt-1">{item.category}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-end mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-teal-700 transition-colors"
                        >
                          <FiMinus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-teal-900 select-none">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-teal-700 transition-colors"
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>
                      
                      <div className="font-bold text-teal-900">
                        PKR {Math.floor(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer / Checkout Area */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium text-teal-900">PKR {Math.floor(subtotal).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Shipping</span>
              {shipping === 0 ? (
                <span className="font-medium text-terracotta-500 uppercase text-xs tracking-wider bg-terracotta-50 px-2 py-1 rounded">Free</span>
              ) : (
                <span className="font-medium text-teal-900">PKR {Math.floor(shipping).toLocaleString()}</span>
              )}
            </div>
            <div className="h-px w-full bg-gray-200 my-2"></div>
            <div className="flex justify-between items-end mb-6">
              <span className="text-gray-700 font-semibold">Total</span>
              <span className="text-2xl font-bold text-teal-900">PKR {Math.floor(total).toLocaleString()}</span>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="w-full py-4 bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-terracotta-500/30 flex items-center justify-center gap-2"
            >
              Secure Checkout
            </button>
            <p className="text-xs text-center text-gray-400 mt-4 flex items-center justify-center gap-1">
              <span>🔒</span> Secured via highly encrypted payments
            </p>
          </div>
        )}
      </div>
    </>
  );
}
