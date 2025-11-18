"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const morador_controller_1 = require("../controllers/morador.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get('/:dni', auth_middleware_1.verificarToken, morador_controller_1.getMoradorByDni);
router.post('/', auth_middleware_1.verificarToken, morador_controller_1.createMorador);
exports.default = router;
