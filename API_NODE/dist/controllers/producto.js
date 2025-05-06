"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.postProduct = exports.deleteProduct = exports.getProduct = exports.getProducts = void 0;
// Productos quemados para pruebas
let products = [
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
const getProducts = (req, res) => {
    return res.json(products);
};
exports.getProducts = getProducts;
const getProduct = (req, res) => {
    const product = products.find((p) => p.id === Number(req.params.id));
    if (!product) {
        return res.status(404).json({ msg: "Producto no encontrado" });
    }
    return res.json(product);
};
exports.getProduct = getProduct;
const deleteProduct = (req, res) => {
    const id = Number(req.params.id);
    products = products.filter((p) => p.id !== id);
    return res.json({ msg: "Producto eliminado", id });
};
exports.deleteProduct = deleteProduct;
const postProduct = (req, res) => {
    var _a;
    const newProduct = req.body;
    if (!newProduct.title ||
        typeof newProduct.price !== "number" ||
        !((_a = newProduct.category) === null || _a === void 0 ? void 0 : _a.name) ||
        !Array.isArray(newProduct.images)) {
        return res.status(400).json({ msg: "Datos inválidos" });
    }
    products.push(newProduct);
    return res.status(201).json(newProduct);
};
exports.postProduct = postProduct;
const updateProduct = (req, res) => {
    const id = Number(req.params.id);
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
        return res.status(404).json({ msg: "Producto no encontrado" });
    }
    const updatedProduct = Object.assign(Object.assign(Object.assign({}, products[index]), req.body), { id });
    products[index] = updatedProduct;
    return res.json(updatedProduct);
};
exports.updateProduct = updateProduct;
