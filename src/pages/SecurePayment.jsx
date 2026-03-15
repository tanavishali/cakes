import { FiLock, FiCheckCircle, FiCreditCard } from 'react-icons/fi';
import { FaPaypal, FaApple, FaGooglePay, FaStripe } from 'react-icons/fa';

export default function SecurePayment() {
  return (
    <div className="bg-warm-gray-50 min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <FiLock size={40} />
          </div>
          <h1 className="text-5xl font-display font-bold text-teal-900 mb-6">Secure Payment</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your security is our top priority. Shop with confidence knowing your payment data is fully protected.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Security Features */}
          <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-teal-900 mb-6 flex items-center gap-3">
              <FiCheckCircle className="text-terracotta-500" />
              100% Secure Checkout
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              At Blusher Cakes, all transactions are encrypted and processed through secure, trusted industry-leading payment gateways. We adhere strictly to PCI-DSS compliance standards.
            </p>
            <ul className="space-y-4">
              {[
                "256-bit SSL Encryption",
                "No card details saved on our servers",
                "Advanced Fraud Detection",
                "Real-time transaction monitoring"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  <div className="w-6 h-6 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
                    <FiLock size={12} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Methods */}
          <div className="bg-teal-900 text-white p-8 lg:p-10 rounded-2xl shadow-xl flex flex-col justify-center relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 opacity-10">
              <FiCreditCard size={200} />
            </div>
            
            <h2 className="text-2xl font-display font-bold mb-8 relative z-10 text-white">Accepted Methods</h2>
            
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="bg-white/10 rounded-xl p-4 border border-white/20 flex flex-col items-center justify-center text-center backdrop-blur-sm hover:bg-white/20 transition-colors">
                <FiCreditCard size={32} className="mb-2 text-cream-100" />
                <span className="text-sm font-medium">Credit Cards</span>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border border-white/20 flex flex-col items-center justify-center text-center backdrop-blur-sm hover:bg-white/20 transition-colors">
                <FaPaypal size={32} className="mb-2 text-blue-300" />
                <span className="text-sm font-medium">PayPal</span>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border border-white/20 flex flex-col items-center justify-center text-center backdrop-blur-sm hover:bg-white/20 transition-colors">
                <FaApple size={32} className="mb-2 text-white" />
                <span className="text-sm font-medium">Apple Pay</span>
              </div>
              <div className="bg-white/10 rounded-xl p-4 border border-white/20 flex flex-col items-center justify-center text-center backdrop-blur-sm hover:bg-white/20 transition-colors">
                <FaGooglePay size={32} className="mb-2 text-green-300" />
                <span className="text-sm font-medium">Google Pay</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center gap-4 text-white/50 relative z-10">
              <FaStripe size={40} className="hover:text-white transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
