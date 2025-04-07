import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-slider',
  standalone: false,
  templateUrl: './hero-slider.component.html',
  styleUrls: ['./hero-slider.component.css'], // Cambiado a styleUrls
})
export class HeroSliderComponent {
  colection = 'Colección de verano';
  tittle = 'Cuida lo que usas y aporta al medio ambiente';
  description =
    'Cluam diseña ropa a partir de telas recicladas, ofreciendo prendas únicas y sostenibles que combinan estilo y responsabilidad ambiental.';

  images = ['assets/img/hero/hero-1.jpg', 'assets/img/hero/hero-2.jpg'];
  currentIndex = 0;

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}
