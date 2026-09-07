import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Demo credentials
    const validUsers = {
      "admin@healthcare.com": "admin123",
      "doctor@healthcare.com": "doctor123",
    };

    if (validUsers[email] === password) {
      const userData = {
        email,
        role: email.includes("admin") ? "admin" : "doctor",
        name: email.includes("admin") ? "Administrator" : "Dr. John Doe",
        loginTime: new Date().toISOString(),
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return { success: true, message: "Login successful" };
    }

    return { success: false, message: "Invalid email or password" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
