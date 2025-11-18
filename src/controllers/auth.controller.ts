import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/db'; 
import { SECRET_KEY } from '../config';

export const loginController = (req: Request, res: Response): any => {
    const { cuenta, contrasena } = req.body;

    const usuarioEncontrado = UserModel.findByCredentials(cuenta, contrasena);
    if (usuarioEncontrado) {
        const token = jwt.sign(
            { 
                cuenta: usuarioEncontrado.cuenta, 
                rol: usuarioEncontrado.rol,
                nombre: usuarioEncontrado.nombre 
            },
            SECRET_KEY,
            { expiresIn: '2h' }
        );

        console.log(`Login exitoso: ${usuarioEncontrado.cuenta}`);
        return res.status(200).json({
            mensaje: 'Acceso autorizado',
            token: token,
            usuario: {
                nombre: usuarioEncontrado.nombre,
                cuenta: usuarioEncontrado.cuenta,
                rol: usuarioEncontrado.rol
            }
        });
    } else {
        return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }
};