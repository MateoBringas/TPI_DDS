const { describe, expect, beforeAll, afterAll } = require('@jest/globals');
const request = require('supertest');
const { sequelize, Resenia, Enologo } = require('../base-orm/sequelize-init'); // Asegúrate de que esta ruta sea correcta
const app = require('../index'); // Asegúrate de que esta ruta sea correcta

let server;

beforeAll(async () => {
    await sequelize.sync({ force: true }); // Reinicia la base de datos para asegurarte de que las tablas están actualizadas
    server = app.listen(4000);

    // Insertar datos de prueba
    const enologo = await Enologo.create({
        nombre: "Juan",
        apellido: "García",
        fechaNacimiento: "1980-05-15"
    });

    await Resenia.bulkCreate([
        { puntuacion: 4, comentario: "Muy buen vino.", fecha: "2023-05-10", EnologoId: enologo.id },
        { puntuacion: 5, comentario: "Excelente vino, muy recomendable.", fecha: "2023-06-15", EnologoId: enologo.id }
    ]);
});

afterAll(async () => {
    await sequelize.close();
    await server.close();
});

describe("GET /resenia", function() {
    it("Respuesta OK con Código 200 y lista de reseñas", async () => {
        const res = await request(app).get("/resenia");
        expect(res.statusCode).toEqual(200);
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    puntuacion: expect.any(Number),
                    comentario: expect.any(String),
                    fecha: expect.any(String),
                    EnologoId: expect.any(Number)
                })
            ])
        );
    });

    it("Respuesta OK con Código 200 y reseña específica", async () => {
        const res = await request(app).get("/resenia/1");
        expect(res.statusCode).toEqual(200);
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
        expect(res.body).toEqual(
            expect.objectContaining({
                id: 1,
                puntuacion: 4,
                comentario: "Muy buen vino.",
                fecha: "2023-05-10",
                EnologoId: expect.any(Number)
            })
        );
    });

    it("Respuesta con Código 404 y mensaje 'Reseña no encontrada'", async () => {
        const res = await request(app).get("/resenia/9999");
        expect(res.statusCode).toEqual(404);
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
        expect(res.body).toEqual(
            expect.objectContaining({
                error: 'Reseña no encontrada'
            })
        );
    });
});

describe("POST /resenia", function() {
    it("Respuesta con Código 201 y crea una nueva reseña", async () => {
        const enologo = await Enologo.create({
            nombre: "Ana",
            apellido: "Lopez",
            fechaNacimiento: "1975-08-20"
        });

        const res = await request(app).post("/resenia").send({
            puntuacion: 3,
            comentario: "Buena reseña.",
            fecha: "2024-01-01",
            EnologoId: enologo.id
        });

        expect(res.statusCode).toEqual(201);
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
        expect(res.body).toEqual(
            expect.objectContaining({
                puntuacion: 3,
                comentario: "Buena reseña.",
                fecha: "2024-01-01",
                EnologoId: enologo.id
            })
        );
    });
});

describe("PUT /resenia/:id", function() {
    it("Respuesta con Código 404 y mensaje 'Reseña no encontrada'", async () => {
        const res = await request(app).put("/resenia/9999").send({
            puntuacion: 2,
            comentario: "Actualización de reseña.",
            fecha: "2024-02-01",
            EnologoId: 1
        });
        expect(res.statusCode).toEqual(404);
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
        expect(res.body).toEqual(
            expect.objectContaining({
                error: 'Reseña no encontrada'
            })
        );
    });

    it("Respuesta con Código 200 y actualiza una reseña", async () => {
        // Primero, crea una reseña para actualizar
        const enologo = await Enologo.create({
            nombre: "Luis",
            apellido: "Martinez",
            fechaNacimiento: "1982-07-25"
        });

        const resenia = await Resenia.create({
            puntuacion: 4,
            comentario: "Muy buen vino.",
            fecha: "2023-05-10",
            EnologoId: enologo.id
        });

        // Ahora actualiza la reseña creada
        const res = await request(app).put(`/resenia/${resenia.id}`).send({
            puntuacion: 5,
            comentario: "Reseña actualizada.",
            fecha: "2024-03-01",
            EnologoId: enologo.id
        });

        expect(res.statusCode).toEqual(200);
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
        expect(res.body).toEqual(
            expect.objectContaining({
                id: resenia.id,
                puntuacion: 5,
                comentario: "Reseña actualizada.",
                fecha: "2024-03-01",
                EnologoId: enologo.id
            })
        );
    });
});

describe("DELETE /resenia/:id", function() {
    it("Respuesta con Código 404 y mensaje 'Reseña no encontrada'", async () => {
        const res = await request(app).delete("/resenia/9999");
        expect(res.statusCode).toEqual(404);
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
        expect(res.body).toEqual(
            expect.objectContaining({
                error: 'Reseña no encontrada'
            })
        );
    });

    it("Respuesta con Código 200 y mensaje 'Reseña eliminada correctamente'", async () => {
        const enologo = await Enologo.create({
            nombre: "Maria",
            apellido: "Fernandez",
            fechaNacimiento: "1995-12-30"
        });

        const resenia = await Resenia.create({
            puntuacion: 4,
            comentario: "Excelente.",
            fecha: "2024-05-10",
            EnologoId: enologo.id
        });

        const res = await request(app).delete(`/resenia/${resenia.id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
        expect(res.body).toEqual(
            expect.objectContaining({
                message: 'Reseña eliminada correctamente'
            })
        );
    });
});

