import axios from 'axios';
const urlResource = "http://localhost:4000/region";



const Buscar = async (provincia) => {
    try {
        const response = await axios.get(urlResource, {
            params: {
                provincia: provincia
            }
        });
        console.log('Regiones encontrados:', response.data);
        console.log(provincia)
        return response.data;
        //setRegions(response.data);
        // Aquí puedes manejar los regiones encontrados como necesites en tu frontend
    } catch (error) {
        console.error('Error al buscar regiones:', error);
    }

}

const BuscarPorId = async (id) => {
}

const Grabar = async (id, data, existe) => {
    try {
        if (existe) {
          await axios.put(`${urlResource}/${id}`, data);
          console.log('Region actualizado:', data);

        } else {
          await axios.post(urlResource, data);
          console.log('Region registrado:', data);
        }

      } catch (error) {
        console.error("Error al registrar region", error);
      }
}

const Eliminar = async (id) => {
    try {
        await axios.delete(`${urlResource}/${id}`);
          return true

        } catch (error) {
          console.error('Error al eliminar region:', error);
          return false
        }
}


export const regionService = {
    Buscar,
    BuscarPorId,
    Grabar,
    Eliminar
};

