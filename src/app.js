import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();

const productManager = new ProductManager('./products.json');

app.get('/products', async (req, res) => {
  const limit = req.query.limit;
  const products = await productManager.getProducts();
  console.log(limit, products)
  const limitedProducts = limit ? products.slice(0, limit) : products;
  console.log(limitedProducts)
  res.json(limitedProducts);
});

app.get('/products/:pid', async (req, res) => {
  const productId = req.params.pid;
  try {
    const product = await productManager.getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(404).send('Product not found');
  }
});

app.listen(8080,()=>console.log('Listening on PORT 8080'));
