import type { Request, Response } from 'express'
import type { Pet } from '../interfaces/pet.interface.js'
// import { getPetByIdRepository, getPetsRepository, createPetRepository, updatePetRepository, adoptPetRepository, deletePetRepository } from '../repositories/pets.mysql.repository.js'
import { getPetsRepository, getPetByIdRepository, createPetRepository, updatePetRepository, adoptPetRepository, deletePetRepository } from '../repositories/pets.squelize.repository.js'

export type PetQueryParams = {
    species?: string,
    adopted?: 'true' | 'false',
    minAge?: string,
    maxAge?: string
}

export const getPets = async (
    req: Request<{}, unknown, {}, PetQueryParams>,
    res: Response<Pet[]>
): Promise<void> => {
    // const { species, adopted, minAge, maxAge } = req.query
    const filteredPets = await getPetsRepository(req.query)
    console.log(filteredPets)
    res.json(filteredPets)
}

export const getPetById = async (
    req: Request<{ id: string }>,
    res: Response<Pet | { message: string }>
): Promise<void> => {

    const pet: Pet | undefined = await getPetByIdRepository(req.params.id)

    if (!pet) {
        res.status(404).json({ message: 'Pet not found' })
        return
    }

    console.log(pet);
    res.json(pet)
}

export const storePet = async (
    req: Request<{}, unknown, Omit<Pet, 'id'>>,
    res: Response<Pet | { message: string } | { error: string, details: string }>
): Promise<void> => {

    try {
        const newPet = await createPetRepository(req.body);

        res.status(201).json(newPet)
    } catch (err: unknown) {
        console.error(err);
        res.status(500).json({
            error: "Failed to add pet",
            details: err instanceof Error ? err.message : "Unknown error"
        });
    }

}

export const updatePet = async (
    req: Request<{ id: string }, unknown, Omit<Pet, 'id'>>,
    res: Response<Pet | { error: string; details: string }>
): Promise<void> => {

    try {
        const updatedPet = await updatePetRepository(req.params.id, req.body);

        if (!updatedPet) {
            res.status(404).json({ error: "Pet not found", details: "The requested pet ID does not exist." });
            return;
        }

        res.json({
            id: Number(req.params.id),
            ...req.body
        });
    } catch (err: unknown) {
        console.error(err);
        res.status(500).json({
            error: "Failed to update pet",
            details: err instanceof Error ? err.message : "Unknown error"
        });
    }

}

export const adoptPet = async (
    req: Request<{ id: string }>,
    res: Response<{ message: string } | { error: string; details: string }>
): Promise<void> => {

    try {
        const updatedPet = await adoptPetRepository(req.params.id);

        if (!updatedPet) {
            res.status(404).json({ error: "Pet not found", details: "The requested pet ID does not exist." });
            return;
        }

        res.json({ message: "Pet successfully adopted" });
    } catch (err: unknown) {
        console.error(err);
        res.status(500).json({
            error: "Failed to update pet",
            details: err instanceof Error ? err.message : "Unknown error"
        });
    }

}

export const deletePet = async (
    req: Request<{ id: string }>,
    res: Response
): Promise<void> => {

    try {
        const isDeleted = await deletePetRepository(req.params.id);

        if (!isDeleted) {
            res.status(404).json({ error: "Pet not found" });
            return;
        }

        res.sendStatus(204);
    } catch (err: unknown) {
        console.error(err);
        res.status(500).json({
            error: "Failed to delete pet",
            details: err instanceof Error ? err.message : "Unknown error"
        });
    }

}