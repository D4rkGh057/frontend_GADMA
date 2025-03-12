import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { DireccionesContext } from "./DireccionesContext";

export const DireccionesProvider = ({ children }) => {
    const [allDirecciones, setAllDirecciones] = useState([]);
    const [loading, setLoading] = useState(true);

    DireccionesProvider.propTypes = {
        children: PropTypes.node.isRequired,
    };

    const getAllDirecciones = async () => {
        const baseURL = "http://localhost:5000/ctram-direccion";
        const response = await fetch(`${baseURL}`);
        const data = await response.json();
        setAllDirecciones(data);
        setLoading(false);
    };

    useEffect(() => {
        getAllDirecciones();
    }, []);

    const contextValue = useMemo(
        () => ({
            allDirecciones,
            getAllDirecciones,
            loading,
        }),
        [allDirecciones, loading]
    );

    return (
        <DireccionesContext.Provider value={contextValue}>
            {children}
        </DireccionesContext.Provider>
    );
}