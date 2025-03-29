
// Example 1: Basic Search Functionality (client-side, for demonstration)
const searchInput = document.querySelector('.search-input input[type="text"]');
const searchButton = document.querySelector(
  '.search-input button[type="submit"]'
);

if (searchButton) {
  searchButton.addEventListener("click", function () {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      // In a real scenario, you'd send this to a server for processing.
      // For now, let's just log it to the console.
      console.log(`Search term: ${searchTerm}`);
      alert(`You searched for: ${searchTerm}`);
      // Here you would typically perform a search request,
      // update the UI with search results, etc.
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
    // In a real scenario, you'd fetch and display products based on the category.
    // For now, let's log the category to the console.
    console.log(`Category clicked: ${category}`);
    alert(`You clicked on the category: ${category}`);
    // Here you would typically fetch and display products from this category.
  });
});

// More advanced features you could add with JavaScript:
//
// Dynamic loading of vendor or product data (fetching from a server).
// Filtering of content based on search terms or categories.
// Interactive elements like carousels or dropdown menus.
// User authentication (handling login functionality).
// Form submissions and data handling.
//
//Razorpay Integration

console.log("home.js is loaded!");
// Razorpay Integration
const buyButtons = document.querySelectorAll(".buy-button");

buyButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const price = this.getAttribute("data-price");
    const product = this.getAttribute("data-product");

    // Razorpay options
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Replace with your actual Razorpay Key ID
      amount: price * 100, // Amount in paise (e.g., 1000 paise = 10)
      currency: "INR",
      name: "SetuConnect"