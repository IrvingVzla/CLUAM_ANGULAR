import express, { Application, Request, Response } from "express";
import routesProducto from "../routes/producto";
import db from '../db/conexion';

class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3001";

    this.app.use(express.json());
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
    this.app.get("/", (req: Request, res: Response) => {
      res.json({
        msg: "API Working",
      });
    });

    // Definición de rutas para productos
    this.app.use("/api/productos", routesProducto);

    // Manejar 404
    this.app.use((req, res, next) => {
      res.status(404).json({
        msg: "Ruta no encontrada",
      });
    });
  }

  midlewares() {
    this.app.use(express.json());
  }

  async dbConnect(){
    await db.authenticate();
    console.log('Base de Datos Conectada');
  }
}

export default Server;
