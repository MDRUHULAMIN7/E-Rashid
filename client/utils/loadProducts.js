import { displayProducts } from './displayProducts.js';

export async function loadAllProducts() {
  try {
    const res = await fetch('http://localhost:5000/api/products');
    const data = await res.json();
    displayProducts(data);
  } catch (error) {
    console.error("Error loading all products:", error);
  }
}
