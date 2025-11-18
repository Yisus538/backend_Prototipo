import express, { Request, Response, NextFunction } from 'express'; // Agregamos NextFunction
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import jwt from 'jsonwebtoken'; // <--- NUEVO: Importar JWT

const app = express();
const PORT = 4000;
const SECRET_KEY = 'mi_secreto_super_seguro'; // <--- NUEVO: Clave para firmar los tokens (En prod usa variables de entorno)

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

// <-- INICIO DE ADICIONES (Nuevas Interfaces) -->
interface Morador {
  id: string;
  nombre: string;
  dni: string;
  direccion: string;
  numeroTarjeta: string;
}

interface Tarjeta {
  id: string;
  idMorador: string; // O dniMorador
  patente: string;
  numeroTarjeta: string;
  fecha_creacion: string;
}
// <-- FIN DE ADICIONES -->

// <--- NUEVO: Interfaz extendida para Request (para que TS no se queje de req.user)
interface CustomRequest extends Request {
    user?: any;
}

// --- Rutas a los Archivos JSON ---
const dataDir = path.join(__dirname, '..', 'data');
const USERS_DB_PATH = path.join(dataDir, 'user.json');
const NO_AUTORIZADOS_DB_PATH = path.join(dataDir, 'no-autorizados.json');
const VISITAS_DB_PATH = path.join(dataDir, 'visitas.json');

// <-- INICIO DE ADICIONES (Nuevas Rutas JSON) -->
const MORADORES_DB_PATH = path.join(dataDir, 'moradores.json');
const TARJETAS_DB_PATH = path.join(dataDir, 'tarjetas.json');
// <-- FIN DE ADICIONES -->


// --- Funciones de Lectura/Escritura ---
const getUsers = () => {
    try {
        const data = fs.readFileSync(USERS_DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error leyendo base de datos (usuarios):", error);
        return [];
    }
};

const getNoAutorizados = (): NoAutorizado[] => {
    try {
        const data = fs.readFileSync(NO_AUTORIZADOS_DB_PATH, 'utf-8');
        return JSON.parse(data || '[]');
    } catch (error) { return []; }
};

const saveNoAutorizados = (noAutorizados: NoAutorizado[]) => {
    try {
    } catch (error) { console.error(error); }
};

const getVisitas = (): Visita[] => {
    try {
        const data = fs.readFileSync(VISITAS_DB_PATH, 'utf-8');
        return JSON.parse(data || '[]');
    } catch (error) { return []; }
};

const saveVisitas = (visitas: Visita[]) => {
    try {
        fs.writeFileSync(VISITAS_DB_PATH, JSON.stringify(visitas, null, 2));
    } catch (error) { console.error(error); }
};

// <-- INICIO DE ADICIONES (Nuevas Funciones R/W) -->
const getMoradores = (): Morador[] => {
    try {
        const data = fs.readFileSync(MORADORES_DB_PATH, 'utf-8');
        return JSON.parse(data || '[]');
    } catch (error) {
        console.error("Error leyendo base de datos (moradores):", error);
        return [];
    }
};

// <-- INICIO DE ADICIONES (Función de guardado que faltaba) -->
const saveMoradores = (moradores: Morador[]) => {
    try {
        fs.writeFileSync(MORADORES_DB_PATH, JSON.stringify(moradores, null, 2));
    } catch (error) {
        console.error("Error guardando base de datos (moradores):", error);
    }
};
// <-- FIN DE ADICIONES -->

const getTarjetas = (): Tarjeta[] => {
    try {
        const data = fs.readFileSync(TARJETAS_DB_PATH, 'utf-8');
        return JSON.parse(data || '[]');
    } catch (error) {
        console.error("Error leyendo base de datos (tarjetas):", error);
        return [];
    }
};

const saveTarjetas = (tarjetas: Tarjeta[]) => {
    try {
        fs.writeFileSync(TARJETAS_DB_PATH, JSON.stringify(tarjetas, null, 2));
    } catch (error) {
        console.error("Error guardando base de datos (tarjetas):", error);
    }
};
// <-- FIN DE ADICIONES -->


// --- <--- NUEVO: MIDDLEWARE DE SEGURIDAD ---
const verificarToken = (req: CustomRequest, res: Response, next: NextFunction): any => {
    const authHeader = req.headers['authorization'];
    // El formato suele ser: "Bearer <TOKEN>"
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado: Falta el token' });
    }

    jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido o expirado' });
        }
        req.user = user; // Guardamos los datos del usuario en la request
        next(); // Continuamos a la siguiente función
    });
};


// --- Rutas de API ---

app.get('/', (req, res) => {
    res.send('Servidor con Base de Datos JSON y JWT activo 🫡');
});

// Ruta de Login (Pública)
app.post('/api/login', (req: Request, res: Response): any => {
    const { cuenta, contrasena } = req.body;
    const users = getUsers();
    const usuarioEncontrado = users.find(
        (u: any) => u.cuenta === cuenta && u.contrasena === contrasena
    );

    if (usuarioEncontrado) {
        // <--- NUEVO: Generación del Token
        const token = jwt.sign(
            { 
                cuenta: usuarioEncontrado.cuenta, 
                rol: usuarioEncontrado.rol,
                nombre: usuarioEncontrado.nombre 
            },
            SECRET_KEY,
            { expiresIn: '2h' } // El token expira en 2 horas
        );

        console.log(`Login exitoso: ${usuarioEncontrado.cuenta}`);
        
        return res.status(200).json({
            mensaje: 'Acceso autorizado',
            token: token, // <--- Enviamos el token al frontend
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

// --- Rutas Protegidas (Agregamos 'verificarToken') ---

// Ruta para Consultar No Autorizados (Protegida)
app.get('/api/no-autorizados/:dni', verificarToken, (req: Request, res: Response): any => {
    const { dni } = req.params;
    const noAutorizados = getNoAutorizados();
    const encontrado = noAutorizados.find(p => p.dni === dni);

    if (encontrado) {
        return res.status(200).json(encontrado);
    } else {
        return res.status(404).json({ message: 'No encontrado en la lista de no autorizados' });
    }
});

// Ruta para Registrar Visitas (Protegida)
app.post('/api/visitas', verificarToken, (req: Request, res: Response): any => {
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
        res.status(201).json(nuevaVisita);
    } catch (error) {
        res.status(500).json({ message: 'Error interno' });
    }
});

// Ruta para Registrar No Autorizados (Protegida)
app.post('/api/no-autorizados', verificarToken, (req: Request, res: Response): any => {
    const { dni, nombre, motivo } = req.body;

    if (!dni || !nombre || !motivo) {
        return res.status(400).json({ message: 'Datos incompletos' });
    }

    try {
        const noAutorizados = getNoAutorizados();
        const yaExiste = noAutorizados.find(p => p.dni === dni);
        if (yaExiste) {
            return res.status(409).json({ message: 'Conflicto: El DNI ya existe' });
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
        res.status(201).json(nuevoNoAutorizado);

    } catch (error) {
        res.status(500).json({ message: 'Error interno' });
    }
});

// <-- INICIO DE ADICIONES (Nuevas Rutas) -->
// --- NUEVAS RUTAS PARA REGISTRAR TARJETA ---

// Ruta para BUSCAR un Morador por DNI (Paso 2 del frontend)
app.get('/api/moradores/:dni', verificarToken, (req: Request, res: Response): any => {
    const { dni } = req.params;
    const moradores = getMoradores();
    
    // Buscamos por DNI, ya que eso es lo que envía el frontend como idMorador
    const moradorEncontrado = moradores.find(m => m.dni === dni);

    if (moradorEncontrado) {
        console.log(`Consulta Morador DNI ${dni}: ENCONTRADO`);
        // Devolvemos los datos del morador (tal como espera el frontend)
        return res.status(200).json(moradorEncontrado);
    } else {
        console.log(`Consulta Morador DNI ${dni}: NO Encontrado`);
        return res.status(404).json({ message: 'No se encontró el morador con ese DNI/ID.' });
    }
});

// Ruta para GUARDAR la Tarjeta (Paso 3 del frontend)
app.post('/api/tarjetas', verificarToken, (req: Request, res: Response): any => {
    const { idMorador, patente, numeroTarjeta } = req.body;

    if (!idMorador || !patente || !numeroTarjeta) {
        return res.status(400).json({ message: 'Datos incompletos para registrar tarjeta' });
    }

    try {
        const tarjetas = getTarjetas();
        const nuevaTarjeta: Tarjeta = {
            id: crypto.randomUUID(),
            idMorador, // Este es el DNI que viene del frontend
            patente,
            numeroTarjeta,
            fecha_creacion: new Date().toISOString()
        };

        tarjetas.push(nuevaTarjeta);
        saveTarjetas(tarjetas);

        console.log(`Tarjeta registrada para Morador ${idMorador} con patente ${patente}`);
        res.status(201).json(nuevaTarjeta);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno al guardar la tarjeta' });
    }
});
// <-- FIN DE ADICIONES -->

// <-- INICIO DE ADICIONES (Nuevas Rutas para Morador) -->
app.post('/api/moradores', verificarToken, (req: Request, res: Response): any => {
    // El DNI será el ID principal
    const { dni, nombre, direccion, numeroTarjeta } = req.body;

    if (!dni || !nombre || !direccion || !numeroTarjeta) {
        return res.status(400).json({ message: 'Datos incompletos para registrar morador' });
    }

    try {
        const moradores = getMoradores();
        const yaExiste = moradores.find(m => m.dni === dni);
        
        if (yaExiste) {
            return res.status(409).json({ message: 'Conflicto: El DNI ya se encuentra registrado' });
        }

        const nuevoMorador: Morador = {
            id: dni, // Usamos el DNI como ID
            dni,
            nombre,
            direccion,
            numeroTarjeta
        };

        moradores.push(nuevoMorador);
        saveMoradores(moradores);

        console.log(`Morador registrado DNI ${dni}: ${nombre}`);
        res.status(201).json(nuevoMorador); // 201 = Creado exitosamente

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno al guardar el morador' });
    }
});
// <-- FIN DE ADICIONES -->


// --- Iniciar el Servidor ---
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});