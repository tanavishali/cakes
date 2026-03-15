import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { FaWhatsapp } from 'react-icons/fa';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import StorefrontLayout from './layouts/StorefrontLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Orders from './pages/admin/Orders';
import About from './pages/About';
import Delivery from './pages/Delivery';
import Terms from './pages/Terms';
import SecurePayment from './pages/SecurePayment';
import Contact from './pages/Contact';
import CategoryPage from './pages/CategoryPage';
import Checkout from './pages/Checkout';

function AppRoutes() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      {/* Login */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to={user.role === 'admin' ? '/admin' : '/'} replace />
          ) : (
            <Login />
          )
        }
      />

      {/* Storefront (user) */}
      <Route
        path="/"
        element={
          <ProtectedRoute requiredRole="user">
            <StorefrontLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="delivery" element={<Delivery />} />
        <Route path="terms" element={<Terms />} />
        <Route path="payment" element={<SecurePayment />} />
        <Route path="contact" element={<Contact />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="category/:categoryId" element={<CategoryPage />} />
      </Route>

      {/* Admin dashboard */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Toaster 
            position="top-center" 
            toastOptions={{
              style: {
                background: '#10b981', // Tailwind emerald-500 or just 'green'
                color: '#fff',
              },
              success: {
                iconTheme: {
                  primary: '#fff',
                  secondary: '#10b981',
                },
              },
            }} 
          />
          <AppRoutes />
          
          {/* Floating WhatsApp Button */}
          <a 
            href="https://wa.me/923067251356" 
            target="_blank" 
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group animate-bounce"
            aria-label="Contact us on WhatsApp"
          >
            <FaWhatsapp size={22} />
            {/* Tooltip */}
            <span className="absolute right-full mr-4 bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Chat with us
            </span>
          </a>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
