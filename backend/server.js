//const express = require('express')
import express from 'express'
import dotenv from "dotenv"
import { connectDB } from './config/db.js'
import Product from "./models/product.js"

dotenv.config();

const app = express();
const Created = 201
const Bad_Request = 400
const Internal_Server_Error = 500

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


app.listen(5000, () =>{
    connectDB();
    console.log("Server started at http://localhost:5000");
})


