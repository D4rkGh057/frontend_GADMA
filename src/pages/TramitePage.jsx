import { useParams } from "react-router-dom";
import { TramitesContext } from "../context/TramitesContext";
import { InformacionContext } from "../context/InformacionContext";
import React, { useContext, useEffect, useState } from "react";

export const TramitePage = () => {
  const { getTramiteById } = useContext(TramitesContext);
  const { getInformacionByTramite } = useContext(InformacionContext);
  const [loading, setLoading] = useState(true);
  const [tramite, setTramite] = useState(null); // Inicializa como null
  const [adicional, setAdicional] = useState([]); // Inicializa como array
  const [notas, setNotas] = useState([]); // Inicializa como array
  const { id } = useParams();

  const getTramite = async (id) => {
    try {
      const data = await getTramiteById(id);
      setTramite(data);
    } catch (error) {
      console.error("Error fetching trámite:", error);
    } finally {
      setLoading(false);
    }
  };

  const getInformacion = async (id) => {
    try {
      const data = await getInformacionByTramite(id);
      // Filtrar los datos
      const adicionales = data.filter((item) => item.tipo === "Adicional");
      const informacion = data.filter((item) => item.tipo === "Nota");
      setAdicional(adicionales);
      setNotas(informacion);
    } catch (error) {
      console.error("Error fetching información:", error);
    }
  };

  useEffect(() => {
    getTramite(id);
    getInformacion(id);
  }, [id]);

  if (loading) {
    return <h1 className="text-center text-2xl font-bold my-4">Cargando...</h1>;
  }

  if (!tramite) {
    return <h1 className="text-center text-2xl font-bold my-4">No se encontró el trámite</h1>;
  }

  // Determina el color del badge según la modalidad
  const badgeColor =
    tramite.ctramTramite.modalidad === "Presencial"
      ? "badge-primary"
      : "badge-warning";

  return (
    <main className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl md:text-3xl font-bold my-4 text-center">
            {tramite.ctramTramite.nombre_tramite}
          </h1>
          <div className={`badge ${badgeColor} text-xl font-bold my-4`}>
            Trámite {tramite.ctramTramite.modalidad}
          </div>
          {tramite.requisitos && tramite.requisitos.length > 0 ? (
            <div className="card bg-base-100 shadow-lg w-full max-w-2xl my-4">
              <div className="card-body">
                <h2 className="card-title text-xl font-bold my-2">
                  Requisitos
                </h2>
                <ul className="list-disc pl-5">
                  {tramite.requisitos.map((requisito) => (
                    <li key={requisito.id_requisito} className="my-2">
                      {requisito.descripcion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p className="text-center my-4">No hay requisitos para este trámite</p>
          )}
          {adicional.length > 0 ? (
            <div className="card bg-base-100 shadow-lg w-full max-w-2xl my-4">
              <div className="card-body">
                <h2 className="card-title text-xl font-bold my-2">
                  Requisitos Especiales
                </h2>
                <ul className="list-disc pl-5">
                  {adicional.map((item) => (
                    <li key={item.id_informacion} className="my-2">
                      <strong>{item.razon}</strong> - {item.descripcion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p className="text-center my-4">No hay requisitos especiales para este trámite</p>
          )}
          {notas.length > 0 ? (
            <div className="card bg-base-100 shadow-lg w-full max-w-2xl my-4">
              <div className="card-body">
                <h2 className="card-title text-xl font-bold my-2">Notas</h2>
                <ul className="list-disc pl-5">
                  {notas.map((item) => (
                    <li key={item.id_informacion} className="my-2">
                      <strong>{item.razon}</strong> - {item.descripcion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p className="text-center my-4">No hay notas para este trámite</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default TramitePage;