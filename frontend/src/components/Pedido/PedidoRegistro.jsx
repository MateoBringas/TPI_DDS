import React, { useState, useEffect } from 'react';
import '../Paginas.css';

const PedidoRegistro = ({ pedido, onSave }) => {
    const [form, setForm] = useState({
        id: pedido ? pedido.id : '',
        fechaPedido: pedido ? pedido.fechaPedido : '',
        ClienteId: pedido ? pedido.ClienteId : '',
        comentarios: pedido ? pedido.comentarios : '',
    });

    useEffect(() => {
        if (pedido) {
            setForm({
                id: pedido.id,
                fechaPedido: pedido.fechaPedido,
                ClienteId: pedido.ClienteId,
                comentarios: pedido.comentarios,
            });
        } else {
            setForm({
                id: '',
                fechaPedido: '',
                ClienteId: '',
                comentarios: '',
            });
        }
    }, [pedido]);

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
                    <label>Fecha de Pedido:</label>
                    <input
                        type="date"
                        name="fechaPedido"
                        value={form.fechaPedido}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-input">
                    <label>Cliente ID:</label>
                    <input
                        type="text"
                        name="ClienteId"
                        value={form.ClienteId}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-input">
                    <label>Comentarios:</label>
                    <textarea
                        name="comentarios"
                        value={form.comentarios}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <button type="submit" className="form-button">Guardar</button>
            </form>
        </div>
    );
};

export default PedidoRegistro;
