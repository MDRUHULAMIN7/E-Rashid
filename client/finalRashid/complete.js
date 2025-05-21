// DOM Elements
const nameInput = document.getElementById('customerName');
const addressInput = document.getElementById('customerAddress');
const mobileInput = document.getElementById('customerMobile');
const completeBtn = document.getElementById('completeButton');
const rashidModal = document.getElementById('rashidModal');

// Enable/disable Complete button based on input fields
function checkFormCompletion() {
  const name = nameInput.value.trim();
  const address = addressInput.value.trim();
  const mobile = mobileInput.value.trim();
  const allFilled = name && address && mobile;

  completeBtn.disabled = !allFilled;
  completeBtn.classList.toggle('bg-gray-400', !allFilled);
  completeBtn.classList.toggle('cursor-not-allowed', !allFilled);
  completeBtn.classList.toggle('bg-blue-600', allFilled);
  completeBtn.classList.toggle('hover:bg-blue-700', allFilled);
  completeBtn.classList.toggle('cursor-pointer', allFilled);
}

// Watch input changes
[nameInput, addressInput, mobileInput].forEach(input =>
  input.addEventListener('input', checkFormCompletion)
);

// Finalize and download PDF directly
completeBtn.addEventListener('click', async () => {
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
    rashidTime: new Date().toLocaleString(),
    originalTotal,
  };

  try {
    const pdfDoc = generatePDF(finalData);

    // Save PDF to disk immediately
    pdfDoc.save(`Rashid-${finalData.customer.name}.pdf`);

    // Optional: save to server
    await saveRashidToDB(finalData);

    // Clean up UI
    localStorage.removeItem('rashid');
    localStorage.removeItem('finalRashid');
    updateRashidCount();
    rashidModal.classList.add('hidden');
    showToast('PDF downloaded & Rashid saved');
  } catch (err) {
    console.error("Error generating PDF:", err);
    alert("Failed to generate PDF.");
  }
});

// PDF Generator
function generatePDF(data) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const { name, address, mobile } = data.customer;
  const items = data.items;
  const total = data.originalTotal;

  let y = 10;

  doc.setFontSize(16);
  doc.text("Customer Invoice", 80, y);
  y += 10;

  doc.setFontSize(12);
  doc.text(`Name: ${name}`, 10, y); y += 6;
  doc.text(`Address: ${address}`, 10, y); y += 6;
  doc.text(`Mobile: ${mobile}`, 10, y); y += 10;

  doc.text("Items:", 10, y); y += 6;

  items.forEach((item, index) => {
    doc.text(`${index + 1}. ${item.name} - ${item.quantity} x ${item.price} = ${item.quantity * item.price} Taka`, 10, y);
    y += 6;
  });

  y += 6;
  doc.setFontSize(14);
  doc.text(`Total: ${total} Taka`, 10, y);

  return doc;
}

// Save to DB
async function saveRashidToDB(data) {
  const response = await fetch(`http://localhost:5000/api/admin/add-rashid`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    showToast('Failed to save rashid');
  } else {
    showToast('Rashid saved successfully');
  }

  return response.json();
}

// Rashid count updater
function updateRashidCount() {
  const rashidItems = JSON.parse(localStorage.getItem('rashid')) || [];
  const count = rashidItems.length;
  const rashidCount = document.getElementById('rashidCount');
  if (rashidCount) rashidCount.textContent = count;
}

// Toast message
function showToast(message) {
  const toast = document.createElement('div');
  toast.innerText = message;
  toast.className = "fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-md z-50";
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('opacity-0');
    toast.addEventListener('transitionend', () => toast.remove());
  }, 3000);
}
