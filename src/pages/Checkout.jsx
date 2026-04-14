import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { FiLock, FiCheckCircle, FiChevronLeft, FiTruck } from 'react-icons/fi';
import toast from 'react-hot-toast';

import { FaCcVisa, FaCcMastercard, FaCcAmex } from 'react-icons/fa';

export default function Checkout() {
  const { cartItems, subtotal, shipping, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isStepLoading, setIsStepLoading] = useState(false);
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

  const nextStep = () => {
    setIsStepLoading(true);
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
      setIsStepLoading(false);
      window.scrollTo(0, 0);
    }, 600);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call for payment processing
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      toast.success('Order placed successfully!');
      setCurrentStep(4); // Success step
    }, 2000);
  };

  if (cartItems.length === 0 && !isProcessing && currentStep !== 4) {
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

  const steps = [
    { id: 1, label: 'Summary', icon: FiShoppingCart },
    { id: 2, label: 'Shipping', icon: FiTruck },
    { id: 3, label: 'Payment', icon: FiLock }
  ];

  return (
    <div className="min-h-screen bg-warm-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Stepper Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-display font-bold text-teal-900">
              {currentStep === 4 ? 'Order Placed!' : 'Checkout'}
            </h1>
            <div className="flex items-center text-sm text-gray-500 font-medium bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
              <FiCheckCircle className="mr-1.5 text-teal-600" /> SSL Secured Checkout
            </div>
          </div>

          {currentStep < 4 && (
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0 hidden sm:block">
                <div 
                  className="h-full bg-teal-600 transition-all duration-500 ease-out"
                  style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                />
              </div>

              {/* Step Circles */}
              <div className="relative z-10 flex justify-between">
                {steps.map((step) => {
                  const Icon = step.icon;
                  const isCompleted = currentStep > step.id;
                  const isActive = currentStep === step.id;
                  
                  return (
                    <div key={step.id} className="flex flex-col items-center">
                      <div 
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isCompleted ? 'bg-teal-600 text-white' : 
                          isActive ? 'bg-white border-2 border-teal-600 text-teal-600 shadow-md ring-4 ring-teal-50' : 
                          'bg-white border-2 border-gray-200 text-gray-400'
                        }`}
                      >
                        {isCompleted ? <FiCheckCircle size={24} /> : <Icon size={20} />}
                      </div>
                      <span className={`mt-3 text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                        isActive ? 'text-teal-900' : 'text-gray-400'
                      }`}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        
        {/* Step Content */}
        <div className={`transition-all duration-500 ${isStepLoading ? 'opacity-30 scale-[0.98]' : 'opacity-100 scale-100'}`}>
          {isStepLoading && (
            <div className="absolute inset-0 z-50 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 animate-fadeInUp">
              <h2 className="text-2xl font-bold text-teal-900 mb-6">Order Summary</h2>
              <div className="space-y-4 mb-8">
                {cartItems?.map((item) => (
                  <div key={item?.id} className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0">
                    <img src={item?.image} className="w-20 h-20 rounded-2xl object-cover border border-gray-100" />
                    <div className="flex-1">
                      <h4 className="font-bold text-teal-900">{item?.name}</h4>
                      <p className="text-sm text-gray-500 italic">Qty: {item?.quantity}</p>
                      <p className="font-bold text-teal-900 mt-1">PKR {Math.floor(item?.price * item?.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-warm-gray-50 p-6 rounded-2xl space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-teal-900">PKR {Math.floor(subtotal).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-terracotta-500 font-bold">{shipping === 0 ? 'FREE' : `PKR ${shipping}`}</span>
                </div>
                <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">Total Price</span>
                  <span className="text-3xl font-bold text-teal-900">PKR {Math.floor(total).toLocaleString()}</span>
                </div>
              </div>
              <button 
                onClick={nextStep}
                className="w-full mt-8 py-4 bg-teal-800 hover:bg-teal-900 text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Proceed to Shipping <FiTruck />
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 animate-fadeInUp">
              <h2 className="text-2xl font-bold text-teal-900 mb-6">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                  <input type="text" name="firstName" onChange={handleChange} value={formData.firstName} className="w-full px-5 py-3.5 bg-warm-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 transition-all outline-none" placeholder="Enter first name" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                  <input type="text" name="lastName" onChange={handleChange} value={formData.lastName} className="w-full px-5 py-3.5 bg-warm-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 transition-all outline-none" placeholder="Enter last name" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Detailed Address</label>
                  <input type="text" name="address" onChange={handleChange} value={formData.address} className="w-full px-5 py-3.5 bg-warm-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 transition-all outline-none" placeholder="Street, Apartment, Area" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                  <input type="text" name="city" onChange={handleChange} value={formData.city} className="w-full px-5 py-3.5 bg-warm-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 transition-all outline-none" placeholder="Lahore, Karachi, etc." />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Number</label>
                  <input type="tel" className="w-full px-5 py-3.5 bg-warm-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 transition-all outline-none" placeholder="03XXXXXXXXX" />
                </div>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={prevStep}
                  className="flex-1 py-4 border-2 border-gray-100 text-gray-500 font-bold rounded-2xl hover:bg-gray-50 transition-all"
                >
                  Back
                </button>
                <button 
                  onClick={nextStep}
                  className="flex-[2] py-4 bg-teal-800 hover:bg-teal-900 text-white font-bold rounded-2xl shadow-lg transition-all"
                >
                  Go to Payment
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 animate-fadeInUp">
              <h2 className="text-2xl font-bold text-teal-900 mb-6">Payment Method</h2>
              <div className="space-y-4 mb-8">
                <label className={`block p-5 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-teal-600 bg-teal-50/30' : 'border-gray-100'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input type="radio" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-5 h-5 accent-teal-600" />
                      <span className="font-bold text-teal-900">Credit / Debit Card</span>
                    </div>
                    <div className="flex gap-2 text-2xl text-gray-400">
                      <FaCcVisa /> <FaCcMastercard />
                    </div>
                  </div>
                  {paymentMethod === 'card' && (
                    <div className="mt-6 grid grid-cols-2 gap-4 animate-fadeInUp">
                      <input className="col-span-2 px-5 py-3 bg-white border border-gray-200 rounded-xl" placeholder="Card Number" />
                      <input className="px-5 py-3 bg-white border border-gray-200 rounded-xl" placeholder="MM/YY" />
                      <input className="px-5 py-3 bg-white border border-gray-200 rounded-xl" placeholder="CVC" />
                    </div>
                  )}
                </label>
                <label className={`block p-5 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-teal-600 bg-teal-50/30' : 'border-gray-100'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="w-5 h-5 accent-teal-600" />
                    <span className="font-bold text-teal-900">Cash on Delivery</span>
                  </div>
                </label>
              </div>
              <div className="flex gap-4">
                <button onClick={prevStep} className="flex-1 py-4 border-2 border-gray-100 text-gray-500 font-bold rounded-2xl">Back</button>
                <button 
                  onClick={handleSubmit} 
                  disabled={isProcessing}
                  className="flex-[2] py-4 bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold rounded-2xl shadow-lg relative overflow-hidden"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center gap-2">
                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                       Processing...
                    </div>
                  ) : (
                    `Complete Order - PKR ${Math.floor(total).toLocaleString()}`
                  )}
                </button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center animate-scaleIn">
              <div className="w-24 h-24 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <FiCheckCircle size={48} />
              </div>
              <h2 className="text-3xl font-display font-bold text-teal-900 mb-4">Your cake is on the way!</h2>
              <p className="text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
                Thank you for choosing Blusher Cakes. We've received your order and our bakers are already at work!
              </p>
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 px-10 py-4 bg-teal-800 hover:bg-teal-900 text-white font-bold rounded-2xl transition-all shadow-lg"
              >
                Back to Shopping <FiArrowRight />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
