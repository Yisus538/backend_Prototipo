import path from 'path';

export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000;

export const SECRET_KEY = process.env.SECRET_KEY || 'FALLBACK_SECRETO_PELIGROSO_DEV';


export const DATA_DIR = path.join(__dirname, '..', 'data');
export const DB_PATHS = {
    USERS: path.join(DATA_DIR, 'user.json'),
    NO_AUTORIZADOS: path.join(DATA_DIR, 'no-autorizados.json'),
    VISITAS: path.join(DATA_DIR, 'visitas.json'),
    MORADORES: path.join(DATA_DIR, 'moradores.json'),
    TARJETAS: path.join(DATA_DIR, 'tarjetas.json'),
};