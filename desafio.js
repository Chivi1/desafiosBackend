class ProductManager {
    constructor() {
      this.Products = [];
      this.autoincrement = 1;
    }
  
    addProduct(product) {
      if (!product.code || !product.title || !product.description || !product.price || !product.thumbnail || !product.stock) {
        console.log("Error: Todos los campos son obligatorios.");
        return;
      }
      if (this.Products.some((p) => p.code === product.code)) {
        console.log(`Error: El producto con el código ${product.code} ya existe.`);
        return;
      }
  
      product.id = this.autoincrement++;
      this.Products.push(product);
    }
  
    getProducts() {
      return this.Products;
    }
  
    getProductById(id) {
      const product = this.Products.find((p) => p.id === id);
      if (product) {
        return product;
      } else {
        console.log("Error: Producto no encontrado.");
        return null;
      }
    }
  }
  
  // Ejemplo de uso:
  const productManager = new ProductManager();
  
  productManager.addProduct({
    code: "ABC123",
    title: "Producto 1",
    description: "Descripción del producto 1",
    price: 1099,
    thumbnail: "https://via.placeholder.com/150",
    stock: 5,
  });
  
  productManager.addProduct({
    code: "DEF456",
    title: "Producto 2",
    description: "Descripción del producto 2",
    price: 2099,
    thumbnail: "https://via.placeholder.com/150",
    stock: 10,
  });
  
  const allProducts = productManager.getProducts();
  console.log(allProducts);
  
  const productById = productManager.getProductById(1);
  console.log(productById);