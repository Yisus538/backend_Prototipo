import { Request, Response } from 'express';
import { MoradorModel } from '../models/db';
import { Morador } from '../interfaces/types';


export const getMoradorByDni = (req: Request, res: Response): any => {
    const { dni } = req.params;
    const morador = MoradorModel.findByDni(dni);

    if (morador) {
        console.log(`Consulta Morador DNI ${dni}: ENCONTRADO`);
        return res.status(200).json(morador);
    } else {
        console.log(`Consulta Morador DNI ${dni}: NO Encontrado`);
        return res.status(404).json({ message: 'No se encontró el morador con ese DNI/ID.' });
    }
};
export const createMorador = (req: Request, res: Response): any => {
    const { dni, nombre, direccion, numeroTarjeta } = req.body;

    if (!dni || !nombre || !direccion || !numeroTarjeta) {
        return res.status(400).json({ message: 'Datos incompletos' });
    }

    try {
        const moradorExistente = MoradorModel.findByDni(dni);
        if (moradorExistente) {
            return res.status(409).json({ message: 'Conflicto: El DNI ya se encuentra registrado' });
        }

        const nuevoMorador: Morador = {
            id: dni,
            dni,
            nombre,
            direccion,
            numeroTarjeta
        };

        const moradorCreado = MoradorModel.create(nuevoMorador);
        console.log(`Morador registrado DNI ${dni}: ${nombre}`);
        res.status(201).json(moradorCreado);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno al guardar el morador' });
    }
};