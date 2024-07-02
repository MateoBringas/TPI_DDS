const { describe, expect, beforeAll, afterAll } = require("@jest/globals");
const request = require("supertest");
const { sequelize, Cliente } = require("../base-orm/sequelize-init");
const app = require("../index");

let server;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  server = app.listen(4000);

  // Insertar datos de prueba
  await Cliente.bulkCreate([
    { nombre: "Carlos", apellido: "Hernandez", fechaRegistro: "2021-01-15" },
    { nombre: "Ana", apellido: "Rodriguez", fechaRegistro: "2020-02-20" },
  ]);
});

afterAll(async () => {
  await sequelize.close();
  await server.close();
});

describe("GET /cliente", function () {
  it("Respuesta OK con Código 200 y lista de clientes", async () => {
    const res = await request(app).get("/cliente");
    expect(res.statusCode).toEqual(200);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          nombre: expect.any(String),
          apellido: expect.any(String),
          fechaRegistro: expect.any(String),
        }),
      ])
    );
  });

  it("Respuesta OK con Código 200 y cliente específico", async () => {
    const clienteId = 1; // Suponiendo que el primer ID es 1
    const res = await request(app).get(`/cliente/${clienteId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.body).toEqual(
      expect.objectContaining({
        id: clienteId,
        nombre: "Carlos",
        apellido: "Hernandez",
        fechaRegistro: "2021-01-15",
      })
    );
  });

  it("Respuesta con Código 404 y mensaje 'Cliente no encontrado'", async () => {
    const res = await request(app).get("/cliente/9999");
    expect(res.statusCode).toEqual(404);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.body).toEqual(
      expect.objectContaining({
        error: "Cliente no encontrado",
      })
    );
  });
});

describe("DELETE /cliente/:id", function () {
  it("Respuesta con Código 404 y mensaje 'Cliente no encontrado'", async () => {
    const res = await request(app).delete("/cliente/9999");
    expect(res.statusCode).toEqual(404);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.body).toEqual(
      expect.objectContaining({
        error: "Cliente no encontrado",
      })
    );
  });

  it("Respuesta con Código 200 y mensaje 'Cliente eliminado correctamente'", async () => {
    const clienteId = 1; // Suponiendo que el primer ID es 1
    const res = await request(app).delete(`/cliente/${clienteId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.body).toEqual(
      expect.objectContaining({
        message: "Cliente eliminado correctamente",
      })
    );
  });
});

describe("POST /cliente", function () {
  it("Respuesta con Código 201 y crea un nuevo cliente", async () => {
    const res = await request(app).post("/cliente").send({
      nombre: "Pedro",
      apellido: "Gomez",
      fechaRegistro: "2023-01-01",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        nombre: "Pedro",
        apellido: "Gomez",
        fechaRegistro: "2023-01-01",
      })
    );
  });
});

describe("PUT /cliente/:id", function () {
  it("Respuesta con Código 404 y mensaje 'Cliente no encontrado'", async () => {
    const res = await request(app).put("/cliente/9999").send({
      nombre: "Luis",
      apellido: "Martinez",
      fechaRegistro: "2023-01-01",
    });
    expect(res.statusCode).toEqual(404);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.body).toEqual(
      expect.objectContaining({
        error: "Cliente no encontrado",
      })
    );
  });

  it("Respuesta con Código 200 y actualiza un cliente", async () => {
    const clienteId = 1; // Suponiendo que el primer ID es 1
    const res = await request(app).put(`/cliente/${clienteId}`).send({
      nombre: "Carlos Actualizado",
      apellido: "Hernandez",
      fechaRegistro: "2021-01-15",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.body).toEqual(
      expect.objectContaining({
        id: clienteId,
        nombre: "Carlos Actualizado",
        apellido: "Hernandez",
        fechaRegistro: "2021-01-15",
      })
    );
  });
});
