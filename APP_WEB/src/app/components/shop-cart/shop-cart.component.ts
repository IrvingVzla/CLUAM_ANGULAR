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
  originalPrice: number = 0;

  discountCode: string = '';
  discountApplied: boolean = false;
  discountError: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.productsInCart$.subscribe((products) => {
      this.productsInCart = products;
      this.groupProducts();
    });

    this.cartService.totalPrice$.subscribe((price) => {
      this.originalPrice = price;
      this.totalPrice = price;
    });
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

    this.groupedProducts = Array.from(grouped.values()).sort((a, b) =>
      a.product.title.localeCompare(b.product.title)
    );
  }

  removeProduct(product: Product): void {
    this.cartService.removeFromCart(product);
  }

  increaseQuantity(product: Product): void {
    this.cartService.addToCart(product);
  }

  decreaseQuantity(product: Product): void {
    const index = this.productsInCart.findIndex(
      (p) => p.title === product.title
    );
    if (index !== -1) {
      this.productsInCart.splice(index, 1);
      this.cartService.setProducts([...this.productsInCart]);
      this.cartService.decreaseTotal(product.price);
      this.groupProducts();
    }
  }

  applyDiscount(): void {
    if (this.discountApplied) {
      alert('Ya has aplicado el código de descuento.');
      return;
    }

    if (this.discountCode.trim().toUpperCase() === 'DESCUENTO20') {
      const discount = this.originalPrice * 0.2;
      this.totalPrice = this.originalPrice - discount;
      this.discountApplied = true;
      this.discountError = false;
    } else {
      this.discountApplied = false;
      this.discountError = true;
    }
  }
}
