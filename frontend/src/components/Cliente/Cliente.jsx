import React, { useState, useEffect } from 'react';
import ClienteListado from './ClienteListado';
import ClienteBuscar from './ClienteBuscar';
import ClienteRegistro from './ClienteRegistro';
import '../Paginas.css';
import { clienteService } from '../../services/Cliente.service';

const Cliente = () => {
    const [clientes, setClientes] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState(null);

    const fetchClientes = async () => {
        const data = await clienteService.Buscar();
        setClientes(data);
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    const handleSearch = (query) => {
        const filteredClientes = clientes.filter(cliente => cliente.nombre.toLowerCase().includes(query.toLowerCase()));
        setClientes(filteredClientes);
    };

    const handleSelect = (cliente) => {
        setSelectedCliente(cliente);
    };

    const handleSave = async (cliente) => {
        await clienteService.Grabar(cliente);
        fetchClientes();
        setSelectedCliente(null);
    };
    const handleDelete = async (id) => {
        try {
            await clienteService.Eliminar(id);
            fetchClientes();
        } catch (error) {
            console.error('Error al eliminar la reseña:', error);
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Clientes</h1>
            <ClienteBuscar onSearch={handleSearch} />
            <ClienteListado clientes={clientes} onSelect={handleSelect} onDelete={handleDelete} />
            <ClienteRegistro cliente={selectedCliente} onSave={handleSave} />
        </div>
    );
};

export default Cliente;
