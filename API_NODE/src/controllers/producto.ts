import { Request, Response } from "express";
import ProductModel from "../models/product.model";

// Obtener todos los productos
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener productos", error });
  }
};

// Obtener un producto por ID
export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.findByPk(req.params.id);
    if (!product)
      return res.status(404).json({ msg: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener el producto", error });
  }
};

// Crear nuevo producto
export const postProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ msg: "Error al crear producto", error });
  }
};

// Actualizar producto
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.findByPk(req.params.id);
    if (!product)
      return res.status(404).json({ msg: "Producto no encontrado" });

    await product.update(req.body);
    res.json(product);
  } catch (error) {
    res.status(400).json({ msg: "Error al actualizar producto", error });
  }
};

// Eliminar producto
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.findByPk(req.params.id);
    if (!product)
      return res.status(404).json({ msg: "Producto no encontrado" });

    await product.destroy();
    res.json({ msg: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar producto", error });
  }
};
