import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-formulario',
  standalone: false,
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  formulario: FormGroup;
  formularioEnviado = false;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      documento: ['', Validators.required], 
      celular: ['', Validators.required]
    });
  }

  enviarFormulario() {
    if (this.formulario.valid) {
      console.log('Datos enviados:', this.formulario.value);
      this.formularioEnviado = true;
    }
  }
}

