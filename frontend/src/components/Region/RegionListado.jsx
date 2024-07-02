import React from 'react';

const RegionListado = ({ regiones, onEdit, onDelete }) => {
  console.log("llegue")
  return (
    <div className='container table-container'>
      <h3>Listado de Regiones</h3>
      <table className='table'>
        <thead>
          <tr>
            <th>Provincia</th>
            <th>Ciudad</th>
            <th>Fecha de Registro</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {regiones.length > 0 ? (
            regiones.map((region) => (
              <tr key={region.id}>
                <td>{region.provincia}</td>
                <td>{region.ciudad}</td>
                <td>{new Date(region.fechaRegistro).toLocaleDateString()}</td>
                <td>
                  <button className="edit-button" onClick={() => onEdit(region)}>Modificar</button>
                  <button className="delete-button" onClick={() => onDelete(region.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='5'>No se encontraron regiones</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RegionListado;
