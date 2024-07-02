import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { regionService } from '../../services/Region.service';

const RegionRegistro = ({ region, onClose, onSave }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: region || {}
  });

  const onSubmit = async (data) => {
    const existe = region ? true : false;
    const id = region ? region.id : null;
    await regionService.Grabar(id, data, existe);
    onSave(); // Llama a la función onSave para actualizar la lista de regiones
    onClose();
  };

  useEffect(() => {
    reset(region || {});
  }, [region, reset]);

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="form-input">
      <h3>{region ? 'Editar' : 'Registrar'} Region</h3>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <input 
          className="form-input" 
          {...register("provincia", { required: "Provincia es obligatorio" })} 
          placeholder="Provincia" 
        />
        {errors.nombre && <span className="error-message">{errors.nombre.message}</span>}
        
        <input 
          className="form-input" 
          {...register("ciudad", { required: "Ciudad es obligatorio" })} 
          placeholder="Ciudad" 
        />
        {errors.apellido && <span className="error-message">{errors.apellido.message}</span>}
        
        <input 
          className="form-input" 
          {...register("fechaRegistro", { required: "La fecha de registro es obligatoria" })} 
          type="date" 
          max={today} 
          placeholder="Fecha de registro" 
        />
        {errors.fechaRegistro && <span className="error-message">{errors.fechaRegistro.message}</span>}
        
        <div>
          <button className="form-button" type="submit">{region ? 'Guardar Cambios' : 'Registrar'}</button>
          <button className="form-button" type="button" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default RegionRegistro;
