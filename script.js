const products = [
  {
    id: 1,
    name: "iPhone 14",
    price: 999,
    category: "electronics",
    image: "https://files.refurbed.com/ii/iphone-14-1662615920.jpg"
  },
  {
    id: 2,
    name: "MacBook Pro",
    price: 1299,
    category: "electronics",
    image: "https://istore.co.na/cdn/shop/products/mbp-spacegray-gallery1-202206_1_59f587a7-55ec-4a37-81ef-8b18d48bf342_2048x.png?v=1656498908"
  },
  {
    id: 3,
    name: "AirPods Pro",
    price: 249,
    category: "electronics",
    image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQD83?wid=572&hei=572&fmt=jpeg"
  },
  {
    id: 4,
    name: "Designer Jeans",
    price: 89,
    category: "clothing",
    image: "https://cdn.poizon.com/pro-img/cut-img/20250320/52aab718afab4dea96f2473ebace31bf.jpg?x-oss-process=image/format,webp/resize,w_750"
  },
  {
    id: 5,
    name: "Casual T-Shirt",
    price: 25,
    category: "clothing",
    image: "https://fashionclinik.com/wp-content/uploads/2024/03/Smart-Casual-T-Shirt-for-Men-4-scaled.jpg"
  },
  {
    id: 6,
    name: "JavaScript Guide",
    price: 35,
    category: "books",
    image: "https://m.media-amazon.com/images/I/81kqrwS1nNL._SL1500_.jpg"
  },
  {
    id: 7,
    name: "Smart Watch",
    price: 149,
    category: "accessories",
    image: "https://m.media-amazon.com/images/I/71v2jVh6nIL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    id: 8,
    name: "Wall Shelf",
    price: 79,
    category: "home",
    image: "https://wasilaah.com/cdn/shop/files/Wall_Shelf.jpg?v=1730257293"
  },
  {
    id: 9,
    name: "Teddy Bear",
    price: 45,
    category: "toys",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4Q1d1H3wT3e7AJnHgGFQI8OtLeXaOeBVp7Q&s"
  }
  // Add more products as needed
];

let cart = [];

function renderItems(data) {
  const container = document.getElementById('items-container');
  container.innerHTML = '';
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
      <div class="item-image">
        <img src="${item.image}" alt="${item.name}" />
      </div>
      <h4>${item.name}</h4>
      <p>$${item.price}</p>
      <button onclick="addToCart(${item.id})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

function addToCart(itemId) {
  const item = products.find(i => i.id === itemId);
  const existing = cart.find(i => i.id === itemId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById('cart-items');
  const totalItems = document.getElementById('total-items');
  const totalPrice = document.getElementById('total-price');

  cartList.innerHTML = '';
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    const itemTotal = item.price * item.quantity;
    li.innerHTML = `
      ${item.name} - $${itemTotal.toFixed(2)} 
      (x${item.quantity})
      <button onclick="changeQuantity(${item.id}, -1)">-</button>
      <button onclick="changeQuantity(${item.id}, 1)">+</button>
      <button onclick="removeItem(${item.id})">Remove</button>
    `;
    cartList.appendChild(li);
    total += itemTotal;
    count += item.quantity;
  });

  totalItems.textContent = count;
  totalPrice.textContent = total.toFixed(2);
}

function changeQuantity(itemId, delta) {
  const item = cart.find(i => i.id === itemId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== itemId);
  }
  updateCart();
}

function removeItem(itemId) {
  cart = cart.filter(i => i.id !== itemId);
  updateCart();
}

function applyFilters() {
  const searchValue = document.getElementById('search-input').value.toLowerCase();
  const categoryFilters = Array.from(document.querySelectorAll('.category-filter:checked')).map(e => e.value);
  const priceFilters = Array.from(document.querySelectorAll('.price-filter:checked')).map(e => e.value);

  const filteredItems = products.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(searchValue);
    const matchCategory = categoryFilters.length === 0 || categoryFilters.includes(item.category);
    const matchPrice = priceFilters.length === 0 || priceFilters.some(filter => {
      if (filter === '<50') return item.price < 50;
      if (filter === '50-100') return item.price >= 50 && item.price <= 100;
      if (filter === '>100') return item.price > 100;
    });
    return matchSearch && matchCategory && matchPrice;
  });

  renderItems(filteredItems);
}

document.getElementById('search-input').addEventListener('input', applyFilters);
document.querySelectorAll('.category-filter, .price-filter').forEach(el => el.addEventListener('change', applyFilters));

renderItems(products);
