import express from "express"
import type { Router } from 'express'
import { getPets, getPetById, storePet, updatePet, adoptPet, deletePet } from '../controllers/pets.controllers.js'
import { validateNumericId, pleaseAuth, validateBody } from '../middleware/pets.middleware.js'

export const petRouter: Router = express.Router()

petRouter.get("/", getPets);

petRouter.get("/:id", pleaseAuth, validateNumericId, getPetById);

petRouter.post("/", validateBody, storePet);
petRouter.put("/:id", validateBody, updatePet);
petRouter.patch("/:id/adopt", adoptPet);
petRouter.delete("/:id", deletePet);