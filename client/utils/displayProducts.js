export function displayProducts(products) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  if (!products || products.length === 0) {
    productList.innerHTML = `<p class="text-center text-danger">No products found.</p>`;
    return;
  }

  products.forEach(product => {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-xl-3 col-md-5 col-sm-7 mb-4';

    col.innerHTML = `
      <div class="card h-100 shadow-sm border-0">
        <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text text-muted" style="font-size: 0.9rem;">${product.description}</p>
          <div class="d-flex justify-content-between align-items-center">
            <span class="text-success fw-bold">৳${product.price}</span>
            <button class="btn btn-sm btn-outline-success">
              <i class="bi bi-cart-plus"></i> Add
            </button>
          </div>
        </div>
      </div>
    `;

    productList.appendChild(col);
  });
}
