// Ruta: src/routes/morador.routes.ts
import { Router } from 'express';
import { getMoradorByDni, createMorador } from '../controllers/morador.controller';
import { verificarToken } from '../middleware/auth.middleware';

const router = Router();

// --- Rutas Protegidas ---
// GET /api/moradores/:dni
router.get('/:dni', verificarToken, getMoradorByDni);

// POST /api/moradores
router.post('/', verificarToken, createMorador);

export default router;