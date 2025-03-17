import React, { useEffect, useState } from "react";
import CrudTable from "../../components/CrudTable";
import CrudFormModal from "../../components/CrudFormModal";
import {
  getAllInformacion,
  createInformacion,
  updateInformacion,
  deleteInformacion,
} from "../../services/informacionServices";
import { getAllTramites } from "../../services/tramitesServices";
import { getAllDirecciones } from "../../services/direccionesServices";

export const InformacionCRUD = () => {
  const [informacion, setInformacion] = useState([]);
  const [tramites, setTramites] = useState([]);
  const [direcciones, setDirecciones] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  // Cargar datos de la API al montar el componente
  useEffect(() => {
    const fetchInformacion = async () => {
      try {
        const data = await getAllInformacion();
        setInformacion(data);
        const tramitesData = await getAllTramites();
        setTramites(tramitesData);
        const direccionesData = await getAllDirecciones();
        setDirecciones(direccionesData);
      } catch (error) {
        console.error("Error al cargar la información:", error);
      }
    };
    fetchInformacion();
  }, []);

  // Campos de la tabla
  const fields = [
    { name: "id_informacion", label: "ID", type: "text", required: false },
    {
      name: "id_tramite_pert.nombre_tramite",
      label: "Trámite",
      type: "text",
      required: true,
    },
    { name: "descripcion", label: "Descripción", type: "text", required: true },
    { name: "tipo", label: "Tipo", type: "text", required: true },
    { name: "razon", label: "Razón", type: "text", required: true },
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
      required: true,
      options: tramites.map((tramite) => ({
        value: tramite.id_tramite,
        label: tramite.nombre_tramite,
        direccion: tramite.id_direccion_pert.id_dir,
      })),
    },
    { name: "descripcion", label: "Descripción", type: "text", required: true },
    {
      name: "tipo",
      label: "Tipo",
      type: "select",
      options: [
        { value: "Adicional", label: "Adicional" },
        { value: "Nota", label: "Nota" },
      ],
    },
    { name: "razon", label: "Razón", type: "text", required: true },
  ];

  const cascadingFilters = {
    id_tramite_pert: "direccion", // Filtra trámites por dirección
  };

  // Función para guardar (crear/editar)
  const handleSave = async (item, isEditing) => {
    const { direccion, ...filteredInfo } = item;
    try {
      if (isEditing) {
        await updateInformacion(filteredInfo.id_informacion, filteredInfo);
      } else {
        await createInformacion(filteredInfo);
      }

      // Recargar datos después de guardar
      const updatedInformacion = await getAllInformacion();
      setInformacion(updatedInformacion);
      setCurrentItem(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al guardar la información:", error);
      alert("Error al guardar la información. Por favor, intente de nuevo.");
    }
  };

  // Función para eliminar
  const handleDelete = async (id_informacion) => {
    try {
      await deleteInformacion(id_informacion);
      // Recargar datos después de eliminar
      const updatedInformacion = await getAllInformacion();
      setInformacion(updatedInformacion);
    } catch (error) {
      console.error("Error al eliminar la información:", error);
    }
  };

  const handleEdit = (item) => {
    const transformedItem = {
      ...item,
      direccion: tramites.find(
        (tramite) => tramite.id_tramite === item.id_tramite_pert.id_tramite
      ).id_direccion_pert.id_dir,
      id_tramite_pert: item.id_tramite_pert.id_tramite,
    };
    setIsEditing(true);
    setCurrentItem(transformedItem);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setIsEditing(false);
    setCurrentItem(null);
    setIsModalOpen(true);
  };

  return (
    <div>
      <CrudTable
        title="Gestión de Información"
        fields={fields}
        initialData={informacion}
        onSave={handleSave}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onEdit={handleEdit}
      />

      <CrudFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isEditing={isEditing}
        fields={fieldsForm}
        currentItem={currentItem}
        cascadingFilters={cascadingFilters}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const newItem = {};
          // Si estamos editando, agregamos el id_informacion al objeto newItem
          if (isEditing && currentItem) {
            newItem.id_informacion = currentItem.id_informacion;
          }
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
          handleSave(newItem, isEditing);
        }}
      />
    </div>
  );
};

export default InformacionCRUD;
