import axios from 'axios';

const urlResource = "http://localhost:4000/cliente";

const Buscar = async () => {
    try {
        const response = await axios.get(urlResource);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los clientes:', error);
        throw error;
    }
};

const BuscarPorId = async (id) => {
    try {
        const response = await axios.get(`${urlResource}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el cliente con id ${id}:`, error);
        throw error;
    }
};

const Grabar = async (cliente) => {
    try {
            if (!cliente.id) {
        // Si el cliente no tiene ID (es nuevo), hacemos un POST
        const response = await axios.post(urlResource, cliente);
        return response.data;
    } else {
        // Si el cliente tiene ID (ya existe), hacemos un PUT
        const response = await axios.put(`${urlResource}/${cliente.id}`, cliente);
        return response.data;
    }
    } catch (error) {
        console.error('Error al guardar el cliente:', error);
        throw error;
    }
};

const Eliminar = async (id) => {
    try {
        await axios.delete(`${urlResource}/${id}`);
    } catch (error) {
        console.error(`Error al eliminar el cliente con id ${id}:`, error);
        throw error;
    }
};

export const clienteService = {
    Buscar,
    BuscarPorId,
    Grabar,
    Eliminar
};
