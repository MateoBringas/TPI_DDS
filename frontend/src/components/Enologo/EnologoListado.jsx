import React from 'react';

function EnologoListado({ items, onConsultar, onModificar, onEliminar }) {
    return (
        <table className="table">
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Fecha de Nacimiento</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {items.map(enologo => (
                <tr key={enologo.id}>
                    <td>{enologo.nombre}</td>
                    <td>{enologo.apellido}</td>
                    <td>{enologo.fechaNacimiento}</td>
                    <td>
                        <button className="edit-button" onClick={() => onModificar(enologo.id)}>Modificar</button>
                        <button className="delete-button" onClick={() => onEliminar(enologo.id)}>Eliminar</button>
                        <button className="form-button" onClick={() => onConsultar(enologo.id)}>Consultar</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default EnologoListado;
