import React from "react";
import TramiteList from "../components/TramiteList";

export const Inicio = () => {

  return (
    <>
      
      <p
        id="Titulo"
        className="flex-auto text-center text-2xl p-5 font-bold text-neutral-700"
      >
        Trámites
      </p>
      
      <TramiteList/>
    </>
  );
};

export default Inicio;
