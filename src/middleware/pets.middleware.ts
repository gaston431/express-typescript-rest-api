import type { Request, Response, NextFunction } from 'express'
import { Pet } from '../interfaces/pet.interface.js'

export const validateNumericId = (
    req: Request<{ id: string }>,
    res: Response<{ message: string }>,
    next: NextFunction
) => {
    const { id } = req.params
    if (!/^\d+$/.test(id)) {
        res.status(400).json({ message: "Pet ID must be a number" })
    } else {
        next()
    }
}

export const pleaseAuth = (
    req: Request<{}, unknown, {}, { password: string }>,
    res: Response<{ message: string }>,
    next: NextFunction
) => {
    if (req.query.password === "please") {
        next()
    } else {
        res.status(401).json({ message: "Unauthorized. Password must be valid" })
    }
}

export const validateBody = (
    req: Request<{}, unknown, Omit<Pet, 'id'>>,
    res: Response<{ message: string }>,
    next: NextFunction
) => {
    
    let { name, species, breed, adopted, age, intakeDate, adoptionDate, medicalRecord, photo } = req.body;
    
    if (!name || !species || !breed || age === undefined || !intakeDate || !medicalRecord || !photo) {
        res.status(400).json({ message: "All fields except adoptionDate are required" });
        return;
    }

    if (name.trim().length < 3) {
        res.status(400).json({ message: "Name must be at least 3 characters long" });
        return; 
    }

    if (typeof age !== 'number' || age < 0) {
        res.status(400).json({ message: "Age must be a valid positive number" });
        return;
    }

    const { vaccinations, weightKg, microchipId } = medicalRecord;
    if (!Array.isArray(vaccinations) || typeof weightKg !== 'number' || weightKg <= 0) {
        res.status(400).json({ message: "Invalid medical record structure. Weight must be positive and vaccinations must be an array" });
        return;
    }

    next();
}