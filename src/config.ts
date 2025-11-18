import path from 'path';

export const PORT = 4000;
export const SECRET_KEY = 'mi_secreto_super_seguro'; 

export const DATA_DIR = path.join(__dirname, '..', 'data');
export const DB_PATHS = {
    USERS: path.join(DATA_DIR, 'user.json'),
    NO_AUTORIZADOS: path.join(DATA_DIR, 'no-autorizados.json'),
    VISITAS: path.join(DATA_DIR, 'visitas.json'),
    MORADORES: path.join(DATA_DIR, 'moradores.json'),
    TARJETAS: path.join(DATA_DIR, 'tarjetas.json'),
};