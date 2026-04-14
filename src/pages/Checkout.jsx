import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { FiLock, FiCheckCircle, FiChevronLeft, FiTruck } from 'react-icons/fi';
import toast from 'react-hot-toast';

import { FaCcVisa, FaCcMastercard, FaCcAmex } from 'react-icons/fa';

export default function Checkout() {
  const { cartItems, subtotal, shipping, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  // Basic form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call for payment processing
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      toast.success('Payment successful! Your order has been placed.');
      navigate('/'); // Or navigate to an order confirmation page
    }, 2000);
  };

  if (cartItems.length === 0 && !isProcessing) {
    return (
      <div className="min-h-screen bg-warm-gray-50 flex items-center justify-center py-20 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiShoppingCart className="text-gray-400" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-teal-900 mb-2">Cart is empty</h2>
          <p className="text-gray-500 mb-8">You need to add items to your cart before you can checkout.</p>
          <Link to="/" className="inline-flex items-center gap-2 text-teal-800 font-semibold hover:text-teal-600">
            <FiChevronLeft /> Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-display font-bold text-teal-900">Checkout</h1>
          <div className="flex items-center text-sm text-gray-500 font-medium">
            <FiLock className="mr-1.5" /> Secure SSL Server
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Form Area */}
          <div className="w-full lg:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Shipping Details */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-teal-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-sm">1</span>
                  Shipping Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input 
                      required
                      type="text" 
                      name="firstName"
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input 
                      required
                      type="text" 
                      name="lastName"
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      required
                      type="email" 
                      name="email"
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                    <input 
                      required
                      type="text" 
                      name="address"
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input 
                      required
                      type="text" 
                      name="city"
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP / Postal Code</label>
                    <input 
                      required
                      type="text" 
                      name="zipCode"
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-teal-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-sm">2</span>
                  Payment Method
                </h2>
                
                <div className="flex flex-col gap-4 mb-6">
                  {/* Card Option */}
                  <label 
                    className={`cursor-pointer p-4 border rounded-xl relative overflow-hidden transition-all ${
                      paymentMethod === 'card' ? 'border-teal-500 bg-gray-50' : 'border-gray-200 hover:border-teal-300'
                    }`}
                  >
                    {paymentMethod === 'card' && <div className="absolute top-0 left-0 w-1 h-full bg-teal-500"></div>}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-teal-500' : 'border-gray-300'}`}>
                          {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-teal-500"></div>}
                        </div>
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          value="card" 
                          checked={paymentMethod === 'card'} 
                          onChange={() => setPaymentMethod('card')} 
                          className="sr-only"
                        />
                        <span className={`font-semibold ${paymentMethod === 'card' ? 'text-teal-900' : 'text-gray-600'}`}>Credit / Debit Card</span>
                      </div>
                      <div className="flex gap-2 text-xl text-gray-400">
                         <FaCcVisa />
                         <FaCcMastercard />
                         <FaCcAmex />
                      </div>
                    </div>
                  </label>

                  {/* COD Option */}
                  <label 
                    className={`cursor-pointer p-4 border rounded-xl relative overflow-hidden transition-all ${
                      paymentMethod === 'cod' ? 'border-teal-500 bg-gray-50' : 'border-gray-200 hover:border-teal-300'
                    }`}
                  >
                    {paymentMethod === 'cod' && <div className="absolute top-0 left-0 w-1 h-full bg-teal-500"></div>}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-teal-500' : 'border-gray-300'}`}>
                          {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-teal-500"></div>}
                        </div>
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          value="cod" 
                          checked={paymentMethod === 'cod'} 
                          onChange={() => setPaymentMethod('cod')} 
                          className="sr-only"
                        />
                        <span className={`font-semibold ${paymentMethod === 'cod' ? 'text-teal-900' : 'text-gray-600'}`}>Cash on Delivery</span>
                      </div>
                      <div className="text-xl text-gray-400">
                        <FiTruck />
                      </div>
                    </div>
                  </label>
                </div>

                {/* Conditional Card Inputs */}
                {paymentMethod === 'card' && (
                  <div className="grid grid-cols-2 gap-4 animate-fadeInUp">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                      <input 
                        required
                        type="text" 
                        placeholder="0000 0000 0000 0000"
                        name="cardNumber"
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input 
                        required
                        type="text" 
                        placeholder="MM/YY"
                        name="expiry"
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                      <input 
                        required
                        type="text" 
                        placeholder="123"
                        name="cvv"
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                      />
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'cod' && (
                  <div className="bg-teal-50 p-4 rounded-xl text-teal-800 text-sm animate-fadeInUp flex gap-3">
                    <FiCheckCircle className="flex-shrink-0 mt-0.5" size={18} />
                    <p>You can pay in cash to our courier when you receive the goods at your doorstep.</p>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-terracotta-500 hover:bg-terracotta-600 active:scale-[0.98] text-white text-lg font-bold rounded-xl transition-all shadow-lg shadow-terracotta-500/30 flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:shadow-none"
              >
                {isProcessing ? (
                  <span className="animate-pulse">Processing Order...</span>
                ) : (
                  <>
                    {paymentMethod === 'card' ? <FiLock /> : <FiCheckCircle />} 
                    {paymentMethod === 'card' ? `Pay PKR ${Math.floor(total).toLocaleString()} Now` : `Confirm Order for PKR ${Math.floor(total).toLocaleString()}`}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-xl font-bold text-teal-900 mb-6">Order Summary</h3>
              
              <ul className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                {cartItems?.map((item) => (
                  <li key={item?.id} className="flex gap-4">
                    <img 
                      src={item?.image} 
                      alt={item?.name} 
                      className="w-16 h-16 rounded-lg object-cover border border-gray-100"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-teal-900 line-clamp-1">{item?.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">Qty: {item?.quantity}</p>
                      <p className="text-sm font-bold text-teal-900 mt-1">
                        PKR {Math.floor((item?.price || 0) * (item?.quantity || 0)).toLocaleString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="space-y-3 pt-6 border-t border-gray-100 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-teal-900">PKR {Math.floor(subtotal).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="font-semibold text-terracotta-500">Free</span>
                  ) : (
                    <span className="font-semibold text-teal-900">PKR {Math.floor(shipping).toLocaleString()}</span>
                  )}
                </div>
                <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="text-2xl font-bold text-teal-900">PKR {Math.floor(total).toLocaleString()}</span>
                </div>
              </div>

              {/* Security badges */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-4 justify-center text-sm font-medium text-gray-600">
                  <FiCheckCircle className="text-teal-600" />
                  100% Satisfaction Guarantee
                </div>
                <div className="flex items-center gap-2 justify-center text-sm font-medium text-gray-600">
                  <FiCheckCircle className="text-teal-600" />
                  No Hidden Fees
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
