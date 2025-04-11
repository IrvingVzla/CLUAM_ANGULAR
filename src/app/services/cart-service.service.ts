import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<number>(0); // Número de productos
  private totalPrice = new BehaviorSubject<number>(0); // Precio total
  private productsInCart = new BehaviorSubject<Product[]>([]); // Productos en el carrito

  cartItems$ = this.cartItems.asObservable();
  totalPrice$ = this.totalPrice.asObservable();
  productsInCart$ = this.productsInCart.asObservable();

  addToCart(product: Product): void {
    const currentProducts = this.productsInCart.value;
    this.productsInCart.next([...currentProducts, product]);
    this.cartItems.next(this.cartItems.value + 1);
    this.totalPrice.next(this.totalPrice.value + product.price);
  }

  removeFromCart(product: Product): void {
    const currentProducts = this.productsInCart.value.filter(
      (p) => p !== product
    );
    this.productsInCart.next(currentProducts);
    this.cartItems.next(this.cartItems.value - 1);
    this.totalPrice.next(this.totalPrice.value - product.price);
  }
}
