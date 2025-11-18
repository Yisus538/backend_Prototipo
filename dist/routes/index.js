"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Ruta: src/routes/index.ts
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const morador_routes_1 = __importDefault(require("./morador.routes"));
const noAutorizado_routes_1 = __importDefault(require("./noAutorizado.routes"));
const visita_routes_1 = __importDefault(require("./visita.routes"));
const tarjeta_routes_1 = __importDefault(require("./tarjeta.routes"));
const router = (0, express_1.Router)();
router.use('/auth', auth_routes_1.default);
router.use('/moradores', morador_routes_1.default);
router.use('/no-autorizados', noAutorizado_routes_1.default);
router.use('/visitas', visita_routes_1.default);
router.use('/tarjetas', tarjeta_routes_1.default);
exports.default = router;
