import React, { useState, useEffect } from 'react';
import '../Paginas.css';

const EnologoRegistro = ({ enologo, onSave }) => {
    const [form, setForm] = useState({
        id: enologo ? enologo.id : '',
        nombre: enologo ? enologo.nombre : '',
        apellido: enologo ? enologo.apellido : '',
        fechaNacimiento: enologo ? enologo.fechaNacimiento : ''
    });

    useEffect(() => {
        if (enologo) {
            setForm({
                id: enologo.id,
                nombre: enologo.nombre,
                apellido: enologo.apellido,
                fechaNacimiento: enologo.fechaNacimiento
            });
        } else {
            setForm({
                id: '',
                nombre: '',
                apellido: '',
                fechaNacimiento: ''
            });
        }
    }, [enologo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
    };

    return (
        <div className="container form-container">
            <form onSubmit={handleSubmit} className="form">
                {form.id && (
                    <div className="form-input">
                        <label>ID:</label>
                        <input
                            type="text"
                            name="id"
                            value={form.id}
                            readOnly
                            className="form-input"
                        />
                    </div>
                )}
                <div className="form-input">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-input">
                    <label>Apellido:</label>
                    <input
                        type="text"
                        name="apellido"
                        value={form.apellido}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-input">
                    <label>Fecha de Nacimiento:</label>
                    <input
                        type="date"
                        name="fechaNacimiento"
                        value={form.fechaNacimiento}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                <button type="submit" className="form-button">Guardar</button>
            </form>
        </div>
    );
};

export default EnologoRegistro;