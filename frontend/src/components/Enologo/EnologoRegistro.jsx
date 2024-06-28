import React from 'react';
import { useForm } from 'react-hook-form';

function EnologoRegistro({ item, onGrabar, onVolver }) {
    const { register, handleSubmit, setValue } = useForm();

    React.useEffect(() => {
        if (item) {
            setValue("id", item.id);
            setValue("nombre", item.nombre);
            setValue("apellido", item.apellido);
            setValue("fechaNacimiento", item.fechaNacimiento);
        }
    }, [item, setValue]);

    const onSubmit = (data) => {
        onGrabar(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <input
                type="text"
                placeholder="Nombre"
                {...register("nombre")}
                className="form-input"
            />
            <input
                type="text"
                placeholder="Apellido"
                {...register("apellido")}
                className="form-input"
            />
            <input
                type="date"
                {...register("fechaNacimiento")}
                className="form-input"
            />
            <button type="submit" className="form-button">Grabar</button>
            <button type="button" onClick={onVolver} className="form-button">Volver</button>
        </form>
    );
}

export default EnologoRegistro;
