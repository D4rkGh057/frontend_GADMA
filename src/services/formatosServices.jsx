const token = sessionStorage.getItem("token"); // Obtén el token del localStorage o sessionStorage
const API_URL = import.meta.env.VITE_API_URL;

export const getAllFormatos = async () => {
  const response = await fetch(`${API_URL}/ctram-formato`);
  const data = await response.json();
  return data;
};

export const getFormatosById = async (id) => {
  const response = await fetch(`${API_URL}/ctram-formato/${id}`);
  const data = await response.json();
  return data;
};

// Crear un nuevo formato
export const createFormatos = async (formatos) => {
  const response = await fetch(`${API_URL}/ctram-formato`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formatos),
  });
  const data = await response.json();
  return data;
}

// Actualizar un formato existente
export const updateFormatos = async (id, formatos) => {
  const response = await fetch(`${API_URL}/ctram-formato/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formatos),
    });
    const data = await response.json();
    return data;
}

// Eliminar un formato
export const deleteFormatos = async (id) => {
  const response = await fetch(`${API_URL}/ctram-formato/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};
