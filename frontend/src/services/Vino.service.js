import axios from "axios";

const API_URL = "http://localhost:4000/vino";

export const vinoService = {
  Buscar: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },
  BuscarPorId: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },
  Agregar: async (vino) => {
    const response = await axios.post(API_URL, vino);
    return response.data;
  },
  Modificar: async (vino) => {
    const response = await axios.put(`${API_URL}/${vino.id}`, vino);
    return response.data;
  },
  Eliminar: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },
};
