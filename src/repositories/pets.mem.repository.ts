import type { Request } from 'express'
import { pets } from '../data/pets.js'
// import type { Pet } from '../data/pets.js'
import { Pet, PetQueryParams } from '../interfaces/pet.interface.js'


export const getPetsRepository = (
    petQueryParams: PetQueryParams
): Pet[] => {

    const { species, adopted, minAge, maxAge } = petQueryParams
    let filteredPets: Pet[] = pets
    if (species) {
        filteredPets = filteredPets.filter((pet: Pet): boolean =>
            pet.species.toLowerCase() === species.toLowerCase()
        )
    }
    if (adopted) {
        filteredPets = filteredPets.filter((pet: Pet): boolean =>
            pet.adopted === JSON.parse(adopted)
        )
    }
    if (minAge) {
        filteredPets = filteredPets.filter((pet: Pet): boolean =>
            pet.age >= JSON.parse(minAge)
        )
    }
    if (maxAge) {
        filteredPets = filteredPets.filter((pet: Pet): boolean =>
            pet.age <= JSON.parse(maxAge)
        )
    }

    return filteredPets
}

export const getPetByIdRepository = (id: string): Pet | undefined => {
    // const petId = Number(req.params.id)
    const pet: Pet | undefined = pets.find((pet: Pet): boolean => pet.id?.toString() === id)

    return pet
}