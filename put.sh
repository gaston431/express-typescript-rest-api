curl -X PUT -i http://localhost:8000/pets/23 \
	-H "Content-Type: application/json" \
	-d '{
	"name": "Kasss",
    "species": "Dog",
    "breed": "Persian",
    "adopted": false,
    "age": 2,
    "intakeDate": "2026-09-15",
    "adoptionDate": null,
    "medicalRecord": {"weightKg": 5.9, "microchipId": "PER852", "vaccinations": ["Rabies", "Feline Distemper"]},
    "photo": "kas.jpg"
}'