import { Router } from "express";
const router = Router();

import mocksController from "../controllers/mocks.controller.js";


// Ruta para generar 50 usuarios mockeados
router.get("/mockingusers", mocksController.getMockingUsers);

// Ruta de mocking pets
router.get("/mockingpets", mocksController.getMockingPets);

// Ruta para guardar en la base de datos los datos mockeados
router.post("/generateData", mocksController.saveMockingDataController);


export default router;

