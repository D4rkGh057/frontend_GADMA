import { useEffect, useMemo, useState } from "react";
import { useForm } from "../hooks/useForm";
import { TramitesContext } from "./TramitesContext";
import PropTypes from "prop-types";
import { getAllTramites, getTramitesByDirection, getTramiteById } from "../services/tramitesServices";

export const TramitesProvider = ({ children }) => {
  const [allTramites, setAllTramites] = useState([]);
  const [loading, setLoading] = useState(true);

  const { valueSearch, onInputChange, onResetForm } = useForm({
    valueSearch: "",
  });

  TramitesProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  useEffect(() => {
    getAllTramites().then(data => {
      setAllTramites(data);
      setLoading(false);
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      allTramites,
      getTramitesByDirection,
      getTramiteById,
      loading,
      valueSearch: valueSearch || "",
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