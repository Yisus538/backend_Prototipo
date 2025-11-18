"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Ruta: src/routes/tarjeta.routes.ts
const express_1 = require("express");
const tarjeta_controller_1 = require("../controllers/tarjeta.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// POST /api/tarjetas
router.post('/', auth_middleware_1.verificarToken, tarjeta_controller_1.createTarjeta);
exports.default = router;
