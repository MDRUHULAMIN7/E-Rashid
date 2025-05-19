
  const form = document.getElementById('add-product-form');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Adding...`;

    const product = {
      name: form.name.value.trim(),
      description: form.description.value.trim(),
      category: form.category.value,
      price: parseFloat(form.price.value),
      regularPrice: parseFloat(form.regularPrice.value),
      image: form.image.value.trim()
    };
    console.log(product)

    try {
      const res = await fetch('http://localhost:5000/api/add-products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });

      const data = await res.json();
      if (data.insertedId) {
        showToast(" Product added to database!");
        form.reset();
      } else {
        showToast(" Failed to add product.");
      }
    } catch (err) {
      showToast("Server error.");
      console.error(err);
    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  });

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

