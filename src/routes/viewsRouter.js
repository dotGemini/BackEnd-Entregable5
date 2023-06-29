import { Router } from "express";
import { ProductManager } from "../dao/prodManager/ProductManager.js";
const router = Router();

router.get('/', async (req, res) => {
    const productManager = new ProductManager('./src/prodManager/database.json');
    const products = await productManager.getProducts();
    res.render('index', {title: 'ecomerce', products: products})
})

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {title: 'ecomerce'});
})

router.get('/webchat', (req, res) => {
    res.render('chat', {title: 'webchat'});
})

export default router;