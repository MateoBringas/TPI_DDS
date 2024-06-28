import axios from 'axios';

const urlResource = "http://localhost:4000/resenia";

const Buscar = async () => {
    try {
        const response = await axios.get(urlResource);
        return response.data;
    } catch (error) {
        console.error('Error al obtener las reseñas:', error);
        throw error;
    }
};

const BuscarPorId = async (id) => {
    try {
        const response = await axios.get(`${urlResource}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener la reseña con id ${id}:`, error);
        throw error;
    }
};

const Grabar = async (resenia) => {
    try {
        if (!resenia.id) {
            // Si el id no está definido, es una nueva reseña
            const response = await axios.post(urlResource, resenia);
            return response.data;
        } else {
            // Si el id está definido, es una actualización
            const response = await axios.put(`${urlResource}/${resenia.id}`, resenia);
            return response.data;
        }
    } catch (error) {
        console.error('Error al guardar la reseña:', error);
        throw error;
    }
};

const Eliminar = async (id) => {
    try {
        await axios.delete(`${urlResource}/${id}`);
    } catch (error) {
        console.error(`Error al eliminar la reseña con id ${id}:`, error);
        throw error;
    }
};

export const reseniaService = {
    Buscar,
    BuscarPorId,
    Grabar,
    Eliminar
};