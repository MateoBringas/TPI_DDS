import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import RegionListado from './RegionListado';
import RegionRegistro from './RegionRegistro';
import { regionService } from '../../services/Region.service';
import '../Paginas.css';

const Region = () => {
  const { register, handleSubmit } = useForm();
  const [regiones, setRegiones] = useState([]);
  const [editingRegion, setEditingRegion] = useState(null);
  const [showRegistro, setShowRegistro] = useState(false);
  const [formKey, setFormKey] = useState(0); // Key to force remount

  const buscarRegiones = async (provincia) => {
    setRegiones(await regionService.Buscar(provincia));
  };

  const agregarRegion = () => {
    setEditingRegion(null);
    setFormKey(prevKey => prevKey + 1); // Change the form key to force remount
    setShowRegistro(true);
  };

  const editarRegion = (region) => {
    setEditingRegion(region);
    setFormKey(prevKey => prevKey + 1); // Change the form key to force remount
    setShowRegistro(true);
  };

  const eliminarRegion = async (id) => {
    const Eliminado = await regionService.Eliminar(id);
    if (Eliminado)
      setRegiones(regiones.filter(region => region.id !== id));
  };

  const guardarRegion = async () => {
    await buscarRegiones(); // Actualiza la lista de regiones después de guardar
    setShowRegistro(false); // Cierra el modal de registro/edición
  };

  useEffect(() => {
    buscarRegiones();
  }, []);

  return (
    <div className="container">
      <h1 className="tituloPagina">Regiones</h1>
      <form onSubmit={handleSubmit((data) => buscarRegiones(data.Provincia))}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <label className="col-form-label" htmlFor="Provincia">
                Provincia:
              </label>
              <input 
                className="search-input mb-2" // Nueva clase mb-2 para reducir el espacio
                {...register('Provincia')} 
                placeholder='Provincia'
              />
              <hr/> 
            </div>
            <div className="col-sm-6 d-flex align-items-center mt-2">
              <button className="form-button me-2" type='submit'>Buscar</button>
              <button className="form-button agregar" type='button' onClick={agregarRegion}>Agregar</button>
            </div>
          </div>
        </div>
      </form>
      
      <RegionListado 
        regiones={regiones} 
        onEdit={editarRegion} 
        onDelete={eliminarRegion} 
      />

      {showRegistro && (
        <RegionRegistro 
          key={formKey} 
          region={editingRegion} 
          onClose={() => setShowRegistro(false)} 
          onSave={guardarRegion} 
        />
      )}
    </div>
  );
};

export default Region;
