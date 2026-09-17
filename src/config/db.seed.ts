import { pool } from './db.js';
import { pets } from '../data/pets.js';

async function seedPetsTable() {
    try {
        console.log('Insertando mascotas en la base de datos...');
        const query = `
        INSERT INTO pets (name, species, breed, adopted, age, intakeDate, adoptionDate, medicalRecord, photo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        for (const pet of pets) {
            const values = [
                pet.name,
                pet.species,
                pet.breed,
                pet.adopted,
                pet.age,
                pet.intakeDate,
                pet.adoptionDate || null,
                JSON.stringify(pet.medicalRecord),
                pet.photo
            ];
        
            await pool.query(query, values);
        }
        
        console.log('Base de datos poblada con éxito.');
    } catch (error) {
        console.error('Error al insertar el seed:', error);
    } finally {
        // Cerramos el pool de conexiones y finalizamos el script limpiamente
        await pool.end();
        process.exit(0);
    }
}

seedPetsTable();
