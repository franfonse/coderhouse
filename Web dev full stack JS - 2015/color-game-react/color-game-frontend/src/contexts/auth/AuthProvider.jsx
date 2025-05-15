import { useState } from "react";
import AuthContext from "./AuthContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function login(username, password) {
    const res = await fetch(`${API}/auth/login/`, {
      method: "POST",
      credentials: "omit",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const message = await res.text();
      return new Error(message || 'Login failed');
    }

    const data = await res.json();
    setUser(data.user);
    return data.user;
  }

  async function signup(username, password) {
    const res = await fetch(`${API}/auth/signup`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    setUser(data.user);
    return data.user;
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
