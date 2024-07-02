import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import { reseniaService } from "../../services/Resenia.service";
import { enologoService } from "../../services/Enologo.service";

import ReseniaBuscar from "./ReseniaBuscar";
import ReseniaListado from "./ReseniaListado";
import ReseniaRegistro from "./ReseniaRegistro";
import "../Paginas.css";

function Resenia() {
    const [AccionABMC, setAccionABMC] = useState("L");
    const [Comentario, setComentario] = useState("");
    const [Puntuacion, setPuntuacion] = useState("");
    const [Items, setItems] = useState([]);
    const [Item, setItem] = useState(null);
    const [Enologos, setEnologos] = useState([]);

    const fetchEnologos = useCallback(async () => {
        try {
            const data = await enologoService.Buscar();
            setEnologos(data);
        } catch (error) {
            console.error("Error fetching enologos:", error);
        }
    }, []);

    useEffect(() => {
        fetchEnologos();
    }, [fetchEnologos]);

    const fetchResenias = useCallback(async () => {
        try {
            const data = await reseniaService.Buscar();
            setItems(data);
        } catch (error) {
            console.error("Error fetching resenias:", error);
        }
    }, []);

    useEffect(() => {
        fetchResenias();
    }, [fetchResenias]);

    const Volver = useCallback(() => {
        setAccionABMC("L");
        fetchResenias();
    }, [fetchResenias]);

    const Buscar = useCallback(async () => {
        setAccionABMC("L");
        try {
            let data = await reseniaService.Buscar();
            if (Comentario) {
                data = data.filter((Resenia) =>
                    Resenia.comentario.toLowerCase().includes(Comentario.toLowerCase())
                );
            }
            if (Puntuacion) {
                data = data.filter(
                    (Resenia) => Resenia.puntuacion === parseInt(Puntuacion)
                );
            }
            setItems(data);
        } catch (error) {
            console.error("Error searching resenias:", error);
        }
    }, [Comentario, Puntuacion]);

    const BuscarPorId = useCallback(async (id, accionABMC) => {
        setAccionABMC(accionABMC);
        try {
            const data = await reseniaService.BuscarPorId(id);
            setItem(data);
        } catch (error) {
            console.error("Error fetching resenia con id:", error);
        }
    }, []);

    const Modificar = useCallback(
        (id) => {
            BuscarPorId(id, "M");
        },
        [BuscarPorId]
    );

    const Agregar = useCallback(() => {
        setAccionABMC("A");
        setItem({
            id: 0,
            comentario: "",
            puntuacion: 0,
            fecha: moment(new Date()).format("YYYY-MM-DD"),
            EnologoId: 0,
        });
    }, []);

    const Eliminar = useCallback(
        async (id) => {
            try {
                await reseniaService.Eliminar(id);
                alert("Reseña eliminada correctamente.");
                Volver();
            } catch {
                alert("No se puede eliminar la reseña");
            }
        },
        [Volver]
    );

    const Grabar = useCallback(
        async (item) => {
            try {
                if (AccionABMC === "A") {
                    await reseniaService.Agregar(item);
                    alert("Reseña agregada correctamente.");
                } else {
                    await reseniaService.Modificar(item);
                    alert("Reseña modificada correctamente.");
                }
                Volver();
            } catch (error) {
                console.log(item);
                console.error("Error saving resenia:", error);
            }
        },
        [AccionABMC, Volver]
    );

    return (
        <div className="container">
            <div className="tituloPagina">Reseñas</div>

            <div className="search-container">
                <ReseniaBuscar
                    Comentario={Comentario}
                    setComentario={setComentario}
                    Puntuacion={Puntuacion}
                    setPuntuacion={setPuntuacion}
                    Buscar={Buscar}
                    Agregar={Agregar}
                />
            </div>

            {AccionABMC !== "L" && (
                <div className="form-container">
                    <ReseniaRegistro
                        AccionABMC={AccionABMC}
                        Item={Item}
                        setItem={setItem}
                        Grabar={Grabar}
                        Volver={Volver}
                        Enologos={Enologos}
                    />
                </div>
            )}

            <div className="table-container">
                <ReseniaListado
                    Items={Items}
                    Modificar={Modificar}
                    Eliminar={Eliminar}
                    Enologos={Enologos}
                />
            </div>

            {Items.length === 0 && (
                <div className="alert alert-info mensajesAlert">
                    <i className="fa fa-exclamation-sign"></i> No se encontraron Reseñas...
                </div>
            )}
        </div>
    );
}

export default Resenia;