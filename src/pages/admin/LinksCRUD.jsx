import React, { useEffect, useState } from "react";
import CrudTable from "../../components/CrudTable";
import CrudFormModal from "../../components/CrudFormModal";
import { getAllLinks, createLinks, updateLinks } from "../../services/linkServices";

export const LinksCRUD = () => {
  const [links, setLinks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const data = await getAllLinks();
        setLinks(data);
      } catch (error) {
        console.error("Error al cargar los links:", error);
      }
    };
    fetchLinks();
  }, []);

  const fields = [
    { name: "id_link", label: "ID", type: "text", required: false },
    { name: "nombre_formato", label: "Nombre", type: "text", required: true },
    { name: "link", label: "Link", type: "text", required: true },
  ];

  const fieldsForm = [
    { name: "nombre_formato", label: "Nombre", type: "text", required: true },
    { name: "link", label: "Link", type: "text", required: true },
  ];

  const handleSave = async (item, isEditing) => {
    try {
      if (isEditing) {
        // Si estamos editando, enviamos el item completo incluyendo el id_link
        await updateLinks(item.id_link, item);
      } else {
        // Si estamos creando, eliminamos el campo id_link del objeto
        const { id_link, ...newItem } = item;
        await createLinks(newItem);
      }
      const updatedLinks = await getAllLinks();
      setLinks(updatedLinks);
      setIsModalOpen(false);
      setCurrentItem(null);
    } catch (error) {
      console.error("Error al guardar los links:", error);
    }
  };
  
  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setCurrentItem(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  return (
    <>
      <CrudTable
        title="Links"
        initialData={links}
        fields={fields}
        onSave={handleSave}
        onEdit={handleEdit}
        onCreate={handleCreate}
      />
      <CrudFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isEditing={isEditing}
        fields={fieldsForm}
        currentItem={currentItem}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const newItem = {
            id_link: isEditing ? currentItem.id_link : null,
            nombre_formato: formData.get("nombre_formato"),
            link: formData.get("link"),
          };
          handleSave(newItem, isEditing);
        }}
      />
    </>
  );
};

export default LinksCRUD;
