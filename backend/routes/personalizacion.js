const express = require("express");
const router = express.Router();
const { Personalizacion } = require("../base-orm/sequelize-init");
const { Region } = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");


async function getPersonalizacionesConNombreRegions() {
    try {
        const personalizaciones = await Personalizacion.findAll({
            include: {
                model: Region,
                attributes: ['provincia', 'ciudad'], // Solo incluir provincia y ciudad de region
                as: 'Region'
            },
            attributes: ['id', 'nombre','fechaCreacion', 'RegionId', 'productos'] // Atributos del personalizacion a incluir
        });

        // Transformar los resultados a un formato más conveniente
        const resultados = personalizaciones.map(personalizacion => ({
            id: personalizacion.id,
            nombre,
            fechaCreacion: personalizacion.fechaCreacion,
            RegionId: personalizacion.RegionId,
            productos: personalizacion.productos,
            regionProvincia: personalizacion.Region.provincia,
            regionCiudad: personalizacion.Region.ciudad
        }));

        return resultados;
    } catch (error) {
        console.error('Error al obtener personalizaciones con nombres de regiones:', error);
        throw error;
    }
}

// Endpoint para todos los personalizaciones
router.get('/personalizacion', async (req, res) => {
    const { productos } = req.query;
    console.log('Productos:', productos);

    try {
        if (!productos) {
            // Si no se proporciona el parámetro 'productos', buscar todos los personalizaciones
            const personalizaciones = await Personalizacion.findAll();
            ////console.log('Personalizaciones:', personalizaciones);
            res.json(personalizaciones);
        } else {
            // Si se proporciona el parámetro 'productos', filtrar por ese comentario
            const personalizaciones = await Personalizacion.findAll({
                where: {
                    productos: {
                        [Op.like]: `%${productos}%`
                    }
                }
            });
            res.json(personalizaciones);
        }
    } catch (error) {
        console.error('Error al buscar personalizaciones:', error);
        res.status(500).json({ error: 'Error al buscar personalizaciones' });
    }
});

// Endpoint para personalizacion por id
router.get('/personalizacion/:id', async (req, res) => {
    try {
        const personalizacionId = req.params.id;
        const personalizacion = await Personalizacion.findByPk(personalizacionId);
        if (personalizacion) {
            res.json(personalizacion);
        } else {
            res.status(404).json({ error: 'Personalizacion no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el personalizacion:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Endpoint para agregar un personalizacion
router.post('/personalizacion', async (req, res) => {
    try {
        const { nombre, fechaCreacion, RegionId, productos } = req.body;

        const nuevoPersonalizacion = await Personalizacion.create({
            nombre,
            fechaCreacion,
            RegionId,
            productos
        });

        res.status(201).json(nuevoPersonalizacion);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al crear el nuevo personalizacion:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para actualizar un personalizacion
router.put('/personalizacion/:id', async (req, res) => {
    try {
        const personalizacionId = req.params.id;
        const personalizacion = await Personalizacion.findByPk(personalizacionId);

        if (!personalizacion) {
            return res.status(404).json({ error: 'Personalizacion no encontrado' });
        }

        const { nombre, fechaCreacion, RegionId, productos } = req.body;
        await personalizacion.update({
            nombre,
            fechaCreacion,
            RegionId,
            productos
        });

        res.json(personalizacion);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
            res.status(400).json({ error: 'Error de validación' });
        } else {
            console.error('Error al actualizar el personalizacion:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});

// Endpoint para eliminar un personalizacion
router.delete('/personalizacion/:id', async (req, res) => {
    try {
        const personalizacionId = req.params.id;
        const personalizacion = await Personalizacion.findByPk(personalizacionId);

        if (!personalizacion) {
            return res.status(404).json({ error: 'Personalizacion no encontrado' });
        }

        await personalizacion.destroy();
        res.json({ message: 'Personalizacion eliminado correctamente' });

    } catch (error) {
        console.error('Error al eliminar el personalizacion:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
