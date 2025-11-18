import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// --- Definición de Interfaces ---
interface NoAutorizado {
    id: string;
    dni: string;
    nombre: string;
    motivo: string;
    fecha_reporte: string;
}

interface Visita {
    id: string;
    dni: string;
    nombre: string;
    fecha_ingreso: string;
}

// --- Rutas a los Archivos JSON ---
const dataDir = path.join(__dirname, '..', 'data');
const USERS_DB_PATH = path.join(dataDir, 'user.json');
const NO_AUTORIZADOS_DB_PATH = path.join(dataDir, 'no-autorizados.json');
const VISITAS_DB_PATH = path.join(dataDir, 'visitas.json');

// --- Funciones de Lectura/Escritura ---

// --- Funciones de Usuarios ---
const getUsers = () => {
    try {
        const data = fs.readFileSync(USERS_DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error leyendo base de datos (usuarios):", error);
        return [];
    }
};

// --- Funciones de No Autorizados ---
const getNoAutorizados = (): NoAutorizado[] => {
    try {
        const data = fs.readFileSync(NO_AUTORIZADOS_DB_PATH, 'utf-8');
        return JSON.parse(data || '[]');
    } catch (error) {
        console.error("Error leyendo base de datos (no autorizados):", error);
        return [];
    }
};

// <--- (1) NUEVA FUNCIÓN PARA GUARDAR NO AUTORIZADOS
const saveNoAutorizados = (noAutorizados: NoAutorizado[]) => {
    try {
        fs.writeFileSync(NO_AUTORIZADOS_DB_PATH, JSON.stringify(noAutorizados, null, 2));
    } catch (error) {
        console.error("Error guardando base de datos (no autorizados):", error);
    }
};

// --- Funciones de Visitas ---
const getVisitas = (): Visita[] => {
    try {
        const data = fs.readFileSync(VISITAS_DB_PATH, 'utf-8');
        return JSON.parse(data || '[]');
    } catch (error) {
        console.error("Error leyendo base de datos (visitas):", error);
        return [];
    }
};

const saveVisitas = (visitas: Visita[]) => {
    try {
        fs.writeFileSync(VISITAS_DB_PATH, JSON.stringify(visitas, null, 2));
    } catch (error) {
        console.error("Error guardando base de datos (visitas):", error);
    }
};


// --- Rutas de API ---

app.get('/', (req, res) => {
    res.send('Servidor con Base de Datos JSON activo 🫡');
});

// Ruta de Login
app.post('/api/login', (req: Request, res: Response): any => {
    // ... tu código de login ...
    const { cuenta, contrasena } = req.body;
    const users = getUsers();
    const usuarioEncontrado = users.find(
        (u: any) => u.cuenta === cuenta && u.contrasena === contrasena
    );

    if (usuarioEncontrado) {
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

// Ruta para Consultar No Autorizados
app.get('/api/no-autorizados/:dni', (req: Request, res: Response): any => {
    const { dni } = req.params;
    const noAutorizados = getNoAutorizados();
    const encontrado = noAutorizados.find(p => p.dni === dni);

    if (encontrado) {
        console.log(`Consulta DNI ${dni}: ENCONTRADO (No Autorizado)`);
        return res.status(200).json(encontrado);
    } else {
        console.log(`Consulta DNI ${dni}: No encontrado (Limpio)`);
        return res.status(404).json({ message: 'No encontrado en la lista de no autorizados' });
    }
});

// Ruta para Registrar Visitas
app.post('/api/visitas', (req: Request, res: Response) => {
    // ... tu código de visitas ...
    const { dni, nombre } = req.body;
    if (!dni || !nombre) {
        return res.status(400).json({ message: 'DNI y Nombre son requeridos' });
    }
    try {
        const visitas = getVisitas();
        const nuevaVisita: Visita = {
            id: crypto.randomUUID(),
            dni,
            nombre,
            fecha_ingreso: new Date().toISOString()
        };
        visitas.push(nuevaVisita);
        saveVisitas(visitas);
        console.log(`Visita registrada para DNI ${dni}: ${nombre}`);
        res.status(201).json(nuevaVisita);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor al guardar visita' });
    }
});

// <--- (2) NUEVA RUTA PARA REGISTRAR NO AUTORIZADOS
app.post('/api/no-autorizados', (req: Request, res: Response) => {
    const { dni, nombre, motivo } = req.body;

    if (!dni || !nombre || !motivo) {
        return res.status(400).json({ message: 'DNI, Nombre y Motivo son requeridos' });
    }

    try {
        const noAutorizados = getNoAutorizados();

        // Verificación extra: no agregar si ya existe
        const yaExiste = noAutorizados.find(p => p.dni === dni);
        if (yaExiste) {
            return res.status(409).json({ message: 'Conflicto: El DNI ya se encuentra en la lista' });
        }

        const nuevoNoAutorizado: NoAutorizado = {
            id: crypto.randomUUID(),
            dni,
            nombre,
            motivo,
            fecha_reporte: new Date().toISOString()
        };

        noAutorizados.push(nuevoNoAutorizado);
        saveNoAutorizados(noAutorizados);

        console.log(`No Autorizado registrado para DNI ${dni}: ${nombre}`);
        res.status(201).json(nuevoNoAutorizado); // 201 = Creado exitosamente

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor al guardar' });
    }
});


// --- Iniciar el Servidor ---
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});