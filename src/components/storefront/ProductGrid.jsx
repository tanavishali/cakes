import ProductCard from './ProductCard';
import { CardSkeleton } from './Skeleton';

export default function ProductGrid({ title, subtitle, products, isLoading }) {
  return (
    <section id="products" className="py-16 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          {subtitle && (
            <span className="text-terracotta-500 text-sm font-semibold tracking-widest uppercase">{subtitle}</span>
          )}
          <h2 className="text-3xl font-display font-bold text-teal-900 mt-1">{title}</h2>
          <div className="w-16 h-0.5 bg-terracotta-400 mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {isLoading 
            ? [...Array(4)].map((_, i) => <CardSkeleton key={i} />)
            : products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
          }
        </div>
      </div>
    </section>
  );
}
