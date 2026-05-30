import db from './db.js';
import { DataTypes } from 'sequelize';

const pelicula = db.define('Pelicula', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING
    },
    fecha_lanzamiento: {
        type: DataTypes.STRING
    },
    duracion: {
        type: DataTypes.STRING
    }
});

export default pelicula;