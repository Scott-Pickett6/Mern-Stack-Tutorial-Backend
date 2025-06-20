import mongoose from "mongoose";
import Product from "../models/product.model.js";
import db from "../models/index.js"; // Adjust the path as necessary
const { Product } = db

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

/*
//postgres

import mongoose from "mongoose";
import Product from "../models/product.model.js";
import db from "../models/index.js";
const { Product } = db;

export const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
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
};

export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
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
};

export const createProduct = async (req, res) => {
    try {
        const { title, description, image, price } = req.body;
        if (!title || !image || !description || !price) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const newProduct = await Product.create({
            title,
            description,
            image,
            price
        });
        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: newProduct
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

// Update product
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { title, description, image, price } = req.body;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        await product.update({ title, description, image, price });
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update product",
        });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        await product.destroy();
        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete product",
        });
    }
};
*/