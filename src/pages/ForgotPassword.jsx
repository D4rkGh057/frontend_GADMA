import React, { useState } from "react";
import fondo from "../assets/municipalidadSUR1.webp"; // Importa la misma imagen de fondo

export const ForgotPassword = () => {
  const [email, setEmail] = useState(""); // Estado para el correo electrónico
  const [message, setMessage] = useState(""); // Estado para mostrar mensajes al usuario

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el correo de recuperación
    console.log("Correo enviado a:", email);
    setMessage(
      "Se ha enviado un correo con instrucciones para recuperar tu contraseña."
    );
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${fondo})` }} // Usa la misma imagen de fondo
    >
      <div className="bg-white/80 p-6 rounded-lg shadow-lg w-full max-w-md bg-opacity-90">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Recuperar Contraseña
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Cédula
            </label>
            <input
              type="email"
              id="email"
              name="email"
    placeholder="Cédula de Identidad o RUC"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Ingresa el correo electrónico con el que te registraste"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Enviar Instrucciones
          </button>
        </form>
        {message && (
          <div className="mt-4 text-center text-green-600 font-medium">
            {message}
          </div>
        )}
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            ¿Recuerdas tu contraseña?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Inicia Sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
