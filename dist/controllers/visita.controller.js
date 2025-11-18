"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVisita = void 0;
const crypto_1 = __importDefault(require("crypto"));
const db_1 = require("../models/db");
const createVisita = (req, res) => {
    const { dni, nombre } = req.body;
    if (!dni || !nombre) {
        return res.status(400).json({ message: 'DNI y Nombre son requeridos' });
    }
    try {
        const nuevaVisita = {
            id: crypto_1.default.randomUUID(),
            dni,
            nombre,
            fecha_ingreso: new Date().toISOString()
        };
        const visitaCreada = db_1.VisitaModel.create(nuevaVisita);
        res.status(201).json(visitaCreada);
    }
    catch (error) {
        res.status(500).json({ message: 'Error interno' });
    }
};
exports.createVisita = createVisita;
