// src/app/models/product.model.ts
export interface Product {
  id: number;
  title: string;
  price: number;
  category: {
    name: string;
  };
  images: string[];
}
