import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ClienteListado from './ClienteListado';
import ClienteRegistro from './ClienteRegistro';
import { clienteService } from '../../services/Cliente.service';

const Cliente = () => {
  const { register, handleSubmit } = useForm();
  const [clientes, setClientes] = useState([]);
  const [editingCliente, setEditingCliente] = useState(null);
  const [showRegistro, setShowRegistro] = useState(false);
  const [formKey, setFormKey] = useState(0); // Key to force remount

  const buscarClientes = async (nombre) => {
    setClientes( await clienteService.Buscar(nombre));
  };

  const agregarCliente = () => {
    setEditingCliente(null);
    setFormKey(prevKey => prevKey + 1); // Change the form key to force remount
    setShowRegistro(true);
  };

  const editarCliente = (cliente) => {
    setEditingCliente(cliente);
    setFormKey(prevKey => prevKey + 1); // Change the form key to force remount
    setShowRegistro(true);
  };

  const eliminarCliente = async (id) => {
    const Eliminado = await clienteService.Eliminar(id);
    if (Eliminado)
      setClientes(clientes.filter(cliente => cliente.id !== id));
  };

  const guardarCliente = () => {
    buscarClientes(); // Actualiza la lista de clientes después de guardar
  };

  useEffect(() => {
    buscarClientes();
  }, []);

  return (
    <div className="container">
      <h1 className="center-title">Clientes</h1>
      <form onSubmit={handleSubmit((data) => buscarClientes(data.Nombre))}>
        <input className="search-input" {...register('Nombre')} placeholder='Nombre'/>
        <button className="form-button" type='submit'>Buscar</button>
      </form>
      <button className="form-button agregar" onClick={agregarCliente}>Agregar Cliente</button>
      
      <ClienteListado 
        clientes={clientes} 
        onEdit={editarCliente} 
        onDelete={eliminarCliente} 
      />

      {showRegistro && (
        <ClienteRegistro 
          key={formKey} 
          cliente={editingCliente} 
          onClose={() => setShowRegistro(false)} 
          onSave={guardarCliente} 
        />
      )}
    </div>
  );
};

export default Cliente;
