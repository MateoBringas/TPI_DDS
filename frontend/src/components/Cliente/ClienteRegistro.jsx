import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { clienteService } from '../../services/Cliente.service';

const ClienteRegistro = ({ cliente, onClose, onSave }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: cliente || {}
  });

  const onSubmit = async (data) => {
    const existe = cliente ? true : false;
    const id = cliente ? cliente.id : null;
    await clienteService.Grabar(id, data, existe);
    onSave(); // Llama a la función onSave para actualizar la lista de clientes
    onClose();
  }

  useEffect(() => {
    reset(cliente || {});
  }, [cliente, reset]);

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="form-input">
      <h3>{cliente ? 'Editar' : 'Registrar'} Cliente</h3>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <input className="form-input" {...register("nombre", { required: true })} placeholder="Nombre" />
        <input className="form-input" {...register("apellido", { required: true })} placeholder="Apellido" />
        <input className="form-input" {...register("fechaRegistro", { required: true })} type="date" max={today} placeholder="Fecha de registro" />
          <div>
            <button className="form-button" type="submit">{cliente ? 'Guardar Cambios' : 'Registrar'}</button>
            <button className="form-button" type="button" onClick={onClose}>Cancelar</button>
          </div>
      </form>
    </div>
  );
};

export default ClienteRegistro;
