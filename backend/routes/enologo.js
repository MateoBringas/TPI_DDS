const express = require("express");
const router = express.Router();
const { Enologo } = require("../base-orm/sequelize-init"); // Asegúrate de que la ruta y el nombre son correctos
const { Op, ValidationError } = require("sequelize");

// Endpoint para todos los enólogos
router.get('/enologo', async (req, res) => {
    try {
        const enologos = await Enologo.findAll();
        res.json(enologos);
    } catch (error) {
        console.error('Error al obtener los enólogos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para enólogo por id
router.get('/enologo/:id', async (req, res) => {
    try {
        const enologoId = req.params.id;
        const enologo = await Enologo.findByPk(enologoId);
        if (enologo) {
            res.json(enologo);
        } else {
            res.status(404).json({ error: 'Enólogo no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el enólogo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para agregar un enólogo
router.post('/enologo', async (req, res) => {
    try {
        const { nombre, apellido, fechaNacimiento } = req.body;

        const nuevoEnologo = await Enologo.create({
            nombre,
            apellido,
            fechaNacimiento
        });

        res.status(201).json(nuevoEnologo);
    } catch (error) {
        console.error('Error al crear el nuevo enólogo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Actualizar enólogo
router.put('/enologo/:id', async (req, res) => {
    try {
        const enologo = await Enologo.findByPk(req.params.id);
        if (!enologo) {
            return res.status(404).json({ error: 'Enólogo no encontrado' });
        }

        const { nombre, apellido, fechaNacimiento } = req.body;
        await enologo.update({ nombre, apellido, fechaNacimiento });

        res.status(200).json(enologo);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el enólogo' });
    }
});

// Endpoint para eliminar un enólogo
router.delete('/enologo/:id', async (req, res) => {
    try {
        const enologoId = req.params.id;

        const enologo = await Enologo.findByPk(enologoId);

        if (!enologo) {
            return res.status(404).json({ error: 'Enólogo no encontrado' });
        }

        await enologo.destroy(); // Esto eliminará el enólogo y todas las reseñas asociadas
        res.json({ message: 'Enólogo eliminado correctamente' });

    } catch (error) {
        console.error('Error al eliminar el enólogo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


module.exports = router;
