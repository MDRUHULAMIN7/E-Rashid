

export function getRashidItems() {
  return JSON.parse(localStorage.getItem('rashid')) || [];
}

export function saveRashidItems(items) {
  localStorage.setItem('rashid', JSON.stringify(items));
}

export function displayRashidItems() {
  let rashidItems = getRashidItems();
  const rashidList = document.getElementById('rashid-items');
  rashidList.innerHTML = '';

  if (rashidItems.length === 0) {
    rashidList.innerHTML = '<p class="text-center text-gray-500">No items in Rashid.</p>';
    return;
  }

  let total = 0;

  rashidItems.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement('div');
    div.className = 'flex justify-between items-center border-b py-2 gap-2';

    div.innerHTML = `
      <div class="flex items-center gap-4 w-full">
        <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded">

        <div class="flex-1">
          <p class="font-semibold">${item.name}</p>

          <div class="flex items-center gap-2 mt-1">
            <label class="text-sm text-gray-600">৳</label>
            <input type="number" value="${item.price}" min="0" class="price-input w-20 px-2 border border-gray-300 rounded text-sm" data-index="${index}">
          </div>

          <div class="flex items-center gap-2 mt-1">
            <button data-index="${index}" class="decrease bg-gray-200 px-2 rounded">-</button>
            <span class="quantity">${item.quantity}</span>
            <button data-index="${index}" class="increase bg-gray-200 px-2 rounded">+</button>
          </div>
        </div>

        <button data-index="${index}" class="remove text-red-500 hover:text-red-700">&times;</button>
      </div>
    `;

    rashidList.appendChild(div);
  });

  // Total price
  const totalDiv = document.createElement('div');
  totalDiv.className = 'text-right font-bold mt-4 text-lg';
  totalDiv.innerText = `Total: Taka ${total}`;
  rashidList.appendChild(totalDiv);

  attachRashidEventListeners();
}
function attachRashidEventListeners() {
  let rashidItems = getRashidItems();

  document.querySelectorAll('.increase').forEach(btn => {
    btn.addEventListener('click', () => {
         
      const index = btn.dataset.index;
      rashidItems[index].quantity++;
      saveRashidItems(rashidItems);
      displayRashidItems();
       
    });
  });

  document.querySelectorAll('.decrease').forEach(btn => {
    btn.addEventListener('click', () => {
     
      const index = btn.dataset.index;
      if (rashidItems[index].quantity > 1) {
        rashidItems[index].quantity--;
        saveRashidItems(rashidItems);
        displayRashidItems();
             
      }
    });
  });

document.querySelectorAll('.remove').forEach(btn => {
  btn.addEventListener('click', () => {
    
    const index = btn.dataset.index;
    rashidItems.splice(index, 1); 
    saveRashidItems(rashidItems); 
    displayRashidItems();       
    updateRashidCount();   
  });
});


  document.querySelectorAll('.price-input').forEach(input => {
    input.addEventListener('change', () => {
       
      const index = input.dataset.index;
      const newPrice = parseFloat(input.value);
      if (!isNaN(newPrice) && newPrice >= 0) {
        rashidItems[index].price = newPrice;
        saveRashidItems(rashidItems);
        displayRashidItems();
      }
    });
  });
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
  updateRashidCount(); 
});
