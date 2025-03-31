import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../Supabase/SupabaseClient";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  const checkAuth = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setAdmin(user);
  };

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Error de autenticación:", error.message);
      throw error;
    }
    setAdmin(data.user);
    navigate("/admin");
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setAdmin(null);
    navigate("/login");
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
