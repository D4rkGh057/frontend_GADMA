import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TramitesContext } from "../context/TramitesContext";
import { isTokenValid } from "../services/authServices";

export const Navbar = () => {
  const { onInputChange, valueSearch, onResetForm } = useContext(TramitesContext);
  const [loggedIn, setLoggedIn] = useState(false); // Estado para verificar si el usuario está autenticado
  const navigate = useNavigate();

  // Efecto para verificar la validez del token al cargar el componente
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token && isTokenValid(token)) {
      setLoggedIn(true); // Si el token es válido, el usuario está autenticado
    } else {
      setLoggedIn(false); // Si el token no es válido, el usuario no está autenticado
    }
  }, []); // El efecto se ejecuta solo al montar el componente

  // Función para manejar la búsqueda
  const onSearchSubmit = (e) => {
    e.preventDefault();
    navigate("/search", {
      state: valueSearch,
    });
    onResetForm();
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    sessionStorage.removeItem("token"); // Elimina el token de sessionStorage
    sessionStorage.removeItem("user"); // Elimina el usuario de sessionStorage
    setLoggedIn(false); // Actualiza el estado a "no autenticado"
    navigate("/login"); // Redirige al usuario a la página de inicio de sesión
  };

  return (
    <div className="navbar bg-sky-800 shadow-sm">
      <div className="flex-1">
        <button
          className="text-xl font-bold text-base-200"
          onClick={() => navigate("/")} // Usa navigate en lugar de window.location.href
        >
          SmarTramites
        </button>
      </div>
      <div className="flex gap-2">
        <label className="input" aria-label="Search">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <form onSubmit={onSearchSubmit}>
            <input
              type="search"
              name="valueSearch"
              placeholder="Buscar trámite"
              value={valueSearch || ""} // Si valueSearch es undefined, usa una cadena vacía
              onChange={onInputChange}
            />
          </form>
        </label>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="size-10"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {loggedIn ? (
              <>
                <li>
                  <a className="justify-between" href="/admin-panel">
                    Panel de Control
                  </a>
                </li>
                <li>
                  <button onClick={handleLogout}>Cerrar Sesión</button>
                </li>
              </>
            ) : (
              <li>
                <a className="justify-between" href="/login">
                  Iniciar Sesión
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;