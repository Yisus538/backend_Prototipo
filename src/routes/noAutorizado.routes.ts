import { Router } from 'express';
import { getNoAutorizadoByDni, createNoAutorizado } from '../controllers/noAutorizado.controller';
import { verificarToken } from '../middleware/auth.middleware';

const router = Router();


router.get('/:dni', verificarToken, getNoAutorizadoByDni);
router.post('/', verificarToken, createNoAutorizado);

export default router;