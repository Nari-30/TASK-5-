const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');
const cartCount = document.getElementById('cartCount');

let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

// ✅ Fetch 1000+ products
async function fetchProducts() {
  const res = await fetch('https://dummyjson.com/products?limit=1000');
  const data = await res.json();
  products = data.products;
  displayProducts(products);
}

// ✅ Display products dynamically
function displayProducts(items) {
  productGrid.innerHTML = '';
  items.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p class="price">$${product.price}</p>
      <p>${product.category}</p>
      <button class="add-btn" onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productGrid.appendChild(div);
  });
}

// ✅ Add item to cart & save to localStorage
function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${item.title} added to cart!`);
}

// ✅ Update cart counter
function updateCartCount() {
  cartCount.textContent = cart.length;
}

// ✅ Search & Filter
searchInput?.addEventListener('input', () => filterProducts());
categorySelect?.addEventListener('change', () => filterProducts());

function filterProducts() {
  const searchValue = searchInput.value.toLowerCase();
  const categoryValue = categorySelect.value;

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(searchValue) &&
    (categoryValue === 'all' || p.category.toLowerCase() === categoryValue.toLowerCase())
  );

  displayProducts(filtered);
}

// Load products
fetchProducts();
