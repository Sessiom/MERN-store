import express from "express"
import { getProducts, createProduct, editProduct, deleteProduct } from "../controllers/product.controller.js";

const router = express.Router();

export default router;

router.get("/", getProducts)

router.post("/", createProduct)

router.put("/:id", editProduct)

router.delete("/:id", deleteProduct)