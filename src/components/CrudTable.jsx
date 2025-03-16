import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const CrudTable = ({
  title,
  fields,
  initialData,
  onSave,
  onDelete,
  onEdit,
  onCreate,
}) => {
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData); // Datos filtrados
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const itemsPerPage = 10;

  // Sincronizar `data` y `filteredData` con `initialData` cuando cambie
  useEffect(() => {
    setData(initialData);
    setFilteredData(initialData);
  }, [initialData]);

  // Filtrar datos en función del término de búsqueda
  useEffect(() => {
    if (searchTerm) {
      const filtered = data.filter((item) =>
        fields.some((field) => {
          const fieldNames = field.name.split(".");
          let value = item;
          fieldNames.forEach((name) => {
            value = value ? value[name] : "";
          });
          return value
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        })
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
    setCurrentPage(1); // Reiniciar la paginación al filtrar
  }, [searchTerm, data, fields]);

  // Calcular los índices de los elementos de la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Función para eliminar un registro
  const handleDelete = (id) => {
    onDelete(id);
    setData(data.filter((item) => item[fields[0].name.split(".")[0]] !== id));
    setFilteredData(
      filteredData.filter((item) => item[fields[0].name.split(".")[0]] !== id)
    );
    setShowDeleteModal(false);
  };

  // Función para abrir el modal de confirmación de eliminación
  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  // Función para cancelar la eliminación
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  // Función para generar los botones de paginación
  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const buttons = [];
    const maxButtons = 5;

    // Botón "Anterior"
    buttons.push(
      <button
        key="prev"
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="join-item btn bg-base-300"
      >
        «
      </button>
    );

    // Botones de página
    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => paginate(i)}
            className={`join-item btn bg-base-300 ${currentPage === i ? "btn-active" : ""}`}
          >
            {i}
          </button>
        );
      }
    } else {
      if (currentPage > 2) {
        buttons.push(
          <button
            key={1}
            onClick={() => paginate(1)}
            className={`join-item btn bg-base-300 ${currentPage === 1 ? "btn-active" : ""}`}
          >
            1
          </button>
        );
        if (currentPage > 3) {
          buttons.push(
            <button key="ellipsis-start" className="join-item btn bg-base-300 btn-disabled">
              ...
            </button>
          );
        }
      }

      // Botones alrededor de la página actual
      for (
        let i = Math.max(1, currentPage - 1);
        i <= Math.min(totalPages, currentPage + 1);
        i++
      ) {
        buttons.push(
          <button
            key={i}
            onClick={() => paginate(i)}
            className={`join-item btn ${currentPage === i ? "btn-active" : ""}`}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 1) {
        if (currentPage < totalPages - 2) {
          buttons.push(
            <button key="ellipsis-end" className="join-item btn btn-disabled">
              ...
            </button>
          );
        }
        buttons.push(
          <button
            key={totalPages}
            onClick={() => paginate(totalPages)}
            className={`join-item btn ${
              currentPage === totalPages ? "btn-active" : ""
            }`}
          >
            {totalPages}
          </button>
        );
      }
    }

    // Botón "Siguiente"
    buttons.push(
      <button
        key="next"
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="join-item btn"
      >
        »
      </button>
    );

    return buttons;
  };

  return (
    <div className="p-6">
      <button
        onClick={() => window.location.replace("/admin-panel")}
        className="bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 btn"
      >
        Volver al panel de control
      </button>

      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        {title}
      </h1>

      <button
        onClick={onCreate}
        className="bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 btn"
      >
        Nuevo
      </button>

      {/* Buscador */}
      <div className="mb-4 my-4 relative">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 input pr-4" // Added pr-10 for padding right
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>

      {onDelete && (
        <dialog id="delete-modal" className="modal" open={showDeleteModal}>
          <div className="modal-box">
            <h3 className="font-bold text-lg">¿Estás seguro?</h3>
            <p className="py-4">
              Esta acción eliminará el registro permanentemente. ¿Deseas
              continuar?
            </p>
            <div className="modal-action">
              <button
                onClick={() => handleDelete(deleteId)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300"
              >
                Confirmar
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        </dialog>
      )}

      <div className="h-90 overflow-x-auto rounded-box border border-base-content/15 bg-base-200 table-pin-rows">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              {fields.map((field) => (
                <th key={field.name}>{field.label}</th>
              ))}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item[fields[0].name.split(".")[0]]}>
                <th>{indexOfFirstItem + index + 1}</th>
                {fields.map((field) => {
                  const fieldNames = field.name.split(".");
                  let value = item;
                  fieldNames.forEach((name) => {
                    value = value ? value[name] : "";
                  });
                  return <td key={field.name}>{value}</td>;
                })}
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-300 btn"
                    >
                      Editar
                    </button>
                    {onDelete && (
                      <button
                        onClick={() =>
                          confirmDelete(item[fields[0].name.split(".")[0]])
                        }
                        className="bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 btn"
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-8">
        <div className="join">{renderPaginationButtons()}</div>
      </div>
    </div>
  );
};

CrudTable.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
      required: PropTypes.bool,
    })
  ).isRequired,
  initialData: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default CrudTable;
