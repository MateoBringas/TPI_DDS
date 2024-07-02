import React from "react";

export default function ReseniaListado({ Items, Modificar, Eliminar, Enologos = [] }) {
    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                <tr>
                    <th className="text-center">Puntuación</th>
                    <th className="text-center">Comentario</th>
                    <th className="text-center">Fecha</th>
                    <th className="text-center">Enólogo</th>
                    <th className="text-center text-nowrap">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {Items &&
                    Items.map((Item) => (
                        <tr key={Item.id}>
                            <td className="text-center">{Item.puntuacion}</td>
                            <td className="text-center">{Item.comentario}</td>
                            <td className="text-center">{Item.fecha}</td>
                            <td className="text-center">
                                {
                                    (Enologos && Array.isArray(Enologos)
                                        ? Enologos.find((enologo) => enologo.id === Item.EnologoId)?.nombre
                                        + " " + Enologos.find((enologo) => enologo.id === Item.EnologoId)?.apellido
                                        : "Desconocido") || "Desconocido"
                                }
                            </td>
                            <td className="text-center text-nowrap">
                                <button
                                    className="edit-button"
                                    title="Modificar"
                                    onClick={() => Modificar(Item.id)}
                                >
                                    <i className="fa fa-pencil"></i> Modificar
                                </button>
                                <button
                                    className="delete-button"
                                    title="Eliminar"
                                    onClick={() => Eliminar(Item.id)}
                                >
                                    <i className="fa fa-times"></i> Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}