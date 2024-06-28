const express = require("express");
const router = express.Router();
const { Resenia } = require("../base-orm/sequelize-init"); // Asegúrate de que la ruta y el nombre son correctos
const { Op, ValidationError } = require("sequelize");

// Endpoint para todas las reseñas
router.get('/resenia', async (req, res) => {
    try {
        const resenias = await Resenia.findAll();
        res.json(resenias);
    } catch (error) {
        console.error('Error al obtener las reseñas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para reseña por id
router.get('/resenia/:id', async (req, res) => {
    try {
        const reseniaId = req.params.id;
        const resenia = await Resenia.findByPk(reseniaId, {
            include: [{
                model: Enologo,
                attributes: ['id', 'nombre', 'apellido']
            }]
        });

        if (resenia) {
            res.json(resenia);
        } else {
            res.status(404).json({ error: 'Reseña no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener la reseña:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para agregar una reseña
router.post('/resenia', async (req, res) => {
    try {
        const { puntuacion, comentario, fecha, EnologoId } = req.body;

        const nuevaResenia = await Resenia.create({
            puntuacion,
            comentario,
            fecha,
            EnologoId
        });

        res.status(201).json(nuevaResenia);
    } catch (error) {
        console.error('Error al crear la nueva reseña:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para actualizar una reseña
router.put('/resenia/:id', async (req, res) => {
    try {
        const reseniaId = req.params.id;
        const resenia = await Resenia.findByPk(reseniaId);

        if (!resenia) {
            return res.status(404).json({ error: 'Reseña no encontrada' });
        }

        const { puntuacion, comentario, fecha, EnologoId } = req.body;
        await resenia.update({
            puntuacion,
            comentario,
            fecha,
            EnologoId
        });

        res.json(resenia);
    } catch (error) {
        console.error('Error al actualizar la reseña:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para eliminar una reseña
router.delete('/resenia/:id', async (req, res) => {
    try {
        const reseniaId = req.params.id;

        const resenia = await Resenia.findByPk(reseniaId);

        if (!resenia) {
            return res.status(404).json({ error: 'Reseña no encontrada' });
        }

        await resenia.destroy();
        res.json({ message: 'Reseña eliminada correctamente' });

    } catch (error) {
        console.error('Error al eliminar la reseña:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
