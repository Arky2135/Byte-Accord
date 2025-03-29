# models.py
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy() # Initialize SQLAlchemy here, will be linked to app later

# --- Association Table for Many-to-Many (Example: Product Tags) ---
# Example if you want products to have multiple tags
# product_tags = db.Table('product_tags',
#     db.Column('product_id', db.Integer, db.ForeignKey('products.product_id'), primary_key=True),
#     db.Column('tag_id', db.Integer, db.ForeignKey('tags.tag_id'), primary_key=True)
# )

class Category(db.Model):
    __tablename__ = 'categories'
    category_id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.Text)
    icon_class = db.Column(db.String(50))
    slug = db.Column(db.String(110), nullable=False, unique=True)
    image_url = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    # Relationship: One category has many products
    products = db.relationship('Product', backref='category', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Category {self.category_name}>'

class Vendor(db.Model):
    __tablename__ = 'vendors'
    vendor_id = db.Column(db.Integer, primary_key=True)
    vendor_name = db.Column(db.String(150), nullable=False)
    slug = db.Column(db.String(160), nullable=False, unique=True)
    logo_image_url = db.Column(db.String(255))
    description = db.Column(db.Text)
    address = db.Column(db.Text)
    city = db.Column(db.String(100), default='DefaultCity') # Changed from Bhiwandi
    state = db.Column(db.String(100), default='DefaultState')
    pincode = db.Column(db.String(10))
    contact_person = db.Column(db.String(100))
    contact_number = db.Column(db.String(20))
    contact_email = db.Column(db.String(100), unique=True)
    website_url = db.Column(db.String(255))
    rating = db.Column(db.Numeric(3, 2), default=0.0)
    review_count = db.Column(db.Integer, default=0)
    specialty = db.Column(db.String(255))
    years_in_business = db.Column(db.Integer)
    is_verified = db.Column(db.Boolean, default=False)
    is_active = db.Column(db.Boolean, default=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id')) # Optional FK
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    # Relationship: One vendor has many products
    products = db.relationship('Product', backref='vendor', lazy=True, cascade="all, delete-orphan")
    # Relationship: One vendor linked to one user (optional)
    # user = db.relationship('User', backref='vendor_profile', uselist=False)

    def __repr__(self):
        return f'<Vendor {self.vendor_name}>'

class Product(db.Model):
    __tablename__ = 'products'
    product_id = db.Column(db.Integer, primary_key=True)
    product_sku = db.Column(db.String(100), unique=True)
    product_name = db.Column(db.String(200), nullable=False)
    slug = db.Column(db.String(220), nullable=False, unique=True)
    description = db.Column(db.Text)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.category_id'), nullable=False)
    vendor_id = db.Column(db.Integer, db.ForeignKey('vendors.vendor_id'), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    sale_price = db.Column(db.Numeric(10, 2))
    stock_quantity = db.Column(db.Integer, default=0)
    image_url_main = db.Column(db.String(255))
    image_urls_other = db.Column(db.JSON) # Store as JSON array of strings
    specifications = db.Column(db.JSON) # Store as JSON object
    tags = db.Column(db.String(255)) # Comma-separated or use Many-to-Many
    rating = db.Column(db.Numeric(3, 2), default=0.0)
    rating_count = db.Column(db.Integer, default=0)
    is_featured = db.Column(db.Boolean, default=False)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    # Relationship: Many products belong to one category (defined in Category via backref)
    # Relationship: Many products belong to one vendor (defined in Vendor via backref)
    # Relationship: Product can be in many cart items
    cart_items = db.relationship('CartItem', backref='product', lazy=True, cascade="all, delete-orphan")
    # Relationship: Product can be in many order items
    order_items = db.relationship('OrderItem', backref='product', lazy=True) # Don't cascade delete here usually

    def __repr__(self):
        return f'<Product {self.product_name}>'

class User(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50))
    email = db.Column(db.String(100), nullable=False, unique=True)
    password_hash = db.Column(db.String(255), nullable=False) # Store HASHED passwords
    phone_number = db.Column(db.String(20), unique=True)
    role = db.Column(db.Enum('customer', 'vendor_admin', 'site_admin', name='user_roles'), default='customer')
    is_active = db.Column(db.Boolean, default=True)
    last_login = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    # Relationship: User has many addresses
    addresses = db.relationship('Address', backref='user', lazy=True, cascade="all, delete-orphan")
    # Relationship: User has many cart items
    cart_items = db.relationship('CartItem', backref='user', lazy=True, cascade="all, delete-orphan")
    # Relationship: User has many orders
    orders = db.relationship('Order', backref='user', lazy=True) # Usually don't cascade delete orders

    # NOTE: Add methods for password hashing/checking here using libraries like Werkzeug or Passlib
    # Example (requires `from werkzeug.security import generate_password_hash, check_password_hash`)
    # def set_password(self, password):
    #     self.password_hash = generate_password_hash(password)
    # def check_password(self, password):
    #     return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.email}>'

class Address(db.Model):
    __tablename__ = 'addresses'
    address_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    address_line1 = db.Column(db.String(255), nullable=False)
    address_line2 = db.Column(db.String(255))
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100), nullable=False)
    pincode = db.Column(db.String(10), nullable=False)
    country = db.Column(db.String(50), default='India')
    address_type = db.Column(db.Enum('shipping', 'billing', 'home', 'work', name='address_types'), default='shipping')
    is_default = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<Address {self.address_id} for User {self.user_id}>'

class CartItem(db.Model):
    __tablename__ = 'cart_items'
    cart_item_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.product_id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    added_at = db.Column(db.DateTime, default=datetime.utcnow)
    # Ensure a user can only have one entry per product in their cart
    __table_args__ = (db.UniqueConstraint('user_id', 'product_id', name='unique_user_product_cart'),)

    def __repr__(self):
        return f'<CartItem Product {self.product_id} Qty {self.quantity} for User {self.user_id}>'

class Order(db.Model):
    __tablename__ = 'orders'
    order_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    order_date = db.Column(db.DateTime, default=datetime.utcnow)
    total_amount = db.Column(db.Numeric(12, 2), nullable=False)
    status = db.Column(db.Enum('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded', name='order_status'), default='Pending')
    shipping_address_id = db.Column(db.Integer, db.ForeignKey('addresses.address_id'), nullable=False)
    billing_address_id = db.Column(db.Integer, db.ForeignKey('addresses.address_id'), nullable=False)
    payment_method = db.Column(db.String(50))
    payment_status = db.Column(db.Enum('Pending', 'Paid', 'Failed', name='payment_status'), default='Pending')
    transaction_id = db.Column(db.String(100))
    notes = db.Column(db.Text)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    # Relationship: One order has many order items
    order_items = db.relationship('OrderItem', backref='order', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Order {self.order_id} User {self.user_id} Status {self.status}>'

class OrderItem(db.Model):
    __tablename__ = 'order_items'
    order_item_id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.order_id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.product_id'), nullable=False) # Or set null on product delete?
    quantity = db.Column(db.Integer, nullable=False)
    price_at_order = db.Column(db.Numeric(10, 2), nullable=False)
    vendor_id = db.Column(db.Integer, db.ForeignKey('vendors.vendor_id'), nullable=False) # Store vendor for fulfillment

    def __repr__(self):
        return f'<OrderItem {self.order_item_id} Product {self.product_id} for Order {self.order_id}>'

# Add any other models here (e.g., Tags, Reviews)