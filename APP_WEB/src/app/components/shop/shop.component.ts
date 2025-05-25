import { Component, OnInit } from '@angular/core';
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
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = ['Todos'];
  loading: boolean = true;
  error: string | null = null;

  constructor(private http: HttpClient, private cartService: CartService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
  this.http.get<Product[]>('http://localhost:3000/api/productos').subscribe({
    next: (data) => {
      // Procesar las imágenes para convertir el string JSON en array
      this.products = data.map(product => ({
        ...product,
        images: this.parseImages(product.images)
      }));
      
      this.filteredProducts = [...this.products];
      this.extractCategories();
      this.loading = false;
      console.log('Productos procesados:', this.products);
    },
    error: (err) => {
      this.error = 'Error al cargar los productos. Intente nuevamente más tarde.';
      this.loading = false;
      console.error('Error cargando productos:', err);
    },
  });
}

// Método para parsear las imágenes
parseImages(images: any): string[] {
  try {
    // Si ya es un array, devolverlo tal como está
    if (Array.isArray(images)) {
      return images;
    }
    
    // Si es un string, parsearlo como JSON
    if (typeof images === 'string') {
      const parsed = JSON.parse(images);
      return Array.isArray(parsed) ? parsed : [parsed];
    }
    
    // Si no es ni array ni string, devolver array vacío
    return [];
  } catch (error) {
    console.error('Error parseando imágenes:', error, images);
    return [];
  }
}

  extractCategories() {
  console.log('Productos recibidos:', this.products); 
  
  const uniqueCategories = new Set<string>();
  
  this.products.forEach(product => {
    console.log('Producto individual:', product); 
    
    // Intentar diferentes estructuras posibles
    let categoryName = null;
    
    // Opción 1: Si viene con category populated
    if (product.category && product.category.name) {
      categoryName = product.category.name;
    }
    // Opción 2: Si solo viene category_id, mapear manualmente
    else if (product.category_id) {
      // Mapeo manual
      const categoryMap: { [key: number]: string } = {
        1: 'Pantalones',
        2: 'Camisas', 
        3: 'Pijamas',
        4: 'Chaquetas',
        5: 'Vestidos',
        6: 'Faldas',
        7: 'Camisetas',
        8: 'Suéteres'
      };
      categoryName = categoryMap[product.category_id];
    }
    
    if (categoryName) {
      uniqueCategories.add(categoryName);
    }
  });

  this.categories = ['Todos', ...Array.from(uniqueCategories).sort()];
  console.log('Categorías extraídas:', this.categories);
}


  addProductToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  applyFilters(filters: FilterOptions) {
  this.loading = true;
  console.log('Aplicando filtros:', filters);

  setTimeout(() => {
    let result = [...this.products];

    // Filtrar por categoría
    if (filters.category && filters.category !== 'Todos') {
      result = result.filter((product) => {
        let productCategory = null;
        
        // Verificar diferentes estructuras
        if (product.category && product.category.name) {
          productCategory = product.category.name;
        } else if (product.category_id) {
          // Mapeo manual
          const categoryMap: { [key: number]: string } = {
            1: 'Pantalones',
            2: 'Camisas', 
            3: 'Pijamas',
            4: 'Chaquetas',
            5: 'Vestidos',
            6: 'Faldas',
            7: 'Camisetas',
            8: 'Suéteres'
          };
          productCategory = categoryMap[product.category_id];
        }
        
        return productCategory === filters.category;
      });
      console.log(`Filtrados por categoría "${filters.category}":`, result.length);
    }

      // Filtrar por precio mínimo
      if (filters.minPrice !== undefined && filters.minPrice > 0) {
        result = result.filter((product) => product.price >= filters.minPrice!);
        console.log(`Filtrados por precio mínimo ${filters.minPrice}:`, result.length);
      }

      // Filtrar por precio máximo
      if (filters.maxPrice !== undefined) {
        result = result.filter((product) => product.price <= filters.maxPrice!);
        console.log(`Filtrados por precio máximo ${filters.maxPrice}:`, result.length);
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
        console.log(`Ordenados por ${filters.sort}`);
      }

      this.filteredProducts = result;
      this.loading = false;
      console.log('Productos filtrados finales:', this.filteredProducts.length);
    }, 500);
  }

}