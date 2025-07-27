document.addEventListener("DOMContentLoaded", () => {
  // Mock products (replace with actual data fetching)
  const mockProducts = [
    {
      id: 1,
      name: "Vintage Backpack",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1556020616-49b82510794a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhY2twYWNrfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      rating: 4.5,
      category: "accessories",
    },
    {
      id: 2,
      name: "Leather Wallet",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1610376381304-400f2025964c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHdhbGxldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      rating: 4.2,
      category: "accessories",
    },
    {
      id: 3,
      name: "Wool Scarf",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1547036967-23d11a00b936?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2NhcmZ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      rating: 4.8,
      category: "clothing",
    },
    {
      id: 4,
      name: "Cotton T-shirt",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dCUyMHNoaXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      rating: 4.0,
      category: "clothing",
    },
    {
      id: 5,
      name: "Running Shoes",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cnVubmluZyUyMHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      rating: 4.6,
      category: "shoes",
    },
    {
      id: 6,
      name: "Ankle Boots",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1517343574429-99d863381ed3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YW5rbGUlMjBib290c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      rating: 4.3,
      category: "shoes",
    },
  ];

  // Mock addToCart function
  function addToCart(product) {
    console.log("Added to cart:", product);
    alert(`${product.name} added to cart!`);
  }

  // Mock toggleFavorite function
  function toggleFavorite(button, productId) {
    button.classList.toggle("active");
    console.log(`Toggled favorite for product ID: ${productId}`);
  }

  // Get filter elements
  const minPriceInput = document.getElementById("min-price");
  const maxPriceInput = document.getElementById("max-price");
  const minPriceDisplay = document.getElementById("min-price-display");
  const maxPriceDisplay = document.getElementById("max-price-display");
  const categoryFilters = document.querySelectorAll('#category-filters input[type="checkbox"]');
  const productsGrid = document.getElementById("products-grid");
  const noProductsMessage = document.getElementById("no-products");
  const filterToggle = document.getElementById("filter-toggle");
  const filtersSidebar = document.getElementById("filters-sidebar");

  // Mobile filter toggle
  if (filterToggle && filtersSidebar) {
    filterToggle.addEventListener("click", () => {
      if (filtersSidebar.classList.contains("hidden")) {
        filtersSidebar.classList.remove("hidden");
      } else {
        filtersSidebar.classList.add("hidden");
      }
    });
  }

  // Initialize price range displays
  if (minPriceInput && maxPriceInput && minPriceDisplay && maxPriceDisplay) {
    minPriceInput.addEventListener("input", function () {
      minPriceDisplay.textContent = "$" + this.value;
      filterProducts();
    });

    maxPriceInput.addEventListener("input", function () {
      maxPriceDisplay.textContent = "$" + this.value;
      filterProducts();
    });
  }

  // Category filter functionality
  if (categoryFilters && productsGrid && noProductsMessage) {
    categoryFilters.forEach((checkbox) => {
      checkbox.addEventListener("change", filterProducts);
    });
  }

  // Load products
  loadProducts();

  // Function to load products
  function loadProducts() {
    if (!productsGrid) return;

    // Clear loader
    productsGrid.innerHTML = "";

    // Add products
    mockProducts.forEach((product) => {
      const productCard = createProductCard(product);
      productsGrid.appendChild(productCard);
    });

    // Apply initial filters
    filterProducts();
  }

  // Create product card
  function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300";
    card.setAttribute("data-product-id", product.id);
    card.setAttribute("data-price", product.price);
    card.setAttribute("data-category", product.category);

    // Generate star rating HTML
    let starsHtml = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(product.rating)) {
        starsHtml += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star text-yellow-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
      } else if (i - 0.5 <= product.rating) {
        starsHtml += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star text-yellow-400"><polygon points  stroke-linejoin="round" class="feather feather-star text-yellow-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
      } else {
        starsHtml += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star text-gray-300"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
      }
    }

    card.innerHTML = `
      <a href="product-detail.html?id=${product.id}" class="block">
        <div class="aspect-square relative overflow-hidden">
          <img src="${product.image}" alt="${product.name}" class="object-cover w-full h-full transition-transform duration-500 hover:scale-110">
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          <button class="add-to-favorites absolute top-3 right-3 p-2 rounded-full bg-black/30 text-white hover:bg-pink-500/70 opacity-0 hover:opacity-100 transition-all duration-300" aria-label="Add to favorites" data-product-id="${
            product.id
          }">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
          <button class="add-to-cart absolute bottom-3 right-3 p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 opacity-0 hover:opacity-100 transition-all duration-300" aria-label="Add to cart" data-product-id="${product.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          </button>
        </div>
        <div class="p-4">
          <h3 class="font-medium truncate">${product.name}</h3>
          <div class="flex items-center mt-1">
            ${starsHtml}
            <span class="text-xs text-gray-500 ml-1">(${product.rating})</span>
          </div>
          <p class="mt-2 font-bold text-lg">$${product.price.toFixed(2)}</p>
        </div>
      </a>
    `;

    // Add event listeners
    const addToCartBtn = card.querySelector(".add-to-cart");
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
      });
    }

    const addToFavoritesBtn = card.querySelector(".add-to-favorites");
    if (addToFavoritesBtn) {
      addToFavoritesBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(this, product.id);
      });
    }

    return card;
  }

  // Function to filter products
  function filterProducts() {
    const minPrice = minPriceInput ? Number.parseFloat(minPriceInput.value) : 0;
    const maxPrice = maxPriceInput ? Number.parseFloat(maxPriceInput.value) : Number.POSITIVE_INFINITY;
    const selectedCategories = Array.from(categoryFilters)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    const products = Array.from(productsGrid.children);
    let visibleProductsCount = 0;

    products.forEach((product) => {
      const price = Number.parseFloat(product.dataset.price);
      const category = product.dataset.category;
      const priceCheck = price >= minPrice && price <= maxPrice;
      const categoryCheck = selectedCategories.length === 0 || selectedCategories.includes(category);

      if (priceCheck && categoryCheck) {
        product.style.display = "block";
        visibleProductsCount++;
      } else {
        product.style.display = "none";
      }
    });

    if (noProductsMessage) {
      noProductsMessage.style.display = visibleProductsCount === 0 ? "block" : "none";
    }
  }
});
