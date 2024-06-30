import axios from 'axios';
const urlResource = "http://localhost:4000/cliente";



const Buscar = async (nombre) => {
    try {
        const response = await axios.get(urlResource, {
            params: {
                nombre: nombre
            }
        });
        console.log('Clientes encontrados:', response.data);
        console.log(nombre)
        return response.data;
        //setClientes(response.data);
        // Aquí puedes manejar los clientes encontrados como necesites en tu frontend
    } catch (error) {
        console.error('Error al buscar clientes:', error);
    }

}

const BuscarPorId = async (id) => {
}

const Grabar = async (id, data, existe) => {
    try {
        if (existe) {
          await axios.put(`${urlResource}/${id}`, data);
          console.log('Cliente actualizado:', data);

        } else {
          await axios.post(urlResource, data);
          console.log('Cliente registrado:', data);
        }

      } catch (error) {
        console.error("Error al registrar cliente", error);
      }
}

const Eliminar = async (id) => {
    try {
        await axios.delete(`${urlResource}/${id}`);
          return true

        } catch (error) {
          console.error('Error al eliminar cliente:', error);
          return false
        }
}


export const clienteService = {
    Buscar,
    BuscarPorId,
    Grabar,
    Eliminar
};

//const Buscar = async () => {
//    try {
//        const response = await axios.get(urlResource);
//        return response.data;
//    } catch (error) {
//        console.error('Error al obtener los clientes:', error);
//        throw error;
//    }
//};
//
//const BuscarPorId = async (id) => {
//    try {
//        const response = await axios.get(`${urlResource}/${id}`);
//        return response.data;
//    } catch (error) {
//        console.error(`Error al obtener el cliente con id ${id}:`, error);
//        throw error;
//    }
//};
//
//const Grabar = async (cliente) => {
//    try {
//            if (!cliente.id) {
//        // Si el cliente no tiene ID (es nuevo), hacemos un POST
//        const response = await axios.post(urlResource, cliente);
//        return response.data;
//    } else {
//        // Si el cliente tiene ID (ya existe), hacemos un PUT
//        const response = await axios.put(`${urlResource}/${cliente.id}`, cliente);
//        return response.data;
//    }
//    } catch (error) {
//        console.error('Error al guardar el cliente:', error);
//        throw error;
//    }
//};
//
//const Eliminar = async (id) => {
//    try {
//        await axios.delete(`${urlResource}/${id}`);
//    } catch (error) {
//        console.error(`Error al eliminar el cliente con id ${id}:`, error);
//        throw error;
//    }
//};
//