import { FiArrowRight } from 'react-icons/fi';

const heroImages = [
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=800&fit=crop", // Chocolate cake
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&h=800&fit=crop", // Strawberry cake
  "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800&h=800&fit=crop", // Red velvet
  "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&h=800&fit=crop", // Tiramisu
];

export default function HeroBanner() {
  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden bg-teal-900 flex items-center">
      {/* Background with slight grid texture */}
      <div className="absolute inset-0 bg-teal-900 bg-opacity-90">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "32px 32px"
        }}></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side Content */}
        <div className="max-w-xl py-12">
          <span className="inline-block px-4 py-2 rounded-full bg-teal-800/50 border border-teal-700/50 text-terracotta-400 text-sm font-semibold tracking-widest uppercase mb-6 animate-pulse">
            ✨ Welcome to Pearl Reef Cakes
          </span>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-6">
            The <span className="text-terracotta-400">Bakery</span>
            <br />
            Shop
          </h2>
          <p className="text-cream-200/80 text-lg md:text-xl mb-10 leading-relaxed max-w-md">
            Discover our handcrafted cakes, breads, and pastries made fresh daily with the finest ingredients.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#products"
              className="inline-flex items-center px-8 py-4 bg-terracotta-500 hover:bg-terracotta-600 text-white font-bold rounded-full shadow-lg shadow-terracotta-500/30 transition-all duration-300 hover:scale-105 gap-2"
            >
              Shop Now <FiArrowRight />
            </a>
            <a
              href="#categories"
              className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full border border-white/20 backdrop-blur-sm transition-all duration-300"
            >
              Browse Categories
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-10 mt-14">
            {[
              { number: '500+', label: 'Products' },
              { number: '10K+', label: 'Customers' },
              { number: '15+', label: 'Years' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-display font-bold text-white mb-1">{stat.number}</div>
                <div className="text-xs text-terracotta-400 uppercase tracking-widest font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Carousel */}
        <div className="hidden md:block relative h-[600px] w-full mt-10 md:mt-0 overflow-hidden transform rotate-12 scale-110">
          {/* We use two identical columns side by side moving in opposite directions */}
          <div className="flex gap-6 h-full absolute inset-0">
            {/* Column 1 - Starts lower, moves up */}
            <div className="w-1/2 flex flex-col gap-6 animate-marquee-up pb-6">
              {[...heroImages, ...heroImages].map((img, i) => (
                <div key={`col1-${i}`} className="relative h-64 md:h-80 w-full rounded-3xl overflow-hidden shadow-2xl flex-shrink-0 group">
                  <div className="absolute inset-0 bg-teal-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src={img} alt="Cake" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
              ))}
            </div>
            
            {/* Column 2 - Starts higher, moves down */}
            <div className="w-1/2 flex flex-col gap-6 animate-marquee-down pt-32 pb-6">
              {[...heroImages, ...heroImages].reverse().map((img, i) => (
                <div key={`col2-${i}`} className="relative h-64 md:h-80 w-full rounded-3xl overflow-hidden shadow-2xl flex-shrink-0 group">
                  <div className="absolute inset-0 bg-teal-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src={img} alt="Cake" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient overlay at bottom to blend into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-warm-gray-50 to-transparent z-20" />
    </section>
  );
}
