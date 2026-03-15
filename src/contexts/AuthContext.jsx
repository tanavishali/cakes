import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const MOCK_USERS = {
  admin: { email: 'admin@cakeshop.com', password: 'admin123', role: 'admin', name: 'Admin User' },
  user: { email: 'user@cakeshop.com', password: 'user123', role: 'user', name: 'John Doe' },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('cake_auth');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('cake_auth');
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const found = Object.values(MOCK_USERS).find(
      (u) => u.email === email && u.password === password
    );
    if (!found) return { success: false, message: 'Invalid email or password' };
    const userData = { email: found.email, name: found.name, role: found.role };
    setUser(userData);
    localStorage.setItem('cake_auth', JSON.stringify(userData));
    return { success: true, role: found.role };
  };

  const demoLogin = (role) => {
    const found = MOCK_USERS[role];
    const userData = { email: found.email, name: found.name, role: found.role };
    setUser(userData);
    localStorage.setItem('cake_auth', JSON.stringify(userData));
    return { success: true, role: found.role };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cake_auth');
  };

  return (
    <AuthContext.Provider value={{ user, login, demoLogin, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
