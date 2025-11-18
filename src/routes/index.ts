// Ruta: src/routes/index.ts
import { Router } from 'express';
import authRouter from './auth.routes';
import moradorRouter from './morador.routes';
import noAutorizadoRouter from './noAutorizado.routes';
import visitaRouter from './visita.routes';
import tarjetaRouter from './tarjeta.routes';

const router = Router();

// Asignamos prefijos a cada conjunto de rutas
router.use('/auth', authRouter); // Rutas de autenticación (ej: /api/auth/login)
router.use('/moradores', moradorRouter); // Rutas de moradores (ej: /api/moradores/:dni)
router.use('/no-autorizados', noAutorizadoRouter);
router.use('/visitas', visitaRouter);
router.use('/tarjetas', tarjetaRouter);

export default router;