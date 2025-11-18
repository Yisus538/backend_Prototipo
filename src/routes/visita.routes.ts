// Ruta: src/routes/visita.routes.ts
import { Router } from 'express';
import { createVisita } from '../controllers/visita.controller';
import { verificarToken } from '../middleware/auth.middleware';

const router = Router();

// POST /api/visitas
router.post('/', verificarToken, createVisita);

export default router;