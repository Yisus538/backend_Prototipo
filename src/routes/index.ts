// Ruta: src/routes/index.ts
import { Router } from 'express';
import authRouter from './auth.routes';
import moradorRouter from './morador.routes';
import noAutorizadoRouter from './noAutorizado.routes';
import visitaRouter from './visita.routes';
import tarjetaRouter from './tarjeta.routes';

const router = Router();

router.use('/auth', authRouter); 
router.use('/moradores', moradorRouter); 
router.use('/no-autorizados', noAutorizadoRouter);
router.use('/visitas', visitaRouter);
router.use('/tarjetas', tarjetaRouter);

export default router;