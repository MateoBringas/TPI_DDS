import React from "react";

export default function EnologoBuscar({
                                          Nombre,
                                          setNombre,
                                          Apellido,
                                          setApellido,
                                          Buscar,
                                          Agregar
                                      }) {
    return (
        <form name="FormBusqueda" className="search-container">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6">
                        <label className="col-form-label" htmlFor="nombre">
                            Nombre:
                        </label>
                        <input
                            type="text"
                            className="form-control search-input"
                            id="nombre"
                            onChange={(e) => setNombre(e.target.value)}
                            value={Nombre}
                            maxLength="55"
                            autoFocus
                        />
                    </div>
                    <div className="col-sm-6">
                        <label className="col-form-label" htmlFor="apellido">
                            Apellido:
                        </label>
                        <input
                            type="text"
                            className="form-control search-input"
                            id="apellido"
                            onChange={(e) => setApellido(e.target.value)}
                            value={Apellido}
                            maxLength="55"
                        />
                    </div>
                </div>

                <hr />

                {/* Botones */}
                <div className="row">
                    <div className="col text-center botones">
                        <button
                            type="button"
                            className="btn btn-primary form-button"
                            onClick={Buscar}
                        >
                            <i className="fa fa-search"> </i> Buscar
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary form-button"
                            onClick={Agregar}
                        >
                            <i className="fa fa-plus"> </i> Agregar
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}