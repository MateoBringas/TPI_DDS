import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function VinoRegistro({
  AccionABMC,
  Item,
  setItem,
  Grabar,
  Volver,
  Bodegas,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: Item,
  });

  const isEditing = AccionABMC === "M";
  const title = isEditing ? "Editar Vino" : "Agregar Nuevo Vino";

  useEffect(() => {
    reset(Item);
  }, [Item, reset]);

  const onSubmit = (data) => {
    if (new Date(data.anejamiento) >= new Date()) {
      alert(
        "La fecha de anejamiento debe ser menor o igual a la fecha actual."
      );
    } else {
      Grabar(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">
        <h2 className="text-center">{title}</h2>
        <fieldset disabled={AccionABMC === "C"}>
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="nombre">
                Nombre<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                name="nombre"
                className="form-input"
                {...register("nombre", { required: "Nombre es requerido" })}
                onChange={(e) => setItem({ ...Item, nombre: e.target.value })}
              />
              {errors.nombre && (
                <div className="text-danger">{errors.nombre.message}</div>
              )}
            </div>
          </div>

          {/* Campo de anejamiento */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="anejamiento">
                Fecha de anejamiento<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                name="anejamiento"
                className="form-input"
                {...register("anejamiento", {
                  required: "Fecha de anejamiento es requerida",
                  validate: (value) =>
                    new Date(value) <= new Date() ||
                    "La fecha debe ser menor o igual a la fecha actual",
                })}
                onChange={(e) =>
                  setItem({ ...Item, anejamiento: e.target.value })
                }
              />
              {errors.anejamiento && (
                <div className="text-danger">{errors.anejamiento.message}</div>
              )}
            </div>
          </div>

          {/* Campo de selección de Bodega */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="bodegaId">
                Bodega<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                name="bodegaId"
                className="form-input"
                {...register("BodegaId", { required: "Bodega es requerida" })}
                onChange={(e) =>
                  setItem({ ...Item, BodegaId: parseInt(e.target.value) })
                }
              >
                <option value="">Seleccionar Bodega</option>
                {Bodegas.map((bodega) => (
                  <option key={bodega.id} value={bodega.id}>
                    {bodega.nombre}
                  </option>
                ))}
              </select>
              {errors.BodegaId && (
                <div className="text-danger">{errors.BodegaId.message}</div>
              )}
            </div>
          </div>
        </fieldset>

        {/* Botones Grabar, Cancelar/Volver */}
        <hr />
        <div className="row justify-content-center">
          <div className="col text-center">
            {AccionABMC !== "C" && (
              <button type="submit" className="form-button">
                <i className="fa fa-check"></i> Grabar
              </button>
            )}
            <button type="button" className="form-button" onClick={Volver}>
              <i className="fa fa-undo"></i>
              {AccionABMC === "C" ? " Volver" : " Cancelar"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
