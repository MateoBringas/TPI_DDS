import React from "react";

export default function ReseniaListado({
                                           Items = [],   // Establecer un valor predeterminado vacío
                                           Enologos = [], // Establecer un valor predeterminado vacío
                                           Modificar,
                                           Eliminar,
                                       }) {
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
                {Items.length > 0 ? (
                    Items.map((item) => {
                        const enologo = Enologos.find(enologo => enologo.id === item.EnologoId);
                        return (
                            <tr key={item.id}>
                                <td className="text-center">{item.puntuacion}</td>
                                <td className="text-center">{item.comentario}</td>
                                <td className="text-center">{item.fecha}</td>
                                <td className="text-center">
                                    {enologo ? `${enologo.nombre} ${enologo.apellido}` : "No disponible"}
                                </td>
                                <td className="text-center text-nowrap">
                                    <button
                                        className="edit-button"
                                        title="Modificar"
                                        onClick={() => Modificar(item.id)}
                                    >
                                        <i className="fa fa-pencil"></i> Modificar
                                    </button>
                                    <button
                                        className="delete-button"
                                        title="Eliminar"
                                        onClick={() => Eliminar(item.id)}
                                    >
                                        <i className="fa fa-times"></i> Eliminar
                                    </button>
                                </td>
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td colSpan="5" className="text-center">No hay reseñas disponibles.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}