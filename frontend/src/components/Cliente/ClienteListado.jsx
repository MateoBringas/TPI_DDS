import React from 'react';
import '../Paginas.css';

const ClienteListado = ({ clientes, onSelect, onDelete }) => {
    return (
        <div className="container table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Fecha de Registro</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.id}>
                            <td>{cliente.id}</td>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.apellido}</td>
                            <td>{new Date(cliente.fechaRegistro).toLocaleDateString()}</td>
                            <td>
                                <button className="edit-button" onClick={() => onSelect(cliente)}>Editar</button>
                                <button className="delete-button" onClick={() => onDelete(cliente.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClienteListado;
