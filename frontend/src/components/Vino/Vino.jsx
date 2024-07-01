import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import { vinoService } from "../../services/Vino.service";
import { bodegaService } from "../../services/Bodega.service";

import VinoBuscar from "./VinoBuscar";
import VinoListado from "./VinoListado";
import VinoRegistro from "./VinoRegistro";
import "../Paginas.css";

function Vino() {
  const [AccionABMC, setAccionABMC] = useState("L");
  const [Nombre, setNombre] = useState("");
  const [Items, setItems] = useState([]);
  const [Item, setItem] = useState(null);
  const [Bodegas, setBodegas] = useState([]);

  const fetchBodegas = useCallback(async () => {
    try {
      const data = await bodegaService.Buscar();
      setBodegas(data);
    } catch (error) {
      console.error("Error fetching bodegas:", error);
    }
  }, []);

  useEffect(() => {
    fetchBodegas();
  }, [fetchBodegas]);

  const fetchVino = useCallback(async () => {
    try {
      const data = await vinoService.Buscar();
      setItems(data);
    } catch (error) {
      console.error("Error fetching vino:", error);
    }
  }, []);

  useEffect(() => {
    fetchVino();
  }, [fetchVino]);

  const Volver = useCallback(() => {
    setAccionABMC("L");
    fetchVino();
  }, [fetchVino]);

  const Buscar = useCallback(async () => {
    setAccionABMC("L");
    try {
      let data = await vinoService.Buscar();
      if (Nombre) {
        data = data.filter((Vino) =>
          Vino.nombre.toLowerCase().includes(Nombre.toLowerCase())
        );
      }
      setItems(data);
    } catch (error) {
      console.error("Error searching vino:", error);
    }
  }, [Nombre]);

  const BuscarPorId = useCallback(async (id, accionABMC) => {
    setAccionABMC(accionABMC);
    try {
      const data = await vinoService.BuscarPorId(id);
      setItem(data);
    } catch (error) {
      console.error("Error fetching vino con id:", error);
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
      anejamiento: moment(new Date()).format("YYYY-MM-DD"),
      BodegaId: 0,
    });
  }, []);

  const Eliminar = useCallback(
    async (id) => {
      try {
        await vinoService.Eliminar(id);
        alert("Vino eliminado correctamente.");
        Volver();
      } catch {
        alert("No se puede eliminar el vino por que esta siendo utilizada o");
      }
    },
    [Volver]
  );

  const Grabar = useCallback(
    async (item) => {
      try {
        if (AccionABMC === "A") {
          await vinoService.Agregar(item);
          alert("Vino agregado correctamente.");
        } else {
          await vinoService.Modificar(item);
          alert("Vino modificado correctamente.");
        }
        Volver();
      } catch (error) {
        console.log(item);
        console.error("Error saving vino:", error);
      }
    },
    [AccionABMC, Volver]
  );

  return (
    <div className="container">
      <div className="tituloPagina">Vino</div>

      <div className="search-container">
        <VinoBuscar
          Nombre={Nombre}
          setNombre={setNombre}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      </div>

      {AccionABMC !== "L" && (
        <div className="form-container">
          <VinoRegistro
            AccionABMC={AccionABMC}
            Item={Item}
            setItem={setItem}
            Grabar={Grabar}
            Volver={Volver}
            Bodegas={Bodegas}
          />
        </div>
      )}

      <div className="table-container">
        <VinoListado Items={Items} Modificar={Modificar} Eliminar={Eliminar} />
      </div>

      {Items.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i> No se encontraron Vinos...
        </div>
      )}
    </div>
  );
}

export default Vino;
