// home.js

// Example 1: Basic Search Functionality (client-side, for demonstration)
const searchInput = document.querySelector('.search-input input[type="text"]');
const searchButton = document.querySelector(
  '.search-input button[type="submit"]'
);

if (searchButton) {
  searchButton.addEventListener("click", function () {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      alert(`You searched for: ${searchTerm}`); // In a real scenario, you'd send this to a server
    } else {
      alert("Please enter a search term.");
    }
  });
}

// Example 2: Simple Category Link Alert
const categoryLinks = document.querySelectorAll(".category-links a");

categoryLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the link from navigating
    const category = this.textContent;
    alert(`You clicked on the category: ${category}`); // In a real scenario, you'd filter content
  });
});

// More advanced features you could add with JavaScript:
// - Dynamic loading of vendor or product data (fetching from a server).
// - Filtering of content based on search terms or categories.
// - Interactive elements like carousels or dropdown menus.
// - User authentication (handling login functionality).
// - Form submissions and data handling.

console.log("home.js is loaded!");
