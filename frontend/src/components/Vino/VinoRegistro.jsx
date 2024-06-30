import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "../Paginas.css";

const VinoRegistro = ({ vino, onSave, bodegas }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: vino ? vino.id : "",
      nombre: vino ? vino.nombre : "",
      anejamiento: vino ? vino.anejamiento : "",
      BodegaId: vino && vino.Bodega ? vino.Bodega.id : "",
    },
  });

  useEffect(() => {
    if (vino) {
      reset({
        id: vino.id,
        nombre: vino.nombre,
        anejamiento: vino.anejamiento,
        BodegaId: vino.Bodega ? vino.Bodega.id : "",
      });
    } else {
      reset({
        id: "",
        nombre: "",
        anejamiento: "",
        BodegaId: "",
      });
    }
  }, [vino, reset]);

  const onSubmit = (data) => {
    onSave(data); // Llama a la función onSave para guardar el vino
  };

  return (
    <div className="container form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        {vino && (
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
            {...register("nombre", { required: true, maxLength: 50 })}
            className="form-input"
          />
          {errors.nombre && (
            <span>
              Este campo es requerido y debe tener máximo 50 caracteres.
            </span>
          )}
        </div>
        <div className="form-input">
          <label>Añejamiento:</label>
          <input
            type="date"
            {...register("anejamiento", { required: true })}
            className="form-input"
          />
          {errors.anejamiento && <span>Este campo es requerido.</span>}
        </div>
        <div className="form-input">
          <label>Bodega:</label>
          <select
            {...register("BodegaId", { required: true })}
            className="form-input"
          >
            <option value="">Seleccionar Bodega</option>
            {bodegas.map((bodega) => (
              <option key={bodega.id} value={bodega.id}>
                {bodega.nombre}
              </option>
            ))}
          </select>
          {errors.BodegaId && <span>Debe seleccionar una bodega.</span>}
        </div>
        <button type="submit" className="form-button">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default VinoRegistro;
