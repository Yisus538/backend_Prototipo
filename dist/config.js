"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_PATHS = exports.DATA_DIR = exports.SECRET_KEY = exports.PORT = void 0;
const path_1 = __importDefault(require("path"));
exports.PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000;
exports.SECRET_KEY = process.env.SECRET_KEY || 'FALLBACK_SECRETO_PELIGROSO_DEV';
exports.DATA_DIR = path_1.default.join(__dirname, '..', 'data');
exports.DB_PATHS = {
    USERS: path_1.default.join(exports.DATA_DIR, 'user.json'),
    NO_AUTORIZADOS: path_1.default.join(exports.DATA_DIR, 'no-autorizados.json'),
    VISITAS: path_1.default.join(exports.DATA_DIR, 'visitas.json'),
    MORADORES: path_1.default.join(exports.DATA_DIR, 'moradores.json'),
    TARJETAS: path_1.default.join(exports.DATA_DIR, 'tarjetas.json'),
};
