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

            const idAdoption = "67c4d25ac5c00a99e8a015e8";

            const {status, _body} = await request.get(`/api/adoptions/${idAdoption}`);

            expect(status).to.equal(200);
            expect(_body.status).to.equal("success");
            expect(_body.payload).to.have.property("_id").that.equals(idAdoption);
        })

        it ("Creamos una adopcion", async () => {
            let userId = "6799889e1352b470da821104"
            let petId = "6799889f1352b470da82111a";

            const {status} = await request.post(`/api/adoptions/${userId}/${petId}`);

            expect(status).to.equal(200);
        })
    })
})