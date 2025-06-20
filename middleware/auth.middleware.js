import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET|| 'scottsssupersecretkey123!';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded; 
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

export default authMiddleware;