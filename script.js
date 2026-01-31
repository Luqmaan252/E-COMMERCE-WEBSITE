
        const products = [
            {
                id: 1,
                name: "Traditional Uunsi Catar",
                brand: "Traditional Somali",
                price: 45.00,
                originalPrice: 55.00,
                image: "perfume6.jpg",
                category: "Catar",
                tag: "Traditional"
            },
            {
                id: 2,
                name: "Premium Xiddig Catar",
                brand: "Xiddig Catar",
                price: 65.00,
                originalPrice: 75.00,
                image: "perfume7.jpg",
                category: "Catar",
                tag: "Best Seller"
            },
            {
                id: 3,
                name: "Chanel Chance Eau Tendre",
                brand: "Chanel",
                price: 220.00,
                originalPrice: 250.00,
                image: "perfume9.jpg",
                category: "perfume",
                tag: "Luxury"
            },
            {
                id: 4,
                name: "Dior J'adore Original",
                brand: "Dior",
                price: 195.00,
                originalPrice: 220.00,
                image: "perfumes 12.jpg",
                category: "perfume",
                tag: "Classic"
            },
            {
                id: 5,
                name: "Special Biyo Macaan Scent",
                brand: "Traditional Somali",
                price: 35.00,
                originalPrice: 40.00,
                image: "perfumes 13.jpg",
                category: "Catar",
                tag: "Traditional"
            },
            {
                id: 6,
                name: "Gees Catar Luxury",
                brand: "Gees Catar",
                price: 55.00,
                originalPrice: 65.00,
                image: "perfumes 14.jpg",
                category: "Catar",
                tag: "Popular"
            },
            {
                id: 7,
                name: "Viktor & Rolf Flower Bomb",
                brand: "Viktor & Rolf",
                price: 185.00,
                originalPrice: 210.00,
                image: "perfume10.jpg",
                category: "perfume",
                tag: "Best Seller"
            },
            {
                id: 8,
                name: "Yves Saint Laurent Black Opium",
                brand: "Yves Saint",
                price: 175.00,
                originalPrice: 200.00,
                image: "perfume1.jpg",
                category: "perfume",
                tag: "New"
            }
        ];

        // Cart Data
        let cart = [];
        let cartCount = 0;
        let subtotal = 0;
        let tax = 0;
        let shipping = 5.00;
        let total = 0;

        // DOM Elements
        const productsGrid = document.querySelector('.products-grid');
        const cartIcon = document.querySelector('.cart-icon');
        const cartCountElement = document.querySelector('.cart-count');
        const cartModal = document.querySelector('.cart-modal');
        const overlay = document.querySelector('.overlay');
        const closeCart = document.querySelector('.close-cart');
        const cartItemsContainer = document.querySelector('.cart-items');
        const subtotalPriceElement = document.querySelector('.subtotal-price');
        const taxAmountElement = document.querySelector('.tax-amount');
        const shippingAmountElement = document.querySelector('.shipping-amount');
        const totalPriceElement = document.querySelector('.total-price');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('nav ul');
        const navLinks = document.querySelectorAll('nav ul li a');
        const loginBtn = document.getElementById('login-btn');
        const loginModal = document.querySelector('.login-modal');
        const closeLogin = document.querySelector('.close-login');
        const loginTabs = document.querySelectorAll('.login-tab');
        const loginForm = document.querySelector('.login-form');
        const registerForm = document.querySelector('.register-form');
        const loginButton = document.getElementById('login-button');
        const registerButton = document.getElementById('register-button');

        // Initialize the page
        document.addEventListener('DOMContentLoaded', () => {
            renderProducts();
            updateCartCount();
            
            // Load cart from localStorage if available
            const savedCart = localStorage.getItem('ududPerfumesCart');
            if (savedCart) {
                cart = JSON.parse(savedCart);
                updateCart();
            }
            
            // Smooth scrolling for navigation links
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#home') {
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    } else {
                        const targetSection = document.querySelector(targetId);
                        if (targetSection) {
                            window.scrollTo({
                                top: targetSection.offsetTop - 70,
                                behavior: 'smooth'
                            });
                        }
                    }
                    
                    // Close mobile menu if open
                    navMenu.classList.remove('active');
                });
            });
        });

        // Render products to the page
        function renderProducts() {
            productsGrid.innerHTML = '';
            
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                
                const displayPrice = product.originalPrice ? 
                    `<div class="product-price-details">
                        <div class="price">$${product.price.toFixed(2)}</div>
                        <div class="original-price">$${product.originalPrice.toFixed(2)}</div>
                    </div>` :
                    `<div class="price">$${product.price.toFixed(2)}</div>`;
                
                productCard.innerHTML = `
                    <div class="product-img">
                        <img src="${product.image}" alt="${product.name}" onerror="this.src='https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'">
                        <div class="product-tag">${product.tag}</div>
                    </div>
                    <div class="product-info">
                        <div class="product-brand">${product.brand}</div>
                        <h3 class="product-name">${product.name}</h3>
                        <div class="product-price">
                            ${displayPrice}
                            <button class="add-to-cart" data-id="${product.id}">
                                <i class="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                `;
                
                productsGrid.appendChild(productCard);
            });
            
            // Add event listeners to "Add to Cart" buttons
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.getAttribute('data-id'));
                    addToCart(productId);
                });
            });
        }

        // Add product to cart
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            
            if (product) {
                const existingItem = cart.find(item => item.id === productId);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        ...product,
                        quantity: 1
                    });
                }
                
                // Save to localStorage
                localStorage.setItem('ududPerfumesCart', JSON.stringify(cart));
                
                updateCart();
                updateCartCount();
                
                // Show confirmation
                showNotification(`${product.name} added to cart!`);
            }
        }

        // Update cart count in header
        function updateCartCount() {
            cartCount = cart.reduce((total, item) => total + item.quantity, 0);
            cartCountElement.textContent = cartCount;
        }

        // Update cart modal
        function updateCart() {
            cartItemsContainer.innerHTML = '';
            subtotal = 0;
            
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">Your cart is empty</p>';
                subtotalPriceElement.textContent = '$0.00';
                taxAmountElement.textContent = '$0.00';
                shippingAmountElement.textContent = '$5.00';
                totalPriceElement.textContent = '$5.00';
                return;
            }
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-img">
                        <img src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'">
                    </div>
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="cart-item-fees">+ Tax & Shipping</div>
                        <div class="cart-item-actions">
                            <div class="quantity-btn decrease" data-id="${item.id}">-</div>
                            <div class="cart-item-quantity">${item.quantity}</div>
                            <div class="quantity-btn increase" data-id="${item.id}">+</div>
                            <div class="remove-item" data-id="${item.id}">
                                <i class="fas fa-trash"></i>
                            </div>
                        </div>
                    </div>
                `;
                
                cartItemsContainer.appendChild(cartItem);
            });
            
            // Calculate totals
            tax = subtotal * 0.05; // 5% tax
            total = subtotal + tax + shipping;
            
            // Update displayed totals
            subtotalPriceElement.textContent = `$${subtotal.toFixed(2)}`;
            taxAmountElement.textContent = `$${tax.toFixed(2)}`;
            shippingAmountElement.textContent = `$${shipping.toFixed(2)}`;
            totalPriceElement.textContent = `$${total.toFixed(2)}`;
            
            // Add event listeners to cart item buttons
            document.querySelectorAll('.decrease').forEach(btn => {
                btn.addEventListener('click', function() {
                    const productId = parseInt(this.getAttribute('data-id'));
                    updateCartItemQuantity(productId, -1);
                });
            });
            
            document.querySelectorAll('.increase').forEach(btn => {
                btn.addEventListener('click', function() {
                    const productId = parseInt(this.getAttribute('data-id'));
                    updateCartItemQuantity(productId, 1);
                });
            });
            
            document.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', function() {
                    const productId = parseInt(this.getAttribute('data-id'));
                    removeFromCart(productId);
                });
            });
        }

        // Update quantity of cart item
        function updateCartItemQuantity(productId, change) {
            const item = cart.find(item => item.id === productId);
            
            if (item) {
                item.quantity += change;
                
                if (item.quantity <= 0) {
                    removeFromCart(productId);
                } else {
                    localStorage.setItem('ududPerfumesCart', JSON.stringify(cart));
                    updateCart();
                    updateCartCount();
                }
            }
        }

        // Remove item from cart
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            localStorage.setItem('ududPerfumesCart', JSON.stringify(cart));
            updateCart();
            updateCartCount();
            showNotification('Item removed from cart');
        }

        // Show notification
        function showNotification(message) {
            // Create notification element
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 90px;
                right: 20px;
                background-color: var(--accent-gold);
                color: var(--primary-color);
                padding: 12px 20px;
                border-radius: 5px;
                box-shadow: var(--shadow);
                z-index: 10000;
                transition: all 0.3s ease;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-size: 13px;
            `;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        }

        // Cart modal functionality
        cartIcon.addEventListener('click', () => {
            cartModal.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeCart.addEventListener('click', () => {
            cartModal.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        overlay.addEventListener('click', () => {
            cartModal.classList.remove('active');
            overlay.classList.remove('active');
            loginModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Login/Register tabs functionality
        loginTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.getAttribute('data-tab');
                
                // Update active tab
                loginTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Show corresponding form
                if (tabName === 'login') {
                    loginForm.classList.add('active');
                    registerForm.classList.remove('active');
                } else {
                    loginForm.classList.remove('active');
                    registerForm.classList.add('active');
                }
            });
        });

        // Login modal functionality
        loginBtn.addEventListener('click', () => {
            loginModal.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Always show login form first when opening modal
            loginTabs.forEach(t => t.classList.remove('active'));
            loginTabs[0].classList.add('active');
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
        });

        closeLogin.addEventListener('click', () => {
            loginModal.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Login form submission
        loginButton.addEventListener('click', () => {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (email && password) {
                showNotification(`Logged in successfully as ${email}`);
                loginModal.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            } else {
                alert('Please enter both email and password');
            }
        });

        // Register form submission
        registerButton.addEventListener('click', () => {
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const phone = document.getElementById('reg-phone').value;
            const password = document.getElementById('reg-password').value;
            const confirmPassword = document.getElementById('reg-confirm-password').value;
            
            if (!name || !email || !phone || !password || !confirmPassword) {
                alert('Please fill in all fields');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            // Show success message but DON'T switch to login tab
            showNotification(`Registration successful! Welcome ${name}. You can now login.`);
            
            // Clear register form but stay on register page
            document.getElementById('reg-name').value = '';
            document.getElementById('reg-email').value = '';
            document.getElementById('reg-phone').value = '';
            document.getElementById('reg-password').value = '';
            document.getElementById('reg-confirm-password').value = '';
            
            // Show message that user can now login
            setTimeout(() => {
                showNotification(`You can now login with email: ${email}`);
            }, 1000);
        });

        // Social login buttons
        document.querySelectorAll('.social-btn.google').forEach(btn => {
            btn.addEventListener('click', () => {
                showNotification('Google login would open here');
            });
        });
        
        document.querySelectorAll('.social-btn.facebook').forEach(btn => {
            btn.addEventListener('click', () => {
                showNotification('Facebook login would open here');
            });
        });

        // Checkout button
        document.querySelector('.checkout-btn').addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty. Add some products first!');
                return;
            }
            
            // In a real application, this would redirect to a checkout page
            alert(`Thank you for your order from UDUD PERFUMES!\n\nTotal: $${total.toFixed(2)}\n\nYour order will be delivered within 24 hours!\n\nContact: +252 61 700 0305\nEmail: baarri252@gmail.com`);
            
            // Clear cart after checkout
            cart = [];
            localStorage.removeItem('ududPerfumesCart');
            updateCart();
            updateCartCount();
            
            cartModal.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Mobile menu toggle
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) {
                document.querySelector('header').style.padding = '10px 0';
                document.querySelector('header').style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            } else {
                document.querySelector('header').style.padding = '15px 0';
                document.querySelector('header').style.boxShadow = 'var(--shadow)';
            }

        });

