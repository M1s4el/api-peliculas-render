import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// Conexión directa a PostgreSQL mediante la URL de entorno
const db = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Requerido para el SSL de Render
        }
    },
    logging: false
});

async function init() {
    try {
        await db.sync();
        console.log('Base de datos PostgreSQL sincronizada correctamente.');
    } catch (error) {
        console.error('Error al sincronizar la BD:', error);
    }
}
init();

export default db;
