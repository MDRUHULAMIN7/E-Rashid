// final rashid


document.getElementById('ContinueButton').addEventListener('click', () => {

  rashidModal.classList.add("hidden");


  const rashidItems = JSON.parse(localStorage.getItem('rashid')) || [];

 
  localStorage.setItem('finalRashid', JSON.stringify(rashidItems));

  
  openFinalRashidModal();
});

function openFinalRashidModal() {
  const items = JSON.parse(localStorage.getItem('finalRashid')) || [];
  const container = document.getElementById('finalRashidItems');
  container.innerHTML = '';

  let total = 0;

  items.forEach(item => {
    total += item.price * item.quantity;
    const div = document.createElement('div');
    div.className = 'flex justify-between border-b pb-2';
    div.innerHTML = `
      <div>
        <p class="font-semibold">${item.name}</p>
        <p class="text-sm text-gray-600">৳${item.price} x ${item.quantity}</p>
      </div>
      <p class="font-semibold">৳${item.price * item.quantity}</p>
    `;
    container.appendChild(div);
  });

  
  const totalDiv = document.createElement('div');
  totalDiv.className = 'text-right font-bold text-lg mt-2';
  totalDiv.innerText = `Total: ৳${total}`;
  container.appendChild(totalDiv);


  document.getElementById('finalRashidModal').classList.remove('hidden');
}

    const closeFinalRashidModal = document.getElementById('closeFinalRashidModal');
    closeFinalRashidModal.addEventListener('click', () => {
        document.getElementById('finalRashidModal').classList.add('hidden');
    });
    

