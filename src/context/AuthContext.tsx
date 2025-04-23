"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { login as loginService } from "@/service/auth";
import api from "@/service/api";

export type Role = "ADMIN" | "PERITO" | "ASSISTENTE";

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  cpf: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (cpf: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser);
        setLoading(false);
      } else {
        api
          .get("/auth/me")
          .then((res) => {
            console.log("User recuperado no /auth/me:", res.data);
            setUser(res.data);
            localStorage.setItem("user", JSON.stringify(res.data))
          })
          .catch(() => logout())
          .finally(() => setLoading(false));
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (cpf: string, password: string) => {
    try {
      const { access_token } = await loginService({ cpf, password });

      localStorage.setItem("token", access_token);

      api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      
      const response = await api.get("/auth/me");

      localStorage.setItem("user", JSON.stringify(response.data));

      setUser(response.data);
      router.push("/casos");
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
