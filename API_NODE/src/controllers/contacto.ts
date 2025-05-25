// src/controllers/contacto.ts
import { Request, Response } from 'express';
import { ContactoModel } from '../models/contacto.model';
import sequelize from '../config/db';
import { QueryTypes } from 'sequelize';

export class ContactoController {
  
  // Crear nuevo contacto
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, documento, email, celular, mensaje } = req.body;

      // Validaciones básicas
      if (!nombre || !documento || !email || !celular || !mensaje) {
        res.status(400).json({
          msg: 'Todos los campos son obligatorios'
        });
        return;
      }

      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({
          msg: 'El formato del email no es válido'
        });
        return;
      }

      // Validar que documento y celular sean números
      if (isNaN(documento) || isNaN(celular)) {
        res.status(400).json({
          msg: 'Documento y celular deben ser números válidos'
        });
        return;
      }

      const query = `
        INSERT INTO contacto (nombre, documento, email, celular, mensaje) 
        VALUES (:nombre, :documento, :email, :celular, :mensaje)
      `;

      const result = await sequelize.query(query, {
        replacements: { nombre, documento, email, celular, mensaje },
        type: QueryTypes.INSERT
      });

      const nuevoContacto = new ContactoModel({
        id: result[0] as number,
        nombre,
        documento: Number(documento),
        email,
        celular: Number(celular),
        mensaje
      });

      res.status(201).json({
        msg: 'Contacto guardado exitosamente',
        contacto: nuevoContacto
      });

    } catch (error) {
      console.error('Error al crear contacto:', error);
      res.status(500).json({
        msg: 'Error interno del servidor',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }

  // Obtener todos los contactos (opcional, para administración)
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const query = 'SELECT * FROM contacto ORDER BY id DESC';
      const contactos = await sequelize.query(query, {
        type: QueryTypes.SELECT
      });

      res.status(200).json({
        msg: 'Contactos obtenidos exitosamente',
        contactos
      });

    } catch (error) {
      console.error('Error al obtener contactos:', error);
      res.status(500).json({
        msg: 'Error interno del servidor',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }

  // Obtener contacto por ID (opcional)
  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const query = 'SELECT * FROM contacto WHERE id = :id';
      const contactos = await sequelize.query(query, {
        replacements: { id },
        type: QueryTypes.SELECT
      });

      if (contactos.length === 0) {
        res.status(404).json({
          msg: 'Contacto no encontrado'
        });
        return;
      }

      res.status(200).json({
        msg: 'Contacto obtenido exitosamente',
        contacto: contactos[0]
      });

    } catch (error) {
      console.error('Error al obtener contacto:', error);
      res.status(500).json({
        msg: 'Error interno del servidor',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }
}

export default ContactoController;