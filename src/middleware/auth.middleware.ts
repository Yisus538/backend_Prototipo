import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../interfaces/types';
import { SECRET_KEY } from '../config';

export const verificarToken = (req: CustomRequest, res: Response, next: NextFunction): any => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado: Falta el token' });
    }

    jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido o expirado' });
        }
        req.user = user;
        next();
    });
};