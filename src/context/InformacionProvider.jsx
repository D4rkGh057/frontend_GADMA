import { useEffect, useMemo, useState } from "react";
import { useForm } from "../hooks/useForm";
import { InformacionContext } from "./InformacionContext";
import PropTypes from "prop-types";

export const InformacionProvider = ({ children }) => {
  const [allInformacion, setAllInformacion] = useState([]);
  const [loading, setLoading] = useState(true);

  // Utilizar CustomHook - useForm
  const { valueSearch, onInputChange, onResetForm } = useForm({
    valueSearch: "",
  });

  InformacionProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const getAllInformacion = async () => {
    const baseURL = "http://localhost:5000/ctram-informacion";
    const response = await fetch(`${baseURL}`);
    const data = await response.json();
    setAllInformacion(data);
    setLoading(false);
  };

  const getInformacionByTramite = async (id) => {
    const baseURL = "http://localhost:5000/ctram-informacion/InfoTramite";
    const response = await fetch(`${baseURL}/${id}`);
    const data = await response.json();
    return data; // Ahora devuelve los trámites en lugar de modificar un estado global
  };

  const getInformacionById = async (id) => {
    const baseURL = "http://localhost:5000/ctram-informacion";
    // buscamos el tramite por id
    const response = await fetch(`${baseURL}/${id}`);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    getAllInformacion();
  }, []);

  const contextValue = useMemo(
    () => ({
      allInformacion,
      getInformacionByTramite,
      getInformacionById,
      getAllInformacion,
      loading,
      valueSearch,
      onInputChange,
      onResetForm,
    }),
    [
      allInformacion,
      loading,
      valueSearch,
      onInputChange,
      onResetForm,
    ]
  );

  return (
    <InformacionContext.Provider value={contextValue}>
      {children}
    </InformacionContext.Provider>
  );
};
