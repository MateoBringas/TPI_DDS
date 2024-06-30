import React, { useState, useCallback, useEffect } from "react";
import { reseniaService } from "../../services/Resenia.service";
import { enologoService } from "../../services/Enologo.service";
import ReseniaBuscar from "./ReseniaBuscar";
import ReseniaListado from "./ReseniaListado";
import ReseniaRegistro from "./ReseniaRegistro";
import '../Paginas.css'; // Ruta del archivo CSS

function Resenia() {
    const [AccionABMC, setAccionABMC] = useState("L");
    const [Puntuacion, setPuntuacion] = useState("");
    const [Comentario, setComentario] = useState("");
    const [Items, setItems] = useState([]);
    const [Item, setItem] = useState(null);
    const [Enologos, setEnologos] = useState([]);

    const fetchResenias = useCallback(async () => {
        try {
            const data = await reseniaService.Buscar();
            setItems(data);
        } catch (error) {
            console.error("Error fetching reseñas:", error);
        }
    }, []);

    const fetchEnologos = useCallback(async () => {
        try {
            const data = await enologoService.Buscar(); // Asumiendo que tienes un servicio para obtener enólogos
            setEnologos(data);
        } catch (error) {
            console.error("Error fetching enólogos:", error);
        }
    }, []);

    useEffect(() => {
        fetchResenias();
        fetchEnologos();
    }, [fetchResenias, fetchEnologos]);

    const Volver = useCallback(() => {
        setAccionABMC("L");
        fetchResenias();
    }, [fetchResenias]);

    const Buscar = useCallback(async () => {
        setAccionABMC("L");
        try {
            let data = await reseniaService.Buscar();
            if (Puntuacion) {
                data = data.filter(resenia => resenia.puntuacion === parseInt(Puntuacion));
            }
            if (Comentario) {
                data = data.filter(resenia => resenia.comentario.toLowerCase().includes(Comentario.toLowerCase()));
            }
            setItems(data);
        } catch (error) {
            console.error("Error searching reseñas:", error);
        }
    }, [Puntuacion, Comentario]);

    const BuscarPorId = useCallback(async (id, accionABMC) => {
        setAccionABMC(accionABMC);
        try {
            const data = await reseniaService.BuscarPorId(id);
            setItem(data);
        } catch (error) {
            console.error("Error fetching resenia by id:", error);
        }
    }, []);

    const Modificar = useCallback((id) => {
        BuscarPorId(id, "M");
    }, [BuscarPorId]);

    const Agregar = useCallback(() => {
        setAccionABMC("A");
        setItem({
            id: 0,
            puntuacion: 1,
            comentario: '',
            fecha: new Date().toISOString().split('T')[0],
            EnologoId: Enologos.length > 0 ? Enologos[0].id : 0
        });
    }, [Enologos]);

    const Eliminar = useCallback(async (id) => {
        try {
            await reseniaService.Eliminar(id);
            alert("Registro eliminado correctamente.");
            Volver();
        } catch (error) {
            console.error("Error eliminando resenia:", error);
        }
    }, [Volver]);

    const Grabar = useCallback(async (item) => {
        try {
            if (AccionABMC === "A") {
                await reseniaService.Agregar(item);
                alert("Registro agregado correctamente.");
            } else {
                await reseniaService.Modificar(item);
                alert("Registro modificado correctamente.");
            }
            Volver();
        } catch (error) {
            console.error("Error saving resenia:", error);
        }
    }, [AccionABMC, Volver]);

    return (
        <div className="container">
            <div className="tituloPagina">
                Reseñas
            </div>

            <div className="search-container">
                <ReseniaBuscar
                    Puntuacion={Puntuacion}
                    setPuntuacion={setPuntuacion}
                    Comentario={Comentario}
                    setComentario={setComentario}
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
                    Enologos={Enologos}
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

export default Resenia;