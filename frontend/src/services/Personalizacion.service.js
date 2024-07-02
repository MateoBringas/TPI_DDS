import axios from 'axios';

const urlResource = "http://localhost:4000/personalizacion";

const Buscar = async (productos) => {
    try {
        const response = await axios.get(urlResource, {
            params: {
                productos: productos
            }
        });
        console.log('Personalizaciones encontrados:', response.data);
        console.log(productos);
        return response.data;
    } catch (error) {
        console.error('Error al buscar personalizaciones:', error);
    }
}

const BuscarPorId = async (id) => {
    try {
        const response = await axios.get(`${urlResource}/${id}`);
        console.log('Personalizacion encontrado:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al buscar personalizacion por ID:', error);
    }
}

const Grabar = async (id, data, existe) => {
    try {
        if (existe) {
            console.log("si existeeeeeee")
            await axios.put(`${urlResource}/${id}`, data);
            console.log('Personalizacion actualizado:', data);
        } else {
            console.log("por alguna razon no existeeeeee")
            await axios.post(urlResource, data);
            console.log('Personalizacion registrado:', data);
        }
    } catch (error) {
        console.error('Error al registrar o actualizar personalizacion:', error);
    }
}

const Eliminar = async (id) => {
    try {
        await axios.delete(`${urlResource}/${id}`);
        console.log('Personalizacion eliminado:', id);
        return true;
    } catch (error) {
        console.error('Error al eliminar personalizacion:', error);
        return false;
    }
}

export const personalizacionService = {
    Buscar,
    BuscarPorId,
    Grabar,
    Eliminar
};
