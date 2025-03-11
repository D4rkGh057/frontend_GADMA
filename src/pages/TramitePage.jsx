import { TramitesContext } from "../context/TramitesContext";
import Navbar from "../layouts/navbar";
import React, { useContext } from "react";

export const TramitePage = () => {
  const { getTramiteById } = useContext(TramitesContext);
  const [loading, setLoading] = useState(true);
  const [tramite, setTramite] = useState({});
  const { id } = useParams();

  const getTramite = async (id) => {
    const data = await getTramiteById(id);
    setTramite(data);
    setLoading(false);
  };

  useEffect(() => {
    getTramite(id);
  }, []);

  if (loading) {
    return <h1>Cargando</h1>;
  }

  return (
    <main>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold my-4">Trámite: {tramite.nombre}</h1>
          <p className="text-lg">Costo: {tramite.modalidad}</p>
          {tramite.requisitos.length > 0 ? (
            <div>
              <h2 className="text-xl font-bold my-2">Requisitos</h2>
              <ul>
                {tramite.requisitos.map((requisito) => (
                  <li key={requisito.id}>{requisito.descripcion}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No hay requisitos para este trámite</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default TramitePage;
