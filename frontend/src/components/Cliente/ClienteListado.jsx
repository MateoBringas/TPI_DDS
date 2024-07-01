import React from 'react';

const ClienteListado = ({ clientes, onEdit, onDelete }) => {
  return (
    <div className='container table-container'>
      <h3>Listado de Clientes</h3>
      <table className='table'>
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
          {clientes.length > 0 ? (
            clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.apellido}</td>
                <td>{new Date(cliente.fechaRegistro).toLocaleDateString()}</td>
                <td>
                  <button className="edit-button" onClick={() => onEdit(cliente)}>Editar</button>
                  <button className="delete-button" onClick={() => onDelete(cliente.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='5'>No se encontraron clientes</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClienteListado;
