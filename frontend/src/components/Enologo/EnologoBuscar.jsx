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
        <form name="FormBusqueda">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-4 col-md-2">
                        <label className="col-form-label">Nombre:</label>
                    </div>
                    <div className="col-sm-8 col-md-4">
                        <input
                            type="text"
                            className="form-input"
                            onChange={(e) => setNombre(e.target.value)}
                            value={Nombre}
                            maxLength="55"
                            autoFocus
                        />
                    </div>
                    <div className="col-sm-4 col-md-2">
                        <label className="col-form-label">Apellido:</label>
                    </div>
                    <div className="col-sm-8 col-md-4">
                        <input
                            type="text"
                            className="form-input"
                            onChange={(e) => setApellido(e.target.value)}
                            value={Apellido}
                            maxLength="55"
                            autoFocus
                        />
                    </div>
                </div>

                <hr />

                {/* Botones */}
                <div className="row">
                    <div className="col text-center">
                        <button
                            type="button"
                            className="form-button"
                            onClick={() => Buscar()}
                        >
                            <i className="fa fa-search"></i> Buscar
                        </button>
                        <button
                            type="button"
                            className="form-button"
                            onClick={() => Agregar()}
                        >
                            <i className="fa fa-plus"></i> Agregar
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}