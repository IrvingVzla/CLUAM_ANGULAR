// src/app/services/contacto.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contacto } from '../models/contacto.model';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private apiUrl = 'http://localhost:3000/api/contacto'; 

  constructor(private http: HttpClient) { }

  enviarContacto(contacto: Contacto): Observable<any> {
    return this.http.post<any>(this.apiUrl, contacto);
  }
}