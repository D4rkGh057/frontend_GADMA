import React, { useContext } from "react";
import { DireccionesContext } from "../context/DireccionesContext";
import TramiteList from "./TramiteList";
import { SkeletonGrid } from "./Skeletons";

export const DireccionList = () => {
  const { allDirecciones, loading } = useContext(DireccionesContext);

  return (
    <>
      {loading ? (
        <>
          <div className="skeleton h-10 w-32"></div>
          <SkeletonGrid count={9} />
        </>
      ) : (
        <div>
          {allDirecciones.map((direccion, index) => (
            <div key={direccion.id_dir} className="collapse collapse-arrow bg-base-100 ">
              <input type="radio" name="direcciones-accordion" />
              <div className="collapse-title font-semibold px-5 text-2xl">{direccion.nombre}</div>
              <div className="collapse-content text-sm">
                <TramiteList direccion={direccion.id_dir} />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DireccionList;
