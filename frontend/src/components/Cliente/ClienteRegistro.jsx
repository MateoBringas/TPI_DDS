import React, { useState, useEffect } from 'react';
import '../Paginas.css';

const ClienteRegistro = ({ cliente, onSave }) => {
    const [form, setForm] = useState({
        id: cliente ? cliente.id : '',
        nombre: cliente ? cliente.nombre : '',
        apellido: cliente ? cliente.apellido : '',
        fechaRegistro: cliente ? cliente.fechaRegistro : '',
    });

    useEffect(() => {
        if (cliente) {
            setForm({
                id: cliente.id,
                nombre: cliente.nombre,
                apellido: cliente.apellido,
                fechaRegistro: cliente.fechaRegistro,
            });
        } else {
            setForm({
                id: '',
                nombre: '',
                apellido: '',
                fechaRegistro: '',
            });
        }
    }, [cliente]);

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
                    />
                </div>
                <div className="form-input">
                    <label>Fecha de Registro:</label>
                    <input
                        type="date"
                        name="fechaRegistro"
                        value={form.fechaRegistro}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <button type="submit" className="form-button">Guardar</button>
            </form>
        </div>
    );
};

export default ClienteRegistro;
