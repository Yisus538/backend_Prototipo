import { Router } from 'express';
import { getMoradorByDni, createMorador } from '../controllers/morador.controller';
import { verificarToken } from '../middleware/auth.middleware';

const router = Router();


router.get('/:dni', verificarToken, getMoradorByDni);

router.post('/', verificarToken, createMorador);

export default router;