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
      <h1 className="center-title">Pedidos</h1>
      <form onSubmit={handleSubmit((data) => buscarPedidos(data.comentarios))}>
        <input className="search-input" {...register('comentarios')} placeholder='Comentarios'/>
        <button className="form-button" type='submit'>Buscar</button>
      </form>
      <button className="form-button agregar" onClick={agregarPedido}>Agregar Pedido</button>
      
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
