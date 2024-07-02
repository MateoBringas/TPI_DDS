const { describe, expect } = require('@jest/globals');
const request = require('supertest');
const { sequelize } = require('../base-orm/sequelize-init'); // Ajusta según tu configuración
const app = require('../index'); // Ajusta según tu configuración

let server;

beforeAll(async () => {
    await sequelize.sync({ force: true });
    server = app.listen(3000);
});

afterAll(async () => {
    await sequelize.close();
    await server.close();
});

describe("GET /enologo", function() {
    it("Respuesta OK con Código 200 y lista de enólogos", async () => {
        const res = await request(app).get("/enologo")
        expect(res.statusCode).toEqual(200)
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8")
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    nombre: expect.any(String),
                    apellido: expect.any(String),
                    fechaNacimiento: expect.any(String)
                })
            ])
        )
    });

    it("Respuesta OK con Código 200 y enólogo específico", async () => {
        const res = await request(app).get("/enologo/1")
        expect(res.statusCode).toEqual(200)
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8")
        expect(res.body).toEqual(
            expect.objectContaining({
                id: 1,
                nombre: "Juan",
                apellido: "García",
                fechaNacimiento: "1980-05-15"
            })
        )
    });

    it("Respuesta con Código 404 y mensaje 'Enólogo no encontrado'", async () => {
        const res = await request(app).get("/enologo/9999")
        expect(res.statusCode).toEqual(404)
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8")
        expect(res.body).toEqual(
            expect.objectContaining({
                error: "Enólogo no encontrado"
            })
        )
    });
});

describe("DELETE /enologo/:id", function() {
    it("Respuesta con Código 404 y mensaje 'Enólogo no encontrado'", async () => {
        const res = await request(app).delete("/enologo/9999")
        expect(res.statusCode).toEqual(404)
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8")
        expect(res.body).toEqual(
            expect.objectContaining({
                error: "Enólogo no encontrado"
            })
        )
    });

    it("Respuesta con Código 200 y mensaje 'Enólogo eliminado correctamente'", async () => {
        const res = await request(app).delete("/enologo/1")
        expect(res.statusCode).toEqual(200)
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8")
        expect(res.body).toEqual(
            expect.objectContaining({
                message: "Enólogo eliminado correctamente"
            })
        )
    });
});

describe("POST /enologo", function() {
    it("Respuesta con Código 201 y crea un nuevo enólogo", async () => {
        const res = await request(app).post("/enologo").send({
            nombre: "Carlos",
            apellido: "Pérez",
            fechaNacimiento: "1990-09-01"
        })
        expect(res.statusCode).toEqual(201)
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8")
        expect(res.body).toEqual(
            expect.objectContaining({
                nombre: "Carlos",
                apellido: "Pérez",
                fechaNacimiento: "1990-09-01"
            })
        )
    });
});

describe("PUT /enologo/:id", function() {
    it("Respuesta con Código 404 y mensaje 'Enólogo no encontrado'", async () => {
        const res = await request(app).put("/enologo/9999").send({
            nombre: "Carlos",
            apellido: "Pérez",
            fechaNacimiento: "1990-09-01"
        })
        expect(res.statusCode).toEqual(404)
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8")
        expect(res.body).toEqual(
            expect.objectContaining({
                error: "Enólogo no encontrado"
            })
        )
    });

    it("Respuesta con Código 200 y actualiza un enólogo", async () => {
        const res = await request(app).put("/enologo/1").send({
            nombre: "Juan",
            apellido: "Actualizado",
            fechaNacimiento: "1980-05-15"
        })
        expect(res.statusCode).toEqual(200)
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8")
        expect(res.body).toEqual(
            expect.objectContaining({
                id: 1,
                nombre: "Juan",
                apellido: "Actualizado",
                fechaNacimiento: "1980-05-15"
            })
        )
    });
});