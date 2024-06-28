import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "../Paginas.css";

const BodegaRegistro = ({ bodega, onSave }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      nombre: "",
      fechaInauguracion: "", // Asegúrate de que este campo esté inicializado correctamente
    },
  });

  useEffect(() => {
    if (bodega) {
      reset({
        id: bodega.id,
        nombre: bodega.nombre,
        fechaInauguracion: bodega.fechaInauguracion, // Asegúrate de que esta fecha esté siendo cargada correctamente
      });
    } else {
      reset({
        id: "",
        nombre: "",
        fechaInauguracion: "", // Asegúrate de que este campo esté inicializado correctamente
      });
    }
  }, [bodega, reset]);

  const onSubmit = (data) => {
    onSave(data); // Llama a la función onSave para guardar la bodega
  };

  return (
    <div className="container form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        {bodega && (
          <div className="form-input">
            <label>ID:</label>
            <input
              type="text"
              {...register("id")}
              readOnly
              className="form-input"
            />
          </div>
        )}
        <div className="form-input">
          <label>Nombre:</label>
          <input
            type="text"
            {...register("nombre", { required: true, maxLength: 30 })}
            className="form-input"
          />
          {errors.nombre && (
            <span>
              Este campo es requerido y debe tener máximo 30 caracteres.
            </span>
          )}
        </div>
        <div className="form-input">
          <label>Fecha Inauguración:</label>
          <input
            type="date"
            {...register("fechaInauguracion", { required: true })}
            className="form-input"
          />
          {errors.fechaInauguracion && <span>Este campo es requerido.</span>}
        </div>
        <button type="submit" className="form-button">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default BodegaRegistro;
