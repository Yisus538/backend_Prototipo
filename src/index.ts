import express, { Request, Response } from 'express';
import cors from 'cors';
import { PORT } from './config';
import apiRouter from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Servidor MVC con Base de Datos JSON y JWT activo 🫡');
});

app.use('/api', apiRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});