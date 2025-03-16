import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const CrudFormModal = ({
  isOpen,
  onClose,
  isEditing,
  fields,
  currentItem,
  onSubmit,
  cascadingFilters = {}, // Prop para filtrado en cascada
  conditionalFields = {}, // Prop para campos condicionales
}) => {
  const [selectedValues, setSelectedValues] = useState({}); // Estado para valores seleccionados
  const [filteredOptions, setFilteredOptions] = useState({}); // Estado para opciones filtradas
  const [visibleFields, setVisibleFields] = useState({}); // Estado para campos visibles

  // Obtener el valor por defecto de un campo
  const getDefaultValue = (fieldName) => {
    const fieldNames = fieldName.split(".");
    let value = currentItem;

    fieldNames.forEach((name) => {
      value = value ? value[name] : "";
    });

    return value || "";
  };

  // Efecto para aplicar filtros en cascada
  useEffect(() => {
    const newFilteredOptions = { ...filteredOptions };

    Object.entries(cascadingFilters).forEach(([targetField, sourceField]) => {
      const sourceValue = selectedValues[sourceField];
      if (sourceValue) {
        const targetFieldConfig = fields.find((field) => field.name === targetField);
        if (targetFieldConfig) {
          newFilteredOptions[targetField] = targetFieldConfig.options.filter(
            (option) => option[sourceField] === sourceValue
          );
        }
      } else {
        newFilteredOptions[targetField] = [];
      }
    });

    setFilteredOptions(newFilteredOptions);
  }, [selectedValues, cascadingFilters, fields]);

  // Efecto para manejar la visibilidad de campos condicionales
  useEffect(() => {
    const newVisibleFields = { ...visibleFields };

    Object.entries(conditionalFields).forEach(([targetField, condition]) => {
      const sourceValue = selectedValues[condition.sourceField];
      newVisibleFields[targetField] = condition.values.includes(sourceValue);
    });

    setVisibleFields(newVisibleFields);
  }, [selectedValues, conditionalFields]);

  // Manejar cambios en los campos
  const handleChange = (fieldName, value) => {
    setSelectedValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  return (
    <dialog id="crud-modal" className="modal sm:modal-middle" open={isOpen}>
      <div className="modal-box">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isEditing ? "Editar Registro" : "Crear Nuevo Registro"}
        </h2>
        <form onSubmit={onSubmit}>
          {fields.map((field) => {
            // Ocultar el campo si no es visible
            if (conditionalFields[field.name] && !visibleFields[field.name]) {
              return null;
            }

            return (
              <div key={field.name} className="mb-4">
                <label
                  htmlFor={field.name}
                  className="block text-gray-700 font-medium mb-2"
                >
                  {field.label}
                </label>
                {field.type === "select" ? (
                  <select
                    id={field.name}
                    name={field.name}
                    defaultValue={getDefaultValue(field.name)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={field.required}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                  >
                    <option value="">Seleccione una opción</option>
                    {(filteredOptions[field.name] || field.options || []).map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type || "text"}
                    id={field.name}
                    name={field.name}
                    defaultValue={getDefaultValue(field.name)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={field.required}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                  />
                )}
              </div>
            );
          })}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            {isEditing ? "Guardar Cambios" : "Crear Registro"}
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>Cerrar</button>
      </form>
    </dialog>
  );
};

CrudFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
      required: PropTypes.bool,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  currentItem: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  cascadingFilters: PropTypes.object, // Nueva prop para filtrado en cascada
  conditionalFields: PropTypes.object, // Nueva prop para campos condicionales
};

export default CrudFormModal;