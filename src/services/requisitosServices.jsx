const token = sessionStorage.getItem("token"); 
const API_URL = import.meta.env.VITE_API_URL

// Obtener todos los requisitos
export const getAllRequisitos = async () => {
  const response = await fetch(`${API_URL}/ctram-requisito`);
  const data = await response.json();
  return data;
};

// Obtener requisitos por ID
export const getRequisitoById = async (id) => {
  const response = await fetch(`${API_URL}/ctram-requisito/${id}`);
  const data = await response.json();
  return data;
};

// Crear un nuevo requisito
export const createRequisito = async (requisito) => {
  const response = await fetch(`${API_URL}/ctram-requisito`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requisito),
    });
    const data = await response.json();
    console.log('gatito',data);
    return data;
}

// Actualizar un requisito existente
export const updateRequisito = async (id, requisito) => {
  const response = await fetch(`${API_URL}/ctram-requisito/${id}`, {
    method: "PATCH",
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        },
        body: JSON.stringify(requisito),
    });
    const data = await response.json();
    return data;
}

// Eliminar un requisito
export const deleteRequisito = async (id) => {
  const response = await fetch(`${API_URL}/ctram-requisito/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};