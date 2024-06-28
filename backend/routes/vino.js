const express = require('express');
const router = express.Router();
const { Vino } = require('../base-orm/sequelize-init'); // Asegúrate de que el nombre y la ruta son correctos

// Endpoint para todas los vinos
router.get('/vino', async (req, res) => {
    try {
        const vinos = await Vino.findAll();
        res.json(vinos);
    } catch (error) {
        console.error('Error al obtener los vinos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para vino por id
router.get('/vino/:id', async (req, res) => {
    try {
        const vinoId = req.params.id;
        const vino = await Vino.findByPk(vinoId);
        if (vino) {
            res.json(vino);
        } else {
            res.status(404).json({ error: 'Vino no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el vino:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para agregar un vino
router.post('/vino', async (req, res) => {
    try {
        const { nombre, anejamiento, BodegaId } = req.body;

        const nuevoVino = await Vino.create({
            nombre,
            anejamiento,
            BodegaId
        });

        res.status(201).json(nuevoVino);
    } catch (error) {
        console.error('Error al crear el nuevo vino:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para actualizar un vino
router.put('/vino/:id', async (req, res) => {
    try {
        const vinoId = req.params.id;
        const vino = await Vino.findByPk(vinoId);

        if (!vino) {
            return res.status(404).json({ error: 'Vino no encontrado' });
        }

        const { nombre, anejamiento, BodegaId } = req.body;
        await vino.update({
            nombre,
            anejamiento,
            BodegaId
        });

        res.json(vino);
    } catch (error) {
        console.error('Error al actualizar el vino:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para eliminar un vino
router.delete('/vino/:id', async (req, res) => {
    try {
        const vinoId = req.params.id;

        const vino = await Vino.findByPk(vinoId);

        if (!vino) {
            return res.status(404).json({ error: 'Vino no encontrado' });
        }

        await vino.destroy();
        res.json({ message: 'Vino eliminado correctamente' });

    } catch (error) {
        console.error('Error al eliminar el vino:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
