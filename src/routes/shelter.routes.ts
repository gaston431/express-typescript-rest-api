import express from "express"
import type { Router } from 'express'
import { getShelters, storeShelter } from '../controllers/shelter.controllers.js'

export const shelterRouter: Router = express.Router()

shelterRouter.get("/", getShelters);
shelterRouter.post("/", storeShelter);
