import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setValues(initialState);
  };

  return {
    ...values,
    onInputChange,
    onResetForm,
  };
};
