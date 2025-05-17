"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const producto_1 = require("../controllers/producto");
// Importar las funciones de los controladores
const router = (0, express_1.Router)();
// Definir las rutas y asociarlas a los controladores
router.get("/", producto_1.getProducts);
router.get("/:id", producto_1.getProduct);
router.post("/", producto_1.postProduct);
router.put("/:id", producto_1.updateProduct);
router.delete("/:id", producto_1.deleteProduct);
exports.default = router;
