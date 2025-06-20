import express from 'express';
import { getProductById, getProducts, deleteProduct, createProduct, updateProduct } from '../controllers/product.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authMiddleware, getProducts);
router.get('/:id',authMiddleware, getProductById);
router.post('/',authMiddleware, createProduct);
router.put('/:id',authMiddleware,updateProduct);
router.delete('/:id',authMiddleware, deleteProduct);

export default router;