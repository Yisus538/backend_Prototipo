
import fs from 'fs';
import { DB_PATHS } from '../config';
import { User, Morador, NoAutorizado, Visita, Tarjeta } from '../interfaces/types';


function readJsonFile<T>(filePath: string): T {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data || '[]');
    } catch (error) {
        console.error(`Error leyendo el archivo ${filePath}:`, error);
        return [] as T;
    }
}

function writeJsonFile<T>(filePath: string, data: T): void {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error(`Error escribiendo el archivo ${filePath}:`, error);
    }
}
export const UserModel = {
    getAll: (): User[] => readJsonFile<User[]>(DB_PATHS.USERS),
    findByCredentials: (cuenta: string, contrasena: string): User | undefined => {
        const users = readJsonFile<User[]>(DB_PATHS.USERS);
        return users.find(u => u.cuenta === cuenta && u.contrasena === contrasena);
    }
};

export const MoradorModel = {
    getAll: (): Morador[] => readJsonFile<Morador[]>(DB_PATHS.MORADORES),
    findByDni: (dni: string): Morador | undefined => {
        const moradores = readJsonFile<Morador[]>(DB_PATHS.MORADORES);
        return moradores.find(m => m.dni === dni);
    },
    create: (nuevoMorador: Morador): Morador => {
        const moradores = readJsonFile<Morador[]>(DB_PATHS.MORADORES);
        moradores.push(nuevoMorador);
        writeJsonFile(DB_PATHS.MORADORES, moradores);
        return nuevoMorador;
    }
};

export const NoAutorizadoModel = {
    getAll: (): NoAutorizado[] => readJsonFile<NoAutorizado[]>(DB_PATHS.NO_AUTORIZADOS),
    findByDni: (dni: string): NoAutorizado | undefined => {
        const noAutorizados = readJsonFile<NoAutorizado[]>(DB_PATHS.NO_AUTORIZADOS);
        return noAutorizados.find(p => p.dni === dni);
    },
    create: (nuevo: NoAutorizado): NoAutorizado => {
        const noAutorizados = readJsonFile<NoAutorizado[]>(DB_PATHS.NO_AUTORIZADOS);
        noAutorizados.push(nuevo);
        writeJsonFile(DB_PATHS.NO_AUTORIZADOS, noAutorizados);
        return nuevo;
    }
};

export const VisitaModel = {
    getAll: (): Visita[] => readJsonFile<Visita[]>(DB_PATHS.VISITAS),
    create: (nueva: Visita): Visita => {
        const visitas = readJsonFile<Visita[]>(DB_PATHS.VISITAS);
        visitas.push(nueva);
        writeJsonFile(DB_PATHS.VISITAS, visitas);
        return nueva;
    }
};

export const TarjetaModel = {
    getAll: (): Tarjeta[] => readJsonFile<Tarjeta[]>(DB_PATHS.TARJETAS),
    create: (nueva: Tarjeta): Tarjeta => {
        const tarjetas = readJsonFile<Tarjeta[]>(DB_PATHS.TARJETAS);
        tarjetas.push(nueva);
        writeJsonFile(DB_PATHS.TARJETAS, tarjetas);
        return nueva;
    }
};