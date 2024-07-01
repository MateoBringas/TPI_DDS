import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import { enologoService } from "../../services/Enologo.service";
import EnologoBuscar from "./EnologoBuscar";
import EnologoListado from "./EnologoListado";
import EnologoRegistro from "./EnologoRegistro";
import '../Paginas.css'; // Ruta del archivo CSS

function Enologo() {

    const [AccionABMC, setAccionABMC] = useState("L");
    const [Nombre, setNombre] = useState("");
    const [Apellido, setApellido] = useState("");
    const [Items, setItems] = useState([]);
    const [Item, setItem] = useState(null);

    const fetchEnologo = useCallback(async () => {
        try {
            const data = await enologoService.Buscar();
            setItems(data);
        } catch (error) {
            console.error("Error fetching enologos:", error);
        }
    }, []);

    useEffect(() => {
        fetchEnologo();
    }, [fetchEnologo]);

    const Volver = useCallback(() => {
        setAccionABMC("L");
        fetchEnologo();
    }, [fetchEnologo]);

    const Buscar = useCallback(async () => {
        setAccionABMC("L");
        try {
            let data = await enologoService.Buscar();
            if (Nombre) {
                data = data.filter(enologo => enologo.nombre.toLowerCase().includes(Nombre.toLowerCase()));
            }
            if (Apellido) {
                data = data.filter(enologo => enologo.apellido.toLowerCase().includes(Apellido.toLowerCase()));
            }
            setItems(data);
        } catch (error) {
            console.error("Error searching enologos:", error);
        }
    }, [Nombre, Apellido]);

    const BuscarPorId = useCallback(async (id, accionABMC) => {
        setAccionABMC(accionABMC);
        try {
            const data = await enologoService.BuscarPorId(id);
            setItem(data);
        } catch (error) {
            console.error("Error fetching enologo by id:", error);
        }
    }, []);

    const Modificar = useCallback((id) => {
        BuscarPorId(id, "M");
    }, [BuscarPorId]);

    const Agregar = useCallback(() => {
        setAccionABMC("A");
        setItem({
            id: 0,
            nombre: '',
            apellido: '',
            fechaNacimiento: moment(new Date()).format("YYYY-MM-DD")
        });
    }, []);

    const Eliminar = useCallback(async (id) => {
        try {
            await enologoService.Eliminar(id);
            alert("Registro eliminado correctamente.");
            Volver();
        } catch (error) {
            console.error("Error eliminando enologo:", error);
        }
    }, [Volver]);

    const Grabar = useCallback(async (item) => {
        try {
            if (AccionABMC === "A") {
                await enologoService.Agregar(item);
                alert("Registro agregado correctamente.");
            } else {
                await enologoService.Modificar(item);
                alert("Registro modificado correctamente.");
            }
            Volver();
        } catch (error) {
            console.error("Error saving enologo:", error);
        }
    }, [AccionABMC, Volver]);

    return (
        <div className="container">
            <div className="tituloPagina">
                Enologos
            </div>

            <div className="search-container">
                <EnologoBuscar
                    Nombre={Nombre}
                    setNombre={setNombre}
                    Apellido={Apellido}
                    setApellido={setApellido}
                    Buscar={Buscar}
                    Agregar={Agregar}
                />
            </div>

            {AccionABMC !== "L" && (
                <div className="form-container">
                    <EnologoRegistro
                        AccionABMC={AccionABMC}
                        Item={Item}
                        setItem={setItem}
                        Grabar={Grabar}
                        Volver={Volver}
                    />
                </div>
            )}

            <div className="table-container">
                <EnologoListado
                    Items={Items}
                    Modificar={Modificar}
                    Eliminar={Eliminar}
                />
            </div>

            {Items.length === 0 && (
                <div className="alert alert-info mensajesAlert">
                    <i className="fa fa-exclamation-sign"></i> No se encontraron registros...
                </div>
            )}
        </div>
    );
}

export default Enologo;