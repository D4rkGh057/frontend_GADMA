import { jwtDecode } from "jwt-decode";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (cedula_ruc, password) => {
  console.log("usuario a logear:", cedula_ruc, "contraseña:", password);
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cedula_ruc, password }),
  });
  const data = await response.json();
  return data;
};

// Función para decodificar el token y obtener el usuario
export const getUserFromToken = (token) => {
  try {
    const decoded = jwtDecode(token); // Decodifica el token
    return decoded.nombre; // Asume que el payload del token tiene un campo "user"
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
};

export const getRoleFromToken = (token) => {
  try {
    const decoded = jwtDecode(token); // Decodifica el token
    return decoded.rol; // Asume que el payload del token tiene un campo "rol"
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
};

// Funcion para validar el token
export const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token); // Decodifica el token
    const currentTime = Date.now() / 1000; // Obtiene la fecha actual en segundos
    return decoded.exp > currentTime; // Compara la fecha de expiración
  } catch (error) {
    console.error("Error al validar el token:", error);
    return false; // Si hay un error, el token no es válido
  }
};
