"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const frontendURL = process.env.FRONTEND_URL;
if (!frontendURL) {
    console.error("⚠️ FRONTEND_URL no definido. Revisar archivo .env o variables de Render.");
    process.exit(1);
}
app.use((0, cors_1.default)({
    origin: frontendURL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Servidor MVC con Base de Datos JSON y JWT activo 🫡');
});
app.use('/api', routes_1.default);
app.listen(config_1.PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${config_1.PORT}`);
    console.log(`Permitiendo conexiones desde: ${frontendURL}`);
});
