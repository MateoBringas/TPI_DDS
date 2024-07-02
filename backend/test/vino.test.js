const { describe, expect, beforeAll, afterAll } = require("@jest/globals");
const request = require("supertest");
const { sequelize, Vino, Bodega } = require("../base-orm/sequelize-init"); // Ajusta la ruta y asegúrate de que los modelos sean correctos
const app = require("../index"); // Ajusta la ruta del archivo principal de la aplicación

let server;

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Reinicia la base de datos para asegurarte de que las tablas están actualizadas
  server = app.listen(4000);

  // Insertar datos de prueba
  const bodega = await Bodega.create({
    nombre: "Bodega de Prueba",
    fechaInauguracion: "1980-05-15", // Ajusta según la estructura de tu modelo de Bodega
  });

  await Vino.bulkCreate([
    { nombre: "Vino Tinto", anejamiento: "2015-06-01", BodegaId: bodega.id },
    { nombre: "Vino Blanco", anejamiento: "2018-03-15", BodegaId: bodega.id },
  ]);
});

afterAll(async () => {
  await sequelize.close();
  await server.close();
});

describe("GET /vino", function () {
  it("Respuesta OK con Código 200 y lista de vinos", async () => {
    const res = await request(app).get("/vino");
    expect(res.statusCode).toEqual(200);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          nombre: expect.any(String),
          anejamiento: expect.any(String),
          BodegaId: expect.any(Number),
        }),
      ])
    );
  });

  it("Respuesta OK con Código 200 y vino específico", async () => {
    const res = await request(app).get("/vino/1");
    expect(res.statusCode).toEqual(200);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.body).toEqual(
      expect.objectContaining({
        id: 1,
        nombre: "Vino Tinto",
        anejamiento: "2015-06-01",
        BodegaId: expect.any(Number),
      })
    );
  });

  it("Respuesta con Código 404 y mensaje 'Vino no encontrado'", async () => {
    const res = await request(app).get("/vino/9999");
    expect(res.statusCode).toEqual(404);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.body).toEqual(
      expect.objectContaining({
        error: "Vino no encontrado",
      })
    );
  });
});

describe("POST /vino", function () {
  it("Respuesta con Código 201 y crea un nuevo vino", async () => {
    const bodega = await Bodega.create({
      nombre: "Nueva Bodega",
      anejamiento: "2000-01-01",
    });

    const res = await request(app).post("/vino").send({
      nombre: "Vino Rosado",
      anejamiento: "2020-08-01",
      BodegaId: bodega.id,
    });

    expect(res.statusCode).toEqual(201);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.body).toEqual(
      expect.objectContaining({
        nombre: "Vino Rosado",
        anejamiento: "2020-08-01",
        BodegaId: bodega.id,
      })
    );
  });
});

describe("PUT /vino/:id", function () {
  it("Respuesta con Código 404 y mensaje 'Vino no encontrado'", async () => {
    const res = await request(app).put("/vino/9999").send({
      nombre: "Vino Modificado",
      anejamiento: "2021-01-01",
      BodegaId: 1, // Suponiendo que 1 es un ID válido de Bodega
    });
    expect(res.statusCode).toEqual(404);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.body).toEqual(
      expect.objectContaining({
        error: "Vino no encontrado",
      })
    );
  });

  it("Respuesta con Código 200 y actualiza un vino", async () => {
    // Primero, crea un vino para actualizar
    const bodega = await Bodega.create({
      nombre: "Otra Bodega",
      anejamiento: "2005-05-01",
    });

    const vino = await Vino.create({
      nombre: "Vino Espumoso",
      anejamiento: "2016-09-15",
      BodegaId: bodega.id,
    });

    // Ahora actualiza el vino creado
    const res = await request(app).put(`/vino/${vino.id}`).send({
      nombre: "Vino Espumoso Modificado",
      anejamiento: "2017-02-01",
      BodegaId: bodega.id,
    });

    expect(res.statusCode).toEqual(200);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.body).toEqual(
      expect.objectContaining({
        id: vino.id,
        nombre: "Vino Espumoso Modificado",
        anejamiento: "2017-02-01",
        BodegaId: bodega.id,
      })
    );
  });
});

describe("DELETE /vino/:id", function () {
  it("Respuesta con Código 404 y mensaje 'Vino no encontrado'", async () => {
    const res = await request(app).delete("/vino/9999");
    expect(res.statusCode).toEqual(404);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.body).toEqual(
      expect.objectContaining({
        error: "Vino no encontrado",
      })
    );
  });

  it("Respuesta con Código 200 y mensaje 'Vino eliminado correctamente'", async () => {
    const bodega = await Bodega.create({
      nombre: "Bodega Eliminada",
      anejamiento: "2000-01-01",
    });

    const vino = await Vino.create({
      nombre: "Vino a Eliminar",
      anejamiento: "2015-05-10",
      BodegaId: bodega.id,
    });

    const res = await request(app).delete(`/vino/${vino.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.body).toEqual(
      expect.objectContaining({
        message: "Vino eliminado correctamente",
      })
    );
  });
});
