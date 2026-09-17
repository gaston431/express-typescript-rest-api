#!/bin/bash

curl -X POST -i http://localhost:8000/shelters \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Refugee 2",
    "location": "Street 2"
}'