import React, { useEffect, useState } from "react";
import CrudTable from "../../components/CrudTable";
import CrudFormModal from "../../components/CrudFormModal"; // Importa el modal
import {
  createFormatos,
  deleteFormatos,
  getAllFormatos,
  updateFormatos,
} from "../../services/formatosServices";
import { getAllRequisitos } from "../../services/requisitosServices";
import { getAllLinks } from "../../services/linkServices";
import { getAllTramites } from "../../services/tramitesServices";

export const FormatosCRUD = () => {
  const [tramites, setTramites] = useState([]); // Estado para almacenar los trámites
  const [requisitos, setRequisitos] = useState([]);
  const [links, setLinks] = useState([]);
  const [formatos, setFormatos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Cargar datos de la API al montar el componente
  useEffect(() => {
    const fetchFormatos = async () => {
      try {
        const data = await getAllFormatos();
        setFormatos(data);
        const requisitosData = await getAllRequisitos();
        setRequisitos(requisitosData);
        const linksData = await getAllLinks();
        setLinks(linksData);
        const tramitesData = await getAllTramites();
        setTramites(tramitesData);
      } catch (error) {
        console.error("Error al cargar los formatos:", error);
        alert("Error al cargar los formatos. Por favor, intenta de nuevo.");
      }
    };
    fetchFormatos();
  }, []);

  // Campos del tabla
  const fields = [
    { name: "id_formato", label: "ID", type: "text", required: false },
    {
      name: "id_link_pert.nombre_formato",
      label: "Nombre",
      type: "text",
      required: true,
    },
    {
      name: "id_requisito_pert.descripcion",
      label: "Requisito al que pertenece",
      type: "text",
      required: true,
    },
    { name: "estado", label: "Estado", type: "text", required: true },
    {
      name: "fecha_creacion",
      label: "Fecha de creación",
      type: "date",
      required: true,
    },
    {
      name: "fecha_caducidad",
      label: "Fecha de caducidad",
      type: "date",
      required: true,
    },
    {
      name: "justificacion",
      label: "Justificación",
      type: "text",
      required: true,
    },
  ];

  // Campos para el formulario
  const formFields = [
    {
      name: "id_tramite_pert",
      label: "Tramite",
      type: "select",
      options: tramites.map((tramite) => ({
        value: tramite.id_tramite,
        label: tramite.nombre_tramite,
      })),
      required: false,
    },
    {
      name: "id_requisito_pert",
      label: "Requisito",
      type: "select",
      options: requisitos.map((req) => ({
        value: req.id_requisito,
        label: req.descripcion,
        id_tramite_pert: req.id_tramite_pert.id_tramite,
      })),
      required: true,
    },
    {
      name: "id_link_pert",
      label: "Link",
      type: "select",
      options: links.map((link) => ({
        value: link.id_link,
        label: link.nombre_formato,
      })),
      required: true,
    },
    {
      name: "estado",
      label: "Estado",
      type: "select",
      options: [
        { value: "ACTIVO", label: "ACTIVO" },
        { value: "INACTIVO", label: "INACTIVO" },
      ],
      required: true,
    },
    {
      name: "fecha_creacion",
      label: "Fecha de creación",
      type: "date",
      required: true,
    },
    {
      name: "fecha_caducidad",
      label: "Fecha de caducidad",
      type: "date",
      required: false,
    },
    {
      name: "justificacion",
      label: "Justificación",
      type: "text",
      required: false,
    },
  ];

  const cascadingFilters = {
    id_requisito_pert: "id_tramite_pert",
  };

  const conditionalFields = {
    fecha_caducidad: { sourceField: "estado", values: ["INACTIVO"] }, // Muestra "fecha_caducidad" si "estado" es "INACTIVO"
    justificacion: { sourceField: "estado", values: ["INACTIVO"] }, // Muestra "justificacion" si "estado" es "INACTIVO"
  };

  // Función para guardar (crear/editar)
  const handleSave = async (item, isEditing) => {
    try {
      const { id_tramite_pert, ...filteredItem } = item;
      if (isEditing) {
        await updateFormatos(filteredItem.id_formato, filteredItem);
      } else {
        await createFormatos(filteredItem);
      }

      const updatedFormatos = await getAllFormatos();
      setFormatos(updatedFormatos);
      setCurrentItem(null); // Limpiar el currentItem
      setIsModalOpen(false); // Cerrar el modal después de guardar
    } catch (error) {
      console.error("Error al guardar los formatos:", error);
      alert("Error al guardar los formatos. Por favor, intenta de nuevo.");
    }
  };

  // Función para eliminar
  const handleDelete = async (id_formato) => {
    try {
      await deleteFormatos(id_formato);
      setFormatos((prevFormatos) =>
        prevFormatos.filter((formato) => formato.id_formato !== id_formato)
      );
    } catch (error) {
      console.error("Error al eliminar los formatos:", error);
      alert("Error al eliminar los formatos. Por favor, intenta de nuevo.");
    }
  };

  // Función para abrir el modal de edición
  const handleEdit = (item) => {
    const transformedItem = {
      ...item,
      id_tramite_pert: requisitos.find(
        (req) => req.id_requisito === item.id_requisito_pert.id_requisito
      ).id_tramite_pert.id_tramite,
      id_requisito_pert: item.id_requisito_pert.id_requisito,
      id_link_pert: item.id_link_pert.id_link,
      fecha_creacion: item.fecha_creacion
        ? item.fecha_creacion.split("T")[0]
        : "",
      fecha_caducidad: item.fecha_caducidad
        ? item.fecha_caducidad.split("T")[0]
        : "",
    };

    setCurrentItem(transformedItem);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Función para abrir el modal de creación
  const handleCreate = () => {
    setCurrentItem(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  return (
    <>
      <CrudTable
        title="Formatos"
        initialData={formatos}
        fields={fields}
        onSave={handleSave}
        onDelete={handleDelete}
        onEdit={handleEdit} // Pasa la función para editar
        onCreate={handleCreate} // Pasa la función para crear
      />

      {/* Modal personalizado */}
      <CrudFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isEditing={isEditing}
        fields={formFields}
        currentItem={currentItem}
        cascadingFilters={cascadingFilters}
        conditionalFields={conditionalFields}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const newItem = {};
          // Si estamos editando, agregamos el id_formato al objeto newItem
          if (isEditing && currentItem) {
            newItem.id_formato = currentItem.id_formato;
          }
          formFields.forEach((field) => {
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
    </>
  );
};

export default FormatosCRUD;
