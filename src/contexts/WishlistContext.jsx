import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export function useWishlist() {
  return useContext(WishlistContext);
}

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('bakery_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('bakery_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    const isFavoriteNow = wishlist.some((item) => item.id === product.id);
    
    if (isFavoriteNow) {
      toast.success(`${product.name} removed from wishlist`);
    } else {
      toast.success(`${product.name} added to wishlist`);
    }

    setWishlist((prevWishlist) => {
      const isAlreadyFavorite = prevWishlist.some((item) => item.id === product.id);
      if (isAlreadyFavorite) {
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        return [...prevWishlist, product];
      }
    });
  };

  const isFavorite = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const toggleWishlistSidebar = () => {
    setIsWishlistOpen(!isWishlistOpen);
  };

  const value = {
    wishlist,
    toggleWishlist,
    isFavorite,
    isWishlistOpen,
    toggleWishlistSidebar,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}
