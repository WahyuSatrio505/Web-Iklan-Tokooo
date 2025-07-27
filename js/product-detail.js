document.addEventListener("DOMContentLoaded", () => {
  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (productId) {
    loadProductDetail(productId);
  } else {
    showProductNotFound();
  }

  // Initialize quantity selector
  const decreaseBtn = document.getElementById("decrease-quantity");
  const increaseBtn = document.getElementById("increase-quantity");
  const quantityDisplay = document.getElementById("quantity");

  if (decreaseBtn && increaseBtn && quantityDisplay) {
    decreaseBtn.addEventListener("click", () => {
      const currentQuantity = Number.parseInt(quantityDisplay.textContent);
      if (currentQuantity > 1) {
        quantityDisplay.textContent = currentQuantity - 1;
      }
    });

    increaseBtn.addEventListener("click", () => {
      const currentQuantity = Number.parseInt(quantityDisplay.textContent);
      quantityDisplay.textContent = currentQuantity + 1;
    });
  }

  // Add to cart button
  const addToCartBtn = document.getElementById("add-to-cart");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      const product = mockProducts.find((p) => p.id === productId);
      if (product) {
        const quantity = Number.parseInt(quantityDisplay.textContent);
        addToCart(product, quantity);
      }
    });
  }

  // Favorite button
  const favoriteBtn = document.getElementById("toggle-favorite");
  if (favoriteBtn) {
    favoriteBtn.addEventListener("click", function () {
      toggleFavorite(this);
    });
  }

  // Product image gallery
  const mainImage = document.getElementById("main-product-image");
  const thumbnails = document.querySelectorAll(".product-thumbnail");

  if (mainImage && thumbnails.length > 0) {
    thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("click", function () {
        // Update main image
        mainImage.src = this.querySelector("img").src;

        // Update active thumbnail
        thumbnails.forEach((t) => t.classList.remove("border-purple-500"));
        this.classList.add("border-purple-500");
      });
    });
  }

  // Tab navigation
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  if (tabButtons.length > 0 && tabContents.length > 0) {
    tabButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const tabId = this.getAttribute("data-tab");

        // Update active tab button
        tabButtons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");

        // Show selected tab content
        tabContents.forEach((content) => {
          if (content.id === tabId) {
            content.classList.remove("hidden");
          } else {
            content.classList.add("hidden");
          }
        });
      });
    });
  }
});

// Mock products (replace with your actual data source)
const mockProducts = [
  {
    id: "1",
    name: "Awesome T-Shirt",
    price: 29.99,
    description: "This is an awesome t-shirt!",
    rating: 4.5,
    image: "https://placehold.co/600x600",
  },
  {
    id: "2",
    name: "Cool Mug",
    price: 12.5,
    description: "Start your day with this cool mug.",
    rating: 3.8,
    image: "https://placehold.co/600x600",
  },
];

function loadProductDetail(productId) {
  // Find product in mock data
  const product = mockProducts.find((p) => p.id === productId);

  if (!product) {
    showProductNotFound();
    return;
  }

  // Update page title
  document.title = `${product.name} - FutureShop`;

  // Update product details
  const productName = document.getElementById("product-name");
  const productPrice = document.getElementById("product-price");
  const productDescription = document.getElementById("product-description");
  const productRating = document.getElementById("product-rating");
  const mainImage = document.getElementById("main-product-image");

  if (productName) productName.textContent = product.name;
  if (productPrice) productPrice.textContent = `$${product.price.toFixed(2)}`;
  if (productDescription) productDescription.textContent = product.description || "This modern product combines sleek design with practical functionality, making it a perfect addition to any home.";

  // Update rating stars
  if (productRating) {
    productRating.innerHTML = "";

    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("span");
      star.className = i <= Math.floor(product.rating) ? "star filled" : "star";
      star.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="${
        i <= Math.floor(product.rating) ? "currentColor" : "none"
      }" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
      productRating.appendChild(star);
    }

    const ratingText = document.createElement("span");
    ratingText.className = "text-sm text-gray-500 ml-2";
    ratingText.textContent = `(${product.rating})`;
    productRating.appendChild(ratingText);
  }

  // Update main image
  if (mainImage) mainImage.src = product.image;

  // Update thumbnails
  const thumbnailContainer = document.getElementById("product-thumbnails");
  if (thumbnailContainer) {
    thumbnailContainer.innerHTML = "";

    // Create thumbnails (main image + 3 placeholders)
    const images = [product.image, "https://placehold.co/600x600", "https://placehold.co/600x600", "https://placehold.co/600x600"];

    images.forEach((image, index) => {
      const thumbnail = document.createElement("button");
      thumbnail.className = `relative aspect-square rounded-lg overflow-hidden border-2 ${index === 0 ? "border-purple-500" : "border-transparent"}`;
      thumbnail.innerHTML = `<img src="${image}" alt="${product.name} thumbnail ${index + 1}" class="object-cover w-full h-full">`;
      thumbnailContainer.appendChild(thumbnail);

      // Add click event
      thumbnail.addEventListener("click", function () {
        mainImage.src = image;

        // Update active thumbnail
        document.querySelectorAll("#product-thumbnails button").forEach((t) => t.classList.remove("border-purple-500"));
        this.classList.add("border-purple-500");
      });
    });
  }
}

function showProductNotFound() {
  const productDetailContainer = document.querySelector(".container");
  if (productDetailContainer) {
    productDetailContainer.innerHTML = `
        <div class="text-center py-16">
          <h2 class="text-2xl font-bold mb-4">Product Not Found</h2>
          <p class="mb-8">The product you are looking for does not exist.</p>
          <a href="products.html" class="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-400 text-white font-medium">
            Back to Products
          </a>
        </div>
      `;
  }
}

function addToCart(product, quantity = 1) {
  // Get current cart
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if product is already in cart
  const existingProductIndex = cart.findIndex((item) => item.id === product.id);

  if (existingProductIndex >= 0) {
    // Increment quantity
    cart[existingProductIndex].quantity += quantity;
  } else {
    // Add new product with specified quantity
    cart.push({
      ...product,
      quantity: quantity,
    });
  }

  // Save to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update cart count
  updateCartCount(cart.length);

  // Show notification
  showNotification(`${product.name} added to cart!`);
}

function toggleFavorite(button) {
  const isFavorite = button.classList.contains("bg-pink-500");

  if (isFavorite) {
    button.classList.remove("bg-pink-500", "border-pink-500", "text-white");
    button.classList.add("border-gray-300", "dark:border-gray-700", "text-gray-500");
    button.querySelector("svg").setAttribute("fill", "none");
  } else {
    button.classList.add("bg-pink-500", "border-pink-500", "text-white");
    button.classList.remove("border-gray-300", "dark:border-gray-700", "text-gray-500");
    button.querySelector("svg").setAttribute("fill", "currentColor");
  }
}

function updateCartCount(count) {
  const cartCountElements = document.querySelectorAll(".cart-count");

  cartCountElements.forEach((element) => {
    if (count > 0) {
      element.textContent = count;
      element.classList.remove("hidden");
    } else {
      element.classList.add("hidden");
    }
  });
}

function showNotification(message) {
  // Create notification element if it doesn't exist
  let notification = document.getElementById("notification");

  if (!notification) {
    notification = document.createElement("div");
    notification.id = "notification";
    notification.className = "fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transform translate-y-full opacity-0 transition-all duration-300 z-50";
    document.body.appendChild(notification);
  }

  // Set message and show notification
  notification.textContent = message;
  notification.classList.remove("translate-y-full", "opacity-0");

  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.classList.add("translate-y-full", "opacity-0");
  }, 3000);
}
