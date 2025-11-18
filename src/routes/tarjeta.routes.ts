
import { Router } from 'express';
import { createTarjeta } from '../controllers/tarjeta.controller';
import { verificarToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/', verificarToken, createTarjeta);

export default router;