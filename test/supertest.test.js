import supertest from "supertest";
import { expect } from "chai";


const request = supertest("http://localhost:8080");

describe("Testeando el proyecto Adoptame", () => {
    describe("Testing de Adopciones", () => {

        it ("Endpoint GET /api/pets deberia traer todas las mascotas", async () => {
        
            const {status, _body} = await request.get("/api/adoptions");

            expect(status).to.equal(200);
            expect(_body.status).to.equal("success");
            expect(_body.payload).to.be.an("array");
        })

        it ("Endpoint GET /api/pets/:aid deberia traer una adopcion por ID", async ()=> {

            const idAdoption = "67c5cefff951fdb2c3913771";

            const {status, _body} = await request.get(`/api/adoptions/${idAdoption}`);

            expect(status).to.equal(200);
            expect(_body.status).to.equal("success");
            expect(_body.payload).to.have.property("_id").that.equals(idAdoption);
        })

        it ("Endpoint GET /api/users deberia traer todos los usuarios", async () => {
        
            const {status, _body} = await request.get("/api/users");

            expect(status).to.equal(200);
            expect(_body.status).to.equal("success");
            expect(_body.payload).to.be.an("array");
        })

        it ("Endpoint GET /api/users/:uid deberia traer un usuario por ID", async ()=> {
            
            const idUser = "67c5ce26f951fdb2c39135d3";

            const {status, _body} = await request.get(`/api/users/${idUser}`);

            expect(status).to.equal(200);
            expect(_body.status).to.equal("success");
            expect(_body.payload).to.have.property("_id").that.equals(idUser);

        })

        it ("Endpoint GET /api/adoptions deberia traer todas las adopciones", async () => {
        
            const {status, _body} = await request.get("/api/adoptions");

            expect(status).to.equal(200);
            expect(_body.status).to.equal("success");
            expect(_body.payload).to.be.an("array");
        })

        it ("Crea una adopcion", async () => {
            
            //Tenemos que traer un usuario y una mascota para poder crear una adopcion desde MongoDB

            let userId = ""
            let petId = "";

            const {status} = await request.post(`/api/adoptions/${userId}/${petId}`);

            expect(status).to.equal(200);
        })

        it ("Endpoint POST /api/pets deberia crear una mascota", async () => {

            const newPets = {
                name: "Fatiga",
                specie: "Perezoso",
                birthDate: "2020-12-12",
            }

            const {status, _body} = await request.post("/api/pets").send(newPets);

            expect(status).to.equal(200);
            expect(_body.status).to.equal("success");
            expect(_body.payload).to.have.property("_id");

        })
        
    })
})