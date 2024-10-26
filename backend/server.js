//const express = require('express')
import express from 'express'
import dotenv from "dotenv"
import { connectDB } from './config/db.js'
import Product from "./models/product.js"

const app = express();
const Created = 201
const Deleted = 200
const Bad_Request = 400
const Not_Found = 404
const Internal_Server_Error = 500
const Port = 5000

dotenv.config();
app.use(express.json())

app.post("/api/products", async (req,res) =>{
    const product = req.body

    if((!product.name) || (!product.price) || (!product.image)){
        return res.status(Bad_Request).json({success:false, message: "Please fill out all fields"});
    }

    const newProduct = new Product(product)

    try{
        await newProduct.save();
        res.status(Created).json({ success: true, data: newProduct});
    } catch(error) {
        console.error("Error in creating product:", error.message);
        res.status(Internal_Server_Error).json ({ success: false, message: "Server Error"});
    }
})

app.delete("/api/products/:id", async (req, res) => {
    const {id} = req.params
    try{
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(Not_Found).json({ success: false, message: "Product not found" });
        }

        res.status(Deleted).json({ success: true, message: "Product deleted"})
        
    } catch (error) {
        res.status(Not_Found).json({ status: false, message: "Product not found"})
    }
})

app.listen(Port, () =>{
    connectDB();
    console.log(`Server started at http://localhost:${Port}`);
})


