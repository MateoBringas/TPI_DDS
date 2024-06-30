import React from "react";

export default function ReseniaBuscar({
                                          Puntuacion,
                                          setPuntuacion,
                                          Comentario,
                                          setComentario,
                                          Buscar,
                                          Agregar
                                      }) {
    return (
        <form name="FormBusqueda" className="search-container">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6">
                        <label className="col-form-label" htmlFor="puntuacion">
                            Puntuación:
                        </label>
                        <input
                            type="number"
                            className="form-control search-input"
                            id="puntuacion"
                            onChange={(e) => setPuntuacion(e.target.value)}
                            value={Puntuacion}
                            min="1"
                            max="5"
                        />
                    </div>
                    <div className="col-sm-6">
                        <label className="col-form-label" htmlFor="comentario">
                            Comentario:
                        </label>
                        <input
                            type="text"
                            className="form-control search-input"
                            id="comentario"
                            onChange={(e) => setComentario(e.target.value)}
                            value={Comentario}
                            maxLength="255"
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
