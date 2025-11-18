// Ruta: src/routes/tarjeta.routes.ts
import { Router } from 'express';
import { createTarjeta } from '../controllers/tarjeta.controller';
import { verificarToken } from '../middleware/auth.middleware';

const router = Router();

// POST /api/tarjetas
router.post('/', verificarToken, createTarjeta);

export default router;