const express = require("express");
const router = express.Router();
const { Cliente } = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

// Endpoint para filtrar clientes por nombre
router.get('/cliente', async (req, res) => {
    const { nombre } = req.query;

    try {
        if (!nombre) {
            // Si no se proporciona el parámetro 'nombre', buscar todos los clientes
            const clientes = await Cliente.findAll();
            res.json(clientes);
        } else {
            // Si se proporciona el parámetro 'nombre', filtrar por ese nombre
            const clientes = await Cliente.findAll({
                where: {
                    nombre: {
                        [Op.like]: `%${nombre}%`
                    }
                }
            });
            res.json(clientes);
        }
    } catch (error) {
        console.error('Error al buscar clientes:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para cliente por id
router.get('/cliente/:id', async (req, res) => {
    try {
        const clienteId = req.params.id;
        const cliente = await Cliente.findByPk(clienteId);
        if (cliente) {
            res.json(cliente);
        } else {
            res.status(404).json({ error: 'Cliente no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el cliente:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para agregar un cliente
router.post('/cliente', async (req, res) => {
    try {
        const { nombre, apellido, fechaRegistro } = req.body;

        const nuevoCliente = await Cliente.create({
            nombre,
            apellido,
            fechaRegistro
        });

        res.status(201).json(nuevoCliente);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al crear el nuevo cliente:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para actualizar un cliente
router.put('/cliente/:id', async (req, res) => {
    try {
        const clienteId = req.params.id;
        const cliente = await Cliente.findByPk(clienteId);

        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        const { nombre, apellido, fechaRegistro } = req.body;
        await cliente.update({
            nombre,
            apellido,
            fechaRegistro
        });

        res.json(cliente);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al actualizar el cliente:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para eliminar un cliente
router.delete('/cliente/:id', async (req, res) => {
    try {
        const clienteId = req.params.id;
        const cliente = await Cliente.findByPk(clienteId);

        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        await cliente.destroy();
        res.json({ message: 'Cliente eliminado correctamente' });

    } catch (error) {
        console.error('Error al eliminar el cliente:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;