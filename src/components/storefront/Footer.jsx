import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiSend } from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { GiCakeSlice } from 'react-icons/gi';

export default function Footer() {
  return (
    <footer>
      {/* Newsletter */}
      <div className="bg-teal-800">
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center gap-6">
          <div className="text-center md:text-left flex-1">
            <h3 className="text-xl font-display font-bold text-white mb-1">Get Latest Updates & News</h3>
            <p className="text-cream-200/60 text-sm">Subscribe to our newsletter for exclusive offers and bakery updates.</p>
          </div>
          <div className="flex w-full md:w-auto max-w-md">
            <input
              type="email"
              placeholder="Enter your email..."
              className="flex-1 px-5 py-3 rounded-l-full bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-terracotta-400 transition-colors"
            />
            <button className="px-6 py-3 bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold rounded-r-full transition-colors flex items-center gap-2">
              <FiSend /> Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-teal-900 text-cream-100/70">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <GiCakeSlice className="text-2xl text-terracotta-400" />
              <span className="text-lg font-display font-bold text-white tracking-wider">BLUSHER CAKES</span>
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              We craft the finest cakes, breads, and pastries using premium ingredients and traditional recipes passed down through generations.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: FaFacebookF, href: '#' },
                { Icon: FaTwitter, href: '#' },
                { Icon: FaInstagram, href: 'https://www.instagram.com/blushercakes/' },
                { Icon: FaYoutube, href: '#' }
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target={href !== '#' ? '_blank' : undefined}
                  rel={href !== '#' ? 'noopener noreferrer' : undefined}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-terracotta-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-terracotta-400">Products</h4>
            <ul className="space-y-2.5 text-sm">
              {['New Products', 'Best Sellers', 'Prices Drop', 'All Products'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-terracotta-400 hover:pl-1 transition-all duration-200">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-terracotta-400">Our Company</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Delivery', path: '/delivery' },
                { label: 'Terms & Conditions', path: '/terms' },
                { label: 'Secure Payment', path: '/payment' },
                { label: 'Contact Us', path: '/contact' }
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.path} onClick={() => window.scrollTo(0, 0)} className="hover:text-terracotta-400 hover:pl-1 transition-all duration-200">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-terracotta-400">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-terracotta-400 mt-0.5 flex-shrink-0" />
                <span>1801 Baker Street, Suite 200, New York, 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-terracotta-400 flex-shrink-0" />
                <span>(+001) 0123-456-789</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-terracotta-400 flex-shrink-0" />
                <span>info@blushercakes.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-200/40">
            <p>&copy; 2026 Blusher Cakes. All Rights Reserved.</p>
            <div className="flex gap-4 mt-2 sm:mt-0">
              <a href="#" className="hover:text-cream-200/70 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-cream-200/70 transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-cream-200/70 transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
