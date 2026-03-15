import { FiHeart, FiStar, FiCoffee } from 'react-icons/fi';
import { GiCakeSlice } from 'react-icons/gi';

export default function About() {
  return (
    <div className="bg-warm-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-teal-900 text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1600&h=600&fit=crop" 
            alt="Bakery background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <GiCakeSlice className="text-6xl text-terracotta-400 mx-auto mb-6" />
          <h1 className="text-5xl font-display font-bold mb-6">Our Story</h1>
          <p className="text-xl text-cream-100 max-w-2xl mx-auto leading-relaxed">
            Crafting the finest cakes, breads, and pastries using premium ingredients and traditional recipes passed down through generations.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-3xl font-display font-bold text-teal-900 mb-6">A Passion for Baking</h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                Welcome to Blusher Cakes! We are passionate about creating the most delightful and visually stunning cakes for all your special moments. Founded with a love for baking and a commitment to quality, we use only the finest ingredients to craft cakes, breads, and pastries that taste as good as they look.
              </p>
              <p>
                Every single day, our team of dedicated pastry chefs arrives before the break of dawn, ensuring that when you walk through our doors, you are greeted with the irresistible aroma of freshly baked goods.
              </p>
              <p>
                Whether you are celebrating a birthday, wedding, or just craving a sweet treat, Blusher Cakes is here to bring joy to your table.
              </p>
            </div>
          </div>
          <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1000&h=1200&fit=crop" 
              alt="Chocolate Truffle Cake preparation" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Values */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold text-teal-900 mb-4">Our Core Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">What makes Blusher Cakes special is our unwavering adherence to these three principles.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiStar size={32} />
            </div>
            <h3 className="text-xl font-bold text-teal-900 mb-3">Premium Quality</h3>
            <p className="text-gray-600">We source only the finest ingredients, from rich European butter to the highest quality chocolates.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-terracotta-50 text-terracotta-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiHeart size={32} />
            </div>
            <h3 className="text-xl font-bold text-teal-900 mb-3">Made with Love</h3>
            <p className="text-gray-600">Our recipes combine traditional techniques with modern flavors, crafted with genuine passion.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCoffee size={32} />
            </div>
            <h3 className="text-xl font-bold text-teal-900 mb-3">Fresh Daily</h3>
            <p className="text-gray-600">No preservatives, no shortcuts. Everything is baked fresh from scratch every single morning.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
