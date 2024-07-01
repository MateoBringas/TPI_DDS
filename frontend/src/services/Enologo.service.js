import axios from 'axios';

const API_URL = 'http://localhost:4000/enologo';

export const enologoService = {
    Buscar: async () => {
        const response = await axios.get(API_URL);
        return response.data;
    },
    BuscarPorId: async (id) => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    },
    Agregar: async (enologo) => {
        const response = await axios.post(API_URL, enologo);
        return response.data;
    },
    Modificar: async (enologo) => {
        const response = await axios.put(`${API_URL}/${enologo.id}`, enologo);
        return response.data;
    },
    Eliminar: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/enologos/${id}`);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                throw new Error('No se puede eliminar el enólogo porque está referenciado por una reseña.');
            } else {
                throw new Error('Error eliminando el enólogo.');
            }
        }
    }
};