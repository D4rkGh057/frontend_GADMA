// services/tramitesService.js
const API_URL = import.meta.env.VITE_API_URL;

export const getAllTramites = async () => {
  const response = await fetch(`${API_URL}/ctram-tramite`);
  const data = await response.json();
  return data;
};

export const getTramitesByDirection = async (id) => {
  const response = await fetch(`${API_URL}/ctram-tramite/Direccion/${id}`);
  const data = await response.json();
  return data;
};

export const getTramiteById = async (id) => {
  const response = await fetch(`${API_URL}/ctram-tramite/${id}`);
  const data = await response.json();
  return data;
};