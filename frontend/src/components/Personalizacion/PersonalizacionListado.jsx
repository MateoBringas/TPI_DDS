import React from 'react';

const PersonalizacionListado = ({ personalizaciones, onEdit, onDelete, regiones }) => {
  return (
    <div className='container table-container'>
      <h3>Listado de Personalizaciones</h3>
      <table className='table'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Fecha de Creacion</th>
            <th>Disponible en:</th> {/* Cambiado de "ID Region" a "Region" */}
            <th>Productos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {personalizaciones.length > 0 ? (
            personalizaciones.map((personalizacion) => {
              const region = regiones.find(region => region.id === personalizacion.RegionId);
              return (
                <tr key={personalizacion.id}>
                  <td>{personalizacion.nombre}</td>
                  <td>{new Date(personalizacion.fechaCreacion).toLocaleDateString()}</td>
                  <td>{region ? `${region.provincia} ${region.ciudad}` : 'Region no encontrado'}</td>
                  <td>{personalizacion.productos}</td>
                  <td>
                    <button className="edit-button" onClick={() => onEdit(personalizacion)}>Modificar</button>
                    <button className="delete-button" onClick={() => onDelete(personalizacion.id)}>Eliminar</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan='5'>No se encontraron personalizaciones</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PersonalizacionListado;
