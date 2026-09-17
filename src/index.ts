import 'dotenv/config';
import express from "express"
import type { Express, Request, Response } from 'express'
import cors from 'cors'
import { petRouter } from './routes/pets.routes.js'
import { shelterRouter } from './routes/shelter.routes.js'

const PORT = process.env.PORT ?? 8000;
const app: Express = express();

app.use(cors());

app.use(express.json()); 

app.use('/pets', petRouter)
app.use('/shelters', shelterRouter)

app.use((req: Request, res: Response<{ message: string }>): void => {
    res.status(404).json({ message: 'Endpoint not found' })
})

app.listen(PORT, (): void => console.log(`Server running on port ${PORT}`));
