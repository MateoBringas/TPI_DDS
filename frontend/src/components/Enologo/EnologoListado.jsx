import React from 'react';

<<<<<<< HEAD
export default function EnologoListado({ Items, Modificar, Eliminar }) {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th className="text-center">Nombre</th>
            <th className="text-center">Apellido</th>
            <th className="text-center">Fecha de Nacimiento</th>
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.id}>
                <td className="text-center">{Item.nombre}</td>
                <td className="text-center">{Item.apellido}</td>
                <td className="text-center">{Item.fechaNacimiento}</td>
                <td className="text-center text-nowrap">
                  <button
                    className="edit-button"
                    title="Modificar"
                    onClick={() => Modificar(Item.id)}
                  >
                    <i className="fa fa-pencil"></i> Modificar
                  </button>
                  <button
                    className="delete-button"
                    title="Eliminar"
                    onClick={() => Eliminar(Item.id)}
                  >
                    <i className="fa fa-times"></i> Eliminar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
=======
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
>>>>>>> 23c7e78dbd026338efcee18c48591bc29709527f
