import React, { useState, useEffect } from 'react';
import '../Paginas.css';

const ReseniaRegistro = ({ resenia, onSave }) => {
    const [form, setForm] = useState({
        id: resenia ? resenia.id : '',
        puntuacion: resenia ? resenia.puntuacion : '',
        comentario: resenia ? resenia.comentario : '',
        fecha: resenia ? resenia.fecha : '',
        EnologoId: resenia ? resenia.EnologoId : ''
    });

    useEffect(() => {
        if (resenia) {
            setForm({
                id: resenia.id,
                puntuacion: resenia.puntuacion,
                comentario: resenia.comentario,
                fecha: resenia.fecha,
                EnologoId: resenia.EnologoId
            });
        } else {
            setForm({
                id: '',
                puntuacion: '',
                comentario: '',
                fecha: '',
                EnologoId: ''
            });
        }
    }, [resenia]);

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
                    <label>Puntuación:</label>
                    <input
                        type="number"
                        name="puntuacion"
                        value={form.puntuacion}
                        onChange={handleChange}
                        className="form-input"
                        min="0"
                        max="5"
                        required
                    />
                </div>
                <div className="form-input">
                    <label>Comentario:</label>
                    <textarea
                        name="comentario"
                        value={form.comentario}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-input">
                    <label>Fecha:</label>
                    <input
                        type="date"
                        name="fecha"
                        value={form.fecha}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-input">
                    <label>ID del Enólogo:</label>
                    <input
                        type="number"
                        name="EnologoId"
                        value={form.EnologoId}
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

export default ReseniaRegistro;