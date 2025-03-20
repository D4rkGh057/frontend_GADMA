import React from "react";
import fondo from "../../assets/municipalidadSUR1.webp";
import { isTokenValid } from "../../services/authServices";

export const AdminPanel = () => {

  if (!sessionStorage.getItem("token") && !isTokenValid(sessionStorage.getItem("token"))) {
    window.location.href = "/login"; // Redirige al usuario al login si no está autenticado
  }
  const user = sessionStorage.getItem("user")?.replace(/['"]+/g, ""); // Obtiene el usuario del sessionStorage

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="bg-white/80 p-8 rounded-lg shadow-lg w-full max-w-6xl bg-opacity-90">
        {/* Título y mensaje de bienvenida */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Panel de Administración
        </h1>
        <p className="text-center text-gray-600 text-xl mb-8">
          Bienvenido,{" "}
          <span className="font-semibold text-blue-600">{user}</span>
        </p>

        {/* Accesos rápidos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Tarjeta para gestionar usuarios */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Usuarios</h2>
            <p className="text-gray-600 mb-4">
              Gestiona los usuarios registrados en el sistema.
            </p>
            <a
              href="/admin-panel/users"
              className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Ir a Usuarios
            </a>
          </div>

          {/* Tarjeta para gestionar trámites */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Trámites</h2>
            <p className="text-gray-600 mb-4">
              Administra los trámites disponibles en el sistema.
            </p>
            <a
              href="/admin-panel/tramites"
              className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Ir a Trámites
            </a>
          </div>

          {/* Tarjeta para gestionar requisitos */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Requisitos
            </h2>
            <p className="text-gray-600 mb-4">
              Gestiona los requisitos necesarios para los trámites.
            </p>
            <a
              href="/admin-panel/requisitos"
              className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Ir a Requisitos
            </a>
          </div>

          {/* Tarjeta para gestionar información */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Información
            </h2>
            <p className="text-gray-600 mb-4">
              Administra la información adicional de los trámites.
            </p>
            <a
              href="/admin-panel/informacion"
              className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Ir a Información
            </a>
          </div>

          {/* Tarjeta para gestionar formatos */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Formatos</h2>
            <p className="text-gray-600 mb-4">
              Gestiona los formatos asociados a los trámites.
            </p>
            <a
              href="/admin-panel/formatos"
              className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Ir a Formatos
            </a>
          </div>

          {/* Tarjeta para gestionar links */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Links</h2>
            <p className="text-gray-600 mb-4">
              Gestiona los links asociados a los trámites.
            </p>
            <a
              href="/admin-panel/links"
              className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Ir a Links
            </a>
          </div>
        </div>

        {/* Mensaje adicional */}
        <p className="text-center text-gray-500 mt-8">
          Utiliza las opciones anteriores para gestionar el sistema de manera
          eficiente.
        </p>
      </div>
    </div>
  );
};

export default AdminPanel;
