export interface Product {
  id: number;
  title: string;
  price: number;
  category: {
    name: string;
  };
  images: string[];
}
