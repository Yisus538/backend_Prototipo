// Ruta: src/routes/noAutorizado.routes.ts
import { Router } from 'express';
import { getNoAutorizadoByDni, createNoAutorizado } from '../controllers/noAutorizado.controller';
import { verificarToken } from '../middleware/auth.middleware';

const router = Router();

// GET /api/no-autorizados/:dni
router.get('/:dni', verificarToken, getNoAutorizadoByDni);

// POST /api/no-autorizados
router.post('/', verificarToken, createNoAutorizado);

export default router;