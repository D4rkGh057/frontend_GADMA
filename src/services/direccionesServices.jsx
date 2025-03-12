// services/direccionesService.js
const API_URL = import.meta.env.VITE_API_URL;

export const getAllDirecciones = async () => {
  const response = await fetch(`${API_URL}/ctram-direccion`);
  const data = await response.json();
  return data;
};