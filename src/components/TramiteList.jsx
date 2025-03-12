import React, { useContext, useEffect, useState } from "react";
import { TramitesContext } from "../context/TramitesContext";
import { TramiteCard } from "./TramiteCard";

export const TramiteList = ({ direccion }) => {
  const { getTramitesByDirection } = useContext(TramitesContext);
  const [tramites, setTramites] = useState([]);
  useEffect(() => {
    if (direccion) {

      getTramitesByDirection(direccion).then((data) => {
        setTramites(data);
      });
    }
  }, [direccion]);

  return (
    <div className="grid items-stretch grid-cols-1 gap-4 p-3 sm:grid-cols-2 lg:grid-cols-3">
      
        {tramites.map((tramite) => (
          <TramiteCard key={tramite.id_tramite} tramite={tramite} />
        ))}
      
    </div>
  );
};

export default TramiteList;
