import { body, validationResult } from 'express-validator';

export const validateRegister = [
    body('name')
        .toString()
        .withMessage('Name must be a string')
        .trim()
        .notEmpty()
        .withMessage('Name is required'),
    
    body('email')
        .isEmail()
        .withMessage('Invalid email format')
        .normalizeEmail(),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false,
                errors: errors.array() });
        }
        next();
    }
];

export const validateLogin = [
    body('email')
        .isEmail()
        .withMessage('Invalid email format')
        .normalizeEmail(),

    body('password')
        .notEmpty()
        .withMessage('Password is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false,
                errors: errors.array() });
        }
        next();
    }
];