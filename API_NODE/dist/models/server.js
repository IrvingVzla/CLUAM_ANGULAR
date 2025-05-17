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
const cors_1 = __importDefault(require("cors"));
const producto_1 = __importDefault(require("../routes/producto"));
const db_1 = __importDefault(require("../config/db"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3001";
        this.middlewares(); // <- primero aplica los middlewares
        this.routes(); // <- luego define las rutas
        this.dbConnect(); // <- conecta a la DB
    }
    // Conexión a la base de datos
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db_1.default.authenticate();
                console.log("Base de datos conectada con éxito");
            }
            catch (error) {
                console.error("Error al conectar a la base de datos:", error);
            }
        });
    }
    // Definición de middlewares
    middlewares() {
        this.app.use((0, cors_1.default)()); // habilita CORS
        this.app.use(express_1.default.json()); // parsea JSON
    }
    // Definición de rutas
    routes() {
        this.app.get("/", (req, res) => {
            res.json({ msg: "API Working" });
        });
        this.app.use("/api/productos", producto_1.default);
        // Manejar 404
        this.app.use((req, res) => {
            res.status(404).json({ msg: "Ruta no encontrada" });
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicación corriendo en el puerto ${this.port}`);
        });
    }
}
exports.default = Server;
