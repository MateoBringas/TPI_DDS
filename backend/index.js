const express = require("express");
const app = express();

console.clear();

require("./base-orm/sqlite-init"); // crear base si no existe

app.use(express.json()); // para poder leer json en el body

const cors = require("cors");
app.use(
    cors({
        origin: "*", // origin: 'https://dds-frontend.azurewebsites.net'
    })
);

// Controlar ruta principal
app.get("/", (req, res) => {
    res.send("dds-backend iniciado!<br>" +
        "Bodega <a href='http://localhost:4000/bodega'>http://localhost:4000/bodega</a><br>" +
        "Vino <a href='http://localhost:4000/vino'>http://localhost:4000/vino</a><br>" +
        "Reseña <a href='http://localhost:4000/resenia'>http://localhost:4000/resenia</a><br>" +
        "Enologo <a href='http://localhost:4000/enologo'>http://localhost:4000/enologo</a><br>" +
        "Cliente <a href='http://localhost:4000/cliente'>http://localhost:4000/cliente</a><br>" +
        "Pedido <a href='http://localhost:4000/pedido'>http://localhost:4000/pedido</a>");});

// Routes para los nuevos modelos
const enologoRouter = require("./routes/enologo");
const bodegaRouter = require("./routes/bodega");
const vinoRouter = require("./routes/vino");
const reseniaRouter = require("./routes/resenia");
const clienteRouter = require("./routes/cliente");
const pedidoRouter = require("./routes/pedido");

// Middleware para las nuevas rutas
app.use(enologoRouter);
app.use(reseniaRouter);
app.use(bodegaRouter);
app.use(vinoRouter);
app.use(clienteRouter);
app.use(pedidoRouter);

// Levantar servidor
if (!module.parent) {
    // si no es llamado por otro módulo, es decir, si es el módulo principal -> levantamos el servidor
    const port = process.env.PORT || 4000; // en producción se usa el puerto de la variable de entorno PORT
    app.locals.fechaInicio = new Date();
    app.listen(port, () => {
        console.log(`Servidor hosteado en http://localhost:${port}`);
    });
}

// module.exports = app; // para testing
