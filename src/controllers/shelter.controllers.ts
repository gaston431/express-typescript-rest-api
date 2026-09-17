import type { Request, Response } from 'express'
import type { Shelter, ShelterQueryParams } from '../interfaces/shelter.interface.js'
import { getSheltersRepository, createShelterRepository} from '../repositories/shelter.sequelize.repository.js'


export const getShelters = async (
    req: Request<{}, unknown, {}, ShelterQueryParams>,
    res: Response<Shelter[]>
): Promise<void> => {
    try {
        const shelters = await getSheltersRepository(req.query);
        console.log(shelters)
        res.json(shelters);
    } catch (err) {
        console.error(err);
        res.status(500).json([] as any); // Respuesta segura en caso de error
    }
}

export const storeShelter = async (
    req: Request<{}, unknown, Omit<Shelter, 'id'>>,
    res: Response<Shelter | { message: string } | { error: string, details: string }>
): Promise<void> => {

    try {
        const newShelter = await createShelterRepository(req.body);

        res.status(201).json(newShelter)
    } catch (err: unknown) {
        console.error(err);
        res.status(500).json({
            error: "Failed to add shelter",
            details: err instanceof Error ? err.message : "Unknown error"
        });
    }

}