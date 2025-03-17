import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

const CrudFormModal = ({
  isOpen,
  onClose,
  isEditing,
  fields,
  currentItem,
  onSubmit,
  cascadingFilters = {},
  conditionalFields = {},
}) => {
  const [selectedValues, setSelectedValues] = useState({});
  const [filteredOptions, setFilteredOptions] = useState({});
  const [visibleFields, setVisibleFields] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const getDefaultValue = (fieldName) => {
    const fieldNames = fieldName.split(".");
    let value = currentItem;

    fieldNames.forEach((name) => {
      value = value ? value[name] : "";
    });

    return value || "";
  };

  // Memoize the cascadingFilters and conditionalFields to avoid unnecessary re-renders
  const memoizedCascadingFilters = useMemo(() => cascadingFilters, [cascadingFilters]);
  const memoizedConditionalFields = useMemo(() => conditionalFields, [conditionalFields]);

  useEffect(() => {
    const newFilteredOptions = { ...filteredOptions };

    Object.entries(memoizedCascadingFilters).forEach(([targetField, sourceField]) => {
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

    // Only update state if the filtered options have changed
    if (JSON.stringify(newFilteredOptions) !== JSON.stringify(filteredOptions)) {
      setFilteredOptions(newFilteredOptions);
    }
  }, [selectedValues, memoizedCascadingFilters, fields, filteredOptions]);

  useEffect(() => {
    const newVisibleFields = { ...visibleFields };

    Object.entries(memoizedConditionalFields).forEach(([targetField, condition]) => {
      const sourceValue = selectedValues[condition.sourceField];
      newVisibleFields[targetField] = condition.values.includes(sourceValue);
    });

    // Only update state if the visible fields have changed
    if (JSON.stringify(newVisibleFields) !== JSON.stringify(visibleFields)) {
      setVisibleFields(newVisibleFields);
    }
  }, [selectedValues, memoizedConditionalFields, visibleFields]);

  useEffect(() => {
    if (isEditing && currentItem) {
      const newSelectedValues = {};
      fields.forEach((field) => {
        newSelectedValues[field.name] = getDefaultValue(field.name);
      });
      setSelectedValues(newSelectedValues);
    }
  }, [isEditing, currentItem, fields]);

  const handleChange = (fieldName, value) => {
    setSelectedValues((prev) => ({ ...prev, [fieldName]: value }));

    // Actualizar los campos hijos cuando cambia el campo padre
    const dependentFields = Object.keys(memoizedCascadingFilters).filter(
      (targetField) => memoizedCascadingFilters[targetField] === fieldName
    );

    dependentFields.forEach((dependentField) => {
      const dependentFieldConfig = fields.find((field) => field.name === dependentField);
      if (dependentFieldConfig) {
        const newOptions = dependentFieldConfig.options.filter(
          (option) => option[fieldName] === value
        );
        setFilteredOptions((prev) => ({ ...prev, [dependentField]: newOptions }));
      }
    });
  };

  return (
    <dialog id="crud-modal" className="modal sm:modal-middle" open={isOpen}>
      <div className="modal-box">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isEditing ? "Editar Registro" : "Crear Nuevo Registro"}
        </h2>
        <form onSubmit={onSubmit}>
          {fields.map((field) => {
            const { editable = true } = field;
            if (conditionalFields[field.name] && !visibleFields[field.name]) {
              return null;
            }

            // Ocultar el campo si no es editable y estamos en modo de edición
            if (!editable && isEditing) {
              return null;
            }

            return (
              <div key={field.name} className="mb-4 relative">
                <label
                  htmlFor={field.name}
                  className="block text-gray-700 font-medium mb-2"
                >
                  {field.label}
                </label>
                {(() => {
                  if (field.type === "select") {
                    return (
                      <select
                        id={field.name}
                        name={field.name}
                        value={selectedValues[field.name] || getDefaultValue(field.name)}
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
                    );
                  } else if (field.type === "password") {
                    return (
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          id={field.name}
                          name={field.name}
                          defaultValue={getDefaultValue(field.name)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required={field.required}
                          onChange={(e) => handleChange(field.name, e.target.value)}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    );
                  } else {
                    return (
                      <input
                        type={field.type || "text"}
                        id={field.name}
                        name={field.name}
                        defaultValue={getDefaultValue(field.name)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required={field.required}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                      />
                    );
                  }
                })()}
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
      editable: PropTypes.bool,
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
  cascadingFilters: PropTypes.object,
  conditionalFields: PropTypes.object,
};

export default CrudFormModal;