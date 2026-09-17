import { sequelize } from '../config/db.sequelize.js';
import { Shelter } from '../interfaces/shelter.interface.js';
import { ShelterModel } from '../model/shelter.sequelize.model.js';

async function seedSheltersTable() {
    try {
        console.log('Generando y guardando refugios en la base de datos...');
        
        const sheltersToInsert: Omit<Shelter, 'id'>[] = [];
        
        for (let index = 1; index <= 10; index++) {
            sheltersToInsert.push({
                name: `Refugee ${index}`,
                location: `Location ${index}`
            });
        }

        await ShelterModel.bulkCreate(sheltersToInsert);
        
        console.log('Base de datos poblada masivamente con éxito.');
    } catch (error) {
        console.error('Error al insertar el seed:', error);
    } finally {
        await sequelize.close();
        process.exit(0);
    }
}

seedSheltersTable();
