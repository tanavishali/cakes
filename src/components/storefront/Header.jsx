import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { FiSearch, FiUser, FiHeart, FiShoppingCart, FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { GiCakeSlice } from 'react-icons/gi';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Cookies', to: '/category/cookies' },
  { label: 'Cakes', to: '/category/cakes' },
  { label: 'Breads', to: '/category/breads' },
  { label: 'Pastry', to: '/category/pastry' },
  { label: 'Desserts', to: '/category/desserts' },
];

export default function Header() {
  const { user, logout } = useAuth();
  const { totalItems, toggleCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top Info Bar */}
      <div className="bg-teal-900 text-cream-100/80 text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <span>📞 (+001) 0123-456-789 &nbsp;|&nbsp; 📧 info@blushercakes.com</span>
          <div className="hidden md:flex items-center gap-4">
            <span>Free delivery on orders over $50!</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white shadow-sm border-b border-warm-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-teal-800 p-2"
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <GiCakeSlice className="text-3xl text-terracotta-500 group-hover:rotate-12 transition-transform duration-300" />
            <div>
              <h1 className="text-xl font-display font-bold text-teal-900 tracking-wider leading-tight">BLUSHER CAKES</h1>
              <p className="text-[10px] text-warm-gray-300 tracking-[0.2em] uppercase">Bakery & Confections</p>
            </div>
          </Link>

          {/* Search bar - desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search cakes, breads, pastries..."
                className="w-full pl-4 pr-12 py-2.5 bg-warm-gray-50 border border-warm-gray-200 rounded-full text-sm text-gray-700 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition-all"
              />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-teal-800 hover:bg-teal-700 text-white p-2 rounded-full transition-colors">
                <FiSearch size={16} />
              </button>
            </div>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden text-teal-800 p-2 hover:bg-warm-gray-50 rounded-full transition-colors"
            >
              <FiSearch size={20} />
            </button>

            {user && (
              <Link to={user.role === 'admin' ? '/admin' : '/'} className="hidden sm:flex items-center gap-1.5 text-teal-800 hover:text-terracotta-500 transition-colors px-2 py-1 rounded-lg hover:bg-warm-gray-50">
                <FiUser size={18} />
                <span className="text-xs font-medium">{user.name}</span>
              </Link>
            )}

            <button className="relative text-teal-800 hover:text-terracotta-500 transition-colors p-2 hover:bg-warm-gray-50 rounded-full">
              <FiHeart size={20} />
              <span className="absolute -top-0.5 -right-0.5 bg-terracotta-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
            </button>

            <button 
              onClick={toggleCart}
              className="relative text-teal-800 hover:text-terracotta-500 transition-colors p-2 hover:bg-warm-gray-50 rounded-full"
            >
              <FiShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-terracotta-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>

            {user && (
              <button
                onClick={logout}
                className="text-warm-gray-300 hover:text-red-500 transition-colors p-2 hover:bg-warm-gray-50 rounded-full"
                title="Logout"
              >
                <FiLogOut size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Mobile search */}
        {searchOpen && (
          <div className="md:hidden px-4 pb-3">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-4 pr-12 py-2.5 bg-warm-gray-50 border border-warm-gray-200 rounded-full text-sm focus:outline-none focus:border-teal-600 transition-all"
              />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-teal-800 text-white p-2 rounded-full">
                <FiSearch size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="bg-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="block px-4 py-3 text-sm font-medium tracking-wide hover:bg-white/10 transition-colors rounded-t-lg relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-terracotta-400 group-hover:w-3/4 transition-all duration-300" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile nav */}
          {mobileOpen && (
            <ul className="md:hidden py-2 space-y-1">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2.5 text-sm hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}
