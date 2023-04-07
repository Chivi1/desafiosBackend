const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path);
      this.products = JSON.parse(data);
    } catch (err) {
      this.products = [];
    }
  }

  saveProducts() {
    try {
      const data = JSON.stringify(this.products);
      fs.writeFileSync(this.path, data);
    } catch (err) {
      console.error(`Error al guardar productos en archivo ${this.path}: ${err}`);
    }
  }

  addProduct(product) {
    const { title, description, price, thumbnail, code, stock } = product;
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error('Todos los campos son obligatorios');
      return;
    }
    if (this.getProductByCode(code)) {
      console.error('El código del producto ya existe');
      return;
    }
    const id = this.products.length + 1;
    const newProduct = { id, ...product };
    this.products.push(newProduct);
    this.saveProducts();
    console.log(`El producto ${newProduct.title} ha sido agregado con éxito.`);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(p => p.id === id);
    if (!product) {
      console.error('Producto no encontrado');
      return null;
    }
    return product;
  }

  getProductByCode(code) {
    const product = this.products.find(p => p.code === code);
    return product;
  }

  updateProduct(id, product) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      console.error('Producto no encontrado');
      return;
    }
    if (product.id || product.code) {
      console.error('No se puede modificar el id o código del producto');
      return;
    }
    this.products[index] = { ...this.products[index], ...product };
    this.saveProducts();
    console.log(`El producto con id ${id} ha sido actualizado con éxito.`);
  }

  deleteProduct(id) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      console.error('Producto no encontrado');
      return;
    }
    this.products.splice(index, 1);
    this.saveProducts();
    console.log(`El producto con id ${id} ha sido eliminado con éxito.`);
  }
}

module.exports = ProductManager;
//Ejemplo de uso

productManager = new ProductManager('./products.json');

//Crear producto
/* const newProduct = {
    title: 'Nuevo producto',
    description: 'Descripción del nuevo producto',
    price: 100,
    thumbnail: 'ruta/imagen.jpg',
    code: 'ABC123',
    stock: 100
};
productManager.addProduct(newProduct);  */


// Actualizar producto
const productToUpdate = productManager.getProductById(1);

productToUpdate.title = 'Nuevo título';
productToUpdate.description = 'Nueva descripción';
productToUpdate.stock = 50;

productManager.updateProduct(1, productToUpdate);


//Borrar producto
/* productManager.deleteProduct(1);  */






