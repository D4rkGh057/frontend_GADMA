import { useMemo, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import PropTypes from "prop-types";
import { getUserFromToken, isTokenValid } from "../services/authServices"; // Importa funciones para manejar el token

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
const [userRole, setUserRole] = useState(null);

useEffect(() => {
  const token = sessionStorage.getItem("token");
  if (token && isTokenValid(token)) {
    const userData = getUserFromToken(token);
    setUser(userData);
    setIsAuthenticated(true);
    setUserRole(getRoleFromToken(token));
  }else {
    logout();
  }
}, []);

const login = (userData) => {
  setUser(userData);
  setIsAuthenticated(true);
  setUserRole(getRoleFromToken(userData.token));
  sessionStorage.setItem("user", JSON.stringify(userData));
};

const logout = () => {
  setUser(null);
  setIsAuthenticated(false);
  setUserRole(null);
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("token");
};

const contextValue = useMemo(
  () => ({
    user,
    isAuthenticated,
    userRole,
    login,
    logout,
  }),
  [user, isAuthenticated, userRole]
);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;