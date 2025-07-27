document.addEventListener("DOMContentLoaded", () => {
  // Current year for footer
  document.getElementById("current-year").textContent = new Date().getFullYear();

  // Navbar scroll effect
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      navbar.classList.add("glass");
      navbar.classList.remove("py-4");
      navbar.classList.add("py-2");
    } else {
      navbar.classList.remove("glass");
      navbar.classList.add("py-4");
      navbar.classList.remove("py-2");
    }
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById("menu-toggle");
  const closeMenu = document.getElementById("close-menu");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuToggle && closeMenu && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.remove("translate-x-full");
    });

    closeMenu.addEventListener("click", () => {
      mobileMenu.classList.add("translate-x-full");
    });
  }

  // Search toggle
  const searchToggle = document.getElementById("search-toggle");
  const searchBar = document.getElementById("search-bar");

  if (searchToggle && searchBar) {
    searchToggle.addEventListener("click", () => {
      if (searchBar.classList.contains("h-0")) {
        searchBar.classList.remove("h-0");
        searchBar.classList.add("h-16", "py-4");
      } else {
        searchBar.classList.add("h-0");
        searchBar.classList.remove("h-16", "py-4");
      }
    });
  }

  // Hero slider
  const heroSlides = document.querySelectorAll(".hero-slide");
  const slideButtons = document.querySelectorAll("[data-slide]");
  const prevSlide = document.getElementById("prev-slide");
  const nextSlide = document.getElementById("next-slide");
  let currentSlide = 0;
  let isAnimating = false;
  let slideInterval;

  function goToSlide(index) {
    if (isAnimating || index === currentSlide) return;
    isAnimating = true;

    // Update slide indicators
    slideButtons.forEach((button, i) => {
      if (i === index) {
        button.classList.add("bg-white", "w-8");
        button.classList.remove("bg-white/50", "hover:bg-white/80");
      } else {
        button.classList.remove("bg-white", "w-8");
        button.classList.add("bg-white/50", "hover:bg-white/80");
      }
    });

    // Update slides
    heroSlides[currentSlide].classList.remove("active");
    heroSlides[index].classList.add("active");

    // Update hero content
    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
      heroContent.style.opacity = "0";
      heroContent.style.transform = "translateY(10px)";

      setTimeout(() => {
        // Update content based on slide index
        const titles = ["Next Generation Smart Home", "Premium Audio Experience", "Summer Sale"];

        const descriptions = ["Transform your living space with cutting-edge technology", "Immerse yourself in crystal clear sound", "Up to 50% off on selected items"];

        const ctas = ["Shop Now", "Explore Collection", "View Deals"];

        const h1 = heroContent.querySelector("h1");
        const p = heroContent.querySelector("p");
        const a = heroContent.querySelector("a");

        if (h1) h1.textContent = titles[index];
        if (p) p.textContent = descriptions[index];
        if (a) a.textContent = ctas[index];

        heroContent.style.opacity = "1";
        heroContent.style.transform = "translateY(0)";
      }, 300);
    }

    currentSlide = index;

    setTimeout(() => {
      isAnimating = false;
    }, 1000);

    // Reset interval
    clearInterval(slideInterval);
    startSlideInterval();
  }

  function startSlideInterval() {
    slideInterval = setInterval(() => {
      const nextIndex = (currentSlide + 1) % heroSlides.length;
      goToSlide(nextIndex);
    }, 6000);
  }

  // Initialize hero slider if it exists
  if (heroSlides.length > 0) {
    // Set up slide indicators
    slideButtons.forEach((button, index) => {
      button.addEventListener("click", () => goToSlide(index));
    });

    // Set up prev/next buttons
    if (prevSlide) {
      prevSlide.addEventListener("click", () => {
        const prevIndex = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
        goToSlide(prevIndex);
      });
    }

    if (nextSlide) {
      nextSlide.addEventListener("click", () => {
        const nextIndex = (currentSlide + 1) % heroSlides.length;
        goToSlide(nextIndex);
      });
    }

    // Start automatic sliding
    startSlideInterval();
  }

  // Category animation
  const categoryCards = document.querySelectorAll(".category-card");
  if (categoryCards.length > 0) {
    categoryCards.forEach((card, index) => {
      card.style.setProperty("--animation-order", index);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    categoryCards.forEach((card) => {
      observer.observe(card);
    });
  }

  // Featured products horizontal scroll
  const scrollLeft = document.getElementById("scroll-left");
  const scrollRight = document.getElementById("scroll-right");
  const productsContainer = document.querySelector(".products-container");

  if (scrollLeft && scrollRight && productsContainer) {
    scrollLeft.addEventListener("click", () => {
      productsContainer.scrollBy({ left: -productsContainer.clientWidth * 0.8, behavior: "smooth" });
    });

    scrollRight.addEventListener("click", () => {
      productsContainer.scrollBy({ left: productsContainer.clientWidth * 0.8, behavior: "smooth" });
    });
  }

  // Countdown timer
  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  if (daysElement && hoursElement && minutesElement && secondsElement) {
    let days = 3;
    let hours = 8;
    let minutes = 45;
    let seconds = 30;

    const countdown = setInterval(() => {
      if (seconds > 0) {
        seconds--;
      } else {
        seconds = 59;
        if (minutes > 0) {
          minutes--;
        } else {
          minutes = 59;
          if (hours > 0) {
            hours--;
          } else {
            hours = 23;
            if (days > 0) {
              days--;
            } else {
              // Sale ended
              clearInterval(countdown);
            }
          }
        }
      }

      daysElement.textContent = days.toString().padStart(2, "0");
      hoursElement.textContent = hours.toString().padStart(2, "0");
      minutesElement.textContent = minutes.toString().padStart(2, "0");
      secondsElement.textContent = seconds.toString().padStart(2, "0");
    }, 1000);
  }

  // Newsletter form
  const newsletterForm = document.getElementById("newsletter-form");
  const newsletterEmail = document.getElementById("newsletter-email");
  const newsletterMessage = document.getElementById("newsletter-message");

  if (newsletterForm && newsletterEmail && newsletterMessage) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!newsletterEmail.value) return;

      // Simulate form submission
      const submitButton = newsletterForm.querySelector('button[type="submit"]');
      const originalContent = submitButton.innerHTML;

      submitButton.disabled = true;
      submitButton.innerHTML = '<div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>';

      setTimeout(() => {
        submitButton.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        newsletterMessage.textContent = "Thank you for subscribing!";
        newsletterMessage.classList.remove("hidden");
        newsletterMessage.classList.add("text-green-500");
        newsletterEmail.value = "";

        setTimeout(() => {
          submitButton.disabled = false;
          submitButton.innerHTML = originalContent;
          newsletterMessage.classList.add("hidden");
        }, 3000);
      }, 1500);
    });
  }

  // Load featured products
  loadFeaturedProducts();

  // Initialize cart
  initializeCart();
});

// Mock product data
const mockProducts = [
  {
    id: "1",
    name: "Smart Kitchen Scale",
    price: 49.99,
    image: "https://placehold.co/300x300",
    rating: 4.5,
    description: "Precision digital kitchen scale with smart app connectivity.",
    category: "kitchen",
  },
  {
    id: "2",
    name: "Automatic Soap Dispenser",
    price: 29.99,
    image: "https://placehold.co/300x300",
    rating: 4.2,
    description: "Touchless soap dispenser with motion sensor.",
    category: "bathroom",
  },
  {
    id: "3",
    name: "Smart LED Light Bulb",
    price: 19.99,
    image: "https://placehold.co/300x300",
    rating: 4.8,
    description: "Color-changing smart bulb with voice control compatibility.",
    category: "living-room",
  },
  {
    id: "4",
    name: "Robot Vacuum Cleaner",
    price: 299.99,
    image: "https://placehold.co/300x300",
    rating: 4.7,
    description: "Automated vacuum with mapping technology and app control.",
    category: "cleaning",
  },
  {
    id: "5",
    name: "Minimalist Wall Clock",
    price: 39.99,
    image: "https://placehold.co/300x300",
    rating: 4.3,
    description: "Modern design wall clock with silent movement.",
    category: "home-decor",
  },
  {
    id: "6",
    name: "Smart Power Strip",
    price: 59.99,
    image: "https://placehold.co/300x300",
    rating: 4.6,
    description: "Wi-Fi enabled power strip with individual outlet control.",
    category: "electronics",
  },
  {
    id: "7",
    name: "Wireless Charging Pad",
    price: 34.99,
    image: "https://placehold.co/300x300",
    rating: 4.4,
    description: "Fast wireless charging pad for smartphones and earbuds.",
    category: "electronics",
  },
  {
    id: "8",
    name: "Air Purifier",
    price: 129.99,
    image: "https://placehold.co/300x300",
    rating: 4.9,
    description: "HEPA air purifier with air quality monitoring.",
    category: "home-decor",
  },
];

// Load featured products
function loadFeaturedProducts() {
  const productsContainer = document.querySelector(".products-container");
  if (!productsContainer) return;

  // Clear container
  productsContainer.innerHTML = "";

  // Add products
  mockProducts.forEach((product) => {
    const productCard = createProductCard(product);
    productsContainer.appendChild(productCard);
  });
}

// Create product card
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card flex-shrink-0 w-[250px] rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300";
  card.setAttribute("data-product-id", product.id);

  // Generate star rating HTML
  let starsHtml = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(product.rating)) {
      starsHtml += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star text-yellow-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    } else if (i - 0.5 <= product.rating) {
      starsHtml += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star text-yellow-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
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

// Toggle favorite
function toggleFavorite(button, productId) {
  const isFavorite = button.classList.contains("favorite");

  if (isFavorite) {
    button.classList.remove("favorite", "bg-pink-500");
    button.classList.add("bg-black/30", "hover:bg-pink-500/70");
    button.querySelector("svg").setAttribute("fill", "none");
  } else {
    button.classList.add("favorite", "bg-pink-500");
    button.classList.remove("bg-black/30", "hover:bg-pink-500/70");
    button.querySelector("svg").setAttribute("fill", "currentColor");
  }

  // You could also save favorites to localStorage here
}

// Cart functionality
function initializeCart() {
  // Load cart from localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Update cart count
  updateCartCount(cart.length);

  // Add event listeners to all add-to-cart buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const productId = this.getAttribute("data-product-id");
      const product = mockProducts.find((p) => p.id === productId);

      if (product) {
        addToCart(product);
      }
    });
  });
}

// Add to cart
function addToCart(product) {
  // Get current cart
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if product is already in cart
  const existingProductIndex = cart.findIndex((item) => item.id === product.id);

  if (existingProductIndex >= 0) {
    // Increment quantity
    cart[existingProductIndex].quantity += 1;
  } else {
    // Add new product with quantity 1
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  // Save to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update cart count
  updateCartCount(cart.length);

  // Show notification
  showNotification(`${product.name} added to cart!`);
}

// Update cart count
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

// Show notification
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
