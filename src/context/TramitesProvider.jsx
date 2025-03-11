import { useEffect, useMemo, useState } from "react";
import { useForm } from "../hooks/useForm";
import { TramitesContext } from "./TramitesContext";
import PropTypes from 'prop-types';


export const TramitesProvider = ({ children }) => {
  const [allTramites, setAllTramites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Utilizar CustomHook - useForm
  const { valueSearch, onInputChange, onResetForm } = useForm({
    valueSearch: "",
  });

  TramitesProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const getAllTramites = async () => {
    const baseURL = "http://localhost:5000/ctram-tramite";
    const response = await fetch(`${baseURL}`);
    const data = await response.json();
    setAllTramites(data);
    setLoading(false);
  };

  const getTramiteById = async (id) => {
    const baseURL = "http://localhost:5000/ctram-tramite";
    // buscamos el tramite por id
    const response = await fetch(`${baseURL}/${id}`);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    getAllTramites();
  }, []);

  const contextValue = useMemo(
    () => ({
      allTramites,
      getTramiteById,
      getAllTramites,
      loading,
      valueSearch,
      onInputChange,
      onResetForm,
    }),
    [allTramites, loading, valueSearch, onInputChange, onResetForm]
  );

  return (
    <TramitesContext.Provider value={contextValue}>
      {children}
    </TramitesContext.Provider>
  );
};
