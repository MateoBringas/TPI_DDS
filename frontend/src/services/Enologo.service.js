import axios from 'axios';

const urlResource = "http://localhost:4000/enologo";

const Buscar = async () => {
    try {
        const response = await axios.get(urlResource);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los enólogos:', error);
        throw error;
    }
};

const BuscarPorId = async (id) => {
    try {
        const response = await axios.get(`${urlResource}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el enólogo con id ${id}:`, error);
        throw error;
    }
};

const Grabar = async (enologo) => {
    try {
        if (!enologo.id) {
            // Si el id no está definido, es un nuevo enólogo
            const response = await axios.post(urlResource, enologo);
            return response.data;
        } else {
            // Si el id está definido, es una actualización
            const response = await axios.put(`${urlResource}/${enologo.id}`, enologo);
            return response.data;
        }
    } catch (error) {
        console.error('Error al guardar el enólogo:', error);
        throw error;
    }
};

const Eliminar = async (id) => {
    try {
        await axios.delete(`${urlResource}/${id}`);
    } catch (error) {
        console.error(`Error al eliminar el enólogo con id ${id}:`, error);
        throw error;
    }
};

export const enologoService = {
    Buscar,
    BuscarPorId,
    Grabar,
    Eliminar
};