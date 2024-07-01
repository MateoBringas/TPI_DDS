import axios from "axios";

const API_URL = "http://localhost:4000/bodega";

export const bodegaService = {
  Buscar: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },
  BuscarPorId: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },
  Agregar: async (bodega) => {
    const response = await axios.post(API_URL, bodega);
    return response.data;
  },
  Modificar: async (bodega) => {
    const response = await axios.put(`${API_URL}/${bodega.id}`, bodega);
    return response.data;
  },
  Eliminar: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },
};
