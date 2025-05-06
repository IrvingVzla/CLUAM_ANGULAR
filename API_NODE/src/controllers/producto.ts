import { Request, Response } from "express";
import { Product } from "../interfaces/product.interface";

// Productos quemados para pruebas
let products: Product[] = [
  {
    id: 1,
    title: "Camiseta deportiva",
    price: 25.5,
    category: { name: "Ropa" },
    images: ["https://example.com/camiseta.jpg"],
  },
  {
    id: 2,
    title: "Zapatos de cuero",
    price: 89.99,
    category: { name: "Calzado" },
    images: ["https://example.com/zapatos.jpg"],
  },
  {
    id: 3,
    title: "Laptop Dell Inspiron",
    price: 1500,
    category: { name: "Electrónica" },
    images: ["https://example.com/laptop.jpg"],
  },
  {
    id: 4,
    title: "Audífonos Bluetooth",
    price: 45,
    category: { name: "Accesorios" },
    images: ["https://example.com/audifonos.jpg"],
  },
  {
    id: 5,
    title: "Reloj inteligente",
    price: 199,
    category: { name: "Tecnología" },
    images: ["https://example.com/reloj.jpg"],
  },
  {
    id: 6,
    title: "Silla ergonómica",
    price: 250,
    category: { name: "Oficina" },
    images: ["https://example.com/silla.jpg"],
  },
  {
    id: 7,
    title: "Mochila escolar",
    price: 40,
    category: { name: "Accesorios" },
    images: ["https://example.com/mochila.jpg"],
  },
  {
    id: 8,
    title: "Botella térmica",
    price: 15.75,
    category: { name: "Hogar" },
    images: ["https://example.com/botella.jpg"],
  },
  {
    id: 9,
    title: "Teclado mecánico",
    price: 120,
    category: { name: "Electrónica" },
    images: ["https://example.com/teclado.jpg"],
  },
  {
    id: 10,
    title: "Mesa de comedor",
    price: 600,
    category: { name: "Muebles" },
    images: ["https://example.com/mesa.jpg"],
  },
];

// Funciones para manejar las rutas de productos

// Obtener todos los productos (GET)
export const getProducts = (req: Request, res: Response): Response => {
  return res.json(products);
};

// Obtener un producto por ID (GET)
export const getProduct = (req: Request, res: Response): Response | void => {
  const product = products.find((p) => p.id === Number(req.params.id));
  if (!product) {
    return res.status(404).json({ msg: "Producto no encontrado" });
  }
  return res.json(product);
};

// Eliminar un producto por ID (DELETE)
export const deleteProduct = (req: Request, res: Response): Response => {
  const id = Number(req.params.id);
  products = products.filter((p) => p.id !== id);
  return res.json({ msg: "Producto eliminado", id });
};

// Crear un nuevo producto (POST)
export const postProduct = (req: Request, res: Response): Response | void => {
  const newProduct: Product = req.body;

  if (
    !newProduct.title ||
    typeof newProduct.price !== "number" ||
    !newProduct.category?.name ||
    !Array.isArray(newProduct.images)
  ) {
    return res.status(400).json({ msg: "Datos inválidos" });
  }

  products.push(newProduct);

  return res.status(201).json(newProduct);
};

// Actualizar un producto por ID (PUT)
export const updateProduct = (req: Request, res: Response): Response | void => {
  const id = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ msg: "Producto no encontrado" });
  }

  const updatedProduct: Product = { ...products[index], ...req.body, id };
  products[index] = updatedProduct;

  return res.json(updatedProduct);
};
