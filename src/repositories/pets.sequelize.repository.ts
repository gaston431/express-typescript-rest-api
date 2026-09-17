import { Pet, PetQueryParams } from '../interfaces/pet.interface.js';
import { Op } from 'sequelize';
import { PetModel } from '../model/pets.sequelize.model.js';
import { ShelterModel } from '../model/shelter.sequelize.model.js';


export async function getPetsRepository(petQueryParams: PetQueryParams): Promise<Pet[]> {

    const { species, adopted, minAge, maxAge } = petQueryParams

    const values: any[] = [];

    if (species) values.push({ species });
    if (adopted) values.push({ adopted: adopted === 'true' });
    if (minAge) values.push({ age: { [Op.gte]: minAge } });
    if (maxAge) values.push({ age: { [Op.lte]: maxAge } });

    const pets = await PetModel.findAll({
        where: {
            [Op.and]: values,
        },
        // raw: true // Devuelve objetos planos directamente
        include: [{
            model: ShelterModel,
            as: 'Shelter'
        }]
    });

    return pets.map(pet => pet.get({ plain: true }) as Pet);
}

export async function getPetByIdRepository(id: string): Promise<Pet | undefined> {
    const pet = await PetModel.findByPk(id, {
        // attributes: { 
        //     exclude: ['shelter_id']
        // },
        include: [{
            model: ShelterModel,
            as: 'Shelter' // Debe coincidir exactamente con el alias definido en el modelo
        }]
    });
    return pet ? (pet.get({ plain: true }) as Pet) : undefined;
}

export async function createPetRepository(petData: Omit<Pet, 'id'>): Promise<Pet> {
    const newPet = await PetModel.create(petData);
    return newPet.get({ plain: true }) as Pet;
}

export async function updatePetRepository(id: string, petData: Omit<Pet, 'id'>): Promise<boolean> {

    const [affectedRows] = await PetModel.update(petData, {
        where: { id },
    });

    return affectedRows > 0;
}

export async function adoptPetRepository(id: string): Promise<boolean> {

    const currentDate = new Date().toISOString().split('T')[0];

    const [affectedRows] = await PetModel.update(
        { adopted: true, adoptionDate: currentDate },
        { where: { id } },
    );

    return affectedRows > 0;
}

export async function deletePetRepository(id: string): Promise<boolean> {

    const affectedRows = await PetModel.destroy({
        where: { id },
    });

    return affectedRows > 0;
}