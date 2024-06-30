import axios from 'axios';

const API_URL = 'http://localhost:4000/resenia';

export const reseniaService = {
    Buscar: async () => {
        const response = await axios.get(API_URL);
        return response.data;
    },
    BuscarPorId: async (id) => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    },
    Agregar: async (resenia) => {
        const response = await axios.post(API_URL, resenia);
        return response.data;
    },
    Modificar: async (resenia) => {
        const response = await axios.put(`${API_URL}/${resenia.id}`, resenia);
        return response.data;
    },
    Eliminar: async (id) => {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    }
};
