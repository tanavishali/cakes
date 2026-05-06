import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { FiSearch, FiUser, FiHeart, FiShoppingCart, FiMenu, FiX, FiLogOut, FiChevronDown } from 'react-icons/fi';
import pearlReefLogo from '../../assets/pearl-reef-logo.png';

const navLinks = [
  { label: 'Home', to: '/' },
  { 
    label: 'Pound Cakes', 
    to: '/category/pound-cakes',
    dropdown: [
      { label: 'One Pound', to: '/category/pound-cakes/1' },
      { label: 'Two Pound', to: '/category/pound-cakes/2' },
      { label: 'Three Pound', to: '/category/pound-cakes/3' },
    ]
  },
  { label: 'Cookies', to: '/category/cookies' },
  { label: 'Cakes', to: '/category/cakes' },
  { label: 'Bento Cakes', to: '/category/bento-cakes' },
  { label: 'Pastry', to: '/category/pastry' },
  { label: 'Baby Cakes', to: '/category/baby-cakes' },
  { label: 'Boys Cakes', to: '/category/boys-cakes' },
  { label: "Men's Cakes", to: '/category/mens-cakes' },
  { label: 'Deals', to: '/category/deals' },
  { label: 'Nikka Cakes', to: '/category/nikka-cakes' },
];

export default function Header() {
  const { user, logout } = useAuth();
  const { totalItems, toggleCart } = useCart();
  const { wishlist, toggleWishlistSidebar } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top Info Bar */}
      <div className="bg-teal-900 text-cream-100/80 text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <span>📞 +92 315 4763116   📧 info@pearlreefcakes.com</span>
          <div className="hidden md:flex items-center gap-4">
            <span>Free delivery on orders over PKR 5,000!</span>
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
          <Link to="/" className="flex items-center gap-1 group">
            <img
              src={pearlReefLogo}
              alt="Pearl Reef Cakes"
              className="h-14 w-14 object-cover rounded-full ring-2 ring-teal-100 group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
            />
          </Link>

          {/* Search bar - desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search cakes, pastries..."
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

            <button 
              onClick={toggleWishlistSidebar}
              className="relative text-teal-800 hover:text-terracotta-500 transition-colors p-2 hover:bg-warm-gray-50 rounded-full"
            >
              <FiHeart size={20} fill={wishlist?.length > 0 ? "currentColor" : "none"} />
              {wishlist?.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-terracotta-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-pulse">
                  {wishlist.length}
                </span>
              )}
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
              <li key={link.label} className="relative group">
                {link.dropdown ? (
                  <>
                    <button
                      className="flex items-center gap-1 px-4 py-3 text-sm font-medium tracking-wide hover:bg-white/10 transition-colors rounded-t-lg relative group"
                    >
                      {link.label}
                      <FiChevronDown className="group-hover:rotate-180 transition-transform duration-300" />
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-terracotta-400 group-hover:w-3/4 transition-all duration-300" />
                    </button>
                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 w-48 bg-white text-teal-900 shadow-xl rounded-b-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      {link.dropdown.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.to}
                          className="block px-4 py-2 text-sm hover:bg-teal-50 hover:text-teal-700 transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={link.to}
                    className="block px-4 py-3 text-sm font-medium tracking-wide hover:bg-white/10 transition-colors rounded-t-lg relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-terracotta-400 group-hover:w-3/4 transition-all duration-300" />
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile nav */}
          {mobileOpen && (
            <ul className="md:hidden py-2 space-y-1">
              {navLinks.map((link) => (
                <li key={link.label} className="space-y-1">
                  {link.dropdown ? (
                    <>
                      <div className="px-4 py-2.5 text-sm font-bold border-b border-white/10 uppercase tracking-widest text-cream-200">
                        {link.label}
                      </div>
                      {link.dropdown.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.to}
                          onClick={() => setMobileOpen(false)}
                          className="block px-8 py-2 text-sm hover:bg-white/10 rounded-lg transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </>
                  ) : (
                    <Link
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-2.5 text-sm hover:bg-white/10 rounded-lg transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}
