import React from 'react';
import { useForm } from 'react-hook-form';

function EnologoBuscar({ onBuscar, onAgregar }) {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        onBuscar(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <input
                type="text"
                placeholder="Nombre"
                {...register("Nombre")}
                className="search-input"
            />
            <input
                type="text"
                placeholder="Apellido"
                {...register("Apellido")}
                className="search-input"
            />
            <button type="submit" className="form-button">Buscar</button>
            <br/>
            <button type="button" onClick={onAgregar} className="form-button">Agregar</button>
        </form>
    );
}

export default EnologoBuscar;
