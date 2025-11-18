"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Ruta: src/routes/morador.routes.ts
const express_1 = require("express");
const morador_controller_1 = require("../controllers/morador.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// --- Rutas Protegidas ---
// GET /api/moradores/:dni
router.get('/:dni', auth_middleware_1.verificarToken, morador_controller_1.getMoradorByDni);
// POST /api/moradores
router.post('/', auth_middleware_1.verificarToken, morador_controller_1.createMorador);
exports.default = router;
