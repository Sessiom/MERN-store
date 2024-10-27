import express from "express"
import mongoose from 'mongoose'
import Product from "../models/product.model.js"


const router = express.Router();

const CREATED = 201
const SUCCESS = 200
const BAD_REQUEST = 400
const NOT_FOUND = 404
const INTERNAL_SERVER_ERROR = 500

export default router;

router.get("/", async (req,res) =>{
    try {
        const products = await Product.find({});
        res.status(SUCCESS).json({ success: true, data: products});
    } catch (error) {
        console.error("Error in fetching product:", error.message);
        res.status(INTERNAL_SERVER_ERROR).json ({ success: false, message: "Server Error"});
    }
})

router.post("/", async (req,res) =>{
    const product = req.body;

    if((!product.name) || (!product.price) || (!product.image)){
        return res.status(BAD_REQUEST).json({success:false, message: "Please fill out all fields"});
    }

    const newProduct = new Product(product);

    try{
        await newProduct.save();
        res.status(CREATED).json({ success: true, data: newProduct});
    } catch(error) {
        console.error("Error in creating product:", error.message);
        res.status(INTERNAL_SERVER_ERROR).json ({ success: false, message: "Server Error"});
    }
})

router.put("/:id", async (req,res) =>{
    const { id } = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(NOT_FOUND).json({ success: false, message: "Product not found"})
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(SUCCESS).json({ success: true, data: updatedProduct })
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: "Server Error"})
    }
})

router.delete("/:id", async (req, res) => {
    const {id} = req.params;
    try{
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(NOT_FOUND).json({ success: false, message: "Product not found" });
        }

        res.status(SUCCESS).json({ success: true, message: "Product deleted"});
        
    } catch (error) {
        console.error("Error in deleting product:", error.message);
        res.status(NOT_FOUND).json({ status: false, message: "Product not found"});
    }
})