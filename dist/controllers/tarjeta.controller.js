"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTarjeta = void 0;
const crypto_1 = __importDefault(require("crypto"));
const db_1 = require("../models/db");
const createTarjeta = (req, res) => {
    const { idMorador, patente, numeroTarjeta } = req.body;
    if (!idMorador || !patente || !numeroTarjeta) {
        return res.status(400).json({ message: 'Datos incompletos para registrar tarjeta' });
    }
    try {
        const nuevaTarjeta = {
            id: crypto_1.default.randomUUID(),
            idMorador,
            patente,
            numeroTarjeta,
            fecha_creacion: new Date().toISOString()
        };
        const tarjetaCreada = db_1.TarjetaModel.create(nuevaTarjeta);
        console.log(`Tarjeta registrada para Morador ${idMorador} con patente ${patente}`);
        res.status(201).json(tarjetaCreada);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno al guardar la tarjeta' });
    }
};
exports.createTarjeta = createTarjeta;
