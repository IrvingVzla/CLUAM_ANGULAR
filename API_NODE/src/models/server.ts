import express, { Application, Request, Response } from "express";
import cors from "cors";
import routesProducto from "../routes/producto";
import routesContacto from "../routes/contacto";
import sequelize from "../config/db";

class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3001";

    this.middlewares(); // <- primero aplica los middlewares
    this.routes(); // <- luego define las rutas
    this.dbConnect(); // <- conecta a la DB
  }

  // Conexión a la base de datos
  private async dbConnect() {
    try {
      await sequelize.authenticate();
      console.log("Base de datos conectada con éxito");
    } catch (error) {
      console.error("Error al conectar a la base de datos:", error);
    }
  }

  // Definición de middlewares
  private middlewares() {
    this.app.use(cors()); // habilita CORS
    this.app.use(express.json()); // parsea JSON
    this.app.use(express.urlencoded({ extended: true })); // parsea form data
  }

  // Definición de rutas
  private routes() {
    this.app.get("/", (req: Request, res: Response) => {
      res.json({ 
        msg: "API Working",
        endpoints: {
          productos: "/api/productos",
          contacto: "/api/contacto"
        }
      });
    });

    this.app.use("/api/productos", routesProducto);
    this.app.use("/api/contacto", routesContacto); 

    // Manejar 404
    this.app.use((req, res) => {
      res.status(404).json({ msg: "Ruta no encontrada" });
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Aplicación corriendo en el puerto ${this.port}`);
    });
  }
}

export default Server;
