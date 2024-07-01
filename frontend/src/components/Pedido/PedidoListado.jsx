import React from 'react';

const PedidoListado = ({ pedidos, onEdit, onDelete, clientes }) => {
  return (
    <div className='container table-container'>
      <h3>Listado de Pedidos</h3>
      <table className='table'>
        <thead>
          <tr>
            <th>Fecha de Pedido</th>
            <th>Cliente</th> {/* Cambiado de "ID Cliente" a "Cliente" */}
            <th>Comentarios</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.length > 0 ? (
            pedidos.map((pedido) => {
              const cliente = clientes.find(cliente => cliente.id === pedido.ClienteId);
              return (
                <tr key={pedido.id}>
                  <td>{new Date(pedido.fechaPedido).toLocaleDateString()}</td>
                  <td>{cliente ? `${cliente.nombre} ${cliente.apellido}` : 'Cliente no encontrado'}</td>
                  <td>{pedido.comentarios}</td>
                  <td>
                    <button className="edit-button" onClick={() => onEdit(pedido)}>Editar</button>
                    <button className="delete-button" onClick={() => onDelete(pedido.id)}>Eliminar</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan='5'>No se encontraron pedidos</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PedidoListado;
