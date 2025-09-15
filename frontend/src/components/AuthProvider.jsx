import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(() => {
    const saved = localStorage.getItem("access_token");
    if (!saved || saved === "undefined") return null;
    return saved;
  });

  const [refreshToken, setRefreshToken] = useState(() => {
    const saved = localStorage.getItem("refresh_token");
    if (!saved || saved === "undefined") return null;
    return saved;
  });

  const login = (tokens) => {
    if (!tokens?.access_token || !tokens?.refresh_token) return;
  
    setAccessToken(tokens.access_token);
    setRefreshToken(tokens.refresh_token);
  
    localStorage.setItem("access_token", tokens.access_token);
    localStorage.setItem("refresh_token", tokens.refresh_token);
  };
  // Logout
  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  // Hàm gọi API refresh
  const refreshAccessToken = async () => {
    if (!refreshToken) return;
  
    try {
      const res = await axios.post("http://127.0.0.1:8000/user/login/refresh", {
        refresh_token: refreshToken,
      });
  
      setAccessToken(res.data.access_token);
      localStorage.setItem("access_token", res.data.access_token);
  
      console.log("Token refreshed");
    } catch (err) {
      console.error("Refresh failed", err);
      logout();
    }
  };
  

  // Auto refresh token định kỳ
  useEffect(() => {
    if (!refreshToken) return;

    const interval = setInterval(() => {
      refreshAccessToken();
    }, 13 * 60 * 1000);

    return () => clearInterval(interval);
  }, [refreshToken]);

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
