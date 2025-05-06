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

  // Agregar un producto al carrito
  addToCart(product: Product): void {
    const currentProducts = this.productsInCart.value;
    this.productsInCart.next([...currentProducts, product]);
    this.cartItems.next(this.cartItems.value + 1);
    this.totalPrice.next(this.totalPrice.value + product.price);
  }

  // Remover un producto del carrito
  removeFromCart(product: Product): void {
    const currentProducts = this.productsInCart.value;
    const filteredProducts = currentProducts.filter(
      (p) => p.title !== product.title
    );
    const removedCount = currentProducts.length - filteredProducts.length;
    const totalRemovedPrice = removedCount * product.price;

    this.productsInCart.next(filteredProducts);
    this.cartItems.next(this.cartItems.value - removedCount);
    this.totalPrice.next(this.totalPrice.value - totalRemovedPrice);
  }

  // Setear los productos del carrito
  setProducts(products: Product[]): void {
    this.productsInCart.next(products);
    this.cartItems.next(products.length);
  }

  // Disminuir el precio total (Para individuales)
  decreaseTotal(price: number): void {
    this.totalPrice.next(this.totalPrice.value - price);
  }
}
