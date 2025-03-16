import React, { useEffect, useState } from "react";
import CrudTable from "../../components/CrudTable";
import CrudFormModal from "../../components/CrudFormModal"; // Importa el modal
import {
  getAllRequisitos,
  createRequisito,
  updateRequisito,
  deleteRequisito,
} from "../../services/requisitosServices";
import { getAllTramites } from "../../services/tramitesServices";
import { getAllDirecciones } from "../../services/direccionesServices";
import { createLinks } from "../../services/linkServices";

export const RequisitosCRUD = () => {
  const [requisitos, setRequisitos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
  const [tramites, setTramites] = useState([]); // Estado para almacenar los trámites
  const [direcciones, setDirecciones] = useState([]); // Estado para almacenar las direcciones
  const [currentItem, setCurrentItem] = useState(null); // Estado para el ítem actual (edición)
  const [isEditing, setIsEditing] = useState(false); // Estado para saber si estamos editando

  // Cargar datos de la API al montar el componente
  // to-do: no se borran los datos de la tabla al eliminar un requisito
  useEffect(() => {
    const fetchRequisitos = async () => {
      try {
        const data = await getAllRequisitos();
        // Ordenar los datos por nombre del trámite
        data.sort((a, b) =>
          a.id_tramite_pert.nombre_tramite.localeCompare(
            b.id_tramite_pert.nombre_tramite
          )
        );
        const tramitesData = await getAllTramites();
        const direccionesData = await getAllDirecciones(); // Obtener las direcciones
        setDirecciones(direccionesData);
        setTramites(tramitesData);
        setRequisitos(data);
      } catch (error) {
        console.error("Error al cargar los requisitos:", error);
        alert("Error al cargar los requisitos. Por favor, intenta de nuevo.");
      }
    };
    fetchRequisitos();
  }, []);

  // Campos de la tabla
  const fields = [
    { name: "id_requisito", label: "ID", type: "text", required: false },
    {
      name: "id_tramite_pert.nombre_tramite",
      label: "Trámite",
      type: "text",
      required: true,
    },
    { name: "descripcion", label: "Descripción", type: "text", required: true },
    { name: "formato", label: "Formato", type: "text", required: true },
  ];

  // Campos para el formulario
  const fieldsForm = [
    {
      name: "direccion",
      label: "Dirección",
      type: "select",
      options: direcciones.map((dir) => ({
        value: dir.id_dir,
        label: dir.nombre,
      })),
      required: true,
    },
    {
      name: "id_tramite_pert",
      label: "Trámite",
      type: "select",
      options: tramites.map((tramite) => ({
        value: tramite.id_tramite,
        label: tramite.nombre_tramite,
        direccion: tramite.id_direccion_pert.id_dir,
      })),
      required: true,
    },
    { name: "descripcion", label: "Descripción", type: "text", required: true },
    {
      name: "formato",
      label: "Formato",
      type: "select",
      options: [
        { value: "si", label: "Sí" },
        { value: "no", label: "No" },
      ],
      required: true,
    },
    {
      name: "nombre_formato",
      label: "Nombre del Formato",
      type: "text",
      required: false,
    },
    {
      name: "link",
      label: "Link del Formato",
      type: "text",
      required: false,
    },
  ];

  const cascadingFilters = {
    id_tramite_pert: "direccion", // Filtra trámites por dirección
  };

  const conditionalFields = {
    nombre_formato: { sourceField: "formato", values: ["si"] }, // Muestra "nombre_formato" si "formato" es "si"
    link: { sourceField: "formato", values: ["si"] }, // Muestra "link" si "formato" es "si"
  };

  // Función para guardar (crear/editar)
  const handleSave = async (item, isEditing) => {
    try {
      // Extraer "nombre_formato" y "link", dejando el resto en "filteredItem"
      const { nombre_formato, link, direccion, ...filteredItem } = item;

      if (isEditing) {
        await updateRequisito(filteredItem.id_requisito, filteredItem);
      } else {
        const newRequisito = await createRequisito(filteredItem);
        // Si se creó correctamente, agregar los links asociados
        if (newRequisito && nombre_formato && link) {
          try {
            await createLinks({
              link,
              nombre_formato,
              id_requisito: newRequisito.id_requisito,
            });
          } catch (error) {
            console.error("Error al guardar los links:", error);
            alert("Error al guardar los links. Por favor, intenta de nuevo.");
          }
        }
      }

      // Recargar datos después de guardar
      const updatedRequisitos = await getAllRequisitos();
      setRequisitos(updatedRequisitos);
      setCurrentItem(null);
      setIsModalOpen(false); // Cerrar el modal después de guardar
    } catch (error) {
      console.error("Error al guardar el requisito:", error);
      alert("Error al guardar el requisito. Por favor, intenta de nuevo.");
    }
  };

  // Función para eliminar
  const handleDelete = async (id_requisito) => {
    try {
      console.log("Eliminando requisito con ID:", id_requisito);
      await deleteRequisito(id_requisito);
      // Recargar datos después de eliminar
      const updatedRequisitos = await getAllRequisitos();
      setRequisitos(updatedRequisitos);
    } catch (error) {
      console.error("Error al eliminar el requisito:", error);
      alert("Error al eliminar el requisito. Por favor, intenta de nuevo.");
    }
  };

  // Función para abrir el modal de edición
  const handleEdit = (item) => {
    setCurrentItem(item); // Establecer el ítem actual
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
    <>
      {/* Tabla de requisitos */}
      <CrudTable
        title="Gestión de Requisitos"
        fields={fields}
        initialData={requisitos}
        onSave={handleSave}
        onDelete={handleDelete}
        onEdit={handleEdit} // Pasa la función para editar
        onCreate={handleCreate} // Pasa la función para crear
      />

      {/* Modal para crear/editar requisitos */}
      <CrudFormModal
        isOpen={isModalOpen} // Controla si el modal está abierto
        onClose={() => setIsModalOpen(false)} // Maneja el cierre del modal
        isEditing={isEditing}
        fields={fieldsForm}
        currentItem={currentItem}
        cascadingFilters={cascadingFilters}
        conditionalFields={conditionalFields}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const newItem = {};
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
          handleSave(newItem, isEditing); // Llama a la función handleSave
        }}
      />
    </>
  );
};

export default RequisitosCRUD;
