import { Request } from 'express';

export interface NoAutorizado {
    id: string;
    dni: string;
    nombre: string;
    motivo: string;
    fecha_reporte: string;
}

export interface Visita {
    id: string;
    dni: string;
    nombre: string;
    fecha_ingreso: string;
}

export interface Morador {
  id: string;
  nombre: string;
  dni: string;
  direccion: string;
  numeroTarjeta: string;
}

export interface Tarjeta {
  id: string;
  idMorador: string;
  patente: string;
  numeroTarjeta: string;
  fecha_creacion: string;
}

export interface User {
    id: string;
    cuenta: string;
    contrasena: string;
    nombre: string;
    rol: 'admin' | 'centinela';
}

// Interfaz extendida para Request con datos de usuario
export interface CustomRequest extends Request {
    user?: any;
}