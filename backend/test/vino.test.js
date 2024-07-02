const { describe, expect, beforeAll, afterAll, it } = require("@jest/globals");
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
  server.close();
});

describe("Pruebas de Endpoints de Vino", () => {
  describe("GET /vino", () => {
    it("debería obtener una respuesta OK con Código 200 y una lista de vinos", async () => {
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

    it("debería obtener una respuesta OK con Código 200 y un vino específico", async () => {
      const vino = await Vino.findOne({ where: { nombre: "Vino Tinto" } });
      const res = await request(app).get(`/vino/${vino.id}`);
      expect(res.statusCode).toEqual(200);
      expect(res.headers["content-type"]).toEqual(
        "application/json; charset=utf-8"
      );
      expect(res.body).toEqual(
        expect.objectContaining({
          id: vino.id,
          nombre: "Vino Tinto",
          anejamiento: "2015-06-01",
          BodegaId: expect.any(Number),
        })
      );
    });

    it("debería obtener una respuesta con Código 404 y mensaje 'Vino no encontrado' si el vino no existe", async () => {
      const res = await request(app).get("/vino/9999");
      expect(res.statusCode).toEqual(404);
      expect(res.headers["content-type"]).toEqual(
        "application/json; charset=utf-8"
      );
      expect(res.body).toEqual({
        error: "Vino no encontrado",
      });
    });
  });

  describe("POST /vino", () => {
    it("debería obtener una respuesta con Código 201 y crear un nuevo vino", async () => {
      const bodega = await Bodega.create({
        nombre: "Nueva Bodega",
        fechaInauguracion: "2000-01-01",
      });

      const res = await request(app).post("/vino").send({
        nombre: "Nuevo Vino",
        anejamiento: "2010-01-01",
        BodegaId: bodega.id,
      });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("id");
    });
  });

  describe("PUT /vino/:id", () => {
    it("debería obtener una respuesta con Código 200 y actualizar un vino existente", async () => {
      const bodega = await Bodega.create({
        nombre: "Otra Bodega",
        fechaInauguracion: "2005-05-01",
      });

      const vino = await Vino.create({
        nombre: "Vino a Actualizar",
        anejamiento: "2015-01-01",
        BodegaId: bodega.id,
      });

      const res = await request(app).put(`/vino/${vino.id}`).send({
        nombre: "Vino Actualizado",
        anejamiento: "2016-01-01",
        BodegaId: bodega.id,
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("nombre", "Vino Actualizado");
    });
  });

  describe("DELETE /vino/:id", () => {
    it("debería obtener una respuesta con Código 200 y el mensaje 'Vino eliminado correctamente'", async () => {
      const bodega = await Bodega.create({
        nombre: "Bodega a Eliminar",
        fechaInauguracion: "2000-01-01",
      });

      const vino = await Vino.create({
        nombre: "Vino a Eliminar",
        anejamiento: "2010-01-01",
        BodegaId: bodega.id,
      });

      const res = await request(app).delete(`/vino/${vino.id}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
        mensaje: "Vino eliminado correctamente",
      });
    });
  });
});
