import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import PedidoListado from './PedidoListado';
import PedidoRegistro from './PedidoRegistro';
import { pedidoService } from '../../services/Pedido.service';
import { clienteService } from '../../services/Cliente.service';

const Pedido = () => {
  const { register, handleSubmit } = useForm();
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [editingPedido, setEditingPedido] = useState(null);
  const [showRegistro, setShowRegistro] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const buscarPedidos = async (comentarios) => {
    console.log(comentarios);
    setPedidos(await pedidoService.Buscar(comentarios));
  };

  const fetchClientes = async () => {
    const clientesData = await clienteService.Buscar();
    setClientes(clientesData);
  };
  

  const agregarPedido = () => {
    setEditingPedido(null);
    setFormKey(prevKey => prevKey + 1);
    setShowRegistro(true);
  };

  const editarPedido = (pedido) => {
    setEditingPedido(pedido);
    setFormKey(prevKey => prevKey + 1);
    setShowRegistro(true);
  };

  const eliminarPedido = async (id) => {
    const Eliminado = await pedidoService.Eliminar(id);
    if (Eliminado)
      setPedidos(pedidos.filter(pedido => pedido.id !== id));
  };

  const guardarPedido = () => {
    buscarPedidos();
  };

  useEffect(() => {
    buscarPedidos();
    fetchClientes();
  }, []);

  return (
    <div className="container">
      <h1 className="tituloPagina">Pedidos</h1>
      <form onSubmit={handleSubmit((data) => buscarPedidos(data.comentarios))}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <label className="col-form-label" htmlFor="comentarios">
                Comentarios:
              </label>
              <input 
                className="search-input mb-2" // Nueva clase mb-2 para reducir el espacio
                {...register('comentarios')} 
                placeholder='Comentarios'
              />
              <hr/> 
            </div>
            <div className="col-sm-6 d-flex align-items-center mt-2">
              <button className="form-button me-2" type='submit'>Buscar</button>
              <button className="form-button agregar" type='button' onClick={agregarPedido}>Agregar</button>
            </div>
          </div>
        </div>
      </form>
      
      <PedidoListado 
        pedidos={pedidos} 
        onEdit={editarPedido} 
        onDelete={eliminarPedido}
        clientes={clientes} 
      />

      {showRegistro && (
        <PedidoRegistro 
          key={formKey} 
          pedido={editingPedido} 
          onClose={() => setShowRegistro(false)} 
          onSave={guardarPedido}
          clientes={clientes} 
        />
      )}
    </div>
  );
};

export default Pedido;