document.addEventListener("DOMContentLoaded", () => {
  loadCart();
});

function loadCart() {
  // Get cart from localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Get elements
  const cartContent = document.getElementById("cart-content");
  const emptyCart = document.getElementById("empty-cart");
  const cartItems = document.getElementById("cart-items");
  const cartItemsList = document.getElementById("cart-items-list");
  const subtotalElement = document.getElementById("subtotal");
  const totalElement = document.getElementById("total");
  const discountRow = document.getElementById("discount-row");
  const discountElement = document.getElementById("discount");
  const couponForm = document.getElementById("coupon-form");
  const couponMessage = document.getElementById("coupon-message");

  // Show empty cart or items based on cart content
  if (cart.length === 0) {
    if (emptyCart) emptyCart.classList.remove("hidden");
    if (cartItems) cartItems.classList.add("hidden");
    return;
  } else {
    if (emptyCart) emptyCart.classList.add("hidden");
    if (cartItems) cartItems.classList.remove("hidden");
  }

  // Render cart items
  if (cartItemsList) {
    cartItemsList.innerHTML = "";

    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10";
      cartItem.innerHTML = `
          <div class="relative w-24 h-24 rounded-lg overflow-hidden">
            <img src="${item.image}" alt="${item.name}" class="object-cover w-full h-full">
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="font-medium truncate">${item.name}</h3>
            <p class="text-sm text-gray-500">$${item.price.toFixed(2)}</p>
          </div>
          <div class="flex items-center border border-gray-300 dark:border-gray-700 rounded-full">
            <button class="decrease-quantity px-3 py-1 text-gray-500 hover:text-gray-700" aria-label="Decrease quantity" data-product-id="${item.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minus"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
            <span class="px-3 py-1 min-w-[2rem] text-center">${item.quantity}</span>
            <button class="increase-quantity px-3 py-1 text-gray-500 hover:text-gray-700" aria-label="Increase quantity" data-product-id="${item.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
          </div>
          <div class="text-right">
            <p class="font-medium">$${(item.price * item.quantity).toFixed(2)}</p>
            <button class="remove-item text-red-500 hover:text-red-700 text-sm flex items-center mt-1" data-product-id="${item.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2 mr-1"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
              Remove
            </button>
          </div>
        `;

      cartItemsList.appendChild(cartItem);
    });

    // Add event listeners to buttons
    document.querySelectorAll(".decrease-quantity").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = this.getAttribute("data-product-id");
        updateQuantity(productId, -1);
      });
    });

    document.querySelectorAll(".increase-quantity").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = this.getAttribute("data-product-id");
        updateQuantity(productId, 1);
      });
    });

    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = this.getAttribute("data-product-id");
        removeFromCart(productId);
      });
    });
  }

  // Calculate and display totals
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 4.99;
  let discount = 0;

  // Check if coupon is applied
  const couponApplied = localStorage.getItem("couponApplied") === "true";
  if (couponApplied) {
    discount = subtotal * 0.1; // 10% discount
    if (discountRow) discountRow.classList.remove("hidden");
    if (discountElement) discountElement.textContent = "-$" + discount.toFixed(2);
    if (couponMessage) couponMessage.classList.remove("hidden");
  } else {
    if (discountRow) discountRow.classList.add("hidden");
    if (couponMessage) couponMessage.classList.add("hidden");
  }

  const total = subtotal + shipping - discount;

  if (subtotalElement) subtotalElement.textContent = "$" + subtotal.toFixed(2);
  if (totalElement) totalElement.textContent = "$" + total.toFixed(2);

  // Coupon form handling
  if (couponForm) {
    couponForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const couponCode = document.getElementById("coupon-code").value;

      if (couponCode.toLowerCase() === "discount10") {
        localStorage.setItem("couponApplied", "true");
        loadCart(); // Reload cart to apply discount
      } else {
        alert("Invalid coupon code");
      }
    });
  }
}

function updateQuantity(productId, change) {
  // Get cart from localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Find product in cart
  const productIndex = cart.findIndex((item) => item.id === productId);

  if (productIndex !== -1) {
    // Update quantity
    cart[productIndex].quantity += change;

    // Remove product if quantity is 0 or less
    if (cart[productIndex].quantity <= 0) {
      cart.splice(productIndex, 1);
    }

    // Save updated cart
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart count
    updateCartCount(cart.length);

    // Reload cart
    loadCart();
  }
}

function removeFromCart(productId) {
  // Get cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Remove product from cart
  cart = cart.filter((item) => item.id !== productId);

  // Save updated cart
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update cart count
  updateCartCount(cart.length);

  // Reload cart
  loadCart();
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
