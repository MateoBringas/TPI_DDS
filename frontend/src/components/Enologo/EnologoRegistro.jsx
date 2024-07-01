import React, {useEffect} from "react";
import { useForm } from "react-hook-form";

export default function EnologoRegistro({
                                            AccionABMC,
                                            Item,
                                            setItem,
                                            Grabar,
                                            Volver,
                                        }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: Item,
    });

    const isEditing = AccionABMC === "M";
    const title = isEditing ? "Editar Enólogo" : "Agregar Nuevo Enólogo";

    useEffect(() => {
        reset(Item);
    },[reset, Item]);

    const onSubmit = (data) => {
        if (new Date(data.fechaNacimiento) >= new Date()) {
            alert("La fecha de nacimiento debe ser menor a la fecha actual.");
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
                            {errors.nombre && <div className="text-danger">{errors.nombre.message}</div>}
                        </div>
                    </div>

                    {/* campo Apellido */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="apellido">
                                Apellido<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="text"
                                name="apellido"
                                className="form-input"
                                {...register("apellido", { required: "Apellido es requerido" })}
                                onChange={(e) => setItem({ ...Item, apellido: e.target.value })}
                            />
                            {errors.apellido && <div className="text-danger">{errors.apellido.message}</div>}
                        </div>
                    </div>

                    {/* campo Fecha de Nacimiento */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label className="col-form-label" htmlFor="fechaNacimiento">
                                Fecha de Nacimiento<span className="text-danger">*</span>:
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input
                                type="date"
                                name="fechaNacimiento"
                                className="form-input"
                                {...register("fechaNacimiento", {
                                    required: "Fecha de Nacimiento es requerida",
                                    validate: value => new Date(value) < new Date() || "La fecha debe ser menor a la fecha actual"
                                })}
                                onChange={(e) => setItem({ ...Item, fechaNacimiento: e.target.value })}
                            />
                            {errors.fechaNacimiento && <div className="text-danger">{errors.fechaNacimiento.message}</div>}
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
