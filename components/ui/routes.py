# routes.py
from flask import render_template, request, redirect, url_for, flash, jsonify, Blueprint
from .models import db, Product, Category, Vendor, CartItem, User # Import necessary models
# Note: For a real app, you'd use Flask-Login for user management
# from flask_login import login_required, current_user

# Create a Blueprint (good practice for organizing routes)
main_bp = Blueprint('main', __name__)

# --- Main Page Routes ---

@main_bp.route('/')
def home():
    """Renders the homepage."""
    try:
        # Fetch data needed for the homepage from the database
        featured_categories = Category.query.order_by(Category.category_name).limit(6).all()
        featured_vendors = Vendor.query.filter_by(is_active=True, is_verified=True).order_by(Vendor.rating.desc()).limit(3).all()
        featured_products = Product.query.filter_by(is_active=True, is_featured=True).order_by(Product.created_at.desc()).limit(4).all()

        # Pass the data to the template
        return render_template(
            'home.html',
            categories=featured_categories,
            vendors=featured_vendors,
            products=featured_products,
            page_title="Welcome to SetuConnect" # Example title
        )
    except Exception as e:
        # Basic error logging (use proper logging in production)
        print(f"Error fetching homepage data: {e}")
        # Render a simple error message or fallback page
        flash("Sorry, there was an error loading the homepage.", "error")
        return render_template('home.html', page_title="Error") # Render basic page even on error

@main_bp.route('/category/<slug>')
def category_detail(slug):
    """Displays products within a specific category."""
    category = Category.query.filter_by(slug=slug).first_or_404()
    # Fetch products for this category (add pagination later)
    products_in_category = Product.query.filter_by(category_id=category.category_id, is_active=True).order_by(Product.product_name).all()
    return render_template('category_detail.html', # You need to create this template
                           category=category,
                           products=products_in_category,
                           page_title=f"Category: {category.category_name}")

@main_bp.route('/product/<slug>')
def product_detail(slug):
    """Displays details for a specific product."""
    product = Product.query.filter_by(slug=slug, is_active=True).first_or_404()
    # You might want to fetch related products as well
    return render_template('product_detail.html', # You need to create this template
                           product=product,
                           page_title=product.product_name)

@main_bp.route('/vendor/<slug>')
def vendor_detail(slug):
    """Displays details for a specific vendor and their products."""
    vendor = Vendor.query.filter_by(slug=slug, is_active=True).first_or_404()
    # Fetch products for this vendor (add pagination later)
    products_by_vendor = Product.query.filter_by(vendor_id=vendor.vendor_id, is_active=True).order_by(Product.created_at.desc()).all()
    return render_template('vendor_detail.html', # You need to create this template
                           vendor=vendor,
                           products=products_by_vendor,
                           page_title=f"Vendor: {vendor.vendor_name}")

# --- Cart Routes (Simplified - Requires Authentication in Real App) ---

@main_bp.route('/cart')
# @login_required # Add this decorator when Flask-Login is implemented
def view_cart():
    """Displays the user's shopping cart."""
    # --- SIMULATED: Get user ID (replace with actual logged-in user) ---
    simulated_user_id = 1 # Placeholder - NEED TO GET FROM current_user.user_id
    # ---

    cart_items_data = db.session.query(CartItem, Product)\
        .join(Product, CartItem.product_id == Product.product_id)\
        .filter(CartItem.user_id == simulated_user_id)\
        .all() # Gets tuples of (CartItem, Product)

    cart_total = sum(item.Product.price * item.CartItem.quantity for item in cart_items_data)

    return render_template('cart.html', # You need to create this template
                           cart_items=cart_items_data, # Pass list of (CartItem, Product) tuples
                           cart_total=cart_total,
                           page_title="Your Shopping Cart")

@main_bp.route('/add_to_cart/<int:product_id>', methods=['POST'])
# @login_required # Add this decorator when Flask-Login is implemented
def add_to_cart(product_id):
    """Adds a product to the user's cart."""
    # --- SIMULATED: Get user ID (replace with actual logged-in user) ---
    simulated_user_id = 1 # Placeholder - NEED TO GET FROM current_user.user_id
    # ---

    product = Product.query.get_or_404(product_id)
    if not product.is_active:
        return jsonify({'success': False, 'message': 'Product not available.'}), 400

    # Check if item already in cart for this user
    cart_item = CartItem.query.filter_by(user_id=simulated_user_id, product_id=product_id).first()

    try:
        if cart_item:
            # Increment quantity if item exists
            cart_item.quantity += 1
            print(f"Incremented quantity for Product {product_id} for User {simulated_user_id}")
        else:
            # Add new item to cart
            cart_item = CartItem(user_id=simulated_user_id, product_id=product_id, quantity=1)
            db.session.add(cart_item)
            print(f"Added new Product {product_id} for User {simulated_user_id}")

        db.session.commit()

        # Get updated cart count (for this simulated user)
        new_cart_count = CartItem.query.filter_by(user_id=simulated_user_id).count() # Or sum quantities

        # Return JSON response (frontend JS needs to handle this)
        return jsonify({
            'success': True,
            'message': f'{product.product_name} added to cart.',
            'new_cart_count': new_cart_count # Send back the new count
        }), 200

    except Exception as e:
        db.session.rollback() # Rollback in case of error
        print(f"Error adding to cart: {e}")
        return jsonify({'success': False, 'message': 'Error adding item to cart.'}), 500


# --- Other Placeholders ---

@main_bp.route('/about')
def about():
    return render_template('about.html', page_title="About Us") # Create about.html

@main_bp.route('/contact')
def contact():
    # Add logic for contact form handling later if needed
    return render_template('contact.html', page_title="Contact Us") # Create contact.html

# --- Authentication Placeholders (Requires Flask-Login, Flask-WTF etc.) ---
@main_bp.route('/login', methods=['GET', 'POST'])
def login():
     # Add form handling and login logic here
     return render_template('login.html', page_title="Login") # Create login.html

@main_bp.route('/register', methods=['GET', 'POST'])
def register():
     # Add form handling and user creation logic here
     return render_template('register.html', page_title="Register") # Create register.html

@main_bp.route('/logout')
# @login_required
def logout():
    # Add logout logic here (e.g., logout_user())
    flash("You have been logged out.", "info")
    return redirect(url_for('main.home'))