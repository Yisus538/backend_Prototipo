import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// --- Función para leer la "Base de Datos" ---
// Busca el archivo users.json dinámicamente
const DB_PATH = path.join(__dirname, '../data/user.json');

const getUsers = () => {
    try {
        const data = fs.readFileSync(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error leyendo base de datos:", error);
        return [];
    }
};

// --- Rutas ---

app.get('/', (req, res) => {
    res.send('Servidor con Base de Datos JSON activo 🫡');
});

app.post('/api/login', (req: Request, res: Response): any => {
    const { cuenta, contrasena } = req.body;

    // 1. Leemos el archivo JSON fresco
    const users = getUsers();

    // 2. Buscamos coincidencia
    // Nota: "any" aquí es para simplificar el prototipo, idealmente usaríamos una interfaz User
    const usuarioEncontrado = users.find(
        (u: any) => u.cuenta === cuenta && u.contrasena === contrasena
    );

    if (usuarioEncontrado) {
        // ¡Éxito! Devolvemos datos clave (sin la contraseña)
        console.log(`Login exitoso: ${usuarioEncontrado.cuenta} (${usuarioEncontrado.rol})`);

        return res.status(200).json({
            mensaje: 'Acceso autorizado',
            usuario: {
                nombre: usuarioEncontrado.nombre,
                cuenta: usuarioEncontrado.cuenta,
                rol: usuarioEncontrado.rol
            }
        });
    } else {
        return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});