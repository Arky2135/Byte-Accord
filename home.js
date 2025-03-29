document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("main-header");
  const backToTopButton = document.getElementById("back-to-top");
  const mobileNav = document.querySelector(".main-nav");
  const menuToggle = document.querySelector(".menu-toggle");
  const searchPopup = document.querySelector(".search-popup");
  const searchIconBtn = document.querySelector(".search-icon-btn");
  const closeSearchBtn = document.querySelector(".close-search-btn");

  // --- Sticky Header ---
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
  if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- Mobile Navigation Toggle ---
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      mobileNav.classList.toggle("active");
      const isExpanded = mobileNav.classList.contains("active");
      menuToggle.setAttribute("aria-expanded", isExpanded);
      // Toggle icon (optional)
      const icon = menuToggle.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-times");
      }
    });

    // Close mobile nav if clicking outside of it
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
  if (searchIconBtn && searchPopup && closeSearchBtn) {
    searchIconBtn.addEventListener("click", (e) => {
      e.preventDefault();
      searchPopup.classList.add("active");
      // Focus the input field when opening
      const searchInput = searchPopup.querySelector('input[type="search"]');
      if (searchInput) searchInput.focus();
    });

    closeSearchBtn.addEventListener("click", () => {
      searchPopup.classList.remove("active");
    });

    // Close popup if clicking outside the form
    searchPopup.addEventListener("click", (event) => {
      if (event.target === searchPopup) {
        // Check if the click is on the backdrop itself
        searchPopup.classList.remove("active");
      }
    });
  }

  // --- Intersection Observer for Animations ---
  const animatedElements = document.querySelectorAll(
    ".step-item, .vendor-item, .product-item, .why-item, .testimonial-item, .category-item"
  );

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in", "visible");
        observer.unobserve(entry.target); // Stop observing once visible
      }
    });
  };

  const observerOptions = {
    root: null, // viewport
    rootMargin: "0px",
    threshold: 0.1, // Trigger when 10% is visible
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  animatedElements.forEach((el) => {
    observer.observe(el);
  });

  // --- Testimonial Slider (Basic Horizontal Scroll) ---
  // More advanced sliders often use libraries (SwiperJS, Slick)
  // This demonstrates basic scroll functionality if you add buttons
  const slider = document.querySelector(".testimonial-slider");
  // const prevButton = document.querySelector('.prev-slide'); // Add these buttons in HTML if needed
  // const nextButton = document.querySelector('.next-slide');

  // if (slider && prevButton && nextButton) {
  //     const scrollAmount = () => {
  //         // Calculate scroll amount based on item width
  //         const firstItem = slider.querySelector('.testimonial-item');
  //         return firstItem ? firstItem.offsetWidth + 30 : 300; // Item width + gap
  //     }

  //     nextButton.addEventListener('click', () => {
  //         slider.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
  //     });

  //     prevButton.addEventListener('click', () => {
  //         slider.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  //     });

  //     // Optional: Disable buttons at ends
  //     const checkScrollButtons = () => {
  //         const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
  //         prevButton.disabled = slider.scrollLeft <= 0;
  //         nextButton.disabled = slider.scrollLeft >= maxScrollLeft - 5; // Add tolerance
  //     };
  //     slider.addEventListener('scroll', checkScrollButtons);
  //     window.addEventListener('resize', checkScrollButtons); // Recheck on resize
  //     checkScrollButtons(); // Initial check
  // }

  // --- Update Footer Year ---
  const currentYearSpan = document.getElementById("current-year");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // --- Smooth Scrolling for Nav Links (if sections have IDs) ---
  document.querySelectorAll('.main-nav a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const hrefAttribute = this.getAttribute("href");
      // Ensure it's a valid selector and not just "#"
      if (
        hrefAttribute &&
        hrefAttribute.length > 1 &&
        document.querySelector(hrefAttribute)
      ) {
        e.preventDefault();
        document.querySelector(hrefAttribute).scrollIntoView({
          behavior: "smooth",
        });
        // Close mobile nav after clicking a link
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

  console.log("SetuConnect Home JS Initialized!");
}); // End DOMContentLoaded
