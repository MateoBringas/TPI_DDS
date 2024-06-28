import axios from "axios";
const urlResource = "http://localhost:4000/enologo";

async function Buscar() {
    const resp = await axios.get(urlResource);
    return resp.data;
}

async function BuscarPorId(id) {
    const resp = await axios.get(`${urlResource}/${id}`);
    return resp.data;
}

async function Eliminar(id) {
    await axios.delete(`${urlResource}/${id}`);
}

async function Grabar(item) {
    if (item.id === 100) {
        await axios.post(urlResource, item);
    } else {
        await axios.put(`${urlResource}/${item.id}`, item);
    }
}

export const enologoService = {
    Buscar,
    BuscarPorId,
    Eliminar,
    Grabar
};