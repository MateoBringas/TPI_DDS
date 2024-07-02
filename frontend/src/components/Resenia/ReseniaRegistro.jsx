import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function ReseniaRegistro({
                                            AccionABMC,
                                            Item,
                                            setItem,
                                            Grabar,
                                            Volver,
                                            Enologos,
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
    const title = isEditing ? "Editar Reseña" : "Agregar Nueva Reseña";

    useEffect(() => {
        reset(Item);
    }, [Item, reset]);

    const onSubmit = (data) => {
        if (new Date(data.fecha) > new Date()) {
            alert("La fecha no puede ser futura.");
        } else {
            Grabar(data);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container-fluid">
                <h2 className="text-center">{title}</h2>
                <fieldset disabled={AccionABMC === "C"}>
                    {/* Campo de puntuación */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="puntuacion">
                                Puntuación<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="number"
                                name="puntuacion"
                                className="form-input"
                                {...register("puntuacion", {
                                    required: "Puntuación es requerida",
                                    min: {
                                        value: 1,
                                        message: "La puntuación mínima es 1",
                                    },
                                    max: {
                                        value: 5,
                                        message: "La puntuación máxima es 5",
                                    },
                                })}
                                onChange={(e) => setItem({ ...Item, puntuacion: parseInt(e.target.value, 10) })}
                            />
                            {errors.puntuacion && (
                                <div className="text-danger">{errors.puntuacion.message}</div>
                            )}
                        </div>
                    </div>

                    {/* Campo de comentario */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="comentario">
                                Comentario<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
              <textarea
                  name="comentario"
                  className="form-input"
                  {...register("comentario", { required: "Comentario es requerido" })}
                  onChange={(e) => setItem({ ...Item, comentario: e.target.value })}
                  rows="4"
              />
                            {errors.comentario && (
                                <div className="text-danger">{errors.comentario.message}</div>
                            )}
                        </div>
                    </div>

                    {/* Campo de fecha */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="fecha">
                                Fecha<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="date"
                                name="fecha"
                                className="form-input"
                                {...register("fecha", {
                                    required: "Fecha es requerida",
                                    validate: value => new Date(value) < new Date() || "La fecha debe ser menor a la fecha actual" // Puedes ajustar la validación según sea necesario
                                })}
                                onChange={(e) => setItem({...Item, fecha: e.target.value})}
                            />
                            {errors.fecha && (
                                <div className="text-danger">{errors.fecha.message}</div>
                            )}
                        </div>
                    </div>

                    {/* Campo de selección de enólogo */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="enologoId">
                                Enólogo<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <select
                                name="enologoId"
                                className="form-input"
                                {...register("EnologoId", {required: "Enólogo es requerido"})}
                                onChange={(e) => setItem({...Item, EnologoId: parseInt(e.target.value, 10)})}
                            >
                                <option value="">Seleccionar Enólogo</option>
                                {Enologos.map((enologo) => (
                                    <option key={enologo.id} value={enologo.id}>
                                        {enologo.nombre} {enologo.apellido}
                                    </option>
                                ))}
                            </select>
                            {errors.EnologoId && (
                                <div className="text-danger">{errors.EnologoId.message}</div>
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