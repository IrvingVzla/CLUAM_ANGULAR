"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const producto_1 = __importDefault(require("../routes/producto"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3001";
        this.app.use(express_1.default.json()); // Esto es importante
        this.routes();
        this.listen();
        this.midlewares();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicación corriendo en el puerto ${this.port}`);
        });
    }
    routes() {
        this.app.get("/", (req, res) => {
            res.json({
                msg: "API Working",
            });
        });
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
}
exports.default = Server;
