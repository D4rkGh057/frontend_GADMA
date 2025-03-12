import { useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Estado del usuario
  
    // Función para iniciar sesión
    const login = (userData) => {
      setUser(userData); // Guardar datos del usuario
      localStorage.setItem("user", JSON.stringify(userData)); // Guardar en localStorage
    };
  
    // Función para cerrar sesión
    const logout = () => {
      setUser(null); // Eliminar datos del usuario
      localStorage.removeItem("user"); // Eliminar del localStorage
    };

    const contextValue = useMemo(
        () => ({
          user,
          login,
          logout,
        }),
        [user, login, logout]
    )
  
    return (
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    );
  };