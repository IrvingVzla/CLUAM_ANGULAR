"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contacto_1 = require("../controllers/contacto");
const router = (0, express_1.Router)();
// POST /api/contacto - Crear nuevo contacto
router.post('/', contacto_1.ContactoController.create);
// GET /api/contacto - Obtener todos los contactos (opcional)
router.get('/', contacto_1.ContactoController.getAll);
// GET /api/contacto/:id - Obtener contacto por ID (opcional)
router.get('/:id', contacto_1.ContactoController.getById);
exports.default = router;
