"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Ruta: src/routes/auth.routes.ts
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
// --- Rutas Públicas ---
// POST /api/auth/login
router.post('/login', auth_controller_1.loginController);
exports.default = router;
