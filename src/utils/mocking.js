import {faker} from '@faker-js/faker';
import { createHash } from '../utils/index.js';
import Users from '../dao/Users.dao.js';  
import Pet from '../dao/Pets.dao.js'; 

const generateMockingUsers = async (data) => {  
  const users = [];
  for (let i = 0; i < data; i++) {
    const password = await createHash("coder123");  

    users.push({
      id: faker.database.mongodbObjectId(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password, 
      role: faker.helpers.arrayElement(['user', 'admin']),
      pets: []
    });
  }
  return users;
};

const generateMockingPets = (data) => { 
  const pets = [];
  for (let i = 0; i < data; i++) {
    pets.push({
      name: faker.animal.type(),
      specie: faker.animal.type(),
      birthDate: faker.date.past(),
      adopted: false,
      image: `https://picsum.photos/150/150?random=${Math.random()}`
    })
  }
  return pets;
}

const saveMockingData = async (numUsers, numPets) => {

  const users = await generateMockingUsers(numUsers);
  const pets = generateMockingPets(numPets);

  // Guardar los datos en la base de datos
  const usersDao = new Users();
  const petsDao = new Pet();
  
  await usersDao.save(users);
  await petsDao.save(pets);

  return { users, pets };
};

export {generateMockingUsers, generateMockingPets, saveMockingData};