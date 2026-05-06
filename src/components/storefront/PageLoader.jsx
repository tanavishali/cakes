import pearlReefLogo from '../../assets/pearl-reef-logo.png';

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-teal-900 overflow-hidden">
      
      {/* Animated background bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white/5 animate-float"
            style={{
              width: `${40 + (i * 23) % 80}px`,
              height: `${40 + (i * 23) % 80}px`,
              left: `${(i * 17 + 5) % 95}%`,
              bottom: `-100px`,
              animationDelay: `${(i * 0.4)}s`,
              animationDuration: `${4 + (i % 4)}s`,
            }}
          />
        ))}
      </div>

      {/* Glowing ring */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Outer spinning ring */}
        <div className="absolute w-32 h-32 rounded-full border-4 border-transparent border-t-terracotta-400 border-r-teal-300 animate-spin" />
        {/* Middle pulsing ring */}
        <div className="absolute w-24 h-24 rounded-full border-2 border-white/20 animate-pulse" />
        {/* Logo */}
        <img
          src={pearlReefLogo}
          alt="Pearl Reef Cakes"
          className="w-16 h-16 rounded-full object-cover ring-4 ring-white/30 shadow-2xl"
        />
      </div>

      {/* Brand name */}
      <h1 className="text-white text-2xl font-display font-bold tracking-widest mb-1 animate-pulse">
        Pearl Reef Cakes
      </h1>
      <p className="text-teal-300/70 text-xs tracking-[0.3em] uppercase mb-8">
        Handcrafted with love
      </p>

      {/* Progress bar */}
      <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-terracotta-400 to-teal-300 rounded-full animate-progress" />
      </div>

      <style>{`
        @keyframes float {
          0%   { transform: translateY(0) scale(1);   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(-110vh) scale(1.3); opacity: 0; }
        }
        .animate-float {
          animation: float linear infinite;
        }
        @keyframes progress {
          0%   { width: 0%;   transform: translateX(0); }
          50%  { width: 100%; transform: translateX(0); }
          100% { width: 100%; transform: translateX(100%); }
        }
        .animate-progress {
          animation: progress 1.4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
