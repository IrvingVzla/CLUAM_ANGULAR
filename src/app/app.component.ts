import { Component } from '@angular/core';
import { CartService } from '../app/services/cart-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'CluamAngular';
  fechaActual = new Date();

  cartItems = 0;
  totalPrice = 0;

  constructor(private cartService: CartService) {
    this.cartService.cartItems$.subscribe((items) => (this.cartItems = items));
    this.cartService.totalPrice$.subscribe(
      (price) => (this.totalPrice = price)
    );
  }
}
