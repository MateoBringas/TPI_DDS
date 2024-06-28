import axios from "axios";

const urlResource = "http://localhost:4000/vino";

const Buscar = async () => {
  try {
    const response = await axios.get(urlResource);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los vinos:", error);
    throw error;
  }
};

const BuscarPorId = async (id) => {
  try {
    const response = await axios.get(`${urlResource}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el vino con id ${id}:`, error);
    throw error;
  }
};

const Grabar = async (vino) => {
  try {
    if (!vino.id) {
      // Si el id no está definido, es un nuevo vino
      if (!vino.anejamiento) {
        throw new Error("Fecha de añejamiento es requerida");
      }

      const response = await axios.post(urlResource, vino);
      return response.data;
    } else {
      // Si el id está definido, es una actualización
      const response = await axios.put(`${urlResource}/${vino.id}`, vino);
      return response.data;
    }
  } catch (error) {
    console.error("Error al guardar el vino:", error);
    throw error;
  }
};

const Eliminar = async (id) => {
  try {
    await axios.delete(`${urlResource}/${id}`);
  } catch (error) {
    console.error(`Error al eliminar el vino con id ${id}:`, error);
    throw error;
  }
};

export const vinoService = {
  Buscar,
  BuscarPorId,
  Grabar,
  Eliminar,
};
