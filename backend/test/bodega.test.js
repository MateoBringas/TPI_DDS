const { describe, expect, beforeAll, afterAll } = require("@jest/globals");
const request = require("supertest");
const { sequelize, Bodega } = require("../base-orm/sequelize-init");
const app = require("../index");

let server;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  server = app.listen(4000);

  // Insertar datos de prueba
  await Bodega.bulkCreate([
    { nombre: "Norton", fechaInauguracion: "1980-05-15" },
    { nombre: "Santa Julia", fechaInauguracion: "1950-09-01" },
  ]);
});

afterAll(async () => {
  await sequelize.close();
  await server.close();
});

describe("GET /bodega", function () {
  it("Respuesta OK con Código 200 y lista de bodegas", async () => {
    const res = await request(app).get("/bodega");
    expect(res.statusCode).toEqual(200);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          nombre: expect.any(String),
          fechaInauguracion: expect.any(String),
        }),
      ])
    );
  });

  it("Respuesta OK con Código 200 y bodega específica", async () => {
    const bodegaId = 1; // Suponiendo que el primer ID es 1
    const res = await request(app).get(`/bodega/${bodegaId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.body).toEqual(
      expect.objectContaining({
        id: bodegaId,
        nombre: "Norton",
        fechaInauguracion: "1980-05-15",
      })
    );
  });

  it("Respuesta con Código 404 y mensaje 'Bodega no encontrada'", async () => {
    const res = await request(app).get("/bodega/9999");
    expect(res.statusCode).toEqual(404);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.body).toEqual(
      expect.objectContaining({
        error: "Bodega no encontrada",
      })
    );
  });
});

describe("DELETE /bodega/:id", function () {
  it("Respuesta con Código 404 y mensaje 'Bodega no encontrada'", async () => {
    const res = await request(app).delete("/bodega/9999");
    expect(res.statusCode).toEqual(404);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.body).toEqual(
      expect.objectContaining({
        error: "Bodega no encontrada",
      })
    );
  });

  it("Respuesta con Código 200 y mensaje 'Bodega eliminada correctamente'", async () => {
    const bodegaId = 1; // Suponiendo que el primer ID es 1
    const res = await request(app).delete(`/bodega/${bodegaId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.body).toEqual(
      expect.objectContaining({
        message: "Bodega eliminada correctamente",
      })
    );
  });
});

describe("POST /bodega", function () {
  it("Respuesta con Código 201 y crea una nueva bodega", async () => {
    const res = await request(app).post("/bodega").send({
      nombre: "Bodega Nueva",
      fechaInauguracion: "2023-01-01",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        nombre: "Bodega Nueva",
        fechaInauguracion: "2023-01-01",
      })
    );
  });
});

describe("PUT /bodega/:id", function () {
  it("Respuesta con Código 404 y mensaje 'Bodega no encontrada'", async () => {
    const res = await request(app).put("/bodega/9999").send({
      nombre: "Bodega Actualizada",
      fechaInauguracion: "2023-01-01",
    });
    expect(res.statusCode).toEqual(404);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.body).toEqual(
      expect.objectContaining({
        error: "Bodega no encontrada",
      })
    );
  });

  it("Respuesta con Código 200 y actualiza una bodega", async () => {
    const bodegaId = 1; // Suponiendo que el primer ID es 1
    const res = await request(app).put(`/bodega/${bodegaId}`).send({
      nombre: "Norton Actualizado",
      fechaInauguracion: "1985-10-20",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.body).toEqual(
      expect.objectContaining({
        id: bodegaId,
        nombre: "Norton Actualizado",
        fechaInauguracion: "1985-10-20",
      })
    );
  });
});
