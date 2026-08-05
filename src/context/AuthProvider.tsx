import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  avatar: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (data: { user: User; token?: string }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (data: { user: User; token?: string }) => {
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
