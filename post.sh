#!/bin/bash

curl -X POST -i http://localhost:8000/pets \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Kas",
    "species": "Cat",
    "breed": "Persian",
    "adopted": true,
    "age": 2,
    "intakeDate": "2026-09-15",
    "adoptionDate": "2026-09-15",
    "medicalRecord": {"weightKg": 5.9, "microchipId": "PER852", "vaccinations": ["Rabies", "Feline Distemper"]},
    "photo": "kas.jpg"
}'