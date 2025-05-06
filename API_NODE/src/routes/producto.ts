import { Router } from "express";
import {
  getProducts,
  getProduct,
  postProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/producto";

// Importar las funciones de los controladores
const router = Router();

// Definir las rutas y asociarlas a los controladores
router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", postProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
