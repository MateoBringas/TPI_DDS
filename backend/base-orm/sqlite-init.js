const db = require("aa-sqlite");
const { Sequelize, DataTypes } = require("sequelize");

// Definición del modelo de Enologo
const Enologo = {
  nombre: "enologos",
  sql: `CREATE TABLE enologos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          apellido TEXT NOT NULL,
          fechaNacimiento DATE NOT NULL
        );`,
  datos: `INSERT INTO enologos (nombre, apellido, fechaNacimiento) VALUES
    ('Juan', 'García', '1980-05-15'),
    ('María', 'López', '1975-11-23'),
    ('Pedro', 'Martínez', '1982-09-30'),
    ('Laura', 'Gómez', '1978-07-18'),
    ('Andrés', 'Díaz', '1985-03-25'),
    ('Ana', 'Fernández', '1981-12-12'),
    ('Carlos', 'Ramírez', '1979-08-05'),
    ('Sofía', 'Pérez', '1983-04-28'),
    ('Javier', 'Ruiz', '1984-10-10'),
    ('Elena', 'Sánchez', '1986-06-20');`,
};

// Definición del modelo de Resenia
const Resenia = {
  nombre: "resenia",
  sql: `CREATE TABLE resenia (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          puntuacion INTEGER NOT NULL,
          comentario TEXT,
          fecha DATE NOT NULL,
          EnologoId INTEGER NOT NULL,
          FOREIGN KEY (EnologoId) REFERENCES enologos(id)
        );`,
  datos: `INSERT INTO resenia (puntuacion, comentario, fecha, EnologoId) VALUES
    (4, 'Muy buen vino, excelente aroma.', '2023-05-10', 1),
    (5, 'Un vino excepcional, gran sabor.', '2023-05-12', 2),
    (3, 'Buen vino, pero un poco ácido.', '2023-05-15', 3),
    (4, 'Me gustó mucho este vino, lo recomiendo.', '2023-05-18', 4),
    (5, 'El mejor vino que he probado, impresionante.', '2023-05-20', 5),
    (3, 'Vino con un sabor interesante.', '2023-05-22', 1),
    (4, 'Aromas intensos y buen cuerpo.', '2023-05-25', 2),
    (5, 'Increíble balance de sabores.', '2023-05-28', 3),
    (4, 'Final largo y persistente.', '2023-06-01', 4),
    (3, 'Le falta un poco de cuerpo.', '2023-06-03', 5);`,
};

// Definición del modelo de Bodega
const Bodega = {
  nombre: "bodegas",
  sql: `CREATE TABLE bodegas (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          fechaInauguracion DATE NOT NULL
        );`,
  datos: `INSERT INTO bodegas (nombre, fechaInauguracion) VALUES
           ('Chateau Lafite Rothschild', '1787-01-01'),
            ('Catena Zapata', '1902-03-01'),
            ('Norton', '1895-04-12'),
            ('Opus One Winery', '1979-07-04'),
            ('Domaine de la Romanée-Conti', '1232-10-15'),
            ('Vega Sicilia', '1864-12-25'),
            ('Antinori', '1385-09-08'),
            ('Penfolds', '1844-06-30'),
            ('Torres', '1870-11-20'),
            ('Luigi Bosca', '1901-02-14');`,
};

// Definición del modelo de Vino
const Vino = {
  nombre: "vinos",
  sql: `CREATE TABLE vinos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          anejamiento DATE NOT NULL,
          BodegaId INTEGER NOT NULL,
          FOREIGN KEY (BodegaId) REFERENCES bodegas(id) ON DELETE CASCADE
        );`,
  datos: `INSERT INTO vinos (nombre, anejamiento, BodegaId) VALUES
          ('Vino Tinto Reserva', '2015-01-01', 1),
          ('Vino Blanco Semi Seco', '2018-02-15', 2),
          ('Vino Rosado Joven', '2020-05-20', 3),
          ('Vino Espumoso Brut', '2017-11-10', 4),
          ('Vino Dulce Moscatel', '2019-09-05', 5),
          ('Vino Tinto Gran Reserva', '2012-04-03', 6),
          ('Vino Blanco Extra Seco', '2016-08-20', 7),
          ('Vino Rosado Crianza', '2018-12-15', 8),
          ('Vino Espumoso Extra Brut', '2015-06-30', 9),
          ('Vino Dulce Pedro Ximénez', '2021-02-10', 10);`,
};

// Definición del modelo de Cliente
const Cliente = {
  nombre: "clientes",
  sql: `CREATE TABLE clientes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          apellido TEXT NOT NULL,
          fechaRegistro DATE NOT NULL
        );`,
  datos: `INSERT INTO clientes (nombre, apellido, fechaRegistro) VALUES
          ('Carlos', 'Hernandez', '2021-01-15'),
          ('Ana', 'Rodriguez', '2020-02-20'),
          ('Miguel', 'Perez', '2019-03-25'),
          ('Laura', 'Gonzalez', '2018-04-30'),
          ('Luis', 'Martinez', '2022-05-10'),
          ('Lucia', 'Fernandez', '2021-06-20'),
          ('Javier', 'Lopez', '2020-07-15'),
          ('Marta', 'Garcia', '2019-08-18'),
          ('Pedro', 'Diaz', '2018-09-05'),
          ('Sofia', 'Sanchez', '2022-10-12');`,
};

// Definición del modelo de Pedido
const Pedido = {
  nombre: "pedidos",
  sql: `CREATE TABLE pedidos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
            fechaPedido DATE NOT NULL,
            ClienteId INTEGER,
            comentarios TEXT,
            FOREIGN KEY (ClienteId) REFERENCES Clientes(id)
        );`,
  datos: `INSERT INTO pedidos (fechaPedido, ClienteId, comentarios) VALUES
          ('2022-03-10', 1, 'Pedido entregado a tiempo y en perfectas condiciones.'),
          ('2022-04-15', 2, 'Cliente solicita entrega rápida.'),
          ('2022-05-20', 3, 'Pedido retrasado debido a problemas logísticos.'),
          ('2022-06-25', 4, 'Cliente muy satisfecho con el servicio.'),
          ('2022-07-30', 5, 'Pedido entregado sin problemas.'),
          ('2022-08-15', 6, 'Cliente reporta una botella rota.'),
          ('2022-09-20', 7, 'Cliente solicita devolución.'),
          ('2022-10-25', 8, 'Pedido entregado antes de lo esperado.'),
          ('2022-11-30', 9, 'Cliente satisfecho con el producto.'),
          ('2022-12-15', 10, 'Cliente menciona que el embalaje estaba dañado.');`,
};
async function CrearBaseSiNoExiste() {
  try {
    // abrir base, si no existe el archivo/base lo crea
    await db.open("./.data/programa.db");

    // Verificar y crear las tablas según los modelos
    await Promise.all([
      crearTablaSiNoExiste(Enologo),
      crearTablaSiNoExiste(Resenia),
      crearTablaSiNoExiste(Bodega),
      crearTablaSiNoExiste(Vino),
      crearTablaSiNoExiste(Cliente),
      crearTablaSiNoExiste(Pedido),
    ]);

    // Agregar datos iniciales si las tablas están recién creadas
    await Promise.all([
      agregarDatosSiNoExisten(Enologo),
      agregarDatosSiNoExisten(Resenia),
      agregarDatosSiNoExisten(Bodega),
      agregarDatosSiNoExisten(Vino),
      agregarDatosSiNoExisten(Cliente),
      agregarDatosSiNoExisten(Pedido),
    ]);

    // cerrar la base
    await db.close();
  } catch (error) {
    console.error("Error al crear la base de datos:", error);
  }
}

// Función para crear la tabla si no existe
async function crearTablaSiNoExiste(modelo) {
  let existe = await tablaExiste(modelo.nombre);
  if (!existe) {
    await db.run(modelo.sql);
    console.log(`Tabla ${modelo.nombre} creada!`);
  }
}

// Función para verificar si la tabla ya existe
async function tablaExiste(nombreTabla) {
  let res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= ?",
    [nombreTabla]
  );
  return res.contar > 0;
}

// Función para agregar datos si no existen registros
async function agregarDatosSiNoExisten(modelo) {
  let res = await db.get(`SELECT count(*) as contar FROM ${modelo.nombre}`);
  if (res.contar === 0 && modelo.datos.trim().length > 0) {
    await db.run(modelo.datos);
    console.log(`Datos agregados a la tabla ${modelo.nombre}!`);
  }
}

CrearBaseSiNoExiste();

module.exports = CrearBaseSiNoExiste;
