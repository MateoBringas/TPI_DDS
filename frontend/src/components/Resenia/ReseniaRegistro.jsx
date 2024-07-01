import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { reseniaService } from '../../services/Resenia.service';

const ReseniaRegistro = ({ resenia, onClose, onSave, enologos }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: resenia || {}
    });

    const onSubmit = async (data) => {
        const existe = resenia ? true : false;
        const id = resenia ? resenia.id : null;
        await reseniaService.Grabar(id, data, existe);
        onSave();
        onClose();
    };

    useEffect(() => {
        reset(resenia || {});
    }, [resenia, reset]);

    const today = new Date().toISOString().split('T')[0];

    return (
        <div> <br/>
        <div className="form-input">
            <h3>{resenia ? 'Editar' : 'Registrar'} Reseña</h3>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <input
                    className="form-input"
                    {...register("puntuacion", { required: true })}
                    type="number"
                    min="1"
                    max="5"
                    placeholder="Puntuación (1-5)"
                />
                <textarea
                    className="form-input"
                    {...register("comentario", { required: true })}
                    placeholder="Comentario"
                />
                <input
                    className="form-input"
                    {...register("fecha", { required: true })}
                    type="date"
                    max={today}
                    placeholder="Fecha"
                />
                <select className="form-input" {...register("EnologoId", { required: true })}>
                    <option value="">Seleccione un enólogo</option>
                    {enologos.map(enologo => (
                        <option key={enologo.id} value={enologo.id}>
                            {enologo.nombre} {enologo.apellido}
                        </option>
                    ))}
                </select>
                <div>
                    <button className="form-button" type="submit">{resenia ? 'Guardar Cambios' : 'Registrar'}</button>
                    <button className="form-button" type="button" onClick={onClose}>Cancelar</button>
                </div>
            </form>
        </div>
</div>
    );
};

export default ReseniaRegistro;