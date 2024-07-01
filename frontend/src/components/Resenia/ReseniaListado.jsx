import React from 'react';

const ReseniaListado = ({ resenias, onEdit, onDelete, enologos }) => {
    return (
        <div className='container table-container'>
            <h3>Listado de Reseñas</h3>
            <table className='table'>
                <thead>
                <tr>
                    <th>Puntuación</th>
                    <th>Comentario</th>
                    <th>Fecha</th>
                    <th>Enólogo</th> {/* Cambiado de "ID Enólogo" a "Enólogo" */}
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {resenias.length > 0 ? (
                    resenias.map((resenia) => {
                        const enologo = enologos.find(enologo => enologo.id === resenia.EnologoId);
                        return (
                            <tr key={resenia.id}>
                                <td>{resenia.puntuacion}</td>
                                <td>{resenia.comentario}</td>
                                <td>{new Date(resenia.fecha).toLocaleDateString()}</td>
                                <td>{enologo ? `${enologo.nombre} ${enologo.apellido}` : 'Enólogo no encontrado'}</td>
                                <td>
                                    <button className="edit-button" onClick={() => onEdit(resenia)}>Editar</button>
                                    <button className="delete-button" onClick={() => onDelete(resenia.id)}>Eliminar</button>
                                </td>
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td colSpan='6'>No se encontraron reseñas</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default ReseniaListado;