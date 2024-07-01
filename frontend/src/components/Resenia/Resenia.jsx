import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReseniaListado from './ReseniaListado';
import ReseniaRegistro from './ReseniaRegistro';
import { reseniaService } from '../../services/Resenia.service';
import { enologoService } from '../../services/Enologo.service';

const Resenia = () => {
    const { register, handleSubmit } = useForm();
    const [resenias, setResenias] = useState([]);
    const [enologos, setEnologos] = useState([]);
    const [editingResenia, setEditingResenia] = useState(null);
    const [showRegistro, setShowRegistro] = useState(false);
    const [formKey, setFormKey] = useState(0);

    const buscarResenias = async (comentarios) => {
        console.log(comentarios);
        setResenias(await reseniaService.Buscar(comentarios));
    };

    const fetchEnologos = async () => {
        const enologosData = await enologoService.Buscar();
        setEnologos(enologosData);
    };

    const agregarResenia = () => {
        setEditingResenia(null);
        setFormKey(prevKey => prevKey + 1);
        setShowRegistro(true);
    };

    const editarResenia = (resenia) => {
        setEditingResenia(resenia);
        setFormKey(prevKey => prevKey + 1);
        setShowRegistro(true);
    };

    const eliminarResenia = async (id) => {
        const Eliminado = await reseniaService.Eliminar(id);
        if (Eliminado)
            setResenias(resenias.filter(resenia => resenia.id !== id));
    };

    const guardarResenia = () => {
        buscarResenias();
    };

    useEffect(() => {
        buscarResenias();
        fetchEnologos();
    }, []);

    return (
        <div className="container">
            <h1 className="center-title">Reseñas</h1>
            <form onSubmit={handleSubmit((data) => buscarResenias(data.comentarios))}>
                <input className="search-input" {...register('comentarios')} placeholder='Comentarios'/>
                <button className="form-button" type='submit'>Buscar</button>
            </form>
            <button className="form-button agregar" onClick={agregarResenia}>Agregar Reseña</button>

            {showRegistro && (
                <ReseniaRegistro
                    key={formKey}
                    resenia={editingResenia}
                    onClose={() => setShowRegistro(false)}
                    onSave={guardarResenia}
                    enologos={enologos}
                />
            )}

            <ReseniaListado
                resenias={resenias}
                onEdit={editarResenia}
                onDelete={eliminarResenia}
                enologos={enologos}
            />
        </div>
    );
};

export default Resenia;