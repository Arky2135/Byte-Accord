-- --- Categories Table ---
CREATE TABLE Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon_class VARCHAR(50) COMMENT 'e.g., Font Awesome class like fas fa-mobile-alt',
    slug VARCHAR(110) NOT NULL UNIQUE COMMENT 'URL-friendly name, e.g., smartphones',
    image_url VARCHAR(255) COMMENT 'Optional image for category page header',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- --- Vendors Table ---
CREATE TABLE Vendors (
    vendor_id INT AUTO_INCREMENT PRIMARY KEY,
    vendor_name VARCHAR(150) NOT NULL,
    slug VARCHAR(160) NOT NULL UNIQUE COMMENT 'URL-friendly name',
    logo_image_url VARCHAR(255),
    description TEXT,
    address TEXT,
    city VARCHAR(100) DEFAULT 'Bhiwandi',
    state VARCHAR(100) DEFAULT 'Maharashtra',
    pincode VARCHAR(10),
    contact_person VARCHAR(100),
    contact_number VARCHAR(20),
    contact_email VARCHAR(100) UNIQUE,
    website_url VARCHAR(255),
    rating DECIMAL(3, 2) DEFAULT 0.0 COMMENT 'Average rating 0.0 to 5.0',
    review_count INT DEFAULT 0,
    specialty VARCHAR(255) COMMENT 'Primary specialty, e.g., Mobile Repairs',
    years_in_business INT,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    user_id INT COMMENT 'FK to Users table if vendor manages own profile', -- Optional FK
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    -- FOREIGN KEY (user_id) REFERENCES Users(user_id) -- Uncomment if using user_id FK
);

-- --- Products Table ---
CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_sku VARCHAR(100) UNIQUE COMMENT 'Stock Keeping Unit',
    product_name VARCHAR(200) NOT NULL,
    slug VARCHAR(220) NOT NULL UNIQUE COMMENT 'URL-friendly name',
    description TEXT,
    category_id INT NOT NULL,
    vendor_id INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    sale_price DECIMAL(10, 2) COMMENT 'Optional discounted price',
    stock_quantity INT DEFAULT 0,
    image_url_main VARCHAR(255) COMMENT 'Primary product image',
    image_urls_other JSON COMMENT 'JSON array of other image URLs', -- Requires MySQL 5.7.8+ or similar
    specifications JSON COMMENT 'JSON object for key-value specs',
    tags VARCHAR(255) COMMENT 'Comma-separated tags for search',
    rating DECIMAL(3, 2) DEFAULT 0.0,
    rating_count INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (category_id) REFERENCES Categories(category_id) ON DELETE RESTRICT, -- Don't delete category if products exist
    FOREIGN KEY (vendor_id) REFERENCES Vendors(vendor_id) ON DELETE CASCADE -- If vendor deleted, delete their products (or SET NULL)
);

-- --- Users Table ---
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL, -- Store hashed passwords ONLY
    phone_number VARCHAR(20) UNIQUE,
    role ENUM('customer', 'vendor_admin', 'site_admin') DEFAULT 'customer',
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- --- Addresses Table (Optional, for multiple addresses per user) ---
CREATE TABLE Addresses (
    address_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    country VARCHAR(50) DEFAULT 'India',
    address_type ENUM('shipping', 'billing', 'home', 'work') DEFAULT 'shipping',
    is_default BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- --- Cart Items Table ---
-- Tracks items currently in a user's cart
CREATE TABLE CartItems (
    cart_item_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY unique_user_product (user_id, product_id), -- User can only have one entry per product
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE
);

-- --- Orders Table ---
CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(12, 2) NOT NULL,
    status ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded') DEFAULT 'Pending',
    shipping_address_id INT NOT NULL, -- FK to Addresses table
    billing_address_id INT NOT NULL, -- FK to Addresses table
    payment_method VARCHAR(50),
    payment_status ENUM('Pending', 'Paid', 'Failed') DEFAULT 'Pending',
    transaction_id VARCHAR(100), -- From payment gateway
    notes TEXT COMMENT 'Customer notes',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE RESTRICT, -- Keep orders even if user deleted? Or SET NULL?
    FOREIGN KEY (shipping_address_id) REFERENCES Addresses(address_id),
    FOREIGN KEY (billing_address_id) REFERENCES Addresses(address_id)
);

-- --- Order Items Table ---
-- Stores the details of each product within an order
CREATE TABLE OrderItems (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price_at_order DECIMAL(10, 2) NOT NULL COMMENT 'Price when the order was placed',
    vendor_id INT NOT NULL COMMENT 'Store vendor ID for easier order fulfillment tracking',

    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE RESTRICT, -- Keep product info even if product deleted later? Or SET NULL?
    FOREIGN KEY (vendor_id) REFERENCES Vendors(vendor_id) ON DELETE RESTRICT
);


-- --- Sample Data Insertion (Example) ---

-- Sample Categories
INSERT INTO Categories (category_name, description, icon_class, slug) VALUES
('Smartphones', 'Latest mobile devices and accessories.', 'fas fa-mobile-alt', 'smartphones'),
('Televisions', 'Smart TVs and entertainment systems.', 'fas fa-tv', 'televisions'),
('Accessories', 'Gadgets and peripherals for all devices.', 'fas fa-mouse', 'accessories');

-- Sample Vendor
INSERT INTO Vendors (vendor_name, slug, contact_email, is_verified, is_active) VALUES
('Tech Solutions Bhiwandi', 'tech-solutions-bhiwandi', 'info@techsolutions.local', TRUE, TRUE),
('Digital World', 'digital-world', 'sales@digitalworld.local', TRUE, TRUE);

-- Sample Products
INSERT INTO Products (product_name, slug, category_id, vendor_id, price, sale_price, stock_quantity, image_url_main) VALUES
('Wireless Bluetooth Earbuds', 'wireless-bt-earbuds-v5', 1, 1, 1499.00, NULL, 50, 'images/prod12.webp'),
('20000mAh Power Bank', 'powerbank-20k-mah-fast', 3, 2, 999.00, NULL, 120, 'images/prod13.jpg'),
('USB-C Fast Charging Cable', 'usbc-fast-charge-cable-1m', 3, 1, 399.00, 299.00, 200, 'images/product-charger.jpg');