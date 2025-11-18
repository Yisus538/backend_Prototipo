import { Request, Response } from 'express';
import crypto from 'crypto';
import { NoAutorizadoModel } from '../models/db'; 
import { NoAutorizado } from '../interfaces/types';


export const getNoAutorizadoByDni = (req: Request, res: Response): any => {
    const { dni } = req.params;
    const encontrado = NoAutorizadoModel.findByDni(dni);

    if (encontrado) {
        return res.status(200).json(encontrado);
    } else {
        return res.status(404).json({ message: 'No encontrado en la lista de no autorizados' });
    }
};

export const createNoAutorizado = (req: Request, res: Response): any => {
    const { dni, nombre, motivo } = req.body;

    if (!dni || !nombre || !motivo) {
        return res.status(400).json({ message: 'Datos incompletos' });
    }

    try {
        const yaExiste = NoAutorizadoModel.findByDni(dni);
        if (yaExiste) {
            return res.status(409).json({ message: 'Conflicto: El DNI ya existe' });
        }

        const nuevoNoAutorizado: NoAutorizado = {
            id: crypto.randomUUID(),
            dni,
            nombre,
            motivo,
            fecha_reporte: new Date().toISOString()
        };

        const creado = NoAutorizadoModel.create(nuevoNoAutorizado);
        res.status(201).json(creado);

    } catch (error) {
        res.status(500).json({ message: 'Error interno' });
    }
};