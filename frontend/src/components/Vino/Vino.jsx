import React, { useState, useEffect } from "react";
import VinoListado from "./VinoListado";
import VinoBuscar from "./VinoBuscar";
import VinoRegistro from "./VinoRegistro";
import { vinoService } from "../../services/Vino.service";
import { bodegaService } from "../../services/Bodega.service";
import "../Paginas.css";

function Vino() {
  const [vinos, setVinos] = useState([]);
  const [selectedVino, setSelectedVino] = useState(null);
  const [bodegas, setBodegas] = useState([]);

  useEffect(() => {
    fetchVinos();
    fetchBodegas();
  }, []);

  const fetchVinos = async () => {
    try {
      const data = await vinoService.Buscar();
      setVinos(data);
    } catch (error) {
      console.error("Error al obtener los vinos:", error);
    }
  };

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
      const data = await vinoService.Buscar();
      const filtered = data.filter((vino) =>
        vino.nombre.toLowerCase().includes(query.toLowerCase())
      );
      setVinos(filtered);
    } catch (error) {
      console.error("Error al buscar los vinos:", error);
    }
  };

  const handleSelect = (vino) => {
    setSelectedVino(vino);
  };

  const handleDelete = async (id) => {
    try {
      await vinoService.Eliminar(id);
      fetchVinos();
    } catch (error) {
      console.error("Error al eliminar el vino:", error);
    }
  };

  const handleSave = async (vino) => {
    try {
      await vinoService.Grabar(vino);
      fetchVinos();
      setSelectedVino(null); // Resetea el vino seleccionado después de guardar
    } catch (error) {
      console.error("Error al guardar el vino:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="center-title">Vinos</h1>
      <VinoBuscar onSearch={handleSearch} />
      <VinoListado
        vinos={vinos}
        onSelect={handleSelect}
        onDelete={handleDelete}
      />
      <VinoRegistro vino={selectedVino} onSave={handleSave} bodegas={bodegas} />
    </div>
  );
}

export default Vino;
