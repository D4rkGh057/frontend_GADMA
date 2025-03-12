import React from "react";
import DireccionList from "../components/DireccionList";

export const Inicio = () => {
  return (
    <>
      <h1 className="flex-auto text-center text-2xl p-5 font-bold text-neutral-700">
        Trámites
      </h1>
      <DireccionList />
    </>
  );
};

export default Inicio;
