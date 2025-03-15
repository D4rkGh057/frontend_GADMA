import React, { useEffect, useState } from "react";
import CrudTable from "../../components/CrudTable";
import CrudFormModal from "../../components/CrudFormModal"; // Importa el modal
import { getAllUsers, createUser, updateUser, deleteUser } from "../../services/usuariosServices";

export const UsersCRUD = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
  const [currentItem, setCurrentItem] = useState(null); // Estado para el ítem actual (edición)
  const [isEditing, setIsEditing] = useState(false); // Estado para saber si estamos editando

  // Cargar datos de la API al montar el componente
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
        alert("Error al cargar los usuarios. Por favor, intenta de nuevo.");
      }
    };
    fetchUsers();
  }, []);

  // Campos del formulario
  const fields = [
    { name: "cedula_ruc", label: "Cédula/RUC", type: "text", required: true },
    { name: "correo", label: "Correo", type: "email", required: true },
    { name: "nombre", label: "Nombre", type: "text", required: true },
    { name: "apellido", label: "Apellido", type: "text", required: true },
    {name:"fecha_nacimiento" , label:"Fecha de Nacimiento", type:"date", required:true},
    {name:"password", label:"Contraseña", type:"password", required:true},
  ];

  //Campos de la tabla
  const fieldsTable = [
    { name: "cedula_ruc", label: "Cédula/RUC", type: "text", required: true },
    { name: "correo", label: "Correo", type: "email", required: true },
    { name: "nombre", label: "Nombre", type: "text", required: true },
    { name: "apellido", label: "Apellido", type: "text", required: true },
    { name: "rol", label: "Rol", type: "text", required: true },
  ];


  // Función para guardar (crear/editar)
  const handleSave = async (item, isEditing) => {
    try {
      if (isEditing) {
        await updateUser(item.cedula_ruc, item); // Actualizar usuario
      } else {
        await createUser(item); // Crear usuario
      }
      // Recargar datos después de guardar
      const updatedUsers = await getAllUsers();
      setUsers(updatedUsers);
      setIsModalOpen(false); // Cerrar el modal después de guardar
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
      alert("Error al guardar el usuario. Por favor, intenta de nuevo.");
    }
  };

  // Función para eliminar
  const handleDelete = async (cedula_ruc) => {
    try {
      await deleteUser(cedula_ruc); // Eliminar usuario
      // Recargar datos después de eliminar
      const updatedUsers = await getAllUsers();
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      alert("Error al eliminar el usuario. Por favor, intenta de nuevo.");
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
      {/* Tabla de usuarios */}
      <CrudTable
        title="Gestión de Usuarios"
        fields={fieldsTable}
        initialData={users}
        onSave={handleSave}
        onDelete={handleDelete}
        onEdit={handleEdit} // Pasa la función para editar
        onCreate={handleCreate} // Pasa la función para crear
      />

      {/* Modal para crear/editar usuarios */}
      <CrudFormModal
        isOpen={isModalOpen} // Controla si el modal está abierto
        onClose={() => setIsModalOpen(false)} // Maneja el cierre del modal
        isEditing={isEditing}
        fields={fields}
        currentItem={currentItem}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const newItem = {};
          fields.forEach((field) => {
            newItem[field.name] = formData.get(field.name);
          });
          handleSave(newItem, isEditing); // Llama a la función handleSave
        }}
      />
    </>
  );
};

export default UsersCRUD;