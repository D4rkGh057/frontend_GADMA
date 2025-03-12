// services/informacionService.js
const API_URL = import.meta.env.VITE_API_URL;

export const getAllInformacion = async () => {
  const response = await fetch(`${API_URL}/ctram-informacion`);
  const data = await response.json();
  return data;
};

export const getInformacionByTramite = async (id) => {
  const response = await fetch(`${API_URL}/ctram-informacion/InfoTramite/${id}`);
  const data = await response.json();
  return data;
};

export const getInformacionById = async (id) => {
  const response = await fetch(`${API_URL}/ctram-informacion/${id}`);
  const data = await response.json();
  return data;
};