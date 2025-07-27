// Gallery functionality
const galleryItems = document.querySelectorAll(".gallery-item");
const viewMoreGallery = document.getElementById("view-more-gallery");
const galleryModal = document.getElementById("gallery-modal");
const closeGallery = document.getElementById("close-gallery");
const gallerySlider = document.getElementById("gallery-slider");
const galleryPrev = document.getElementById("gallery-prev");
const galleryNext = document.getElementById("gallery-next");
const galleryCaption = document.getElementById("gallery-caption");

// Gallery animation
galleryItems.forEach((item) => {
  const delay = item.getAttribute("data-delay") || 0;
  item.style.transitionDelay = `${delay}ms`;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(item);
});

// Gallery modal
if (viewMoreGallery && galleryModal && closeGallery) {
  let currentSlide = 0;
  const totalSlides = 6; // Update this based on your actual number of slides

  viewMoreGallery.addEventListener("click", () => {
    galleryModal.classList.remove("hidden");
    setTimeout(() => {
      galleryModal.classList.add("active");
    }, 10);
    document.body.style.overflow = "hidden";
    updateGalleryCaption();
  });

  closeGallery.addEventListener("click", () => {
    galleryModal.classList.remove("active");
    setTimeout(() => {
      galleryModal.classList.add("hidden");
    }, 300);
    document.body.style.overflow = "";
  });

  // Close on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !galleryModal.classList.contains("hidden")) {
      closeGallery.click();
    }
  });

  // Gallery navigation
  if (galleryPrev && galleryNext && gallerySlider) {
    galleryPrev.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateGallerySlider();
    });

    galleryNext.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateGallerySlider();
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (galleryModal.classList.contains("active")) {
        if (e.key === "ArrowLeft") {
          galleryPrev.click();
        } else if (e.key === "ArrowRight") {
          galleryNext.click();
        }
      }
    });
  }

  function updateGallerySlider() {
    if (gallerySlider) {
      const slideWidth = gallerySlider.clientWidth;
      const flexContainer = gallerySlider.querySelector(".flex");
      if (flexContainer) {
        flexContainer.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
      }
      updateGalleryCaption();
    }
  }

  function updateGalleryCaption() {
    if (galleryCaption) {
      galleryCaption.textContent = `Image ${currentSlide + 1} of ${totalSlides}`;
    }
  }
}

// Testimonial slider
const testimonialSlider = document.getElementById("testimonial-slider");
const testimonialPrev = document.getElementById("testimonial-prev");
const testimonialNext = document.getElementById("testimonial-next");
const testimonialPrevMobile = document.getElementById("testimonial-prev-mobile");
const testimonialNextMobile = document.getElementById("testimonial-next-mobile");
const testimonialDots = document.getElementById("testimonial-dots");

if (testimonialSlider && testimonialDots) {
  let currentTestimonial = 0;
  const totalTestimonials = 4; // Update based on your actual number of testimonials
  const dotsButtons = testimonialDots.querySelectorAll("button");

  // Function to update testimonial slider
  function updateTestimonialSlider() {
    const slideWidth = window.innerWidth >= 768 ? testimonialSlider.clientWidth / 3 : testimonialSlider.clientWidth;
    const flexContainer = testimonialSlider.querySelector(".flex");
    if (flexContainer) {
      flexContainer.style.transform = `translateX(-${currentTestimonial * slideWidth}px)`;
    }

    // Update dots
    dotsButtons.forEach((dot, index) => {
      if (index === currentTestimonial) {
        dot.classList.add("active");
        dot.classList.remove("bg-white/30");
        dot.classList.add("bg-white");
      } else {
        dot.classList.remove("active");
        dot.classList.add("bg-white/30");
        dot.classList.remove("bg-white");
      }
    });
  }

  // Navigation buttons
  if (testimonialPrev && testimonialNext) {
    testimonialPrev.addEventListener("click", () => {
      currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
      updateTestimonialSlider();
    });

    testimonialNext.addEventListener("click", () => {
      currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
      updateTestimonialSlider();
    });
  }

  // Mobile navigation buttons
  if (testimonialPrevMobile && testimonialNextMobile) {
    testimonialPrevMobile.addEventListener("click", () => {
      currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
      updateTestimonialSlider();
    });

    testimonialNextMobile.addEventListener("click", () => {
      currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
      updateTestimonialSlider();
    });
  }

  // Dot navigation
  dotsButtons.forEach((dot) => {
    dot.addEventListener("click", () => {
      currentTestimonial = parseInt(dot.getAttribute("data-index"));
      updateTestimonialSlider();
    });
  });

  // Handle window resize
  window.addEventListener("resize", updateTestimonialSlider);

  // Auto slide testimonials
  let testimonialInterval = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    updateTestimonialSlider();
  }, 5000);

  // Pause auto slide on hover
  testimonialSlider.addEventListener("mouseenter", () => {
    clearInterval(testimonialInterval);
  });

  testimonialSlider.addEventListener("mouseleave", () => {
    testimonialInterval = setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
      updateTestimonialSlider();
    }, 5000);
  });

  // Initialize slider
  updateTestimonialSlider();
}

// FAQ functionality
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    // Close all FAQs
    faqItems.forEach((faq) => {
      faq.classList.remove("active");
      const faqAnswer = faq.querySelector(".faq-answer");
      faqAnswer.classList.remove("active");
      faqAnswer.classList.add("hidden");
    });

    // Toggle current FAQ
    if (!isActive) {
      item.classList.add("active");
      answer.classList.remove("hidden");
      setTimeout(() => {
        answer.classList.add("active");
      }, 10);
    }
  });
});

// Map functionality (placeholder for actual map implementation)
const mapElement = document.getElementById("map");

if (mapElement) {
  // Add a pulsing marker to the map
  const marker = document.createElement("div");
  marker.className = "map-marker";
  mapElement.appendChild(marker);

  // In a real implementation, you would initialize a map library here
  // For example, with Google Maps, Mapbox, or Leaflet

  // Example placeholder for map initialization:
  console.log("Map would be initialized here with actual coordinates");

  // For demonstration purposes, let's add a simple hover effect
  mapElement.addEventListener("mouseenter", () => {
    marker.style.animation = "pulse 1s infinite";
  });

  mapElement.addEventListener("mouseleave", () => {
    marker.style.animation = "pulse 2s infinite";
  });
}
