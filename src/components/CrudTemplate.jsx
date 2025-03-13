import React, { useState, useEffect } from "react";

// Datos de ejemplo (simulación de una API)
const initialData = [
  { id: 1, name: "Ejemplo 1", description: "Descripción del ejemplo 1" },
  { id: 2, name: "Ejemplo 2", description: "Descripción del ejemplo 2" },
];

const CrudTemplate = () => {
  const [data, setData] = useState(initialData); // Estado para almacenar los registros
  const [currentItem, setCurrentItem] = useState(null); // Estado para el registro actual (edición)
  const [isEditing, setIsEditing] = useState(false); // Estado para saber si estamos editando

  // Función para manejar la creación/edición de registros
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newItem = {
      id: currentItem ? currentItem.id : Date.now(), // Si es edición, mantiene el ID
      name: formData.get("name"),
      description: formData.get("description"),
    };

    if (isEditing) {
      // Editar registro existente
      setData(data.map((item) => (item.id === newItem.id ? newItem : item)));
    } else {
      // Crear nuevo registro
      setData([...data, newItem]);
    }

    // Limpiar el formulario y resetear estados
    setCurrentItem(null);
    setIsEditing(false);
    e.target.reset();
  };

  // Función para eliminar un registro
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  // Función para cargar un registro en el formulario (edición)
  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsEditing(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Gestión de Entidad</h1>

      {/* Formulario para crear/editar */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isEditing ? "Editar Registro" : "Crear Nuevo Registro"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={currentItem ? currentItem.name : ""}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={currentItem ? currentItem.description : ""}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            {isEditing ? "Guardar Cambios" : "Crear Registro"}
          </button>
        </form>
      </div>

      {/* Listado de registros */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Listado de Registros</h2>
        {data.length === 0 ? (
          <p className="text-gray-600">No hay registros disponibles.</p>
        ) : (
          <div className="space-y-4">
            {data.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600 transition-colors duration-300"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition-colors duration-300"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CrudTemplate;