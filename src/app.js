import express from 'express';
import ProductManager from '../ProductManager';

const app = express();

const productManager = new ProductManager('./products.json');

app.get('/products', (req, res) => {
  const limit = req.query.limit;
  const products = productManager.getProducts();
  const limitedProducts = limit ? products.slice(0, limit) : products;
  res.json(limitedProducts);
});

app.get('/products/:pid', (req, res) => {
  const productId = req.params.pid;
  const product = productManager.getProductById(productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

app.listen(8080,()=>console.log('Listening on PORT 8080'));