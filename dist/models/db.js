"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TarjetaModel = exports.VisitaModel = exports.NoAutorizadoModel = exports.MoradorModel = exports.UserModel = void 0;
// Ruta: src/models/db.ts
const fs_1 = __importDefault(require("fs"));
const config_1 = require("../config");
function readJsonFile(filePath) {
    try {
        const data = fs_1.default.readFileSync(filePath, 'utf-8');
        return JSON.parse(data || '[]');
    }
    catch (error) {
        console.error(`Error leyendo el archivo ${filePath}:`, error);
        return [];
    }
}
function writeJsonFile(filePath, data) {
    try {
        fs_1.default.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    }
    catch (error) {
        console.error(`Error escribiendo el archivo ${filePath}:`, error);
    }
}
exports.UserModel = {
    getAll: () => readJsonFile(config_1.DB_PATHS.USERS),
    findByCredentials: (cuenta, contrasena) => {
        const users = readJsonFile(config_1.DB_PATHS.USERS);
        return users.find(u => u.cuenta === cuenta && u.contrasena === contrasena);
    }
};
exports.MoradorModel = {
    getAll: () => readJsonFile(config_1.DB_PATHS.MORADORES),
    findByDni: (dni) => {
        const moradores = readJsonFile(config_1.DB_PATHS.MORADORES);
        return moradores.find(m => m.dni === dni);
    },
    create: (nuevoMorador) => {
        const moradores = readJsonFile(config_1.DB_PATHS.MORADORES);
        moradores.push(nuevoMorador);
        writeJsonFile(config_1.DB_PATHS.MORADORES, moradores);
        return nuevoMorador;
    }
};
exports.NoAutorizadoModel = {
    getAll: () => readJsonFile(config_1.DB_PATHS.NO_AUTORIZADOS),
    findByDni: (dni) => {
        const noAutorizados = readJsonFile(config_1.DB_PATHS.NO_AUTORIZADOS);
        return noAutorizados.find(p => p.dni === dni);
    },
    create: (nuevo) => {
        const noAutorizados = readJsonFile(config_1.DB_PATHS.NO_AUTORIZADOS);
        noAutorizados.push(nuevo);
        writeJsonFile(config_1.DB_PATHS.NO_AUTORIZADOS, noAutorizados);
        return nuevo;
    }
};
exports.VisitaModel = {
    getAll: () => readJsonFile(config_1.DB_PATHS.VISITAS),
    create: (nueva) => {
        const visitas = readJsonFile(config_1.DB_PATHS.VISITAS);
        visitas.push(nueva);
        writeJsonFile(config_1.DB_PATHS.VISITAS, visitas);
        return nueva;
    }
};
exports.TarjetaModel = {
    getAll: () => readJsonFile(config_1.DB_PATHS.TARJETAS),
    create: (nueva) => {
        const tarjetas = readJsonFile(config_1.DB_PATHS.TARJETAS);
        tarjetas.push(nueva);
        writeJsonFile(config_1.DB_PATHS.TARJETAS, tarjetas);
        return nueva;
    }
};
