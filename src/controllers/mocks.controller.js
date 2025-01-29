import { generateMockingUsers, generateMockingPets, saveMockingData } from '../utils/mocking.js';


const getMockingPets = async(request, response) => {
    const pets = await generateMockingPets(100);
    response.send({ status: "success", payload: pets });
}

const getMockingUsers = async (request, response) => {
    const users = await generateMockingUsers(50);
    response.send({ status: "success", payload: users });
}

const saveMockingDataController = async (request, response) => {
    
    try {
        const { users, pets } = request.body;  

        if (typeof users !== 'number' || typeof pets !== 'number') {
            return response.status(400).send({ status: "error", message: "Los parámetros 'users' y 'pets' deben ser numéricos." });
        }

        const result = await saveMockingData(users, pets); 

        response.status(201).send({
            status: "success",
            message: `${users} usuarios y ${pets} mascotas agregados correctamente.`,
            payload: result
        });
    } catch (error) {
        console.error(error);
        response.status(500).send({ status: "error", message: "Error al generar los datos." });
    }

}



export default {
    getMockingPets,
    getMockingUsers,
    saveMockingDataController 
}