import React, { useState, useEffect } from 'react';
import PedidoListado from './PedidoListado';
import PedidoBuscar from './PedidoBuscar';
import PedidoRegistro from './PedidoRegistro';
import '../Paginas.css';
import { pedidoService } from '../../services/Pedido.service';

const Pedido = () => {
    const [pedidos, setPedidos] = useState([]);
    const [selectedPedido, setSelectedPedido] = useState(null);

    const fetchPedidos = async () => {
        const data = await pedidoService.Buscar();
        setPedidos(data);
    };

    useEffect(() => {
        fetchPedidos();
    }, []);

    const handleSearch = (query) => {
        const filteredPedidos = pedidos.filter(pedido => pedido.comentarios.toLowerCase().includes(query.toLowerCase()));
        setPedidos(filteredPedidos);
    };

    const handleSelect = (pedido) => {
        setSelectedPedido(pedido);
    };

    const handleSave = async (pedido) => {
        await pedidoService.Grabar(pedido);
        fetchPedidos();
        setSelectedPedido(null);
    };
    const handleDelete = async (id) => {
        try {
            await pedidoService.Eliminar(id);
            fetchPedidos();
        } catch (error) {
            console.error('Error al eliminar el pedido:', error);
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Pedidos</h1>
            <PedidoBuscar onSearch={handleSearch} />
            <PedidoListado pedidos={pedidos} onSelect={handleSelect} onDelete={handleDelete} />
            <PedidoRegistro pedido={selectedPedido} onSave={handleSave} />
        </div>
    );
};

export default Pedido;
