// context/DireccionesProvider.js
import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { DireccionesContext } from "./DireccionesContext";
import { getAllDirecciones } from "../services/direccionesServices";

export const DireccionesProvider = ({ children }) => {
  const [allDirecciones, setAllDirecciones] = useState([]);
  const [loading, setLoading] = useState(true);

  DireccionesProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllDirecciones();
      setAllDirecciones(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const contextValue = useMemo(
    () => ({
      allDirecciones,
      getAllDirecciones: async () => {
        const data = await getAllDirecciones();
        setAllDirecciones(data);
      },
      loading,
    }),
    [allDirecciones, loading]
  );

  return (
    <DireccionesContext.Provider value={contextValue}>
      {children}
    </DireccionesContext.Provider>
  );
};