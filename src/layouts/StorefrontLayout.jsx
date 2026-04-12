import { Outlet } from 'react-router-dom';
import Header from '../components/storefront/Header';
import Footer from '../components/storefront/Footer';
import CartSidebar from '../components/storefront/CartSidebar';
import WishlistSidebar from '../components/storefront/WishlistSidebar';

export default function StorefrontLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartSidebar />
      <WishlistSidebar />
    </div>
  );
}
