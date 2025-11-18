"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const noAutorizado_controller_1 = require("../controllers/noAutorizado.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get('/:dni', auth_middleware_1.verificarToken, noAutorizado_controller_1.getNoAutorizadoByDni);
router.post('/', auth_middleware_1.verificarToken, noAutorizado_controller_1.createNoAutorizado);
exports.default = router;
