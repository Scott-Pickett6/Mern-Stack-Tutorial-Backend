import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import authRoutes from './routes/auth.route.js';
import swaggerUiExpress from 'swagger-ui-express';
import swaggerSpec from "./swagger/swagger.js";
dotenv.config();

const app = express();
const PORT = 5400;

const allowedOrigins = ['http://localhost:5173', 'https://mernstacktutorial.netlify.app'];

app.use(cors({
    origin: function (origin, callback){
      if(!origin){
        return callback(null, true);
      }
      if(allowedOrigins.includes(origin)){
        return callback(null, true);
      }
      else{
        return callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use(express.json());
app.use(
  "/api-docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerSpec)
);



// let products = [];
// let currentId = 1;

// // create
// app.post('/api/products', (req, res) => {
//   const newProduct = { id: currentId++, ...req.body };
//   products.push(newProduct);
//   res.status(201).json(newProduct);
// });

// // read all
// app.get('/api/products', (req, res) => {
//   res.json(products);
// });

// // read one
// app.get('/api/products/:id', (req, res) => {
//   const product = products.find(p => p.id === parseInt(req.params.id));
//   if (!product) return res.status(404).send('Product not found');
//   res.json(product);
// });

// // update
// app.put('/api/products/:id', (req, res) => {
//   const index = products.findIndex(p => p.id === parseInt(req.params.id));
//   if(index === -1){
//     products[index] = { ...products[index], ...req.body };
//     res.json(products[index]);
//   }
//   else{
//     res.status(404).send('Product not found');
//   }
// });

// // delete
// app.delete('/api/products/:id', (req, res) => {
//   const index = products.findIndex(p => p.id === parseInt(req.params.id));
//   if (index === -1){
//     const deleted = products.splice(index, 1)[0];
//     res.json(deleted);
//   }
//   else{
//     res.status(404).send('Product not found');
//   }
// });

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello from server');
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
});