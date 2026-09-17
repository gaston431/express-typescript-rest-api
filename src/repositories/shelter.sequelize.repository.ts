import { Op } from 'sequelize';
import { Shelter, ShelterQueryParams } from '../interfaces/shelter.interface.js';
import { ShelterModel } from '../model/shelter.sequelize.model.js';

export async function getSheltersRepository(shelterQueryParams: ShelterQueryParams): Promise<Shelter[]> {

    const { name, location } = shelterQueryParams;
    const whereClause: any = {};

    if (name) {
        whereClause.name = { [Op.like]: `%${name}%` }; // Busca coincidencias parciales
    }
    if (location) {
        whereClause.location = { [Op.like]: `%${location}%` };
    }

    const shelters = await ShelterModel.findAll({
        where: whereClause
    });

    // Mapeamos las instancias de Sequelize a objetos limpios estructurados como Shelter
    return shelters.map(shelter => shelter.get({ plain: true }) as Shelter);
}

export async function createShelterRepository(shelterData: Omit<Shelter, 'id'>): Promise<Shelter> {
    const newShelter = await ShelterModel.create(shelterData);
    return newShelter.get({ plain: true }) as Shelter;
}





