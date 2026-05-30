import express from 'express';
import service from '../services/serv_peliculas.js';
import pelicula from '../models/models_peliculas.js';
import { validarToken } from '../middleware/auth.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
const llave_secreta = "clave12345";

// LOGIN - Generación de Token
router.post('/login', (req, res) => {
    const { usuario, password } = req.body;
    if (usuario === "admin" && password === "12345") {
        const user = { id: 1, nombre: 'Heber' };
        const token = jwt.sign(user, llave_secreta, { expiresIn: '1h' });
        res.json({ message: "Login exitoso", token });
    } else {
        res.status(401).json({ message: "Credenciales invalidas" });
    }
});

// OBTENER TODAS
router.get('/', validarToken, async (req, res) => {
    const data = await service.getPeliculas();
    res.send(data);
});

// OBTENER POR ID
router.get('/:id', validarToken, async (req, res) => {
    const { id } = req.params;
    const data = await service.getPeliculasID(id);
    if (data) {
        res.send(data);
    } else {
        res.status(404).send('No se encontro el ID');
    }
});

// CREAR
router.post('/', validarToken, async (req, res) => {
    const body = req.body;
    const data = await pelicula.create(body);
    res.send(data);
});

// ACTUALIZAR (PUT)
router.put('/:id', validarToken, async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    await pelicula.update(body, { where: { id: id } });
    const actualizado = await pelicula.findByPk(id);
    res.send(actualizado);
});

// ELIMINAR (DELETE)
router.delete('/:id', validarToken, async (req, res) => {
    const { id } = req.params;
    const data = await pelicula.destroy({ where: { id: id } });
    res.send({ message: "Eliminado correctamente", filasAfectadas: data });
});

export default router;