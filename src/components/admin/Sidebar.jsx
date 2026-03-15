import { NavLink, Link } from 'react-router-dom';
import { FiGrid, FiPackage, FiShoppingBag, FiLayers, FiSettings, FiX } from 'react-icons/fi';
import { GiCakeSlice } from 'react-icons/gi';

const navItems = [
  { label: 'Dashboard', icon: FiGrid, to: '/admin' },
  { label: 'Products', icon: FiPackage, to: '/admin/products' },
  { label: 'Orders', icon: FiShoppingBag, to: '/admin/orders' },
  { label: 'Categories', icon: FiLayers, to: '/admin/categories' },
  { label: 'Settings', icon: FiSettings, to: '/admin/settings' },
];

export default function Sidebar({ collapsed, mobileOpen, onMobileClose }) {
  const baseCls = `fixed top-0 left-0 h-full bg-teal-900 text-white z-50 transition-all duration-300 flex flex-col`;

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={`${baseCls} hidden md:flex ${collapsed ? 'w-20' : 'w-64'}`}>
        <SidebarContent collapsed={collapsed} />
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={`${baseCls} md:hidden w-64 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-end p-4">
          <button onClick={onMobileClose} className="text-white/70 hover:text-white">
            <FiX size={20} />
          </button>
        </div>
        <SidebarContent collapsed={false} onNavigate={onMobileClose} />
      </aside>
    </>
  );
}

function SidebarContent({ collapsed, onNavigate }) {
  return (
    <>
      {/* Logo */}
      <Link to="/admin" className={`flex items-center gap-3 px-6 py-5 border-b border-white/10 ${collapsed ? 'justify-center px-3' : ''}`}>
        <GiCakeSlice className="text-2xl text-terracotta-400 flex-shrink-0" />
        {!collapsed && (
          <span className="text-lg font-display font-bold tracking-wider">CAKE SHOP</span>
        )}
      </Link>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/admin'}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                collapsed ? 'justify-center' : ''
              } ${
                isActive
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-white/60 hover:text-white hover:bg-white/8'
              }`
            }
          >
            <item.icon size={20} className="flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer badge */}
      {!collapsed && (
        <div className="p-4 mx-3 mb-4 rounded-xl bg-white/8 border border-white/10">
          <p className="text-xs text-white/50 text-center">Admin Panel v1.0</p>
        </div>
      )}
    </>
  );
}
