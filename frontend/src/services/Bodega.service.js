import axios from "axios";

const urlResource = "http://localhost:4000/bodega";

const Buscar = async () => {
  try {
    const response = await axios.get(urlResource);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las bodegas:", error);
    throw error;
  }
};

const BuscarPorId = async (id) => {
  try {
    const response = await axios.get(`${urlResource}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la bodega con id ${id}:`, error);
    throw error;
  }
};

const Grabar = async (bodega) => {
  try {
    if (!bodega.id) {
      // Si el id no está definido, es una nueva bodega
      if (!bodega.fechaInauguracion) {
        throw new Error("Fecha de inauguración es requerida");
      }

      const response = await axios.post(urlResource, bodega);
      return response.data;
    } else {
      // Si el id está definido, es una actualización
      const response = await axios.put(`${urlResource}/${bodega.id}`, bodega);
      return response.data;
    }
  } catch (error) {
    console.error("Error al guardar la bodega:", error);
    throw error;
  }
};

const Eliminar = async (id) => {
  try {
    await axios.delete(`${urlResource}/${id}`);
  } catch (error) {
    console.error(`Error al eliminar la bodega con id ${id}:`, error);
    throw error;
  }
};

export const bodegaService = {
  Buscar,
  BuscarPorId,
  Grabar,
  Eliminar,
};
