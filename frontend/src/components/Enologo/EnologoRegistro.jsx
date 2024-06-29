import React from 'react';
import { useForm } from 'react-hook-form';

function EnologoRegistro({ item, onGrabar, onVolver }) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    React.useEffect(() => {
        if (item) {
            setValue("id", item.id);
            setValue("nombre", item.nombre);
            setValue("apellido", item.apellido);
            setValue("fechaNacimiento", item.fechaNacimiento);
        }
    }, [item, setValue]);

    const onSubmit = (data) => {
        // Eliminar el campo id si no existe
        if (!item) {
            delete data.id;
        }
        onGrabar(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            {item && (
                <input
                    type="hidden"
                    {...register("id")}
                />
            )}
            <input
                type="text"
                placeholder="Nombre"
                {...register("nombre", {
                    required: "El nombre es obligatorio",
                    pattern: {
                        value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                        message: "El nombre solo puede contener letras"
                    }
                })}
                className="form-input"
            />
            {errors.nombre && <p>{errors.nombre.message}</p>}

            <input
                type="text"
                placeholder="Apellido"
                {...register("apellido", {
                    required: "El apellido es obligatorio",
                    pattern: {
                        value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                        message: "El apellido solo puede contener letras"
                    }
                })}
                className="form-input"
            />
            {errors.apellido && <p>{errors.apellido.message}</p>}

            <input
                type="date"
                {...register("fechaNacimiento", {
                    validate: value => {
                        const selectedDate = new Date(value);
                        const currentDate = new Date();
                        // Clear the time portion of the dates for comparison
                        selectedDate.setHours(0, 0, 0, 0);
                        currentDate.setHours(0, 0, 0, 0);
                        return selectedDate < currentDate || "La fecha debe ser anterior a la fecha actual";
                    }
                })}
                className="form-input"
            />
            {errors.fechaNacimiento && <p>{errors.fechaNacimiento.message}</p>}

            <button type="submit" className="form-button">Grabar</button>
            <br/>
            <button type="button" onClick={onVolver} className="form-button">Volver</button>
        </form>
    );
}

export default EnologoRegistro;