// Get DOM elements
const nameInput = document.getElementById('customerName');
const addressInput = document.getElementById('customerAddress');
const mobileInput = document.getElementById('customerMobile');
const completeBtn = document.getElementById('completeButton');
const finalModal = document.getElementById('finalRashidModal');
const rashidModal = document.getElementById('rashidModal');
const pdfModal = document.getElementById("pdfModal"); // 🔔 New modal to show PDF preview
const iframe = document.getElementById("pdfPreview");
const downloadBtn = document.getElementById("downloadPdfBtn");

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

// Show final modal and validate inputs
function openFinalRashidModal() {
  finalModal.classList.remove('hidden');
  checkFormCompletion();
}

// Finalize and show PDF in modal
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


  // Generate PDF
  const pdfDoc = generatePDF(finalData);
  const pdfBlob = pdfDoc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);

 

  // Hide previous modals
  finalModal.classList.add('hidden');
  rashidModal.classList.add('hidden');

  // Show PDF in modal
  iframe.src = pdfUrl;
   pdfModal.classList.remove('hidden');
  iframe.classList.remove("hidden");
  downloadBtn.classList.remove("hidden");
  iframe.classList.remove("hidden");
  pdfModal.classList.remove("hidden");

  // Download button
  downloadBtn.classList.remove("hidden");
downloadBtn.onclick = async () => {
  try {
    pdfDoc.save(`Rashid-${finalData.customer.name}.pdf`);
    await saveRashidToDB(finalData);
    console.log('Rashid saved successfully.');
    
  } catch (error) {
    console.error(error);
    alert('Failed to save data to server. PDF download cancelled.');
  }
};


 



});
const closePdfModalBtn = document.getElementById('closePdfModalBtn');


closePdfModalBtn.addEventListener('click', () => {
   // Cleanup
   localStorage.removeItem('rashid');
  localStorage.removeItem('finalRashid');
  updateRashidCount();
  pdfModal.classList.add('hidden');
  document.getElementById('pdfPreview').src = "";
});

// Generate PDF
function generatePDF(data) {
    // Cleanup
   localStorage.removeItem('rashid');
  localStorage.removeItem('finalRashid');
  updateRashidCount();
  const jsPDF = window.jspdf.jsPDF;
  const doc = new jsPDF();

  const { name, address, mobile } = data.customer;
  const items = data.items;
  const total = data.originalTotal;

  let y = 10;

  doc.setFontSize(16);
  doc.text("Customer Invoice", 80, y);
  y += 10;

  doc.setFontSize(12);
  doc.text(`Name: ${name}`, 10, y);
  y += 6;
  doc.text(`Address: ${address}`, 10, y);
  y += 6;
  doc.text(`Mobile: ${mobile}`, 10, y);
  y += 10;

  doc.text("Items:", 10, y);
  y += 6;

  items.forEach((item, index) => {
    doc.text(
      `${index + 1}. ${item.name} - ${item.quantity} x ${item.price} = ${item.quantity * item.price} Taka`,
      10,
      y
    );
    y += 6;
  });

  y += 6;
  doc.setFontSize(14);
  doc.text(`Total: ${total} Taka`, 10, y);

  return doc;
}
 function updateRashidCount() {
  const rashidItems = JSON.parse(localStorage.getItem('rashid')) || [];
  const count = rashidItems.length;


  const rashidCount = document.getElementById('rashidCount');
  if (rashidCount) {
    rashidCount.textContent = count;
  }
}

async function saveRashidToDB(data) {
  const response = await fetch('/api/admin/add-rashid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to save rashid');
  }

  return response.json();
}


