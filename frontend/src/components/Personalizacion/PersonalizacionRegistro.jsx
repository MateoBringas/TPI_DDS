import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { personalizacionService } from '../../services/Personalizacion.service';

const PersonalizacionRegistro = ({ personalizacion, onClose, onSave, regiones }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: personalizacion || {}
  });

  const onSubmit = async (data) => {
    const existe = personalizacion ? true : false;
    const id = personalizacion ? personalizacion.id : null;
    await personalizacionService.Grabar(id, data, existe);
    onSave();
    onClose();
  };

  useEffect(() => {
    reset(personalizacion || {});
  }, [personalizacion, reset]);

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="form-input">
      <h3>{personalizacion ? 'Editar' : 'Registrar'} Personalizacion</h3>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <input 
          className="form-input" 
          {...register("nombre", { required: "El nombre de personalizacion es obligatorio" })} 
          placeholder="Nombre" 
        />
        {errors.nombre && <span className="error-message">{errors.nombre.message}</span>}

        <input
          className="form-input"
          {...register("fechaCreacion", { required: "La fecha de personalizacion es obligatoria" })}
          type="date"
          max={today}
          placeholder="Fecha de Creacion"
        />
        {errors.fechaCreacion && <span className="error-message">{errors.fechaCreacion.message}</span>}
        
        <select className="form-input" {...register("RegionId", { required: "Debe seleccionar una region" })}>
          <option value="">Seleccione una region</option>
          {regiones.map(region => (
            <option key={region.id} value={region.id}>
              {region.provincia} {region.ciudad}
            </option>
          ))}
        </select>
        {errors.RegionId && <span className="error-message">{errors.RegionId.message}</span>}
        
        <input
          className="form-input" 
          {...register("productos", { required: "Los productos de personalizacion son obligatorios" })} 
          placeholder="Productos"
          />
          {errors.productos && <span className="error-message">{errors.productos.message}</span>}
        
        <div>
          <button className="form-button" type="submit">{personalizacion ? 'Guardar Cambios' : 'Registrar'}</button>
          <button className="form-button" type="button" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}  
export default PersonalizacionRegistro;
