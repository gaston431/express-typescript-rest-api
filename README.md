# 🐾 Pet Shelter API

API REST para la gestión de adopciones de mascotas y administración de refugios asociados. Desarrollada de manera modular utilizando **Node.js**, **Express**, **TypeScript** y **Sequelize ORM** con base de datos **MySQL**.

## 🚀 Tecnologías y Herramientas

- **Runtime:** Node.js v24+ (Módulos ES nativos)
- **Lenguaje:** TypeScript
- **Framework:** Express.js
- **Base de Datos:** MySQL
- **ORM:** Sequelize
- **Entorno de Desarrollo:** Nodemon + Concurrently + tsx

## 📂 Estructura del Proyecto

El proyecto sigue una arquitectura limpia basada en capas de responsabilidad:

```text
src/
├── config/          # Inicialización de DB (Sequelize) y variables de entorno
├── controllers/     # Controladores encargados de manejar las peticiones HTTP
├── interfaces/      # Tipos e interfaces globales de TypeScript
├── model/           # Modelos/Entidades definidos con Sequelize
├── repositories/    # Capa de acceso a datos y consultas de persistencia (Abstracción)
├── routes/          # Definición y enrutamiento de los endpoints de la API
└── index.ts         # Punto de entrada principal de la aplicación
```

## 🛠️ Configuración Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/gaston431/express-typescript-rest-api
cd express-typescript
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto y configura tus credenciales locales (por ejemplo, usando Laragon o XAMPP):

```env
PORT=8000
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=pet_shelter
```

### 4. Estructura de la Base de Datos
Asegúrate de tener creado el esquema en tu MySQL. El script SQL para inicializar las tablas es:

```sql
CREATE DATABASE IF NOT EXISTS pet_shelter;
USE pet_shelter;

CREATE TABLE IF NOT EXISTS shelters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(150) NOT NULL
);

CREATE TABLE IF NOT EXISTS pets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    species VARCHAR(50) NOT NULL,
    breed VARCHAR(100) NOT NULL,
    adopted BOOLEAN DEFAULT FALSE,
    age INT NOT NULL,
    intakeDate DATE NOT NULL,
    adoptionDate DATE NULL,
    medicalRecord JSON NOT NULL,
    photo VARCHAR(255) NOT NULL,
    shelter_id INT NULL,
    FOREIGN KEY (shelter_id) REFERENCES shelters(id) ON DELETE SET NULL
);
```

## 🏃 Controles de Ejecución

### Modo Desarrollo (Con recarga automática en cambios)
Compila en modo observación (`tsc --watch`) y levanta el servidor con `nodemon` en tiempo real simultáneamente:
```bash
npm run dev
```

### Compilar y Ejecutar en Producción
```bash
npm run start
```

## 🛣️ Endpoints Disponibles

### Mascotas (`/pets`)
- `GET /pets` - Lista todas las mascotas (Soporta filtros opcionales por query params: `species`, `adopted`, `minAge`, `maxAge`). Incluye la relación del refugio.
- `GET /pets/:id` - Obtiene el detalle de una mascota por ID con su refugio.
- `POST /pets` - Registra una nueva mascota (Incluye validación estricta de estructura).
- `PUT /pets/:id` - Reemplaza los datos completos de una mascota.
- `PATCH /pets/:id/adopt` - Actualiza de forma atómica el estado de una mascota a adoptada y registra la fecha de hoy automáticamente.
- `DELETE /pets/:id` - Elimina de forma lógica/física un registro.

### Refugios (`/shelters`)
- `GET /shelters` - Lista todos los refugios (Soporta filtrado flexible con operadores de similitud).
- `POST /shelters` - Da de alta un nuevo refugio.
