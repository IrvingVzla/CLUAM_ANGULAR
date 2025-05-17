import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart-service.service';
import { FilterOptions } from '../../filters/filter-sidebar/filter-sidebar.component';

@Component({
  selector: 'app-shop',
  standalone: false,
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  @Input() product!: Product;

  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private http: HttpClient, private cartService: CartService) {}

  ngOnInit() {
    this.http.get<Product[]>('http://localhost:3000/api/productos').subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = [...this.products];
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

  addProductToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  applyFilters(filters: FilterOptions) {
    this.loading = true;

    // Simular tiempo de carga para una mejor experiencia de usuario
    setTimeout(() => {
      // Filtrar productos según los criterios
      let result = [...this.products];

      // Filtrar por categoría
      if (filters.category && filters.category !== 'Todos') {
        result = result.filter(
          (product) =>
            // Aquí deberías ajustar según la estructura real de tus datos
            // Asumiendo que hay una propiedad category en tus productos
            product.category && product.category.name === filters.category
        );
      }

      // Filtrar por precio mínimo
      if (filters.minPrice !== undefined && filters.minPrice > 0) {
        result = result.filter((product) => product.price >= filters.minPrice!);
      }

      // Filtrar por precio máximo
      if (filters.maxPrice !== undefined) {
        result = result.filter((product) => product.price <= filters.maxPrice!);
      }

      // Ordenar productos
      if (filters.sort) {
        switch (filters.sort) {
          case 'price_asc':
            result.sort((a, b) => a.price - b.price);
            break;
          case 'price_desc':
            result.sort((a, b) => b.price - a.price);
            break;
          case 'name_asc':
            result.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case 'name_desc':
            result.sort((a, b) => b.title.localeCompare(a.title));
            break;
        }
      }

      this.filteredProducts = result;
      this.loading = false;
    }, 500);
  }
}
