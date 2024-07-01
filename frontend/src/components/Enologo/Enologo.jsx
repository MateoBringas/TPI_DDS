import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import EnologoListado from './EnologoListado';
import EnologoRegistro from './EnologoRegistro';
import { enologoService } from '../../services/Enologo.service';

const Enologo = () => {
    const { register, handleSubmit } = useForm();
    const [enologos, setEnologos] = useState([]);
    const [editingEnologo, setEditingEnologo] = useState(null);
    const [showRegistro, setShowRegistro] = useState(false);
    const [formKey, setFormKey] = useState(0); // Key to force remount

    // Función para buscar enólogos por nombre
    const buscarEnologos = async (nombre) => {
        setEnologos(await enologoService.Buscar(nombre));
    };

    // Función para agregar un nuevo enólogo
    const agregarEnologo = () => {
        setEditingEnologo(null);
        setFormKey(prevKey => prevKey + 1); // Cambiar la clave del formulario para forzar el remount
        setShowRegistro(true);
    };

    // Función para editar un enólogo existente
    const editarEnologo = (enologo) => {
        setEditingEnologo(enologo);
        setFormKey(prevKey => prevKey + 1); // Cambiar la clave del formulario para forzar el remount
        setShowRegistro(true);
    };

    // Función para eliminar un enólogo
    const eliminarEnologo = async (id) => {
        const Eliminado = await enologoService.Eliminar(id);
        if (Eliminado)
            setEnologos(enologos.filter(enologo => enologo.id !== id));
    };

    // Función para guardar un enólogo (añadir o actualizar)
    const guardarEnologo = () => {
        buscarEnologos(); // Actualiza la lista de enólogos después de guardar
    };

    // Fetch initial data
    useEffect(() => {
        buscarEnologos();
    }, []);

    return (
        <div className="container">
            <h1 className="center-title">Enólogos</h1>
            <form onSubmit={handleSubmit((data) => buscarEnologos(data.nombre))}>
                <input className="search-input" {...register('nombre')} placeholder='Nombre'/>
                <button className="form-button" type='submit'>Buscar</button>
            </form>
            <button className="form-button agregar" onClick={agregarEnologo}>Agregar Enólogo</button>

            {showRegistro && (
                <EnologoRegistro
                    key={formKey}
                    enologo={editingEnologo}
                    onClose={() => setShowRegistro(false)}
                    onSave={guardarEnologo}
                />
            )}

            <EnologoListado
                enologos={enologos}
                onEdit={editarEnologo}
                onDelete={eliminarEnologo}
            />


        </div>
    );
};

export default Enologo;