const express = require("express");
const router = express.Router();
const { Bodega } = require("../base-orm/sequelize-init"); // Importamos el modelo Bodega
const { Op, ValidationError } = require("sequelize");

// Endpoint para todas las bodegas
router.get('/bodega', async (req, res) => {
    try {
        const bodegas = await Bodega.findAll();
        res.json(bodegas);
    } catch (error) {
        console.error('Error al obtener las bodegas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Endpoint para bodega por id
router.get('/bodega/:id', async(req,res) => {
    try {
        const bodegaId = req.params.id;
        const bodega = await Bodega.findByPk(bodegaId);
        if (bodega) {
            res.json(bodega);
        } else {
            res.status(404).json({ error: 'Bodega no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener la bodega:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para agregar una bodega
router.post('/bodega', async (req, res) => {
    try {
        const { nombre, fechaInaguracion } = req.body;

        const nuevaBodega = await Bodega.create({
            nombre,
            fechaInaguracion
        });

        res.status(201).json(nuevaBodega);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al crear la nueva bodega:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para actualizar una bodega
router.put('/bodega/:id', async (req, res) => {
    try {
        const bodegaId = req.params.id;
        const bodega = await Bodega.findByPk(bodegaId);

        if (!bodega) {
            return res.status(404).json({ error: 'Bodega no encontrada' });
        }

        const { nombre, fechaInaguracion } = req.body;
        await bodega.update({
            nombre,
            fechaInaguracion
        });

        res.json(bodega);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al actualizar la bodega:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para eliminar una bodega
router.delete('/bodega/:id', async (req, res) => {
    try {
        const bodegaId = req.params.id;

        const bodega = await Bodega.findByPk(bodegaId);

        if (!bodega) {
            return res.status(404).json({ error: 'Bodega no encontrada' });
        }

        await bodega.destroy();
        res.json({ message: 'Bodega eliminada correctamente' });

    } catch (error) {
        console.error('Error al eliminar la bodega:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
