// context/InformacionProvider.js
import { useEffect, useMemo, useState } from "react";
import { useForm } from "../hooks/useForm";
import { InformacionContext } from "./InformacionContext";
import PropTypes from "prop-types";
import {
  getAllInformacion,
  getInformacionByTramite,
  getInformacionById,
} from "../services/informacionServices";

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

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllInformacion();
      setAllInformacion(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const contextValue = useMemo(
    () => ({
      allInformacion,
      getInformacionByTramite,
      getInformacionById,
      getAllInformacion: async () => {
        const data = await getAllInformacion();
        setAllInformacion(data);
      },
      loading,
      valueSearch,
      onInputChange,
      onResetForm,
    }),
    [allInformacion, loading, valueSearch, onInputChange, onResetForm]
  );

  return (
    <InformacionContext.Provider value={contextValue}>
      {children}
    </InformacionContext.Provider>
  );
};