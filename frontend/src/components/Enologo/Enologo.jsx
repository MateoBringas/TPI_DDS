import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import { enologoService } from "../../services/Enologo.service";
import EnologoBuscar from "./EnologoBuscar";
import EnologoListado from "./EnologoListado";
import EnologoRegistro from "./EnologoRegistro";
import "../Paginas.css";  // Importa el archivo CSS

function Enologo() {
    const [accionABMC, setAccionABMC] = useState("L");
    const [items, setItems] = useState([]);
    const [item, setItem] = useState(null);

    const fetchEnologos = useCallback(async () => {
        try {
            const data = await enologoService.Buscar();
            setItems(data);
        } catch (error) {
            console.error("Error fetching enologos:", error);
        }
    }, []);

    useEffect(() => {
        fetchEnologos();
    }, [fetchEnologos]);

    const handleBuscar = useCallback(async (filters) => {
        setAccionABMC("L");
        try {
            let data = await enologoService.Buscar();
            if (filters.Nombre) {
                data = data.filter(enologo => enologo.nombre.toLowerCase().includes(filters.Nombre.toLowerCase()));
            }
            if (filters.Apellido) {
                data = data.filter(enologo => enologo.apellido.toLowerCase().includes(filters.Apellido.toLowerCase()));
            }
            setItems(data);
        } catch (error) {
            console.error("Error searching enologos:", error);
        }
    }, []);

    const handleModificar = useCallback(async (id) => {
        setAccionABMC("M");
        try {
            const data = await enologoService.BuscarPorId(id);
            setItem(data);
        } catch (error) {
            console.error("Error fetching enologo by id:", error);
        }
    }, []);

    const handleAgregar = useCallback(() => {
        setAccionABMC("A");
        setItem({
            id: null,
            nombre: '',
            apellido: '',
            fechaNacimiento: moment().format("YYYY-MM-DD")
        });
    }, []);

    const handleEliminar = useCallback(async (id) => {
        const resp = window.confirm("Está seguro que quiere eliminar el registro?");
        if (resp) {
            try {
                await enologoService.Eliminar(id);
                fetchEnologos();
            } catch (error) {
                console.error("Error deleting enologo:", error);
            }
        }
    }, [fetchEnologos]);

    const handleGrabar = useCallback(async (enologo) => {
        try {
            await enologoService.Grabar(enologo);
            alert("Registro " + (accionABMC === "A" ? "agregado" : "modificado") + " correctamente.");
            setAccionABMC("L");
            fetchEnologos();
        } catch (error) {
            console.error("Error saving enologo:", error);
        }
    }, [accionABMC, fetchEnologos]);

    const handleVolver = useCallback(() => {
        setAccionABMC("L");
    }, []);

    return (
        <div className="container">
            <div className="tituloPagina">
                Enologos <small>{accionABMC === "L" ? "(Listado)" : "(Agregar / Modificar)"}</small>
            </div>

            {accionABMC === "L" && (
                <>
                    <div className="search-container">
                        <EnologoBuscar onBuscar={handleBuscar} onAgregar={handleAgregar} />
                    </div>
                    <div className="table-container">
                        <EnologoListado
                            items={items}
                            onModificar={handleModificar}
                            onEliminar={handleEliminar}
                        />
                        {items.length === 0 && (
                            <div className="alert alert-info mensajesAlert">
                                <i className="fa fa-exclamation-sign"></i> No se encontraron registros...
                            </div>
                        )}
                    </div>
                </>
            )}

            {(accionABMC === "A" || accionABMC === "M" || accionABMC === "C") && (
                <div className="form-container">
                    <EnologoRegistro
                        item={item}
                        onGrabar={handleGrabar}
                        onVolver={handleVolver}
                    />
                </div>
            )}
        </div>
    );
}

export default Enologo;
