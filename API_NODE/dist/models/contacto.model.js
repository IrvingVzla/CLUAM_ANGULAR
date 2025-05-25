"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactoModel = void 0;
class ContactoModel {
    constructor(contacto) {
        this.id = contacto.id;
        this.nombre = contacto.nombre;
        this.documento = contacto.documento;
        this.email = contacto.email;
        this.celular = contacto.celular;
        this.mensaje = contacto.mensaje;
    }
}
exports.ContactoModel = ContactoModel;
