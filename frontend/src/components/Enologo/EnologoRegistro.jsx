import React from "react";

export default function EnologoRegistro({
                                            AccionABMC,
                                            Item,
                                            setItem,
                                            Grabar,
                                            Volver,
                                        }) {
    if (!Item) return null;

    return (
        <form>
            <div className="container-fluid">
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
                                value={Item?.nombre}
                                autoFocus
                                className="form-input"
                                onChange={(e) => setItem({ ...Item, nombre: e.target.value })}
                            />
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
                                value={Item?.apellido}
                                className="form-input"
                                onChange={(e) => setItem({ ...Item, apellido: e.target.value })}
                            />
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
                                value={Item?.fechaNacimiento}
                                onChange={(e) => setItem({ ...Item, fechaNacimiento: e.target.value })}
                            />
                        </div>
                    </div>
                </fieldset>

                {/* Botones Grabar, Cancelar/Volver */}
                <hr />
                <div className="row justify-content-center">
                    <div className="col text-center">
                        {AccionABMC !== "C" && (
                            <button
                                type="submit"
                                className="form-button"
                                onClick={(e) => { e.preventDefault(); Grabar(Item); }}
                            >
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