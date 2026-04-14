export default function Skeleton({ className, type = 'rectangle' }) {
  const baseStyles = "animate-pulse bg-warm-gray-100";
  
  const typeStyles = {
    rectangle: "rounded-md",
    circle: "rounded-full",
    text: "h-4 rounded-md w-3/4",
  };

  return (
    <div 
      className={`${baseStyles} ${typeStyles[type]} ${className}`}
      aria-hidden="true"
    />
  );
}

// Sub-components for common patterns
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <Skeleton className="aspect-square mb-4 rounded-xl" />
      <Skeleton type="text" className="w-1/3 mb-2" />
      <Skeleton type="text" className="w-full mb-4" />
      <div className="flex justify-between items-center">
        <Skeleton type="text" className="w-1/4 h-6" />
        <Skeleton type="circle" className="w-10 h-10" />
      </div>
    </div>
  );
}
