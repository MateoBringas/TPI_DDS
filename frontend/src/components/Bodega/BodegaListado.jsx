import React from "react";
import "../Paginas.css";

const BodegaListado = ({ bodegas, onSelect, onDelete }) => {
  // Verifica si bodegas es undefined o null, y renderiza en consecuencia
  if (!bodegas || bodegas.length === 0) {
    return (
      <div className="container table-container">
        No hay bodegas para mostrar.
      </div>
    );
  }

  return (
    <div className="container table-container">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Fecha Inauguración</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {bodegas.map((bodega) => (
            <tr key={bodega.id}>
              <td>{bodega.id}</td>
              <td>{bodega.nombre}</td>
              <td>{new Date(bodega.fechaInauguracion).toLocaleDateString()}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => onSelect(bodega)}
                >
                  Editar
                </button>
                <button
                  className="delete-button"
                  onClick={() => onDelete(bodega.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BodegaListado;
