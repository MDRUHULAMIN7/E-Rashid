

export function addToRashid(product) {
  let rashidItems = JSON.parse(localStorage.getItem('rashid')) || [];

  const exists = rashidItems.find(item => item._id === product._id);
  if (!exists) {
    const newItem = {
      ...product,
      quantity: 1,
      price: parseFloat(product.price) || 0 
    };
    rashidItems.push(newItem);

    localStorage.setItem('rashid', JSON.stringify(rashidItems));
    updateRashidCount();
    showToast(`${product.name} added to Rashid `, 'success');
  } else {
    showToast(`${product.name} is already in Rashid `, 'error');
  }
}

function showToast(message, type = 'success') {
  const toast = document.createElement('div');

  
  toast.className = `
    fixed bottom-5 right-5 px-4 py-2 rounded shadow-md z-50 transition-opacity duration-300
    ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}
    text-white
  `;
  toast.innerText = message;


  document.body.appendChild(toast);


  setTimeout(() => {
    toast.classList.add('opacity-0');
    toast.addEventListener('transitionend', () => toast.remove());
  }, 3000);
}
 function updateRashidCount() {
  const rashidItems = JSON.parse(localStorage.getItem('rashid')) || [];
  const count = rashidItems.length;


  const rashidCount = document.getElementById('rashidCount');
  if (rashidCount) {
    rashidCount.textContent = count;
  }
}
document.addEventListener('DOMContentLoaded', () => {
  updateRashidCount(); // Call the function after the page is fully loaded
});
