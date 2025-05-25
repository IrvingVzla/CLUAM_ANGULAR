// src/app/components/formulario/formulario.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactoService } from '../../services/contacto.service';
import { Contacto } from '../../models/contacto.model';

@Component({
  selector: 'app-formulario',
  standalone: false,
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  formulario: FormGroup;
  formularioEnviado = false;
  enviando = false;
  error = false;
  mensajeError = '';

  constructor(
    private fb: FormBuilder,
    private contactoService: ContactoService
  ) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      documento: ['', [Validators.required, Validators.pattern(/^\d+$/)]], // Solo números
      celular: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // 10 dígitos
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  enviarFormulario() {
    if (this.formulario.valid) {
      this.enviando = true;
      this.error = false;
      
      const contactoData: Contacto = {
        nombre: this.formulario.value.nombre,
        documento: parseInt(this.formulario.value.documento),
        email: this.formulario.value.email,
        celular: parseInt(this.formulario.value.celular),
        mensaje: this.formulario.value.mensaje
      };

      console.log('Enviando datos:', contactoData);

      this.contactoService.enviarContacto(contactoData).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          this.formularioEnviado = true;
          this.enviando = false;
          this.formulario.reset();
          
          // Ocultar mensaje de éxito después de 5 segundos
          setTimeout(() => {
            this.formularioEnviado = false;
          }, 5000);
        },
        error: (error) => {
          console.error('Error al enviar formulario:', error);
          this.error = true;
          this.enviando = false;
          this.mensajeError = 'Error al enviar el formulario. Por favor, intente nuevamente.';
        }
      });
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.formulario.controls).forEach(key => {
        this.formulario.get(key)?.markAsTouched();
      });
    }
  }
}
