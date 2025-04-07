import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-shop',
  standalone: false,
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  @Input() product!: Product;

  products: Product[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<Product[]>('https://api.escuelajs.co/api/v1/products')
      .subscribe({
        next: (data) => {
          //this.products = data;

          this.products = data.filter(
            (product) => product.category?.name === 'Clothes'
          );

          console.log(this.products);
          this.loading = false;
        },
        error: (err) => {
          this.error =
            'Error al cargar los productos. Intente nuevamente más tarde.';
          this.loading = false;
          console.error('Error cargando productos:', err);
        },
      });
  }
}
