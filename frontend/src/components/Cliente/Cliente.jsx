import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ClienteListado from './ClienteListado';
import ClienteRegistro from './ClienteRegistro';
import { clienteService } from '../../services/Cliente.service';
import '../Paginas.css';

const Cliente = () => {
  const { register, handleSubmit } = useForm();
  const [clientes, setClientes] = useState([]);
  const [editingCliente, setEditingCliente] = useState(null);
  const [showRegistro, setShowRegistro] = useState(false);
  const [formKey, setFormKey] = useState(0); // Key to force remount

  const buscarClientes = async (nombre) => {
    setClientes(await clienteService.Buscar(nombre));
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

  const guardarCliente = async () => {
    await buscarClientes(); // Actualiza la lista de clientes después de guardar
    setShowRegistro(false); // Cierra el modal de registro/edición
  };

  useEffect(() => {
    buscarClientes();
  }, []);

  return (
    <div className="container">
      <h1 className="tituloPagina">Clientes</h1>
      <form onSubmit={handleSubmit((data) => buscarClientes(data.Nombre))}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <label className="col-form-label" htmlFor="nombre">
                Nombre:
              </label>
              <input 
                className="search-input mb-2" // Nueva clase mb-2 para reducir el espacio
                {...register('Nombre')} 
                placeholder='Nombre'
              />
              <hr/> 
            </div>
            <div className="col-sm-6 d-flex align-items-center mt-2">
              <button className="form-button me-2" type='submit'>Buscar</button>
              <button className="form-button agregar" type='button' onClick={agregarCliente}>Agregar</button>
            </div>
          </div>
        </div>
      </form>
      
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
