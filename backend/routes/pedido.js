const express = require("express");
const router = express.Router();
const { Pedido } = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

// Endpoint para todos los pedidos
router.get('/pedido', async (req, res) => {
    try {
        const pedidos = await Pedido.findAll();
        res.json(pedidos);
    } catch (error) {
        console.error('Error al obtener los pedidos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para pedido por id
router.get('/pedido/:id', async (req, res) => {
    try {
        const pedidoId = req.params.id;
        const pedido = await Pedido.findByPk(pedidoId);
        if (pedido) {
            res.json(pedido);
        } else {
            res.status(404).json({ error: 'Pedido no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el pedido:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para agregar un pedido
router.post('/pedido', async (req, res) => {
    try {
        const { fechaPedido, ClienteId, comentarios } = req.body;

        const nuevoPedido = await Pedido.create({
            fechaPedido,
            ClienteId,
            comentarios
        });

        res.status(201).json(nuevoPedido);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al crear el nuevo pedido:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para actualizar un pedido
router.put('/pedido/:id', async (req, res) => {
    try {
        const pedidoId = req.params.id;
        const pedido = await Pedido.findByPk(pedidoId);

        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        const { fechaPedido, ClienteId, comentarios } = req.body;
        await pedido.update({
            fechaPedido,
            ClienteId,
            comentarios
        });

        res.json(pedido);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al actualizar el pedido:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para eliminar un pedido
router.delete('/pedido/:id', async (req, res) => {
    try {
        const pedidoId = req.params.id;
        const pedido = await Pedido.findByPk(pedidoId);

        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        await pedido.destroy();
        res.json({ message: 'Pedido eliminado correctamente' });

    } catch (error) {
        console.error('Error al eliminar el pedido:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
