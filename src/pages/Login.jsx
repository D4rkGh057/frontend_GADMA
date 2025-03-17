import React, { useState } from "react";
import fondo from "../assets/municipalidadSUR1.webp"; // Importa la imagen
import { getRoleFromToken, getUserFromToken, login } from "../services/authServices";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
  e.preventDefault();
  const cedula = e.target.cedula.value;
  const password = e.target.password.value;

  try {
    const data = await login(cedula, password);
    sessionStorage.setItem("token", data.access_token);

    const user = getUserFromToken(data.access_token);
    sessionStorage.setItem("user", JSON.stringify(user));

    const rol = getRoleFromToken(data.access_token);
    sessionStorage.setItem("rol", JSON.stringify(rol));

    navigate("/admin-panel");
  } catch (error) {
    console.error("Login failed:", error);
    alert("Credenciales incorrectas. Por favor, intenta de nuevo.");
  }
};

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${fondo})` }} // Usa la imagen importada
    >
      <div className="bg-white/80 p-8 rounded-lg shadow-lg w-full max-w-md bg-opacity-90">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Iniciar Sesión
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="cedula"
              className="block text-gray-700 font-medium mb-2"
            >
              Cédula
            </label>
            <input
              type="text"
              id="cedula"
              name="cedula"
              maxLength="13"
              placeholder="Cédula de Identidad o RUC"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Contraseña
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-600"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Iniciar Sesión
          </button>
        </form>
        {/* <div className="mt-6 text-center">
          <p className="text-gray-600">
            ¿No tienes una cuenta?{" "}
            <a
              href="/registro"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Regístrate
            </a>
          </p>
        </div>
        <div className="mt-6 text-center">
          <a
            href="/forgot-password"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Olvidaste tu contraseña?
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
