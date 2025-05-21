import { addToRashid } from './addToRashid.js';
import { loadAllProducts } from "./loadProducts.js";

export function displayProducts(products) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  if (!products || products.length === 0) {
    productList.innerHTML = `<p class="text-center text-red-500">No products found.</p>`;
    return;
  }

  products.forEach(product => {
    const col = document.createElement('div');
    col.className = 'lg:w-1/3 xl:w-1/4 md:w-2/4 sm:w-3/4 mb-6 px-3';

    col.innerHTML = `
      <div class="relative bg-white hover:shadow-xl border border-gray-200 rounded-xl overflow-hidden flex flex-col h-full transition-transform duration-300 hover:-translate-y-1 group">

        <!-- Three dot menu -->
        <div class="absolute top-2 right-2 z-20">
          <button class="menu-toggle text-black hover:text-[#129990] text-xl font-bold focus:outline-none">
            &#8942;
          </button>
          <div class="menu-actions hidden absolute top-6 right-0 bg-white shadow-lg rounded-md py-2 w-28 z-30">
            <button class="edit-btn block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Edit</button>
            <button class="delete-btn block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left">Delete</button>
          </div>
        </div>

        <img src="${product.image}" alt="${product.name}" class="w-full h-52 object-cover">

        <div class="p-4 flex flex-col justify-between flex-grow">
          <div>
            <h5 class="text-lg font-bold text-[#129990] mb-1">${product.name}</h5>
            <p class="text-sm text-gray-600 mb-3">${product.description}</p>
          </div>
          <div class="flex justify-between items-center mt-auto">
            <span class="text-[#129990] font-semibold text-base">৳${product.price}</span>
            <button class="add-to-rashid bg-[#129990] hover:bg-[#0e7f77] text-white px-3 py-1 rounded-lg transition text-sm">
              Add to Invoice
            </button>
          </div>
        </div>
      </div>
    `;

    const button = col.querySelector('.add-to-rashid');
    const menuToggle = col.querySelector('.menu-toggle');
    const menuActions = col.querySelector('.menu-actions');

    button.addEventListener('click', () => {
      addToRashid(product);
    });

    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menuActions.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!col.contains(e.target)) {
        menuActions.classList.add('hidden');
      }
    });

    col.querySelector('.edit-btn').addEventListener('click', () => {
      openEditModal(product);
    });

    col.querySelector('.delete-btn').addEventListener('click', () => {
      deleteProduct(product._id);
    });

    productList.appendChild(col);
  });
}

// Modal control logic
const modal = document.getElementById('editModal');
const form = document.getElementById('editForm');
const closeModalBtn = document.getElementById('closeModal');

async function openEditModal(product) {
  modal.classList.remove('hidden');
  form['edit-id'].value = product._id || ''; // in case of update
  form['edit-name'].value = product.name;
  form['edit-description'].value = product.description;
  form['edit-regularPrice'].value = product.regularPrice;
  form['edit-price'].value = product.price;
  form['edit-image'].value = product.image;
  form['edit-sales'].value = product.sales;
  form['edit-category'].value = product.category;
}

closeModalBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const updatedProduct = {
    name: form['edit-name'].value,
    description: form['edit-description'].value,
    regularPrice: Number(form['edit-regularPrice'].value),
    price: Number(form['edit-price'].value),
    image: form['edit-image'].value,
    sales: Number(form['edit-sales'].value),
    category: form['edit-category'].value,
  };

  const id = form['edit-id'].value;

  try {
    const res = await fetch(`http://localhost:5000/api/update-product?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    });

    const data = await res.json();

    if (data.success) {
      loadAllProducts();
      showToast('Product updated successfully!');
      modal.classList.add('hidden');
    } else {
      showToast('Update failed.');
      loadAllProducts();
    }
  } catch (error) {
    console.error('Error updating product:', error);
    showToast('Server error.');
  }
});

async function deleteProduct(id) {
  if (!confirm('Are you sure you want to delete this product?')) return;

  try {
    const res = await fetch(`http://localhost:5000/api/delete-product?id=${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();
   

    if (data.success) {
      showToast('Product deleted successfully!');
      loadAllProducts();  // Refresh the product list
    } else {
      showToast('Failed to delete product.');
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    showToast('Server error while deleting product.');
  }
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.innerText = message;
  toast.className = "fixed bottom-5 right-5 bg-[#096B68] text-white px-4 py-2 rounded shadow-md z-50";
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('opacity-0');
    toast.addEventListener('transitionend', () => toast.remove());
  }, 3000);
}
