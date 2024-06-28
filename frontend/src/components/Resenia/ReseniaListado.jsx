import React from 'react';
import '../Paginas.css';

const ReseniaListado = ({ resenias, onSelect, onDelete }) => {
    return (
        <div className="container table-container">
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Puntuación</th>
                    <th>Comentario</th>
                    <th>Enólogo</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {resenias.map(resenia => (
                    <tr key={resenia.id}>
                        <td>{resenia.id}</td>
                        <td>{resenia.puntuacion}</td>
                        <td>{resenia.comentario}</td>
                        <td>{resenia.EnologoId}</td>
                        <td>{new Date(resenia.fecha).toLocaleDateString()}</td>
                        <td>
                            <button className="edit-button" onClick={() => onSelect(resenia)}>Editar</button>
                            <button className="delete-button" onClick={() => onDelete(resenia.id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReseniaListado;