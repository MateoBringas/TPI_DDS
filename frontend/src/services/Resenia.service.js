import axios from 'axios';

const urlResource = "http://localhost:4000/resenia";

const Buscar = async (comentarios) => {
    try {
        const response = await axios.get(urlResource, {
            params: {
                comentarios: comentarios
            }
        });
        console.log('Reseñas encontradas:', response.data);
        console.log(comentarios);
        return response.data;
    } catch (error) {
        console.error('Error al buscar reseñas:', error);
    }
}

const BuscarPorId = async (id) => {
    try {
        const response = await axios.get(`${urlResource}/${id}`);
        console.log('Reseña encontrada:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al buscar reseña por ID:', error);
    }
}

const Grabar = async (id, data, existe) => {
    try {
        if (existe) {
            await axios.put(`${urlResource}/${id}`, data);
            console.log('Reseña actualizada:', data);
        } else {
            await axios.post(urlResource, data);
            console.log('Reseña registrada:', data);
        }
    } catch (error) {
        console.error('Error al registrar o actualizar reseña:', error);
    }
}

const Eliminar = async (id) => {
    try {
        await axios.delete(`${urlResource}/${id}`);
        console.log('Reseña eliminada:', id);
        return true;
    } catch (error) {
        console.error('Error al eliminar reseña:', error);
        return false;
    }
}

export const reseniaService = {
    Buscar,
    BuscarPorId,
    Grabar,
    Eliminar
};