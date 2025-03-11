import React, { useContext } from "react";
import { TramitesContext } from "../context/TramitesContext";
import { TramiteCard } from "./TramiteCard";
import { SkeletonGrid } from "./Skeletons";

export const TramiteList = () => {
  const { allTramites, loading } = useContext(TramitesContext);

  return (
    <>
      {loading ? (
        <SkeletonGrid count={9} />
      ) : (
        <div className="grid items-stretch grid-cols-1 gap-4 p-3 sm:grid-cols-2 lg:grid-cols-3">
          {allTramites.map((tramite) => (
            <TramiteCard key={tramite.id_tramite} tramite={tramite} />
          ))}
        </div>
      )}
    </>
  );
};

export default TramiteList;
