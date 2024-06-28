import React, { useState, useEffect } from "react";
import BodegaListado from "./BodegaListado";
import BodegaBuscar from "./BodegaBuscar";
import BodegaRegistro from "./BodegaRegistro";
import { bodegaService } from "../../services/Bodega.service";
import "../Paginas.css";

function Bodega() {
  const [bodegas, setBodegas] = useState([]);
  const [selectedBodega, setSelectedBodega] = useState(null);

  useEffect(() => {
    fetchBodegas();
  }, []);

  const fetchBodegas = async () => {
    try {
      const data = await bodegaService.Buscar();
      setBodegas(data);
    } catch (error) {
      console.error("Error al obtener las bodegas:", error);
    }
  };

  const handleSearch = async (query) => {
    try {
      const data = await bodegaService.Buscar();
      const filtered = data.filter((bodega) =>
        bodega.nombre.toLowerCase().includes(query.toLowerCase())
      );
      setBodegas(filtered);
    } catch (error) {
      console.error("Error al buscar las bodegas:", error);
    }
  };

  const handleSelect = (bodega) => {
    setSelectedBodega(bodega);
  };

  const handleDelete = async (id) => {
    try {
      await bodegaService.Eliminar(id);
      fetchBodegas();
    } catch (error) {
      console.error("Error al eliminar la bodega:", error);
    }
  };

  const handleSave = async (bodega) => {
    try {
      await bodegaService.Grabar(bodega);
      fetchBodegas();
      setSelectedBodega(null); // Resetea la bodega seleccionada después de guardar
    } catch (error) {
      console.log(bodega);
      console.error("Error al guardar la bodega:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="center-title">Bodegas</h1>
      <BodegaBuscar onSearch={handleSearch} />
      <BodegaListado
        bodegas={bodegas}
        onSelect={handleSelect}
        onDelete={handleDelete}
      />
      <BodegaRegistro bodega={selectedBodega} onSave={handleSave} />
    </div>
  );
}

export default Bodega;
