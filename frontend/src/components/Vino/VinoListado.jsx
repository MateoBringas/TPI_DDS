import React from "react";
import "../Paginas.css";

const VinoListado = ({ vinos, onSelect, onDelete }) => {
  // Verifica si vinos es undefined o null, y renderiza en consecuencia
  if (!vinos || vinos.length === 0) {
    return (
      <div className="container table-container">
        No hay vinos para mostrar.
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
            <th>Añejamiento</th>
            <th>Bodega</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vinos.map((vino) => (
            <tr key={vino.id}>
              <td>{vino.id}</td>
              <td>{vino.nombre}</td>
              <td>{new Date(vino.anejamiento).toLocaleDateString()}</td>
              <td>{vino.Bodega ? vino.Bodega.id : "Sin bodega"}</td>
              <td>
                <button className="edit-button" onClick={() => onSelect(vino)}>
                  Editar
                </button>
                <button
                  className="delete-button"
                  onClick={() => onDelete(vino.id)}
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

export default VinoListado;
