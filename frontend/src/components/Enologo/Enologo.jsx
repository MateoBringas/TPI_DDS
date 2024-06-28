import React, { useState, useEffect } from 'react';
import EnologoListado from './EnologoListado';
import EnologoBuscar from './EnologoBuscar';
import EnologoRegistro from './EnologoRegistro';
import { enologoService } from '../../services/Enologo.service';
import '../Paginas.css';

const Enologo = () => {
    const [enologos, setEnologos] = useState([]);
    const [selectedEnologo, setSelectedEnologo] = useState(null);

    useEffect(() => {
        fetchEnologos();
    }, []);

    const fetchEnologos = async () => {
        const data = await enologoService.Buscar();
        setEnologos(data);
    };

    const handleSearch = async (query) => {
        const data = await enologoService.Buscar();
        const filtered = data.filter(enologo =>
            enologo.nombre.toLowerCase().includes(query.toLowerCase())
        );
        setEnologos(filtered);
    };

    const handleSelect = (enologo) => {
        setSelectedEnologo(enologo);
    };

    const handleDelete = async (id) => {
        try {
            await enologoService.Eliminar(id);
            fetchEnologos();
        } catch (error) {
            console.error('Error al eliminar el enólogo:', error);
        }
    };

    const handleSave = async (enologo) => {
        try {
            await enologoService.Grabar(enologo);
            fetchEnologos();
            setSelectedEnologo(null); // Resetea el enólogo seleccionado después de guardar
        } catch (error) {
            console.error('Error al guardar el enólogo:', error);
        }
    };

    return (
        <div className="container">
            <h1 className="center-title">Enólogos</h1>
            <EnologoBuscar onSearch={handleSearch} />
            <EnologoListado enologos={enologos} onSelect={handleSelect} onDelete={handleDelete} />
            <EnologoRegistro enologo={selectedEnologo} onSave={handleSave} />
        </div>
    );
};

export default Enologo;