import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
const PORT = 5400;

app.use(cors());
app.use(express.json());



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

app.get('/', (req, res) => {
  res.send('Hello from server');
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});