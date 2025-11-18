"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNoAutorizado = exports.getNoAutorizadoByDni = void 0;
const crypto_1 = __importDefault(require("crypto"));
const db_1 = require("../models/db");
const getNoAutorizadoByDni = (req, res) => {
    const { dni } = req.params;
    const encontrado = db_1.NoAutorizadoModel.findByDni(dni);
    if (encontrado) {
        return res.status(200).json(encontrado);
    }
    else {
        return res.status(404).json({ message: 'No encontrado en la lista de no autorizados' });
    }
};
exports.getNoAutorizadoByDni = getNoAutorizadoByDni;
const createNoAutorizado = (req, res) => {
    const { dni, nombre, motivo } = req.body;
    if (!dni || !nombre || !motivo) {
        return res.status(400).json({ message: 'Datos incompletos' });
    }
    try {
        const yaExiste = db_1.NoAutorizadoModel.findByDni(dni);
        if (yaExiste) {
            return res.status(409).json({ message: 'Conflicto: El DNI ya existe' });
        }
        const nuevoNoAutorizado = {
            id: crypto_1.default.randomUUID(),
            dni,
            nombre,
            motivo,
            fecha_reporte: new Date().toISOString()
        };
        const creado = db_1.NoAutorizadoModel.create(nuevoNoAutorizado);
        res.status(201).json(creado);
    }
    catch (error) {
        res.status(500).json({ message: 'Error interno' });
    }
};
exports.createNoAutorizado = createNoAutorizado;
