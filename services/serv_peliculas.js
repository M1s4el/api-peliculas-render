import pelicula from '../models/models_peliculas.js';

async function getPeliculas() {
    const data = await pelicula.findAll();
    return data;
}

async function getPeliculasID(id) {
    const data = await pelicula.findByPk(id);
    return data;
}

export default { getPeliculas, getPeliculasID };