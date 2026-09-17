import { ResultSetHeader } from 'mysql2';
import { pool } from '../config/db.js';
import { Pet, PetQueryParams } from '../interfaces/pet.interface.js';


export async function getPetsRepository(petQueryParams: PetQueryParams): Promise<Pet[]> {

    const { species, adopted, minAge, maxAge } = petQueryParams

    let query = 'SELECT * FROM pets WHERE 1';
    const values: any[] = [];

    if (species) {
        query += ' AND LOWER(species) = LOWER(?)';
        values.push(species);
    }

    if (adopted) {
        const isAdopted = adopted === 'true';
        query += ' AND adopted = ?';
        values.push(isAdopted);
    }

    if (minAge) {
        query += ' AND age >= ?';
        values.push(Number(minAge));
    }

    if (maxAge) {
        query += ' AND age <= ?';
        values.push(Number(maxAge));
    }

    const [rows] = await pool.query(query, values);

    return rows as Pet[];
}

export async function getPetByIdRepository(id: string): Promise<Pet | undefined> {

    const query = 'SELECT * FROM pets WHERE id = ?';

    const [rows] = await pool.query(query, [id]);
    const pets = rows as Pet[];
    return pets[0];
}

export async function createPetRepository(petData: Omit<Pet, 'id'>): Promise<Pet> {

    let { name, species, breed, adopted, age, intakeDate, adoptionDate, medicalRecord, photo } = petData;
    const query = `
        INSERT INTO pets (name, species, breed, adopted, age, intakeDate, adoptionDate, medicalRecord, photo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

    const values = [
        name,
        species,
        breed,
        adopted ? 1 : 0,
        age,
        intakeDate,
        adoptionDate || null,
        JSON.stringify(medicalRecord),
        photo
    ];

    const [result] = await pool.query<ResultSetHeader>(query, values);
    return {
        id: result.insertId,
        ...petData
    };
}

export async function updatePetRepository(id: string, petData: Omit<Pet, 'id'>): Promise<boolean> {

    const data = "name = ?, species = ?, breed = ?, adopted = ?, age = ?, intakeDate= ?, adoptionDate = ?, medicalRecord = ?, photo = ?"

    const query = `UPDATE pets SET ${data} WHERE id = ?`;

    let { name, species, breed, adopted, age, intakeDate, adoptionDate, medicalRecord, photo } = petData;

    const values = [
        name,
        species,
        breed,
        adopted ? 1 : 0,
        age,
        intakeDate,
        adoptionDate || null,
        JSON.stringify(medicalRecord),
        photo,
        id
    ];

    const [result] = await pool.query<ResultSetHeader>(query, values);

    return result.affectedRows > 0;;
}

export async function adoptPetRepository(id: string): Promise<boolean> {

    const currentDate = new Date().toISOString().split('T')[0];

    const query = `
        UPDATE pets 
        SET adopted = 1, 
            adoptionDate = ? 
        WHERE id = ?
    `;

    const [result] = await pool.query<ResultSetHeader>(query, [currentDate, id]);
    
    return result.affectedRows > 0;
}

export async function deletePetRepository(id: string): Promise<boolean> {

    const query = `DELETE FROM pets WHERE id = ?`;

    const [result] = await pool.query<ResultSetHeader>(query, [id]);

    return result.affectedRows > 0;
}