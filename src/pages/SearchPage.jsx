import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TramitesContext } from "../context/TramitesContext";

export const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { allTramites } = useContext(TramitesContext);

  // Verifica que location.state esté definido
  const searchQuery = location.state ? location.state.toLowerCase() : "";

  // Filtra los trámites
  const filteredTramites = allTramites.filter((tramite) =>
    tramite.nombre_tramite.toLowerCase().includes(searchQuery)
  );

  // Manejador de clics para redirigir a la página del trámite
  const handleRowClick = (id_tramite) => {
    navigate(`/tramite/${id_tramite}`); // Redirige a la página del trámite
  };

  return (
    <div className="container">
      <h2 className="text-2xl font-bold text-center my-4">
        Se encontraron <span>{filteredTramites.length}</span> resultados:
      </h2>

      <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100 p-4 my-4 mx-4">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre del trámite</th>
              <th>Modalidad</th>
            </tr>
          </thead>
          <tbody>
            {filteredTramites.map((tramite) => (
              <tr
                key={tramite.id_tramite}
                onClick={() => handleRowClick(tramite.id_tramite)}
                className="hover:bg-base-200 cursor-pointer"
              >
                <td>{tramite.nombre_tramite}</td>
                <td>{tramite.modalidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchPage;
