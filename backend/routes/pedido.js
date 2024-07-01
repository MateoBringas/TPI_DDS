const express = require("express");
const router = express.Router();
const { Pedido } = require("../base-orm/sequelize-init");
const { Cliente } = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");


async function getPedidosConNombreClientes() {
    try {
        const pedidos = await Pedido.findAll({
            include: {
                model: Cliente,
                attributes: ['nombre', 'apellido'], // Solo incluir nombre y apellido del cliente
                as: 'Cliente'
            },
            attributes: ['id', 'fechaPedido', 'ClienteId', 'comentarios'] // Atributos del pedido a incluir
        });

        // Transformar los resultados a un formato más conveniente
        const resultados = pedidos.map(pedido => ({
            id: pedido.id,
            fechaPedido: pedido.fechaPedido,
            ClienteId: pedido.ClienteId,
            comentarios: pedido.comentarios,
            clienteNombre: pedido.Cliente.nombre,
            clienteApellido: pedido.Cliente.apellido
        }));

        return resultados;
    } catch (error) {
        console.error('Error al obtener pedidos con nombres de clientes:', error);
        throw error;
    }
}

// Endpoint para todos los pedidos
router.get('/pedido', async (req, res) => {
    const { comentarios } = req.query;
    console.log('Comentarios:', comentarios);

    try {
        if (!comentarios) {
            // Si no se proporciona el parámetro 'comentarios', buscar todos los pedidos
            const pedidos = await Pedido.findAll();
            ////console.log('Pedidos:', pedidos);
            res.json(pedidos);
        } else {
            // Si se proporciona el parámetro 'comentarios', filtrar por ese comentario
            const pedidos = await Pedido.findAll({
                where: {
                    comentarios: {
                        [Op.like]: `%${comentarios}%`
                    }
                }
            });
            res.json(pedidos);
        }
    } catch (error) {
        console.error('Error al buscar pedidos:', error);
        res.status(500).json({ error: 'Error al buscar pedidos' });
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
