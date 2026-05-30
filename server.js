import express from 'express';
import fs from 'fs';
import path from 'path';
import rutapeliculas from './routes/ruta_peliculas.js';

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

// Middleware del Logger
const logger = (req, res, next) => {
    const log = `${new Date().toLocaleString()} ${req.method} en ${req.url}\n`;
    const ruta = path.join(import.meta.dirname, "log.txt");
    fs.writeFileSync(ruta, log, { flag: "a" });
    next(); 
};

app.use(logger);

// Enrutamiento principal
app.use('/peliculas', rutapeliculas);

app.listen(port, () => {
    console.log(`Servidor iniciado en puerto ${port}`);
});