import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiBell, FiLogOut, FiSearch, FiCheckCircle, FiBox, FiUserPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function Topbar({ onToggleSidebar, onMobileMenuOpen }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  // Dummy notifications
  const notifications = [
    { id: 1, title: 'New Order Received', desc: 'Order #O-4921 just arrived', time: '5m ago', icon: FiBox, color: 'text-teal-600', bg: 'bg-teal-100' },
    { id: 2, title: 'Payment Confirmed', desc: 'Payment for #O-4920 successful', time: '1h ago', icon: FiCheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
    { id: 3, title: 'New Customer', desc: 'Sarah registered an account', time: '2h ago', icon: FiUserPlus, color: 'text-blue-600', bg: 'bg-blue-100' },
  ];

  const handleMarkAllRead = () => {
    toast.success('All notifications marked as read', { icon: '👏' });
    setShowNotifications(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 md:px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          {/* Mobile menu */}
          <button
            onClick={onMobileMenuOpen}
            className="md:hidden text-gray-600 hover:text-gray-900 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiMenu size={20} />
          </button>

          {/* Desktop toggle */}
          <button
            onClick={onToggleSidebar}
            className="hidden md:block text-gray-600 hover:text-gray-900 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiMenu size={20} />
          </button>

          {/* Search */}
          <div className="hidden sm:flex items-center bg-gray-50 rounded-lg px-3 py-2 w-64">
            <FiSearch className="text-gray-400 mr-2" size={16} />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm text-gray-700 outline-none w-full placeholder-gray-400"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          
          {/* Notifications Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none"
            >
              <FiBell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-terracotta-500 rounded-full border border-white" />
            </button>

            {/* Dropdown Panel */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden z-50 animate-fadeInUp origin-top-right">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                  <h3 className="font-semibold text-gray-800 text-sm">Notifications</h3>
                  <button onClick={handleMarkAllRead} className="text-xs text-teal-700 font-medium hover:text-teal-800 transition-colors">Mark all read</button>
                </div>
                
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors flex gap-3 cursor-pointer">
                      <div className={`w-10 h-10 rounded-full ${notif.bg} ${notif.color} flex items-center justify-center flex-shrink-0`}>
                        <notif.icon size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 mb-0.5">{notif.title}</p>
                        <p className="text-xs text-gray-500 truncate">{notif.desc}</p>
                        <p className="text-[10px] text-gray-400 mt-1 font-medium">{notif.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-3 bg-gray-50/50 border-t border-gray-100 text-center">
                  <button className="text-sm font-semibold text-teal-800 hover:text-teal-900 transition-colors w-full">
                    View All Activity
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-gray-200 mx-1" />

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-teal-800 text-white flex items-center justify-center text-sm font-semibold">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-800 leading-tight">{user?.name}</p>
              <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-all"
            title="Logout"
          >
            <FiLogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
