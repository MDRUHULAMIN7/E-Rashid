// Get DOM elements
const nameInput = document.getElementById('customerName');
const addressInput = document.getElementById('customerAddress');
const mobileInput = document.getElementById('customerMobile');
const completeBtn = document.getElementById('completeButton');
const finalModal = document.getElementById('finalRashidModal');
const rashidModal = document.getElementById('rashidModal');


function checkFormCompletion() {
  const name = nameInput.value.trim();
  const address = addressInput.value.trim();
  const mobile = mobileInput.value.trim();

  const allFilled = name && address && mobile;

  completeBtn.disabled = !allFilled;

  if (allFilled) {
    completeBtn.classList.remove('bg-gray-400', 'cursor-not-allowed');
    completeBtn.classList.add('bg-blue-600', 'hover:bg-blue-700', 'cursor-pointer');
  } else {
    completeBtn.classList.add('bg-gray-400', 'cursor-not-allowed');
    completeBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700', 'cursor-pointer');
  }
}


[nameInput, addressInput, mobileInput].forEach(input =>
  input.addEventListener('input', checkFormCompletion)
);


function openFinalRashidModal() {
  finalModal.classList.remove('hidden');
  checkFormCompletion();
}


// openFinalRashidModal();

// Finalize button logic
completeBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const address = addressInput.value.trim();
  const mobile = mobileInput.value.trim();

  if (!name || !address || !mobile) {
    alert("Please fill in all fields before continuing.");
    return;
  }

  const items = JSON.parse(localStorage.getItem('finalRashid')) || [];

  const originalTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const finalData = {
    customer: { name, address, mobile },
    items,
    originalTotal,
  };

  console.log( finalData);

  // Cleanup
  localStorage.removeItem('rashid');
  localStorage.removeItem('finalRashid');


  // Hide modals
  finalModal.classList.add('hidden');
  rashidModal.classList.add('hidden');
});
