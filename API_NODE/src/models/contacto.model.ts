import { ContactoInterface } from '../interfaces/contacto.interface';

export class ContactoModel implements ContactoInterface {
  id?: number;
  nombre: string;
  documento: number;
  email: string;
  celular: number;
  mensaje: string;

  constructor(contacto: ContactoInterface) {
    this.id = contacto.id;
    this.nombre = contacto.nombre;
    this.documento = contacto.documento;
    this.email = contacto.email;
    this.celular = contacto.celular;
    this.mensaje = contacto.mensaje;
  }
}