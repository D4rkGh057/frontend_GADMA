import { useParams } from "react-router-dom";
import { TramitesContext } from "../context/TramitesContext";
import { InformacionContext } from "../context/InformacionContext";
import React, { useContext, useEffect, useState } from "react";

export const TramitePage = () => {
  const { getTramiteById } = useContext(TramitesContext);
  const { getInformacionByTramite } = useContext(InformacionContext);
  const [loading, setLoading] = useState(true);
  const [tramite, setTramite] = useState({});
  const [adicional, setAdicional] = useState({});
  const [notas, setNotas] = useState({});
  const { id } = useParams();

  const getTramite = async (id) => {
    const data = await getTramiteById(id);
    setTramite(data);
    setLoading(false);
  };

  const getInformacion = async (id) => {
    const data = await getInformacionByTramite(id);
    // Filtrar los datos
    const adicionales = data.filter((item) => item.tipo === "Adicional");
    const informacion = data.filter((item) => item.tipo === "Informacion");
    setAdicional(adicionales);
    setNotas(informacion);
  };

  useEffect(() => {
    getTramite(id);
    getInformacion(id);
  }, []);

  if (loading) {
    return <h1>Cargando</h1>;
  }

  return (
    <main>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold my-4">
            {tramite.ctramTramite.nombre_tramite}
          </h1>
          <p className="text-xl font-bold my-4">
            Tramite {tramite.ctramTramite.modalidad}
          </p>
          {tramite.requisitos.length > 0 ? (
            <div className="card card-border bg-base-100 border-base-300 rounded-xl p-4 my-4 mx-35">
              <div className="card-body">
                <h2 className="card-title text-xl font-bold my-2">
                  Requisitos
                </h2>
                <ul>
                  {tramite.requisitos.map((requisito) => (
                    <li key={requisito.id_requisito}>{requisito.descripcion}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p>No hay requisitos para este trámite</p>
          )}
          {adicional.length > 0 ? (
            <div className="card card-border bg-base-100 border-base-300 rounded-xl p-4 my-4 mx-35">
              <div className="card-body">
                <h2 className="card-title text-xl font-bold my-2">
                  Requisitos Especiales
                </h2>
                <ul>
                  {adicional.map((item) => (
                    <li key={item.id_informacion}>
                      <strong>{item.razon}</strong> - {item.descripcion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p>No hay requisitos especiales para este trámite</p>
          )}
          {notas.length > 0 ? (
            <div className="card card-border bg-base-100 border-base-300 rounded-xl p-4 my-4 mx-35">
              <div className="card-body">
                <h2 className="card-title text-xl font-bold my-2">Notas</h2>
                <ul>
                  {notas.map((item) => (
                    <li key={item.id_informacion}>
                      <strong>{item.razon}</strong> - {item.descripcion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p>No hay notas para este trámite</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default TramitePage;
