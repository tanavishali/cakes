import { FiMapPin, FiPhone, FiMail, FiSend, FiClock } from 'react-icons/fi';

export default function Contact() {
  return (
    <div className="bg-warm-gray-50 min-h-screen">
      {/* Banner */}
      <div className="bg-teal-900 text-cream-100 py-20 px-4 text-center">
        <h1 className="text-5xl font-display font-bold text-white mb-6">Contact Us</h1>
        <p className="text-xl max-w-2xl mx-auto opacity-90">
          Have a question about a custom cake order, or just want to say hi? We'd love to hear from you!
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-teal-900 mb-6 border-b border-gray-100 pb-4">Our Details</h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiMapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-teal-900 text-lg">Visit Us</h4>
                    <p className="text-gray-600">Judicial Colony Phase 2<br />D Block, Lahore, Pakistan</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-12 h-12 bg-terracotta-50 text-terracotta-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiPhone size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-teal-900 text-lg">Call Us</h4>
                    <p className="text-gray-600">0315-4763116</p>
                    <p className="text-xs text-gray-400 mt-1">Available Mon-Sat, 9am - 8pm</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiMail size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-teal-900 text-lg">Email Us</h4>
                    <a href="mailto:info@pearlreefcakes.com" className="text-teal-600 hover:text-terracotta-500 transition-colors">info@pearlreefcakes.com</a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiClock size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-teal-900 text-lg">Store Hours</h4>
                    <p className="text-gray-600">Mon-Fri: 7:00 AM - 7:00 PM<br />Sat: 8:00 AM - 8:00 PM<br />Sun: Closed</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 rounded-2xl overflow-hidden h-64 shadow-inner relative group border border-gray-100 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10"></div>
              {/* Optional: Embed an actual iframe map here. For now, a subtle placeholder */}
               <div className="text-center text-gray-500 relative z-20">
                 <FiMapPin size={32} className="mx-auto mb-2 opacity-50" />
                 <span className="font-medium">Interactive Map Area</span>
               </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-lg border border-gray-100 h-full">
              <h2 className="text-3xl font-display font-bold text-teal-900 mb-2">Send us a message</h2>
              <p className="text-gray-600 mb-8">Fill out the form below and our team will get back to you within 24 hours.</p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                    <input 
                      type="text" 
                      className="w-full px-5 py-3 bg-warm-gray-50 border border-gray-200 rounded-xl focus:ring-teal-500 focus:border-teal-500 transition-colors" 
                      placeholder="Jane" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full px-5 py-3 bg-warm-gray-50 border border-gray-200 rounded-xl focus:ring-teal-500 focus:border-teal-500 transition-colors" 
                      placeholder="Doe" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full px-5 py-3 bg-warm-gray-50 border border-gray-200 rounded-xl focus:ring-teal-500 focus:border-teal-500 transition-colors" 
                      placeholder="jane@example.com" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      className="w-full px-5 py-3 bg-warm-gray-50 border border-gray-200 rounded-xl focus:ring-teal-500 focus:border-teal-500 transition-colors" 
                      placeholder="(555) 123-4567" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                  <select className="w-full px-5 py-3 bg-warm-gray-50 border border-gray-200 rounded-xl focus:ring-teal-500 focus:border-teal-500 transition-colors text-gray-700">
                    <option>General Inquiry</option>
                    <option>Custom Cake Order</option>
                    <option>Catering Event</option>
                    <option>Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea 
                    rows="5" 
                    className="w-full px-5 py-3 bg-warm-gray-50 border border-gray-200 rounded-xl focus:ring-teal-500 focus:border-teal-500 transition-colors resize-none" 
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <button 
                  type="button" 
                  className="w-full md:w-auto px-10 py-4 bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <FiSend /> Send Message
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
