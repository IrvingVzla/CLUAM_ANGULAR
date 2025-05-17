"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.postProduct = exports.getProduct = exports.getProducts = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
// Obtener todos los productos
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.default.findAll();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ msg: "Error al obtener productos", error });
    }
});
exports.getProducts = getProducts;
// Obtener un producto por ID
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.default.findByPk(req.params.id);
        if (!product)
            return res.status(404).json({ msg: "Producto no encontrado" });
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ msg: "Error al obtener el producto", error });
    }
});
exports.getProduct = getProduct;
// Crear nuevo producto
const postProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.default.create(req.body);
        res.status(201).json(product);
    }
    catch (error) {
        res.status(400).json({ msg: "Error al crear producto", error });
    }
});
exports.postProduct = postProduct;
// Actualizar producto
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.default.findByPk(req.params.id);
        if (!product)
            return res.status(404).json({ msg: "Producto no encontrado" });
        yield product.update(req.body);
        res.json(product);
    }
    catch (error) {
        res.status(400).json({ msg: "Error al actualizar producto", error });
    }
});
exports.updateProduct = updateProduct;
// Eliminar producto
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.default.findByPk(req.params.id);
        if (!product)
            return res.status(404).json({ msg: "Producto no encontrado" });
        yield product.destroy();
        res.json({ msg: "Producto eliminado" });
    }
    catch (error) {
        res.status(500).json({ msg: "Error al eliminar producto", error });
    }
});
exports.deleteProduct = deleteProduct;
