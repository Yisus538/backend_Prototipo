import { Request, Response } from 'express';
import crypto from 'crypto';
import { TarjetaModel } from '../models/db';
import { Tarjeta } from '../interfaces/types';

export const createTarjeta = (req: Request, res: Response): any => {
    const { idMorador, patente, numeroTarjeta } = req.body;

    if (!idMorador || !patente || !numeroTarjeta) {
        return res.status(400).json({ message: 'Datos incompletos para registrar tarjeta' });
    }

    try {
        const nuevaTarjeta: Tarjeta = {
            id: crypto.randomUUID(),
            idMorador,
            patente,
            numeroTarjeta,
            fecha_creacion: new Date().toISOString()
        };

        const tarjetaCreada = TarjetaModel.create(nuevaTarjeta);
        console.log(`Tarjeta registrada para Morador ${idMorador} con patente ${patente}`);
        res.status(201).json(tarjetaCreada);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno al guardar la tarjeta' });
    }
};