import { displayProducts } from './displayProducts.js';

export async function searchProducts(query) {
  console.log(query)
  try {
    if (!query.trim()) return;

    const res = await fetch(`http://localhost:5000/api/products/search?name=${encodeURIComponent(query)}`);
    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error("Invalid data format: expected an array", data);
      return;
    }

    displayProducts(data);
  } catch (error) {
    console.error("Error during search:", error);
  }
}
