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
exports.ContactoController = void 0;
const contacto_model_1 = require("../models/contacto.model");
const db_1 = __importDefault(require("../config/db"));
const sequelize_1 = require("sequelize");
class ContactoController {
    // Crear nuevo contacto
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const result = yield db_1.default.query(query, {
                    replacements: { nombre, documento, email, celular, mensaje },
                    type: sequelize_1.QueryTypes.INSERT
                });
                const nuevoContacto = new contacto_model_1.ContactoModel({
                    id: result[0],
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
            }
            catch (error) {
                console.error('Error al crear contacto:', error);
                res.status(500).json({
                    msg: 'Error interno del servidor',
                    error: error instanceof Error ? error.message : 'Error desconocido'
                });
            }
        });
    }
    // Obtener todos los contactos (opcional, para administración)
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'SELECT * FROM contacto ORDER BY id DESC';
                const contactos = yield db_1.default.query(query, {
                    type: sequelize_1.QueryTypes.SELECT
                });
                res.status(200).json({
                    msg: 'Contactos obtenidos exitosamente',
                    contactos
                });
            }
            catch (error) {
                console.error('Error al obtener contactos:', error);
                res.status(500).json({
                    msg: 'Error interno del servidor',
                    error: error instanceof Error ? error.message : 'Error desconocido'
                });
            }
        });
    }
    // Obtener contacto por ID (opcional)
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const query = 'SELECT * FROM contacto WHERE id = :id';
                const contactos = yield db_1.default.query(query, {
                    replacements: { id },
                    type: sequelize_1.QueryTypes.SELECT
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
            }
            catch (error) {
                console.error('Error al obtener contacto:', error);
                res.status(500).json({
                    msg: 'Error interno del servidor',
                    error: error instanceof Error ? error.message : 'Error desconocido'
                });
            }
        });
    }
}
exports.ContactoController = ContactoController;
exports.default = ContactoController;
