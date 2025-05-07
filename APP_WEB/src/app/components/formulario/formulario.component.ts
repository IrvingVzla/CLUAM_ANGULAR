import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  standalone: false,
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit {
  formulario: FormGroup;
  formularioEnviado = false;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      documento: ['', Validators.required],
      celular: ['', Validators.required],
      mensaje: [''] // Agregamos el campo mensaje al FormGroup
    });
  }

  ngOnInit(): void {
    // El formulario se inicializa aquí (opcional, ya está en el constructor)
  }

  enviarFormulario() {
    if (this.formulario.valid) {
      console.log('Datos enviados:', this.formulario.value);
      this.formularioEnviado = true;

      // Restablecer los valores del formulario, incluyendo el mensaje
      this.formulario.reset();

      // Opcionalmente, restablecer el estado de los controles a untouched y pristine
      Object.keys(this.formulario.controls).forEach(key => {
        this.formulario.get(key)?.markAsUntouched();
        this.formulario.get(key)?.markAsPristine();
      });

      setTimeout(() => {
        this.formularioEnviado = false;
      }, 3000);
    } else {
      Object.keys(this.formulario.controls).forEach(key => {
        this.formulario.get(key)?.markAsTouched();
      });
    }
  }
}

