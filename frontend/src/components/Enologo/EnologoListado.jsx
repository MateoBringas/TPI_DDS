import React from "react";

export default function EnologoListado({
                                           Items,
                                           Modificar,
                                           Eliminar,
                                       }) {
    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                <tr>
                    <th className="text-center">Nombre</th>
                    <th className="text-center">Apellido</th>
                    <th className="text-center">Fecha de Nacimiento</th>
                    <th className="text-center text-nowrap">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {Items &&
                    Items.map((Item) => (
                        <tr key={Item.id}>
                            <td className="text-center">{Item.nombre}</td>
                            <td className="text-center">{Item.apellido}</td>
                            <td className="text-center">{Item.fechaNacimiento}</td>
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