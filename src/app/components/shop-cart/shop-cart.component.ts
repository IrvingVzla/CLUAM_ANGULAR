import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart-service.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css'],
  standalone: false,
})
export class ShopCartComponent implements OnInit {
  productsInCart: Product[] = [];
  groupedProducts: { product: Product; quantity: number }[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.productsInCart$.subscribe((products) => {
      this.productsInCart = products;
      this.groupProducts();
    });

    this.cartService.totalPrice$.subscribe(
      (price) => (this.totalPrice = price)
    );
  }

  groupProducts(): void {
    const grouped = new Map<string, { product: Product; quantity: number }>();

    this.productsInCart.forEach((product) => {
      if (grouped.has(product.title)) {
        grouped.get(product.title)!.quantity++;
      } else {
        grouped.set(product.title, { product, quantity: 1 });
      }
    });

    this.groupedProducts = Array.from(grouped.values());
  }

  removeProduct(product: Product): void {
    this.cartService.removeFromCart(product);
  }
}
