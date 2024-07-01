import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { enologoService } from '../../services/Enologo.service';

const EnologoRegistro = ({ enologo, onClose, onSave }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: enologo || {}
    });

    const onSubmit = async (data) => {
        const existe = enologo ? true : false;
        const id = enologo ? enologo.id : null;
        await enologoService.Grabar(id, data, existe);
        onSave(); // Llama a la función onSave para actualizar la lista de enólogos
        onClose();
    };

    useEffect(() => {
        reset(enologo || {});
    }, [enologo, reset]);

    const today = new Date().toISOString().split('T')[0];

    return (
        <div><br/>
            <div className="form-input">
            <h3>{enologo ? 'Editar' : 'Registrar'} Enólogo</h3>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <input className="form-input" {...register("nombre", {required: true})} placeholder="Nombre"/>
                <input className="form-input" {...register("apellido", {required: true})} placeholder="Apellido"/>
                <input className="form-input" {...register("fechaNacimiento", {required: true})} type="date" max={today}
                       placeholder="Fecha de Nacimiento"/>
                <div>
                    <button className="form-button" type="submit">{enologo ? 'Guardar Cambios' : 'Registrar'}</button>
                    <button className="form-button" type="button" onClick={onClose}>Cancelar</button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default EnologoRegistro;