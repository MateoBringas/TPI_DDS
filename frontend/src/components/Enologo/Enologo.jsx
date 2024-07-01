import React, { useState, useCallback } from "react";
import { enologoService } from "../../services/Enologo.service";
import EnologoBuscar from "./EnologoBuscar";
import EnologoListado from "./EnologoListado";
import EnologoRegistro from "./EnologoRegistro";

function Enologo() {
    const [AccionABMC, setAccionABMC] = useState("L");
    const [Nombre, setNombre] = useState("");
    const [Apellido, setApellido] = useState("");
    const [Items, setItems] = useState([]);
    const [Item, setItem] = useState(null);

    const fetchEnologos = useCallback(async () => {
        try {
            const data = await enologoService.Buscar();
            setItems(data);
        } catch (error) {
            console.error("Error fetching enologos:", error);
        }
    }, []);

    const Volver = useCallback(() => {
        setAccionABMC("L");
        fetchEnologos();
    }, [fetchEnologos]);

    const Buscar = useCallback(async () => {
        setAccionABMC("L");
        try {
            let data = await enologoService.Buscar();
            if (Nombre) {
                data = data.filter((enologo) =>
                    enologo.nombre.toLowerCase().includes(Nombre.toLowerCase())
                );
            }
            if (Apellido) {
                data = data.filter((enologo) =>
                    enologo.apellido.toLowerCase().includes(Apellido.toLowerCase())
                );
            }
            setItems(data);
        } catch (error) {
            console.error("Error searching enologos:", error);
        }
    }, [Nombre, Apellido]);

    const Agregar = useCallback(() => {
        setAccionABMC("A");
        setItem({
            id: 0,
            nombre: "",
            apellido: "",
            fechaNacimiento: "",
        });
    }, []);

    const Modificar = useCallback(
        async (id) => {
            setAccionABMC("M");
            try {
                const data = await enologoService.BuscarPorId(id);
                setItem(data);
            } catch (error) {
                console.error("Error fetching enologo by id:", error);
            }
        },
        []
    );

    const Eliminar = useCallback(
        async (id) => {
            try {
                await enologoService.Eliminar(id);
                alert("Enologo eliminado correctamente.");
                Volver();
            } catch {
                alert("No se puede eliminar el enologo porque está siendo utilizado por otra entidad.");
            }
        },
        [Volver]
    );

    const Grabar = useCallback(
        async (item) => {
            try {
                if (AccionABMC === "A") {
                    await enologoService.Agregar(item);
                    alert("Enologo agregado correctamente.");
                } else {
                    await enologoService.Modificar(item);
                    alert("Enologo modificado correctamente.");
                }
                Volver();
            } catch (error) {
                console.error("Error saving enologo:", error);
            }
        },
        [AccionABMC, Volver]
    );

    return (
        <div className="container">
            <div className="tituloPagina">Enologos</div>

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
                <EnologoListado Items={Items} Modificar={Modificar} Eliminar={Eliminar} />
            </div>

            {Items.length === 0 && (
                <div className="alert alert-info mensajesAlert">
                    <i className="fa fa-exclamation-sign"></i> No se encontraron enologos...
                </div>
            )}
        </div>
    );
}

export default Enologo;