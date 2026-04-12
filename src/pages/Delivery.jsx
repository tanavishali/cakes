import { FiTruck, FiClock, FiMapPin, FiCalendar } from 'react-icons/fi';

export default function Delivery() {
  return (
    <div className="bg-warm-gray-50 min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-display font-bold text-teal-900 mb-4">Delivery Information</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Freshness delivered straight to your door. Learn about our shipping areas, rates, and schedule.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-6">
            <div className="w-14 h-14 bg-teal-50 text-teal-700 rounded-xl flex items-center justify-center flex-shrink-0">
              <FiMapPin size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-teal-900 mb-2">Shipping Areas</h3>
              <p className="text-gray-600 leading-relaxed">
                We currently offer delivery services throughout the greater metropolitan area. Local pick-up is also available at our main bakery location. For special events outside our standard delivery zone, please contact us directly.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-6">
            <div className="w-14 h-14 bg-terracotta-50 text-terracotta-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <FiTruck size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-teal-900 mb-2">Delivery Rates</h3>
              <p className="text-gray-600 leading-relaxed">
                Standard delivery is PKR 500 for orders under PKR 5,000. <strong className="text-terracotta-600 font-semibold">Enjoy free delivery on all orders over PKR 5,000!</strong> Customized delivery rates may apply for large tiered cakes or bulk catering orders.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-6">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <FiClock size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-teal-900 mb-2">Delivery Times</h3>
              <p className="text-gray-600 leading-relaxed">
                Orders are typically delivered between 9:00 AM and 5:00 PM, Monday through Saturday. We require a 2-hour window for all standard deliveries to ensure your delicate treats arrive perfectly.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-6">
            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <FiCalendar size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-teal-900 mb-2">Order Notice</h3>
              <p className="text-gray-600 leading-relaxed">
                Please place your daily orders at least 24 hours in advance. For custom cakes or large events, we recommend booking at least 2 weeks ahead of your scheduled date.
              </p>
            </div>
          </div>
        </div>

        {/* Banner */}
        <div className="bg-teal-900 rounded-2xl overflow-hidden relative shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900 to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=1200&h=400&fit=crop" 
            alt="Pastries" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30" 
          />
          <div className="relative z-20 p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between">
            <div className="text-white mb-6 md:mb-0 max-w-xl">
              <h3 className="text-3xl font-display font-bold mb-3">Ready to order?</h3>
              <p className="text-teal-100 text-lg">Browse our catalog and get your favorite pastries delivered right to your doorstep today.</p>
            </div>
            <a href="/" className="px-8 py-4 bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold rounded-full transition-colors whitespace-nowrap shadow-md">
              Start Shopping
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
