import React from 'react';
import '../Paginas.css';

const PedidoListado = ({ pedidos, onSelect, onDelete }) => {
    return (
        <div className="container table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha de Pedido</th>
                        <th>Cliente ID</th>
                        <th>Comentarios</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map(pedido => (
                        <tr key={pedido.id}>
                            <td>{pedido.id}</td>
                            <td>{new Date(pedido.fechaPedido).toLocaleDateString()}</td>
                            <td>{pedido.ClienteId}</td>
                            <td>{pedido.comentarios ? pedido.comentarios : 'Sin comentarios'}</td>
                            <td>
                                <button className="edit-button" onClick={() => onSelect(pedido)}>Editar</button>
                                <button className="delete-button" onClick={() => onDelete(pedido.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PedidoListado;