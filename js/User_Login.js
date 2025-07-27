document.addEventListener("DOMContentLoaded", function () {
  // Get current year for footer
  document.getElementById("current-year").textContent = new Date().getFullYear();

  // Password visibility toggle
  const togglePassword = document.getElementById("toggle-password");
  const passwordInput = document.getElementById("password");

  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", function () {
      const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);

      // Change the icon
      this.innerHTML =
        type === "password"
          ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>'
          : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye-off"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
    });
  }

  // Form validation and submission
  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const remember = document.getElementById("remember").checked;

      // Simple validation
      let isValid = true;

      // Email validation
      if (!email || !isValidEmail(email)) {
        showError("email", "Please enter a valid email address");
        isValid = false;
      } else {
        clearError("email");
      }

      // Password validation
      if (!password || password.length < 6) {
        showError("password", "Password must be at least 6 characters");
        isValid = false;
      } else {
        clearError("password");
      }

      // If valid, simulate login
      if (isValid) {
        // Show loading state
        const submitButton = loginForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>';

        // Simulate API call
        setTimeout(() => {
          // Create success overlay
          const successOverlay = document.createElement("div");
          successOverlay.className = "login-success";
          successOverlay.innerHTML = `
              <div class="login-success-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
            `;

          document.querySelector(".login-container").appendChild(successOverlay);

          // Show success message
          setTimeout(() => {
            successOverlay.classList.add("show");

            // Redirect after success
            setTimeout(() => {
              window.location.href = "index.html";
            }, 1500);
          }, 100);
        }, 1500);

        // Save to localStorage if remember is checked
        if (remember) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
      }
    });

    // Check for remembered email
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      document.getElementById("email").value = rememberedEmail;
      document.getElementById("remember").checked = true;
    }
  }

  // Helper functions
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const formGroup = input.closest(".form-group");

    // Create error message if it doesn't exist
    let errorMessage = formGroup.querySelector(".error-message");
    if (!errorMessage) {
      errorMessage = document.createElement("div");
      errorMessage.className = "error-message";
      formGroup.appendChild(errorMessage);
    }

    errorMessage.textContent = message;
    formGroup.classList.add("error");
  }

  function clearError(inputId) {
    const input = document.getElementById(inputId);
    const formGroup = input.closest(".form-group");
    formGroup.classList.remove("error");
  }

  // Navbar scroll effect (copied from main script for standalone functionality)
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
});
