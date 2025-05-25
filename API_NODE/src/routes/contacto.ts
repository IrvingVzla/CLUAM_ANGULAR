import { Router } from 'express';
import { ContactoController } from '../controllers/contacto';

const router = Router();

// POST /api/contacto - Crear nuevo contacto
router.post('/', ContactoController.create);

// GET /api/contacto - Obtener todos los contactos (opcional)
router.get('/', ContactoController.getAll);

// GET /api/contacto/:id - Obtener contacto por ID (opcional)
router.get('/:id', ContactoController.getById);

export default router;