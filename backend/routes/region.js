const express = require("express");
const router = express.Router();
const { Region } = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

// Endpoint para filtrar regiones por provincia
router.get('/region', async (req, res) => {
    const { provincia } = req.query;

    try {
        if (!provincia) {
            // Si no se proporciona el parámetro 'provincia', buscar todos los regiones
            const regiones = await Region.findAll();
            res.json(regiones);
        } else {
            // Si se proporciona el parámetro 'provincia', filtrar por ese provincia
            const regiones = await Region.findAll({
                where: {
                    provincia: {
                        [Op.like]: `%${provincia}%`
                    }
                }
            });
            res.json(regiones);
        }
    } catch (error) {
        console.error('Error al buscar regiones:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para region por id
router.get('/region/:id', async (req, res) => {
    try {
        const regionId = req.params.id;
        const region = await Region.findByPk(regionId);
        if (region) {
            res.json(region);
        } else {
            res.status(404).json({ error: 'Region no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el region:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para agregar un region
router.post('/region', async (req, res) => {
    try {
        const { provincia, ciudad, fechaRegistro } = req.body;

        const nuevoRegion = await Region.create({
            provincia,
            ciudad,
            fechaRegistro
        });

        res.status(201).json(nuevoRegion);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al crear el nuevo region:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para actualizar un region
router.put('/region/:id', async (req, res) => {
    try {
        const regionId = req.params.id;
        const region = await Region.findByPk(regionId);

        if (!region) {
            return res.status(404).json({ error: 'Region no encontrado' });
        }

        const { provincia, ciudad, fechaRegistro } = req.body;
        await region.update({
            provincia,
            ciudad,
            fechaRegistro
        });

        res.json(region);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al actualizar el region:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para eliminar un region
router.delete('/region/:id', async (req, res) => {
    try {
        const regionId = req.params.id;
        const region = await Region.findByPk(regionId);

        if (!region) {
            return res.status(404).json({ error: 'Region no encontrado' });
        }

        await region.destroy();
        res.json({ message: 'Region eliminado correctamente' });

    } catch (error) {
        console.error('Error al eliminar el region:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;