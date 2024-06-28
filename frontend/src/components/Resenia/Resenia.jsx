import React, { useState, useEffect } from 'react';
import ReseniaListado from './ReseniaListado';
import ReseniaBuscar from './ReseniaBuscar';
import ReseniaRegistro from './ReseniaRegistro';
import { reseniaService } from '../../services/Resenia.service';
import '../Paginas.css';

const Resenia = () => {
    const [resenias, setResenias] = useState([]);
    const [selectedResenia, setSelectedResenia] = useState(null);

    useEffect(() => {
        fetchResenias();
    }, []);

    const fetchResenias = async () => {
        const data = await reseniaService.Buscar();
        setResenias(data);
    };

    const handleSearch = async (query) => {
        const data = await reseniaService.Buscar();
        const filtered = data.filter(resenia =>
            resenia.comentario.toLowerCase().includes(query.toLowerCase())
        );
        setResenias(filtered);
    };

    const handleSelect = (resenia) => {
        setSelectedResenia(resenia);
    };

    const handleDelete = async (id) => {
        try {
            await reseniaService.Eliminar(id);
            fetchResenias();
        } catch (error) {
            console.error('Error al eliminar la reseña:', error);
        }
    };

    const handleSave = async (resenia) => {
        try {
            await reseniaService.Grabar(resenia);
            fetchResenias();
            setSelectedResenia(null); // Resetea la reseña seleccionada después de guardar
        } catch (error) {
            console.error('Error al guardar la reseña:', error);
        }
    };

    return (
        <div className="container">
            <h1 className="center-title">Reseñas</h1>
            <ReseniaBuscar onSearch={handleSearch} />
            <ReseniaListado resenias={resenias} onSelect={handleSelect} onDelete={handleDelete} />
            <ReseniaRegistro resenia={selectedResenia} onSave={handleSave} />
        </div>
    );
};

export default Resenia;