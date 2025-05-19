
import { addToRashid } from './addToRashid.js';
export function displayProducts(products) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  if (!products || products.length === 0) {
    productList.innerHTML = `<p class="text-center text-red-500">No products found.</p>`;
    return;
  }

  products.forEach(product => {
    const col = document.createElement('div');
    col.className = 'lg:w-1/4 xl:w-1/5 md:w-2/5 sm:w-3/5 mb-4 px-2';

    col.innerHTML = `
      <div class="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full">
        <img src="${product.image}" alt="${product.name}" class="w-full h-52 object-cover">
        <div class="p-4 flex flex-col justify-between flex-grow">
          <div>
            <h5 class="text-lg font-semibold mb-1">${product.name}</h5>
            <p class="text-sm text-gray-600 mb-2">${product.description}</p>
          </div>
          <div class="flex justify-between items-center mt-4">
            <span class="text-green-600 font-bold">৳${product.price}</span>
            <button class="add-to-rashid bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition text-sm">
              Add to Rashid
            </button>
          </div>
        </div>
      </div>
    `;

    const button = col.querySelector('.add-to-rashid');
    button.addEventListener('click', () => {
      addToRashid(product);
    });

    productList.appendChild(col);
  });
}
