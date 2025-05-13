import { useState } from 'react';
import AuthContext from './AuthContext';

const API = import.meta.env.VITE_API_URL; // or your base URL

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
