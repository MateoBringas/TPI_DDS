import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function BodegaRegistro({
  AccionABMC,
  Item,
  setItem,
  Grabar,
  Volver,
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
  const title = isEditing ? "Editar Bodega" : "Agregar Nueva Bodega";

  useEffect(() => {
    reset(Item);
  }, [Item, reset]);

  const onSubmit = (data) => {
    if (new Date(data.fechaInauguracion) >= new Date()) {
      alert(
        "La fecha de inauguración debe ser menor o igual a la fecha actual."
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

          {/* Campo Fecha de Inauguración */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="fechaInauguracion">
                Fecha de Inauguración<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                name="fechaInauguracion"
                className="form-input"
                {...register("fechaInauguracion", {
                  required: "Fecha de Inauguración es requerida",
                  validate: (value) =>
                    new Date(value) <= new Date() ||
                    "La fecha debe ser menor o igual a la fecha actual",
                })}
                onChange={(e) =>
                  setItem({ ...Item, fechaInauguracion: e.target.value })
                }
              />
              {errors.fechaInauguracion && (
                <div className="text-danger">
                  {errors.fechaInauguracion.message}
                </div>
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
