"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const producto_1 = __importDefault(require("../routes/producto"));
const conexion_1 = __importDefault(require("../db/conexion"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3001";
        this.app.use(express_1.default.json());
        this.routes();
        this.listen();
        this.midlewares();
        this.dbConnect();
    }
    // Middleware para manejar errores
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicación corriendo en el puerto ${this.port}`);
        });
    }
    // Definición de rutas
    routes() {
        this.app.get("/", (req, res) => {
            res.json({
                msg: "API Working",
            });
        });
        // Definición de rutas para productos
        this.app.use("/api/productos", producto_1.default);
        // Manejar 404
        this.app.use((req, res, next) => {
            res.status(404).json({
                msg: "Ruta no encontrada",
            });
        });
    }
    midlewares() {
        this.app.use(express_1.default.json());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield conexion_1.default.authenticate();
            console.log('Base de Datos Conectada');
        });
    }
}
exports.default = Server;
