import React from 'react';

const EnologoListado = ({ enologos, onEdit, onDelete }) => {
    return (
        <div className='container table-container'>
            <h3>Listado de Enólogos</h3>
            <table className='table'>
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Fecha de Nacimiento</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {enologos.length > 0 ? (
                    enologos.map((enologo) => (
                        <tr key={enologo.id}>
                            <td>{enologo.nombre}</td>
                            <td>{enologo.apellido}</td>
                            <td>{new Date(enologo.fechaNacimiento).toLocaleDateString()}</td>
                            <td>
                                <button className="edit-button" onClick={() => onEdit(enologo)}>Editar</button>
                                <button className="delete-button" onClick={() => onDelete(enologo.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan='5'>No se encontraron enólogos</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default EnologoListado;