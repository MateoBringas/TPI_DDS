import axios from 'axios';

const urlResource = "http://localhost:4000/pedido";

const Buscar = async () => {
    try {
        const response = await axios.get(urlResource);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los pedidos:', error);
        throw error;
    }
};

const BuscarPorId = async (id) => {
    try {
        const response = await axios.get(`${urlResource}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el pedido con id ${id}:`, error);
        throw error;
    }
};

const Grabar = async (pedido) => {
    try {
        if (!pedido.id) {
            // Si el pedido no tiene ID (es nuevo), hacemos un POST
            const response = await axios.post(urlResource, pedido);
            return response.data;
        } else {
            // Si el pedido tiene ID (ya existe), hacemos un PUT
            const response = await axios.put(`${urlResource}/${pedido.id}`, pedido);
            return response.data;
        }
    } catch (error) {
        console.error('Error al guardar el pedido:', error);
        throw error;
    }
};

const Eliminar = async (id) => {
    try {
        await axios.delete(`${urlResource}/${id}`);
    } catch (error) {
        console.error(`Error al eliminar el pedido con id ${id}:`, error);
        throw error;
    }
};

export const pedidoService = {
    Buscar,
    BuscarPorId,
    Grabar,
    Eliminar
};
