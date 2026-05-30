import jwt from 'jsonwebtoken';

const llave_secreta = "clave12345";

export const validarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ mensaje: "Acceso denegado: No se proporcionó un token" });
    }

    try {
        const verificado = jwt.verify(token, llave_secreta);
        req.usuario = verificado;
        next();
    } catch (error) {
        res.status(403).json({ mensaje: "Token inválido o expirado" });
    }
};