import axios from 'axios';
const urlResource = "http://localhost:4000/enologo";

const Buscar = async (nombre) => {
    try {
        const response = await axios.get(urlResource, {
            params: {
                nombre: nombre
            }
        });
        console.log('Enólogos encontrados:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al buscar enólogos:', error);
    }
}

const BuscarPorId = async (id) => {
    try {
        const response = await axios.get(`${urlResource}/${id}`);
        console.log('Enólogo encontrado:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al buscar enólogo por ID:', error);
    }
}

const Grabar = async (id, data, existe) => {
    try {
        if (existe) {
            await axios.put(`${urlResource}/${id}`, data);
            console.log('Enólogo actualizado:', data);
        } else {
            await axios.post(urlResource, data);
            console.log('Enólogo registrado:', data);
        }
    } catch (error) {
        console.error('Error al registrar enólogo:', error);
    }
}

const Eliminar = async (id) => {
    try {
        await axios.delete(`${urlResource}/${id}`);
        return true;
    } catch (error) {
        console.error('Error al eliminar enólogo:', error);
        return false;
    }
}

export const enologoService = {
    Buscar,
    BuscarPorId,
    Grabar,
    Eliminar
};