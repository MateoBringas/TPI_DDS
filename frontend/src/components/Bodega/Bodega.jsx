import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import { bodegaService } from "../../services/Bodega.service";
import BodegaBuscar from "./BodegaBuscar";
import BodegaListado from "./BodegaListado";
import BodegaRegistro from "./BodegaRegistro";
import "../Paginas.css";

function Bodega() {
  const [AccionABMC, setAccionABMC] = useState("L");
  const [Nombre, setNombre] = useState("");
  const [Items, setItems] = useState([]);
  const [Item, setItem] = useState(null);

  const fetchBodega = useCallback(async () => {
    try {
      const data = await bodegaService.Buscar();
      setItems(data);
    } catch (error) {
      console.error("Error fetching bodega:", error);
    }
  }, []);

  useEffect(() => {
    fetchBodega();
  }, [fetchBodega]);

  const Volver = useCallback(() => {
    setAccionABMC("L");
    fetchBodega();
  }, [fetchBodega]);

  const Buscar = useCallback(async () => {
    setAccionABMC("L");
    try {
      let data = await bodegaService.Buscar();
      if (Nombre) {
        data = data.filter((Bodega) =>
          Bodega.nombre.toLowerCase().includes(Nombre.toLowerCase())
        );
      }
      setItems(data);
    } catch (error) {
      console.error("Error searching bodega:", error);
    }
  }, [Nombre]);

  const BuscarPorId = useCallback(async (id, accionABMC) => {
    setAccionABMC(accionABMC);
    try {
      const data = await bodegaService.BuscarPorId(id);
      setItem(data);
    } catch (error) {
      console.error("Error fetching bodega con id:", error);
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
      fechaInauguracion: moment(new Date()).format("YYYY-MM-DD"),
    });
  }, []);

  const Eliminar = useCallback(
    async (id) => {
      try {
        await bodegaService.Eliminar(id);
        alert("Bodega eliminada correctamente.");
        Volver();
      } catch (error) {
        console.error("Error eliminando la bodega:", error);
      }
    },
    [Volver]
  );

  const Grabar = useCallback(
    async (item) => {
      try {
        if (AccionABMC === "A") {
          await bodegaService.Agregar(item);
          alert("Bodega agregada correctamente.");
        } else {
          await bodegaService.Modificar(item);
          alert("Bodega modificada correctamente.");
        }
        Volver();
      } catch (error) {
        console.log(item);
        console.error("Error saving bodega:", error);
      }
    },
    [AccionABMC, Volver]
  );

  return (
    <div className="container">
      <div className="tituloPagina">Bodega</div>

      <div className="search-container">
        <BodegaBuscar
          Nombre={Nombre}
          setNombre={setNombre}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      </div>

      {AccionABMC !== "L" && (
        <div className="form-container">
          <BodegaRegistro
            AccionABMC={AccionABMC}
            Item={Item}
            setItem={setItem}
            Grabar={Grabar}
            Volver={Volver}
          />
        </div>
      )}

      <div className="table-container">
        <BodegaListado
          Items={Items}
          Modificar={Modificar}
          Eliminar={Eliminar}
        />
      </div>

      {Items.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i> No se encontraron
          bodegas...
        </div>
      )}
    </div>
  );
}

export default Bodega;
