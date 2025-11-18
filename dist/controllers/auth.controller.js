"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../models/db");
const config_1 = require("../config");
const loginController = (req, res) => {
    const { cuenta, contrasena } = req.body;
    const usuarioEncontrado = db_1.UserModel.findByCredentials(cuenta, contrasena);
    if (usuarioEncontrado) {
        const token = jsonwebtoken_1.default.sign({
            cuenta: usuarioEncontrado.cuenta,
            rol: usuarioEncontrado.rol,
            nombre: usuarioEncontrado.nombre
        }, config_1.SECRET_KEY, { expiresIn: '2h' });
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
    }
    else {
        return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }
};
exports.loginController = loginController;
