import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import { GiCakeSlice } from 'react-icons/gi';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, demoLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const result = login(email, password);
    if (result.success) {
      navigate(result.role === 'admin' ? '/admin' : '/');
    } else {
      setError(result.message);
    }
  };

  const handleDemo = (role) => {
    const result = demoLogin(role);
    if (result.success) {
      navigate(result.role === 'admin' ? '/admin' : '/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-terracotta-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-cream-200/30 animate-pulse" />
        <div className="absolute top-3/4 right-1/3 w-3 h-3 rounded-full bg-terracotta-400/30 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-cream-100/20 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
            <GiCakeSlice className="text-4xl text-terracotta-400" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white tracking-wide">CAKE SHOP</h1>
          <p className="text-cream-200/70 text-sm mt-1">Fresh Baked Goodness</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8">
          <h2 className="text-xl font-semibold text-white mb-6 text-center">Sign In</h2>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-400/30 text-red-200 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-cream-200/80 text-sm mb-2">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-200/50" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-terracotta-400 focus:ring-1 focus:ring-terracotta-400 transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-cream-200/80 text-sm mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-200/50" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-terracotta-400 focus:ring-1 focus:ring-terracotta-400 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-terracotta-600 to-terracotta-500 hover:from-terracotta-500 hover:to-terracotta-400 text-white font-semibold rounded-xl shadow-lg shadow-terracotta-500/25 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <FiLogIn /> Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-white/15"></div>
            <span className="px-4 text-cream-200/50 text-xs uppercase tracking-wider">Quick Demo</span>
            <div className="flex-1 border-t border-white/15"></div>
          </div>

          {/* Demo Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleDemo('admin')}
              className="py-3 px-4 bg-white/5 hover:bg-white/15 border border-white/20 hover:border-terracotta-400/50 rounded-xl text-white text-sm font-medium transition-all duration-300 cursor-pointer"
            >
              <span className="block text-terracotta-400 text-xs mb-1">👑 Admin</span>
              Login as Admin
            </button>
            <button
              onClick={() => handleDemo('user')}
              className="py-3 px-4 bg-white/5 hover:bg-white/15 border border-white/20 hover:border-teal-500/50 rounded-xl text-white text-sm font-medium transition-all duration-300 cursor-pointer"
            >
              <span className="block text-teal-500 text-xs mb-1">🛒 Customer</span>
              Login as User
            </button>
          </div>

          {/* Credentials hint */}
          <div className="mt-6 p-3 rounded-lg bg-white/5 border border-white/10">
            <p className="text-cream-200/50 text-xs text-center">
              <strong className="text-cream-200/70">Admin:</strong> admin@cakeshop.com / admin123
              <br />
              <strong className="text-cream-200/70">User:</strong> user@cakeshop.com / user123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
