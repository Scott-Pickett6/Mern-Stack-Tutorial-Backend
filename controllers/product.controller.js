import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: products
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Failed to fetch products",
         });
    }
}

export const getProductById = async (req, res) => {

    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: product
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Failed to fetch product",
         });
    }
}

export const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: newProduct
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Failed to create product",
         });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ 
            success: false,
            message: "Invalid product ID",
         });
    }
    try {
        await Product.findByIdAndUpdate(id, product, { new: true });
        const updatedProduct = await Product.findById(id);
        
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct
        });
    }
    catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Failed to update product",
         });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        res.status(404).json({ 
            success: false,
            message: "Failed to delete product",
         });
    }
}