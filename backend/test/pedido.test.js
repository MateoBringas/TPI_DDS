const { describe, expect, beforeAll, afterAll } = require("@jest/globals");
const request = require("supertest");
const { sequelize, Pedido, Cliente } = require("../base-orm/sequelize-init");
const app = require("../index");

let server;

beforeAll(async () => {
  await sequelize.sync({ force: true });
  server = app.listen(4000);

  // Insertar datos de prueba
  const cliente = await Cliente.create({
    nombre: "Test",
    apellido: "User",
    fechaRegistro: "2022-01-01",
  });

  await Pedido.bulkCreate([
    { fechaPedido: "2022-01-01", ClienteId: cliente.id, comentarios: "Test comentario 1" },
    { fechaPedido: "2023-01-01", ClienteId: cliente.id, comentarios: "Test comentario 2" },
  ]);
});

afterAll(async () => {
  await sequelize.close();
  await server.close();
});

describe("GET /pedido", function () {
  it("Respuesta OK con Código 200 y lista de pedidos", async () => {
    const res = await request(app).get("/pedido");
    expect(res.statusCode).toEqual(200);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          fechaPedido: expect.any(String),
          ClienteId: expect.any(Number),
          comentarios: expect.any(String),
        }),
      ])
    );
  });

  it("Respuesta OK con Código 200 y pedido específico", async () => {
    const pedidoId = 1; // Suponiendo que el primer ID es 1
    const res = await request(app).get(`/pedido/${pedidoId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.body).toEqual(
      expect.objectContaining({
        id: pedidoId,
        fechaPedido: "2022-01-01",
        ClienteId: expect.any(Number),
        comentarios: "Test comentario 1",
      })
    );
  });

  it("Respuesta con Código 404 y mensaje 'Pedido no encontrado'", async () => {
    const res = await request(app).get("/pedido/9999");
    expect(res.statusCode).toEqual(404);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.body).toEqual(
      expect.objectContaining({
        error: "Pedido no encontrado",
      })
    );
  });
});

describe("POST /pedido", function () {
  it("Respuesta con Código 201 y crea un nuevo pedido", async () => {
    const cliente = await Cliente.create({
      nombre: "Nuevo",
      apellido: "Cliente",
      fechaRegistro: "2023-01-01",
    });

    const res = await request(app).post("/pedido").send({
      fechaPedido: "2023-01-01",
      ClienteId: cliente.id,
      comentarios: "Nuevo pedido",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        fechaPedido: "2023-01-01",
        ClienteId: cliente.id,
        comentarios: "Nuevo pedido",
      })
    );
  });
});

describe("PUT /pedido/:id", function () {
  it("Respuesta con Código 404 y mensaje 'Pedido no encontrado'", async () => {
    const res = await request(app).put("/pedido/9999").send({
      fechaPedido: "2023-01-01",
      ClienteId: 1,
      comentarios: "Pedido actualizado",
    });
    expect(res.statusCode).toEqual(404);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.body).toEqual(
      expect.objectContaining({
        error: "Pedido no encontrado",
      })
    );
  });

  it("Respuesta con Código 200 y actualiza un pedido", async () => {
    const cliente = await Cliente.create({
      nombre: "Otro",
      apellido: "Cliente",
      fechaRegistro: "2023-01-01",
    });

    const pedido = await Pedido.create({
      fechaPedido: "2023-01-01",
      ClienteId: cliente.id,
      comentarios: "Pedido inicial",
    });

    const res = await request(app).put(`/pedido/${pedido.id}`).send({
      fechaPedido: "2023-01-01",
      ClienteId: cliente.id,
      comentarios: "Pedido actualizado",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.body).toEqual(
      expect.objectContaining({
        id: pedido.id,
        fechaPedido: "2023-01-01",
        ClienteId: cliente.id,
        comentarios: "Pedido actualizado",
      })
    );
  });
});

describe("DELETE /pedido/:id", function () {
  it("Respuesta con Código 404 y mensaje 'Pedido no encontrado'", async () => {
    const res = await request(app).delete("/pedido/9999");
    expect(res.statusCode).toEqual(404);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.body).toEqual(
      expect.objectContaining({
        error: "Pedido no encontrado",
      })
    );
  });

  it("Respuesta con Código 200 y mensaje 'Pedido eliminado correctamente'", async () => {
    const cliente = await Cliente.create({
      nombre: "Cliente Eliminado",
      apellido: "Test",
      fechaRegistro: "2022-01-01",
    });

    const pedido = await Pedido.create({
      fechaPedido: "2022-01-01",
      ClienteId: cliente.id,
      comentarios: "Pedido a eliminar",
    });

    const res = await request(app).delete(`/pedido/${pedido.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.body).toEqual(
      expect.objectContaining({
        message: "Pedido eliminado correctamente",
      })
    );
  });
});
