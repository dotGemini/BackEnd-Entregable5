import { Router } from "express";
import { CartManager } from "../dao/cartManager/cartMaganer.js"

const router = Router();
const cartManager = new CartManager();

router.post("/", async (req, res) => {
    try{
        const newCart = await cartManager.createCart();
        res.send("Carrito Creado");
    }catch(error){
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
})

router.get("/:cid", async(req, res) => {
    try{
        const cartID = req.params.cid;
        const cart = await cartManager.getCart(cartID);
        res.send(cart);
    }catch(error){
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
})

router.post("/:cid/product/:pid", async(req, res) => {
    try{
        const cartID = req.params.cid;
        const prodID = req.params.pid;
        const cartProd = await cartManager.addToCart(cartID, prodID);
        res.send("Agregado");
    }catch(error){
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
})


export default router;