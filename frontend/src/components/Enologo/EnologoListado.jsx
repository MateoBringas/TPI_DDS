import React from 'react';
import '../Paginas.css';

const EnologoListado = ({ enologos, onSelect, onDelete }) => {
    return (
        <div className="container table-container">
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Fecha de Nacimiento</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {enologos.map(enologo => (
                    <tr key={enologo.id}>
                        <td>{enologo.id}</td>
                        <td>{enologo.nombre}</td>
                        <td>{enologo.apellido}</td>
                        <td>{new Date(enologo.fechaNacimiento).toLocaleDateString()}</td>
                        <td>
                            <button className="edit-button" onClick={() => onSelect(enologo)}>Editar</button>
                            <button className="delete-button" onClick={() => onDelete(enologo.id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default EnologoListado;