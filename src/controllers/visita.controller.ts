import { Request, Response } from 'express';
import crypto from 'crypto';
import { VisitaModel } from '../models/db'; 
import { Visita } from '../interfaces/types';


export const createVisita = (req: Request, res: Response): any => {
    const { dni, nombre } = req.body;
    if (!dni || !nombre) {
        return res.status(400).json({ message: 'DNI y Nombre son requeridos' });
    }
    try {
        const nuevaVisita: Visita = {
            id: crypto.randomUUID(),
            dni,
            nombre,
            fecha_ingreso: new Date().toISOString()
        };

        const visitaCreada = VisitaModel.create(nuevaVisita);
        res.status(201).json(visitaCreada);

    } catch (error) {
        res.status(500).json({ message: 'Error interno' });
    }
};