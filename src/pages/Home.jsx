import { useState, useEffect } from 'react';
import HeroBanner from '../components/storefront/HeroBanner';
import CategoryCircles from '../components/storefront/CategoryCircles';
import ProductGrid from '../components/storefront/ProductGrid';
import { products } from '../data/products';
import { FaTruck, FaShieldAlt, FaHeadset, FaUndo, FaStar } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import { GiCakeSlice } from 'react-icons/gi';

const features = [
  { icon: FaTruck, title: 'Free Delivery', desc: 'On orders over PKR 5,000' },
  { icon: FaShieldAlt, title: 'Secure Payment', desc: '100% secure checkout' },
  { icon: FaHeadset, title: '24/7 Support', desc: 'Dedicated support' },
  { icon: FaUndo, title: 'Easy Returns', desc: '30 day return policy' },
];

const testimonials = [
  {
    name: 'Sania Khan',
    avatar: 'S',
    rating: 5,
    text: 'The chocolate truffle cake was absolutely divine! Best bakery I have ever ordered from. The delivery was prompt and the packaging was perfect.',
  },
  {
    name: 'Muhammad Ali',
    avatar: 'M',
    rating: 5,
    text: 'Their sourdough bread is the real deal. Crispy crust, soft interior — just perfect. I order weekly now!',
  },
  {
    name: 'Faiza Ahmed',
    avatar: 'F',
    rating: 4,
    text: 'Ordered cupcakes for my daughter\'s birthday party. Everyone loved them! Beautiful decoration and amazing taste.',
  },
  {
    name: 'Zainab Malik',
    avatar: 'Z',
    rating: 5,
    text: 'The bento cakes are so cute and perfect for small celebrations. My friends loved the Snoopy design!',
  },
  {
    name: 'Hassan Raza',
    avatar: 'H',
    rating: 5,
    text: 'Best cookies in Lahore, hands down. The chocolate chip ones are always fresh and chewy.',
  },
  {
    name: 'Ayesha Siddiqui',
    avatar: 'A',
    rating: 5,
    text: 'Their customer service is excellent. I had a custom request for a Nikkah cake and they delivered exactly what I imagined.',
  },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const newProducts = products?.filter((p) => p?.badge === 'New' || p?.badge === 'Bestseller').slice(0, 8) || [];
  const featured = products?.slice(0, 8) || [];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <HeroBanner />
      <CategoryCircles />

      {/* Features bar */}
      <section className="bg-white border-y border-warm-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {features?.map((f) => (
            <div key={f?.title} className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full bg-cream-100 text-teal-700 flex items-center justify-center group-hover:bg-teal-800 group-hover:text-white transition-all duration-300">
                {f?.icon && <f.icon size={20} />}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{f?.title}</p>
                <p className="text-xs text-warm-gray-300">{f?.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ProductGrid 
        title="New Products" 
        subtitle="Fresh From Our Oven" 
        products={newProducts} 
        isLoading={isLoading} 
      />

      {/* Promo Banner */}

      <section className="py-16 bg-teal-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-terracotta-500 -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-teal-500 translate-y-1/3 -translate-x-1/4" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <span className="text-terracotta-400 text-sm font-semibold tracking-widest uppercase">Special Offer</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2 mb-4">
              Get <span className="text-terracotta-400">50% Off</span> on Your First Order
            </h2>
            <p className="text-cream-200/60 mb-6 max-w-md">
              Use code <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded">FIRST50</span> at checkout to get half off your entire order.
            </p>
            <a
              href="#"
              className="inline-flex items-center px-8 py-3.5 bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105 gap-2"
            >
              Order Now <FiArrowRight />
            </a>
          </div>
          <div className="w-72 h-72 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-7xl text-white">
            <GiCakeSlice />
          </div>
        </div>
      </section>

      <ProductGrid 
        title="Featured Products" 
        subtitle="Bestsellers" 
        products={featured} 
        isLoading={isLoading} 
      />

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-terracotta-500 text-sm font-semibold tracking-widest uppercase">Testimonials</span>
            <h2 className="text-3xl font-display font-bold text-teal-900 mt-1">Our Clients Say About</h2>
            <div className="w-16 h-0.5 bg-terracotta-400 mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-cream-50 rounded-xl p-6 border border-warm-gray-100 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={`text-sm ${i < t.rating ? 'text-amber-400' : 'text-warm-gray-200'}`} 
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-800 text-white flex items-center justify-center font-semibold text-sm">
                    {t.avatar}
                  </div>
                  <span className="text-sm font-semibold text-gray-800">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
