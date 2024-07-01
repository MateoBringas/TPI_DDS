import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { pedidoService } from '../../services/Pedido.service';

const PedidoRegistro = ({ pedido, onClose, onSave, clientes }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: pedido || {}
  });

  const onSubmit = async (data) => {
    const existe = pedido ? true : false;
    const id = pedido ? pedido.id : null;
    await pedidoService.Grabar(id, data, existe);
    onSave();
    onClose();
  };

  useEffect(() => {
    reset(pedido || {});
  }, [pedido, reset]);

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="form-input">
      <h3>{pedido ? 'Editar' : 'Registrar'} Pedido</h3>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <input
          className="form-input"
          {...register("fechaPedido", { required: "La fecha del pedido es obligatoria" })}
          type="date"
          max={today}
          placeholder="Fecha de Pedido"
        />
        {errors.fechaPedido && <span className="error-message">{errors.fechaPedido.message}</span>}
        
        <select className="form-input" {...register("ClienteId", { required: "Debe seleccionar un cliente" })}>
          <option value="">Seleccione un cliente</option>
          {clientes.map(cliente => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nombre} {cliente.apellido}
            </option>
          ))}
        </select>
        {errors.ClienteId && <span className="error-message">{errors.ClienteId.message}</span>}
        
        <textarea 
          className="form-input" 
          {...register("comentarios")} 
          placeholder="Comentarios">
        </textarea>
        
        <div>
          <button className="form-button" type="submit">{pedido ? 'Guardar Cambios' : 'Registrar'}</button>
          <button className="form-button" type="button" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}  
export default PedidoRegistro;
