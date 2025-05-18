fetch('http://localhost:5000/api/products')
  .then(res => res.json())
  .then(products => {
    const list = document.getElementById('product-list');
    products.forEach(product => {
      const li = document.createElement('li');
      li.className = 'bg-white p-4 rounded shadow';
      li.innerHTML = `
        <strong>${product.name}</strong> - ৳${product.price}<br/>
        <small>${product.description}</small>
      `;
      list.appendChild(li);
    });
  })
  .catch(err => console.error('Error:', err));
