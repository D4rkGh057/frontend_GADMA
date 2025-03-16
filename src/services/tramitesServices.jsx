const token = sessionStorage.getItem("token");
const API_URL = import.meta.env.VITE_API_URL;

// Obtener todos los trámites
export const getAllTramites = async () => {
  const response = await fetch(`${API_URL}/ctram-tramite`);
  const data = await response.json();
  return data;
};

// Obtener trámites por dirección
export const getTramitesByDirection = async (id) => {
  const response = await fetch(`${API_URL}/ctram-tramite/Direccion/${id}`);
  const data = await response.json();
  return data;
};
// Obtener trámites por ID
export const getTramiteById = async (id) => {
  const response = await fetch(`${API_URL}/ctram-tramite/${id}`);
  const data = await response.json();
  return data;
};
// Crear un nuevo trámite
export const createTramite = async (tramite) => {
  const response = await fetch(`${API_URL}/ctram-tramite`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tramite),
  });
  const data = await response.json();
  return data;
};

// Actualizar un trámite existente
export const updateTramite = async (id, tramite) => {
  const response = await fetch(`${API_URL}/ctram-tramite/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tramite),
  });
  const data = await response.json();
  return data;
};

// Eliminar un trámite
export const deleteTramite = async (id) => {
  const response = await fetch(`${API_URL}/ctram-tramite/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};