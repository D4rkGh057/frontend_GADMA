export const UsersCRUD = () => {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-semibold text-gray-800">
        Gestión de Usuarios
      </h2>
      <p className="text-gray-600">
        Administra los usuarios registrados en el sistema.
      </p>
      <div className="flex justify-end mt-4">
        <a
          href="/admin-panel/users/create"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Crear Usuario
        </a>
      </div>
    </div>
  );
};

export default UsersCRUD;
