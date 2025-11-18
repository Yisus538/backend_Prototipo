import 'dotenv/config'; 
import express, { Request, Response } from 'express';
import cors from 'cors';
import { PORT, SECRET_KEY } from './config'; 
import apiRouter from './routes';

const app = express();

const frontendURL = process.env.FRONTEND_URL;
if (!frontendURL) {
    console.error("⚠️ FRONTEND_URL no definido. Revisar archivo .env o variables de Render.");
    process.exit(1);
}

app.use(cors({
    origin: frontendURL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Servidor MVC con Base de Datos JSON y JWT activo 🫡');
});

app.use('/api', apiRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Permitiendo conexiones desde: ${frontendURL}`);
});