import { loadAllProducts } from './loadProducts.js';
import { searchProducts } from './searchProducts.js';

export function initializeAllProductsPage() {
  loadAllProducts();

  const searchInput = document.querySelector('.search-input');
  const searchBtn = document.querySelector('.search-btn');

  if (!searchInput || !searchBtn) {
    console.warn("Search elements not found.");
    return;
  }

  // Live typing
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    if (query) {
      console.log(query)
      searchProducts(query);
    } else {
      loadAllProducts();
    }
  });

  // Button click
  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
      searchProducts(query);
    } else {
      loadAllProducts();
    }
  });

  // Enter key
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) {
        searchProducts(query);
      } else {
        loadAllProducts();
      }
    }
  });
}
initializeAllProductsPage();