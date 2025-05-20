  const rashidBtn = document.getElementById("rashid-button");
  const rashidModal = document.getElementById("rashidModal");
  const closeRashidModal = document.getElementById("closeRashidModal");
  const rashidItemsContainer = document.getElementById("rashid-items");
  import { displayRashidItems } from "./displayRashid.js";
  let rashidItems = [];

  // Open modal
  rashidBtn.addEventListener("click", () => {
  
    updateRashidModal();
    rashidModal.classList.remove("hidden");
      displayRashidItems(); 
      
  });

  // Close modal
  closeRashidModal.addEventListener("click", () => {
    rashidModal.classList.add("hidden");
  });

  // Function to add item to Rashid
  function addToRashid(item) {
    rashidItems.push(item);
    alert(`${item.name} added to Rashid!`);
  }

  // Function to update modal contents
  function updateRashidModal() {
    rashidItemsContainer.innerHTML = "";

    if (rashidItems.length === 0) {
      rashidItemsContainer.innerHTML = `<p class="text-center text-gray-500">No items in Rashid.</p>`;
      return;
    }

    rashidItems.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "flex items-center justify-between bg-gray-100 p-3 rounded";
      itemDiv.innerHTML = `
        <div>
          <h4 class="font-medium">${item.name}</h4>
          <p class="text-sm text-gray-600">Price: $${item.price}</p>
        </div>
        <button onclick="removeFromRashid(${index})" class="text-red-500 hover:text-red-700">Remove</button>
      `;
      rashidItemsContainer.appendChild(itemDiv);
    });
  }

  // Remove from Rashid
  window.removeFromRashid = function (index) {
    rashidItems.splice(index, 1);
    updateRashidModal();
  }

  

  // function to add products in local storage 


export default function updateRashidCount() {
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






