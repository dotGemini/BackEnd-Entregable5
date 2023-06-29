import CartsModel from "../models/cartsModel.js";
import ProductsModel from "../models/productsModel.js"

class CartManager{

    constructor(){
        this.cartModel = CartsModel;
        this.productModel = ProductsModel;
    }

    createCart = async () => {
        try {
            const newCart = await this.cartModel.create({products:[]});
            return newCart;
        } catch (error) {
            throw new Error(`${error.message}`);
        }
    }

    getCart = async (cartID) => {
        try {
            const cart = await this.cartModel.findById(cartID);
            if(!cart) {
            throw new Error('No encontrado');
        }
        return cart;
        } catch (error) {
            throw new Error(`${error.message}`);
        }
    }

    addToCart = async (cartID, productID) => {
        try{
            const cart = await this.cartModel.findById(cartID);
            if(!cart) {
                throw new Error (`No encontrado`);
            }
            if(!productID) {
                throw new Error ('ID de producto requerido');
            }

            const product = await this.productModel.findById(productID);
            if (!product) {
                throw new Error('Producto no encontrado');
            }

            const existProduct = cart.products.find((product) => product.productId === productID);
            
            if(existProduct) {
                existProduct.quantity += 1;
            } else {
                cart.products.push({productID: productID, quantity: 1});
            }

            await cart.save();
            return cart;

        } catch (error) {
            throw new Error ('Fallo agregar producto. addToCart');
        }
    }
}

export {CartManager};