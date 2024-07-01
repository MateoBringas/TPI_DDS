import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import { enologoService } from "../../services/Enologo.service";
import EnologoBuscar from "./EnologoBuscar";
import EnologoListado from "./EnologoListado";
import EnologoRegistro from "./EnologoRegistro";
import Popup from "../Popup"; // Importar el componente Popup
import "../Paginas.css";

function Enologo() {
    const [AccionABMC, setAccionABMC] = useState("L");
    const [Nombre, setNombre] = useState("");
    const [Items, setItems] = useState([]);
    const [Item, setItem] = useState(null);
    const [popupMessage, setPopupMessage] = useState(""); // Estado para el mensaje del Popup
    const [showPopup, setShowPopup] = useState(false); // Estado para mostrar el Popup

    const fetchEnologo = useCallback(async () => {
        try {
            const data = await enologoService.Buscar();
            setItems(data);
        } catch (error) {
            setPopupMessage("Error fetching enólogo.");
            setShowPopup(true);
            console.error("Error fetching enólogo:", error);
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
                data = data.filter((Enologo) =>
                    Enologo.nombre.toLowerCase().includes(Nombre.toLowerCase())
                );
            }
            setItems(data);
        } catch (error) {
            setPopupMessage("Error searching enólogo.");
            setShowPopup(true);
            console.error("Error searching enólogo:", error);
        }
    }, [Nombre]);

    const BuscarPorId = useCallback(async (id, accionABMC) => {
        setAccionABMC(accionABMC);
        try {
            const data = await enologoService.BuscarPorId(id);
            setItem(data);
        } catch (error) {
            setPopupMessage("Error fetching enólogo con id.");
            setShowPopup(true);
            console.error("Error fetching enólogo con id:", error);
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
            nombre: "",
            apellido: "",
            fechaNacimiento: moment().format("YYYY-MM-DD"),
            // Puedes agregar otros campos relevantes aquí
        });
    }, []);

    const Eliminar = useCallback(
        async (id) => {
            try {
                await enologoService.Eliminar(id);
                alert("Enólogo eliminado correctamente."); // Considerar reemplazar con Popup
                Volver();
            } catch {
                setPopupMessage("No se puede eliminar el enólogo porque está siendo utilizado, debe eliminar las reseñas correspondientes.");
                setShowPopup(true);
            }
        },
        [Volver]
    );

    const Grabar = useCallback(
        async (item) => {
            try {
                if (AccionABMC === "A") {
                    await enologoService.Agregar(item);
                    alert("Enólogo agregado correctamente."); // Considerar reemplazar con Popup
                } else {
                    await enologoService.Modificar(item);
                    alert("Enólogo modificado correctamente."); // Considerar reemplazar con Popup
                }
                Volver();
            } catch (error) {
                setPopupMessage("Error saving enólogo.");
                setShowPopup(true);
                console.log(item);
                console.error("Error saving enólogo:", error);
            }
        },
        [AccionABMC, Volver]
    );

    const handlePopupClose = () => {
        setShowPopup(false);
        setPopupMessage(""); // Limpiar mensaje al cerrar el Popup
    };

    return (
        <div className="container">
            <div className="tituloPagina">Enólogo</div>

            <div className="search-container">
                <EnologoBuscar
                    Nombre={Nombre}
                    setNombre={setNombre}
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
                    <i className="fa fa-exclamation-sign"></i> No se encontraron enólogos...
                </div>
            )}

            {showPopup && (
                <Popup
                    message={popupMessage}
                    onClose={handlePopupClose}
                />
            )}
        </div>
    );
}

export default Enologo;