import React, { useEffect, useState } from "react";
import CrudFormModal from "../../components/CrudFormModal"; // Importa el modal
import CrudTable from "../../components/CrudTable";
import {
  createTramite,
  deleteTramite,
  getAllTramites,
  updateTramite,
} from "../../services/tramitesServices";
import { getAllDirecciones } from "../../services/direccionesServices";

export const TramitesCRUD = () => {
  const [tramites, setTramites] = useState([]);
  const [direcciones, setDirecciones] = useState([]); // Estado para almacenar las direcciones
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
  const [currentItem, setCurrentItem] = useState(null); // Estado para el ítem actual (edición)
  const [isEditing, setIsEditing] = useState(false); // Estado para saber si estamos editando

  // Cargar datos de la API al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tramitesData = await getAllTramites();
        setTramites(tramitesData);

        const direccionesData = await getAllDirecciones(); // Obtener las direcciones
        setDirecciones(direccionesData);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        alert("Error al cargar los datos. Por favor, intenta de nuevo.");
      }
    };
    fetchData();
  }, []);

  // Campos para la tabla
  const fieldsTable = [
    { name: "id_tramite", label: "ID", type: "text", required: false },
    {
      name: "id_direccion_pert.nombre",
      label: "Dirección",
      type: "text",
      required: true,
    },
    { name: "nombre_tramite", label: "Trámite", type: "text", required: true },
    { name: "modalidad", label: "Modalidad", type: "text", required: true },
  ];

  // Campos para el formulario
  const fieldsForm = [
    {
      name: "id_direccion_pert",
      label: "Dirección",
      type: "select", // Cambiamos a tipo select
      options: direcciones.map((dir) => ({
        value: dir.id_dir,
        label: dir.nombre,
      })), // Opciones para el select
      required: true,
    },
    { name: "nombre_tramite", label: "Trámite", type: "text", required: true },
    {
      name: "modalidad",
      label: "Modalidad",
      type: "select",
      options: [
        { value: "Presencial", label: "Presencial" },
        { value: "En Linea", label: "En Linea" },
      ],
      required: true,
    },
  ];

  // Función para guardar (crear/editar)
  const handleSave = async (item, isEditing) => {
    try {
      if (isEditing) {
        await updateTramite(item.id_tramite, item);
      } else {
        await createTramite(item);
      }

      // Recargar datos después de guardar
      const updatedTramites = await getAllTramites();
      setTramites(updatedTramites);
      setIsModalOpen(false); // Cerrar el modal después de guardar
    } catch (error) {
      console.error("Error al guardar el trámite:", error);
      alert("Error al guardar el trámite. Por favor, intenta de nuevo.");
    }
  };

  // Función para eliminar
  const handleDelete = async (id_tramite) => {
    try {
      await deleteTramite(id_tramite); // Eliminar trámite
      // Recargar datos después de eliminar
      const updatedTramites = await getAllTramites();
      setTramites(updatedTramites);
    } catch (error) {
      console.error("Error al eliminar el trámite:", error);
      alert("Error al eliminar el trámite. Por favor, intenta de nuevo.");
    }
  };

  // Función para abrir el modal de edición
  const handleEdit = (item) => {
    const transformedItem = {
      ...item,
      id_direccion_pert: item.id_direccion_pert.id_dir, // Transformar el objeto dirección
    };
    setCurrentItem(transformedItem); // Establecer el ítem actual
    setIsEditing(true); // Indicar que estamos en modo edición
    setIsModalOpen(true); // Abrir el modal
  };

  // Función para abrir el modal de creación
  const handleCreate = () => {
    setCurrentItem(null); // Limpiar el ítem actual
    setIsEditing(false); // Indicar que estamos en modo creación
    setIsModalOpen(true); // Abrir el modal
  };

  return (
    <div className="bg-base-100">
      {/* Tabla de trámites */}
      <CrudTable
        title="Gestión de Trámites"
        fields={fieldsTable} // Usar fieldsTable para la tabla
        initialData={tramites}
        onSave={handleSave}
        onDelete={handleDelete}
        onEdit={handleEdit} // Pasa la función para editar
        onCreate={handleCreate} // Pasa la función para crear
      />

      {/* Modal para crear/editar trámites */}
      <CrudFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isEditing={isEditing}
        fields={fieldsForm}
        currentItem={currentItem}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const newItem = {};

          // Si estamos editando, agregamos el id_tramite al objeto newItem
          if (isEditing && currentItem) {
            newItem.id_tramite = currentItem.id_tramite;
          }

          // Llenamos el objeto newItem con los datos del formulario
          fieldsForm.forEach((field) => {
            const fieldNames = field.name.split(".");
            let currentLevel = newItem;
            fieldNames.forEach((name, index) => {
              if (index === fieldNames.length - 1) {
                currentLevel[name] = formData.get(field.name);
              } else {
                currentLevel[name] = currentLevel[name] || {};
                currentLevel = currentLevel[name];
              }
            });
          });

          // Llamamos a handleSave con el objeto newItem
          handleSave(newItem, isEditing);
        }}
      />
    </div>
  );
};

export default TramitesCRUD;
