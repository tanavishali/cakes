import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';

export default function CategoryCircles() {
  return (
    <section id="categories" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-terracotta-500 text-sm font-semibold tracking-widest uppercase">Browse</span>
          <h2 className="text-3xl font-display font-bold text-teal-900 mt-1">Shop by Categories</h2>
          <div className="w-16 h-0.5 bg-terracotta-400 mx-auto mt-3" />
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="group flex flex-col items-center gap-3 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-cream-100 border-2 border-warm-gray-200 group-hover:border-terracotta-400 flex items-center justify-center text-3xl md:text-4xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-terracotta-500/10 text-teal-800">
                <cat.icon />
              </div>
              <span className="text-sm font-medium text-warm-gray-300 group-hover:text-terracotta-500 transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
