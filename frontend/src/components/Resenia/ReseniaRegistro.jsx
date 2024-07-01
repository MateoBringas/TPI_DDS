import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function ReseniaRegistro({
                                            AccionABMC,
                                            Item,
                                            setItem,
                                            Grabar,
                                            Volver,
                                            Enologos = [] // Asegúrate de que Enologos siempre sea una lista
                                        }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: Item,
    });

    useEffect(() => {
        reset(Item);
    }, [Item, reset]);

    const isEditing = AccionABMC === "M";
    const title = isEditing ? "Editar Reseña" : "Agregar Nueva Reseña";

    const onSubmit = (data) => {
        if (new Date(data.fecha) > new Date()) {
            alert("La fecha debe ser menor o igual a la fecha actual.");
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
                            <label className="col-form-label" htmlFor="puntuacion">
                                Puntuación<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="number"
                                name="puntuacion"
                                className="form-input"
                                {...register("puntuacion", { required: "Puntuación es requerida", min: 1, max: 5 })}
                                onChange={(e) => setItem({ ...Item, puntuacion: e.target.value })}
                            />
                            {errors.puntuacion && <div className="text-danger">{errors.puntuacion.message}</div>}
                        </div>
                    </div>

                    {/* campo Comentario */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="comentario">
                                Comentario<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="text"
                                name="comentario"
                                className="form-input"
                                {...register("comentario", { required: "Comentario es requerido" })}
                                onChange={(e) => setItem({ ...Item, comentario: e.target.value })}
                            />
                            {errors.comentario && <div className="text-danger">{errors.comentario.message}</div>}
                        </div>
                    </div>

                    {/* campo Fecha */}
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
                                    validate: value => new Date(value) <= new Date() || "La fecha debe ser menor o igual a la fecha actual"
                                })}
                                onChange={(e) => setItem({ ...Item, fecha: e.target.value })}
                            />
                            {errors.fecha && <div className="text-danger">{errors.fecha.message}</div>}
                        </div>
                    </div>

                    {/* campo Enólogo */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="enologo">
                                Enólogo<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <select
                                name="enologo"
                                className="form-select"
                                {...register("EnologoId", { required: "Enólogo es requerido" })}
                                onChange={(e) => setItem({ ...Item, EnologoId: parseInt(e.target.value) })}
                                value={Item?.EnologoId || ''}
                            >
                                <option value="">Seleccione un enólogo</option>
                                {Enologos.map(enologo => (
                                    <option key={enologo.id} value={enologo.id}>
                                        {enologo.nombre} {enologo.apellido}
                                    </option>
                                ))}
                            </select>
                            {errors.EnologoId && <div className="text-danger">{errors.EnologoId.message}</div>}
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
                        <button
                            type="button"
                            className="form-button"
                            onClick={Volver}
                        >
                            <i className="fa fa-undo"></i>
                            {AccionABMC === "C" ? " Volver" : " Cancelar"}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}