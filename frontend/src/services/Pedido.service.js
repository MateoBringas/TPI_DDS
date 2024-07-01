import axios from 'axios';

const urlResource = "http://localhost:4000/pedido";

const Buscar = async (comentarios) => {
    try {
        const response = await axios.get(urlResource, {
            params: {
                comentarios: comentarios
            }
        });
        console.log('Pedidos encontrados:', response.data);
        console.log(comentarios);
        return response.data;
    } catch (error) {
        console.error('Error al buscar pedidos:', error);
    }
}

const BuscarPorId = async (id) => {
    try {
        const response = await axios.get(`${urlResource}/${id}`);
        console.log('Pedido encontrado:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al buscar pedido por ID:', error);
    }
}

const Grabar = async (id, data, existe) => {
    try {
        if (existe) {
            await axios.put(`${urlResource}/${id}`, data);
            console.log('Pedido actualizado:', data);
        } else {
            await axios.post(urlResource, data);
            console.log('Pedido registrado:', data);
        }
    } catch (error) {
        console.error('Error al registrar o actualizar pedido:', error);
    }
}

const Eliminar = async (id) => {
    try {
        await axios.delete(`${urlResource}/${id}`);
        console.log('Pedido eliminado:', id);
        return true;
    } catch (error) {
        console.error('Error al eliminar pedido:', error);
        return false;
    }
}

export const pedidoService = {
    Buscar,
    BuscarPorId,
    Grabar,
    Eliminar
};
