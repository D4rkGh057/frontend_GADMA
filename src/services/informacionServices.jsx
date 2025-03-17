const token = sessionStorage.getItem("token"); // Obtén el token del localStorage o sessionStorage
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

// Crear una nueva información
export const createInformacion = async (informacion) => {
  const response = await fetch(`${API_URL}/ctram-informacion`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(informacion),
  });
  const data = await response.json();
  return data;
}

// Actualizar una información existente
export const updateInformacion = async (id, informacion) => {
  console.log("informacion", informacion);
  const response = await fetch(`${API_URL}/ctram-informacion/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(informacion),
  });
  console.log("data:", response);
  const data = await response.json();
  return data;
};

// Eliminar una información
export const deleteInformacion = async (id) => {
  const response = await fetch(`${API_URL}/ctram-informacion/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};