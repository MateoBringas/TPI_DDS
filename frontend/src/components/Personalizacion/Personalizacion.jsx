import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import PersonalizacionListado from './PersonalizacionListado';
import PersonalizacionRegistro from './PersonalizacionRegistro';
import { personalizacionService } from '../../services/Personalizacion.service';
import { regionService } from '../../services/Region.service';

const Personalizacion = () => {
  const { register, handleSubmit } = useForm();
  const [personalizaciones, setPersonalizaciones] = useState([]);
  const [regiones, setRegiones] = useState([]);
  const [editingPersonalizacion, setEditingPersonalizacion] = useState(null);
  const [showRegistro, setShowRegistro] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const buscarPersonalizaciones = async (productos) => {
    console.log(productos);
    setPersonalizaciones(await personalizacionService.Buscar(productos));
  };

  const fetchRegiones = async () => {
    const regionesData = await regionService.Buscar();
    setRegiones(regionesData);
  };
  

  const agregarPersonalizacion = () => {
    setEditingPersonalizacion(null);
    setFormKey(prevKey => prevKey + 1);
    setShowRegistro(true);
  };

  const editarPersonalizacion = (personalizacion) => {
    setEditingPersonalizacion(personalizacion);
    setFormKey(prevKey => prevKey + 1);
    setShowRegistro(true);
  };

  const eliminarPersonalizacion = async (id) => {
    const Eliminado = await personalizacionService.Eliminar(id);
    if (Eliminado)
      setPersonalizaciones(personalizaciones.filter(personalizacion => personalizacion.id !== id));
  };

  const guardarPersonalizacion = () => {
    buscarPersonalizaciones();
  };

  useEffect(() => {
    buscarPersonalizaciones();
    fetchRegiones();
  }, []);

  return (
    <div className="container">
      <h1 className="tituloPagina">Personalizaciones</h1>
      <form onSubmit={handleSubmit((data) => buscarPersonalizaciones(data.productos))}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <label className="col-form-label" htmlFor="productos">
                Productos:
              </label>
              <input 
                className="search-input mb-2" // Nueva clase mb-2 para reducir el espacio
                {...register('productos')} 
                placeholder='Productos'
              />
              <hr/> 
            </div>
            <div className="col-sm-6 d-flex align-items-center mt-2">
              <button className="form-button me-2" type='submit'>Buscar</button>
              <button className="form-button agregar" type='button' onClick={agregarPersonalizacion}>Agregar</button>
            </div>
          </div>
        </div>
      </form>
      
      <PersonalizacionListado 
        personalizaciones={personalizaciones} 
        onEdit={editarPersonalizacion} 
        onDelete={eliminarPersonalizacion}
        regiones={regiones} 
      />

      {showRegistro && (
        <PersonalizacionRegistro 
          key={formKey} 
          personalizacion={editingPersonalizacion} 
          onClose={() => setShowRegistro(false)} 
          onSave={guardarPersonalizacion}
          regiones={regiones} 
        />
      )}
    </div>
  );
};

export default Personalizacion;