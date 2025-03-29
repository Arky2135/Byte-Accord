document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("main-header");
  const backToTopButton = document.getElementById("back-to-top");
  const mobileNav = document.querySelector(".main-nav");
  const menuToggle = document.querySelector(".menu-toggle");
  const searchPopup = document.querySelector(".search-popup");
  const searchIconBtn = document.querySelector(".search-icon-btn");
  const closeSearchBtn = document.querySelector(".close-search-btn");
  const cartBadge = document.querySelector(".cart-badge");
  const cartIconLink = document.querySelector(".cart-icon-link"); // Get the cart icon link

  // --- Cart Simulation ---
  let cartItemCount = 0; // Simple counter for simulation

  // Function to update cart badge
  const updateCartBadge = () => {
    if (cartBadge) {
      cartBadge.textContent = cartItemCount;
      // Add animation class when count increases
      if (cartItemCount > 0 && cartIconLink) {
        cartIconLink.classList.add("updated");
        // Remove animation class after it finishes
        setTimeout(() => {
          cartIconLink.classList.remove("updated");
        }, 600); // Match animation duration
      }
    }
  };

  // Initialize badge
  updateCartBadge();

  // Add event listeners to all "Buy Buttons"
  const buyButtons = document.querySelectorAll(".buy-button");
  buyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId; // Get product ID
      if (!productId) return; // Exit if no product ID

      // 1. Increment simulated cart count
      cartItemCount++;
      updateCartBadge();

      // 2. Visual Feedback on Button
      const originalButtonContent = button.innerHTML; // Store original icon
      button.innerHTML = '<span class="added-text">Added!</span>'; // Change text
      button.classList.add("added");
      button.disabled = true; // Temporarily disable

      console.log(
        `Product ${productId} added to cart (simulated). Total items: ${cartItemCount}`
      );

      // 3. Reset button after a short delay
      setTimeout(() => {
        button.innerHTML = originalButtonContent; // Restore icon
        button.classList.remove("added");
        button.disabled = false;
      }, 1500); // Reset after 1.5 seconds
    });
  });

  // --- Sticky Header ---
  // (Keep existing code)
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
      if (backToTopButton) backToTopButton.classList.add("show");
    } else {
      header.classList.remove("scrolled");
      if (backToTopButton) backToTopButton.classList.remove("show");
    }
  };
  window.addEventListener("scroll", handleScroll);

  // --- Back to Top Button ---
  // (Keep existing code)
  if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- Mobile Navigation Toggle ---
  // (Keep existing code)
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      mobileNav.classList.toggle("active");
      const isExpanded = mobileNav.classList.contains("active");
      menuToggle.setAttribute("aria-expanded", isExpanded);
      const icon = menuToggle.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-times");
      }
    });
    document.addEventListener("click", (event) => {
      if (
        !mobileNav.contains(event.target) &&
        !menuToggle.contains(event.target) &&
        mobileNav.classList.contains("active")
      ) {
        mobileNav.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        const icon = menuToggle.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      }
    });
  }

  // --- Search Popup Toggle ---
  // (Keep existing code)
  if (searchIconBtn && searchPopup && closeSearchBtn) {
    searchIconBtn.addEventListener("click", (e) => {
      e.preventDefault();
      searchPopup.classList.add("active");
      const searchInput = searchPopup.querySelector('input[type="search"]');
      if (searchInput) searchInput.focus();
    });
    closeSearchBtn.addEventListener("click", () => {
      searchPopup.classList.remove("active");
    });
    searchPopup.addEventListener("click", (event) => {
      if (event.target === searchPopup) {
        searchPopup.classList.remove("active");
      }
    });
  }

  // --- Intersection Observer for Animations ---
  // (Keep existing code)
  const animatedElements = document.querySelectorAll(
    ".step-item, .vendor-item, .product-item, .why-item, .testimonial-item, .category-item"
  );
  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in", "visible");
        observer.unobserve(entry.target);
      }
    });
  };
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  animatedElements.forEach((el) => {
    observer.observe(el);
  });

  // --- Testimonial Slider (Basic Horizontal Scroll) ---
  // (Keep existing code)

  // --- Update Footer Year ---
  // (Keep existing code)
  const currentYearSpan = document.getElementById("current-year");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // --- Smooth Scrolling for Nav Links ---
  // (Keep existing code - slightly modified for hero buttons)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    // Includes hero buttons now
    anchor.addEventListener("click", function (e) {
      const hrefAttribute = this.getAttribute("href");
      if (
        hrefAttribute &&
        hrefAttribute.length > 1 &&
        document.querySelector(hrefAttribute)
      ) {
        e.preventDefault();
        const targetElement = document.querySelector(hrefAttribute);
        // Calculate offset for sticky header
        const headerOffset = header ? header.offsetHeight + 20 : 80; // Add extra padding
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Close mobile nav if active
        if (mobileNav && mobileNav.classList.contains("active")) {
          mobileNav.classList.remove("active");
          menuToggle.setAttribute("aria-expanded", "false");
          const icon = menuToggle.querySelector("i");
          if (icon) {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
          }
        }
      }
    });
  });

  console.log("SetuConnect Home JS Initialized with Cart Simulation!");
}); // End DOMContentLoaded
