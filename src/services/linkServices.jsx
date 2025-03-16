const token = sessionStorage.getItem("token"); // Obtén el token del localStorage o sessionStorage
const API_URL = import.meta.env.VITE_API_URL;

export const getAllLinks = async () => {
  const response = await fetch(`${API_URL}/ctram-links`);
  const data = await response.json();
  return data;
};

export const getLinksById = async (id) => {
  const response = await fetch(`${API_URL}/ctram-links/${id}`);
  const data = await response.json();
  return data;
};

// Crear un nuevo link
export const createLinks = async (links) => {
  const response = await fetch(`${API_URL}/ctram-links`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(links),
    });
    const data = await response.json();
    return data;
}

// Actualizar un link existente
export const updateLinks = async (id, links) => {
  const response = await fetch(`${API_URL}/ctram-links/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(links),
    });
    const data = await response.json();
    return data;
}

