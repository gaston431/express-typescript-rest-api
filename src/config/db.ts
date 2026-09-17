import mysql from 'mysql2/promise';
import 'dotenv/config';

// Creamos un pool de conexiones, que es más eficiente para servidores web
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test de conexión inicial opcional
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('🚀 Conexión a MySQL (pet_shelter) exitosa');
    connection.release();
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error);
  }
}

testConnection();
