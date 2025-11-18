"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Ruta: src/routes/noAutorizado.routes.ts
const express_1 = require("express");
const noAutorizado_controller_1 = require("../controllers/noAutorizado.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// GET /api/no-autorizados/:dni
router.get('/:dni', auth_middleware_1.verificarToken, noAutorizado_controller_1.getNoAutorizadoByDni);
// POST /api/no-autorizados
router.post('/', auth_middleware_1.verificarToken, noAutorizado_controller_1.createNoAutorizado);
exports.default = router;
