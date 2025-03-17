const token = sessionStorage.getItem("token"); // Obtén el token del localStorage o sessionStorage
const API_URL = import.meta.env.VITE_API_URL;

// Obtener todos los usuarios
export const getAllUsers = async () => {
  const response = await fetch(`${API_URL}/ctram-usuario`);
  const data = await response.json();
  return data;
};

// Crear un nuevo usuario
export const createUser = async (user) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
        "Authorization": `Bearer ${token}`, // Incluye el token en el header
        "Content-Type": "application/json", // Asegúrate de incluir el tipo de contenido
      },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
};

// Actualizar un usuario existente
export const updateUser = async (cedula_ruc, user) => {
  console.log("Actualizando usuario:", cedula_ruc, user);
  const response = await fetch(`${API_URL}/ctram-usuario/${cedula_ruc}`, {
    method: "PATCH",
    headers: {
        "Authorization": `Bearer ${token}`, // Incluye el token en el header
        "Content-Type": "application/json", // Asegúrate de incluir el tipo de contenido
      },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
};

// Eliminar un usuario
export const deleteUser = async (cedula_ruc) => {
  
    const response = await fetch(`${API_URL}/ctram-usuario/${cedula_ruc}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`, // Incluye el token en el header
        "Content-Type": "application/json", // Asegúrate de incluir el tipo de contenido
      },
    });
  
    const data = await response.json();
    return data;
  };