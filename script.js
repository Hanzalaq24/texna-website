// ===== TEXNA WEBSITE - CLEAN JAVASCRIPT =====

// Domain compatibility function
function initializeDomainCompatibility() {
    const currentDomain = window.location.origin;
    
    // Update canonical URL
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
        canonicalLink.href = currentDomain + window.location.pathname;
    }
    
    // Update Open Graph URLs
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
        ogUrl.content = currentDomain + window.location.pathname;
    }
    
    // Update Open Graph images
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage && ogImage.content === '') {
        if (window.location.pathname.includes('products')) {
            ogImage.content = currentDomain + '/Products Photos/Products-1.webp';
        } else {
            ogImage.content = currentDomain + '/Texna Machine.webp';
        }
    }
    
    // Update Twitter image
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage && twitterImage.content === '') {
        twitterImage.content = currentDomain + '/Texna Machine.webp';
    }
    
    // Update structured data
    const structuredDataScript = document.querySelector('script[type="application/ld+json"]');
    if (structuredDataScript) {
        try {
            const data = JSON.parse(structuredDataScript.textContent);
            if (data.url === '') {
                data.url = currentDomain;
            }
            if (data.logo === '') {
                data.logo = currentDomain + '/SVG/Texna Logo.svg';
            }
            structuredDataScript.textContent = JSON.stringify(data, null, 4);
        } catch (e) {
            console.log('Could not update structured data:', e);
        }
    }
}

// ===== HERO BANNER SLIDER =====
let slideIndex = 0;
let slides = [];
let indicators = [];
let totalSlides = 0;
let autoSlideInterval;
let startX = 0;
let endX = 0;

function initializeSlider() {
    slides = document.querySelectorAll('.banner-slide');
    indicators = document.querySelectorAll('.indicator');
    totalSlides = slides.length;
    
    if (totalSlides > 0) {
        console.log(`🎬 Initializing slider with ${totalSlides} slides`);
        
        // Initialize first slide
        showSlide(0);
        
        // Start auto-play
        startAutoSlide();
        
        // Add touch/swipe support
        addTouchSupport();
        
        // Add indicator click support
        addIndicatorSupport();
        
    } else {
        console.warn('No banner slides found');
    }
}

function showSlide(index) {
    if (slides.length === 0) return;
    
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (indicators[index]) {
        indicators[index].classList.add('active');
    }
}

function changeSlide(direction) {
    slideIndex += direction;
    
    if (slideIndex >= totalSlides) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = totalSlides - 1;
    }
    
    showSlide(slideIndex);
}

function currentSlideIndex(index) {
    slideIndex = index - 1;
    showSlide(slideIndex);
    
    // Restart auto-play
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

function startAutoSlide() {
    if (totalSlides <= 1) return;
    
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 4000); // Change slide every 4 seconds
}

function addTouchSupport() {
    const bannerSlider = document.querySelector('.banner-slider');
    if (!bannerSlider) return;
    
    console.log('🤏 Adding touch support to slider');
    
    let startY = 0;
    let endY = 0;
    let isSwiping = false;
    
    bannerSlider.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isSwiping = true;
        // Pause auto-slide during touch
        clearInterval(autoSlideInterval);
    }, { passive: false });
    
    bannerSlider.addEventListener('touchmove', function(e) {
        if (!isSwiping) return;
        
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = Math.abs(currentX - startX);
        const diffY = Math.abs(currentY - startY);
        
        // If horizontal swipe is more significant than vertical, prevent default scrolling
        if (diffX > diffY && diffX > 10) {
            e.preventDefault();
        }
    }, { passive: false });
    
    bannerSlider.addEventListener('touchend', function(e) {
        if (!isSwiping) return;
        
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        handleSwipe();
        isSwiping = false;
        // Resume auto-slide after touch
        setTimeout(() => startAutoSlide(), 500);
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 30; // Reduced threshold for better sensitivity
        const diff = startX - endX;
        const verticalDiff = Math.abs(startY - endY);
        
        // Only trigger horizontal swipe if it's more significant than vertical movement
        if (Math.abs(diff) > swipeThreshold && Math.abs(diff) > verticalDiff) {
            if (diff > 0) {
                // Swipe left - next slide
                changeSlide(1);
                console.log('👈 Swiped left - next slide');
            } else {
                // Swipe right - previous slide
                changeSlide(-1);
                console.log('👉 Swiped right - previous slide');
            }
        }
    }
}

function addIndicatorSupport() {
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlideIndex(index + 1);
        });
    });
}

// ===== HAMBURGER MENU =====
function initializeMenu() {
    console.log('🍔 Initializing hamburger menu');
    
    // Create hamburger menu HTML if it doesn't exist
    if (!document.getElementById('menuOverlay')) {
        const menuHTML = `
            <div id="menuOverlay" class="menu-overlay">
                <div id="hamburgerMenu" class="hamburger-menu">
                    <div class="menu-header">
                        <img src="SVG/Texna Logo.svg" alt="Texna" class="menu-logo">
                        <button class="close-menu-btn">&times;</button>
                    </div>
                    <nav class="menu-nav">
                        <a href="index.html" class="menu-item" id="menuHome">
                            <img src="SVG/Home Button.svg" alt="Home" class="menu-icon">
                            <span>Home</span>
                        </a>
                        <a href="search.html" class="menu-item" id="menuSearch">
                            <img src="SVG/Search Button.svg" alt="Search" class="menu-icon">
                            <span>Search</span>
                        </a>
                        <a href="services.html" class="menu-item" id="menuServices">
                            <img src="SVG/Services Button.svg" alt="Services" class="menu-icon">
                            <span>Services</span>
                        </a>
                        <a href="products.html" class="menu-item" id="menuProducts">
                            <img src="SVG/Products Button.svg" alt="Products" class="menu-icon">
                            <span>Products</span>
                        </a>
                        <a href="about.html" class="menu-item" id="menuAbout">
                            <span>About</span>
                        </a>
                        <a href="https://wa.me/919978617177" target="_blank" class="menu-item whatsapp-menu">
                            <img src="SVG/Whatsapp Button.svg" alt="WhatsApp" class="menu-icon">
                            <span>Contact</span>
                        </a>
                    </nav>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', menuHTML);
    }
    
    // Get menu elements with better error handling
    const menuBtn = document.querySelector('.menu-btn');
    const menuOverlay = document.getElementById('menuOverlay');
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    if (!menuBtn) {
        console.error('❌ Menu button not found');
        // Try to find alternative menu button selectors
        const altMenuBtn = document.querySelector('[class*="menu"]');
        if (altMenuBtn) {
            console.log('🔍 Found alternative menu button');
            altMenuBtn.addEventListener('click', toggleMenu);
        }
        return;
    }
    
    console.log('✅ Menu button found:', menuBtn);
    
    // Set active menu item based on current page
    setActiveMenuItem();
    
    // Menu toggle functionality
    function toggleMenu() {
        console.log('🍔 Toggling menu');
        menuBtn.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
        document.body.style.overflow = hamburgerMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    function closeMenu() {
        console.log('🍔 Closing menu');
        menuBtn.classList.remove('active');
        menuOverlay.classList.remove('active');
        hamburgerMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Event listeners with enhanced error handling
    try {
        menuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🍔 Menu button clicked');
            toggleMenu();
        });
        
        // Also add touch event for mobile
        menuBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            console.log('🍔 Menu button touched');
            toggleMenu();
        }, { passive: false });
        
        console.log('✅ Menu button event listeners added');
    } catch (error) {
        console.error('❌ Error adding menu button listeners:', error);
    }
    
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMenu);
        console.log('✅ Close menu button listener added');
    }
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function(e) {
            if (e.target === menuOverlay) {
                closeMenu();
            }
        });
        console.log('✅ Menu overlay listener added');
    }
    
    // Close menu when clicking menu items
    menuItems.forEach(item => {
        item.addEventListener('click', closeMenu);
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
    
    console.log('✅ Hamburger menu fully initialized');
}

function setActiveMenuItem() {
    const currentPage = window.location.pathname;
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.classList.remove('active');
        
        if (currentPage.includes('index.html') || currentPage === '/' || currentPage === '') {
            if (item.id === 'menuHome') item.classList.add('active');
        } else if (currentPage.includes('about.html')) {
            if (item.id === 'menuAbout') item.classList.add('active');
        } else if (currentPage.includes('services.html')) {
            if (item.id === 'menuServices') item.classList.add('active');
        } else if (currentPage.includes('products.html') || currentPage.includes('product-detail.html')) {
            if (item.id === 'menuProducts') item.classList.add('active');
        } else if (currentPage.includes('search.html')) {
            if (item.id === 'menuSearch') item.classList.add('active');
        }
    });
}

// ===== ENHANCED CROSS-BROWSER NAVIGATION =====
function setActiveNavigation() {
    const currentPage = window.location.pathname;
    
    // Set body data attribute for page identification
    if (currentPage.includes('products.html')) {
        document.body.setAttribute('data-page', 'products');
    } else if (currentPage.includes('product-detail.html')) {
        document.body.setAttribute('data-page', 'product-detail');
    } else if (currentPage.includes('index.html') || currentPage === '/' || currentPage === '') {
        document.body.setAttribute('data-page', 'home');
    } else if (currentPage.includes('search.html')) {
        document.body.setAttribute('data-page', 'search');
    } else if (currentPage.includes('services.html')) {
        document.body.setAttribute('data-page', 'services');
    } else if (currentPage.includes('about.html')) {
        document.body.setAttribute('data-page', 'about');
    }
    
    // Handle desktop navigation
    const desktopNavItems = document.querySelectorAll('.desktop-nav-item');
    desktopNavItems.forEach(item => {
        item.classList.remove('active');
        const link = item.querySelector('a');
        if (link) {
            const href = link.getAttribute('href');
            if (shouldBeActive(currentPage, href)) {
                item.classList.add('active');
            }
        }
    });
    
    // Handle mobile bottom navigation with enhanced cross-browser support
    const bottomNavItems = document.querySelectorAll('.bottom-nav .nav-item');
    bottomNavItems.forEach(item => {
        item.classList.remove('active');
        const link = item.querySelector('a');
        if (link) {
            const href = link.getAttribute('href');
            if (shouldBeActive(currentPage, href)) {
                item.classList.add('active');
                // Force repaint for cross-browser consistency
                item.style.transform = 'scale(1.02) translateZ(0)';
                item.style.backgroundColor = '#343770';
                item.style.color = '#FFFFFF';
            } else {
                // Reset inactive items
                item.style.transform = 'translateZ(0)';
                item.style.backgroundColor = 'transparent';
                item.style.color = 'rgba(52, 55, 112, 0.7)';
            }
        }
    });
}

// Enhanced navigation initialization for cross-browser compatibility
function initializeNavigationSystem() {
    console.log('🧭 Initializing cross-browser navigation system');
    
    // Ensure bottom navigation is properly positioned
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) {
        // Force consistent positioning across all browsers
        bottomNav.style.position = 'fixed';
        bottomNav.style.bottom = '0';
        bottomNav.style.left = '0';
        bottomNav.style.right = '0';
        bottomNav.style.width = '100%';
        bottomNav.style.zIndex = '1000';
        bottomNav.style.display = 'flex';
        bottomNav.style.flexDirection = 'row';
        bottomNav.style.justifyContent = 'space-around';
        bottomNav.style.alignItems = 'center';
        bottomNav.style.background = '#FFFFFF';
        bottomNav.style.boxShadow = '0 -2px 10px rgba(52, 55, 112, 0.1)';
        bottomNav.style.borderTop = '1px solid rgba(52, 55, 112, 0.1)';
        
        // Add touch event listeners for better mobile interaction
        bottomNav.addEventListener('touchstart', function(e) {
            e.preventDefault();
        }, { passive: false });
        
        console.log('✅ Bottom navigation positioned and styled');
    }
    
    // Enhance navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item, index) => {
        // Force consistent styling
        item.style.display = 'flex';
        item.style.flexDirection = 'column';
        item.style.alignItems = 'center';
        item.style.justifyContent = 'center';
        item.style.flex = '1';
        item.style.height = '64px';
        item.style.maxWidth = '80px';
        item.style.minWidth = '60px';
        item.style.padding = '8px 4px';
        item.style.borderRadius = '16px';
        item.style.margin = '0 2px';
        item.style.cursor = 'pointer';
        item.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        item.style.boxSizing = 'border-box';
        
        // Hide text labels for icon-only design
        const textElement = item.querySelector('.nav-text');
        if (textElement) {
            textElement.style.display = 'none';
            textElement.style.visibility = 'hidden';
            textElement.style.opacity = '0';
            textElement.style.height = '0';
            textElement.style.fontSize = '0';
            textElement.style.lineHeight = '0';
        }
        
        // Enhance icons
        const iconElement = item.querySelector('.nav-icon');
        if (iconElement) {
            iconElement.style.width = '40px';
            iconElement.style.height = '40px';
            iconElement.style.maxWidth = '40px';
            iconElement.style.maxHeight = '40px';
            iconElement.style.objectFit = 'contain';
            iconElement.style.display = 'block';
            iconElement.style.margin = '0 auto';
            iconElement.style.flexShrink = '0';
        }
        
        // Add enhanced touch support
        item.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.98) translateZ(0)';
        }, { passive: true });
        
        item.addEventListener('touchend', function(e) {
            if (this.classList.contains('active')) {
                this.style.transform = 'scale(1.02) translateZ(0)';
            } else {
                this.style.transform = 'translateZ(0)';
            }
        }, { passive: true });
        
        console.log(`✅ Enhanced navigation item ${index + 1}`);
    });
    
    // Set active navigation
    setActiveNavigation();
    
    console.log('✅ Cross-browser navigation system initialized');
}

function shouldBeActive(currentPage, href) {
    // Handle external links (WhatsApp)
    if (href && href.startsWith('https://')) {
        return false;
    }
    
    // Handle home page
    if ((currentPage.includes('index.html') || currentPage === '/' || currentPage === '') && 
        (href === 'index.html' || href === '/')) {
        return true;
    }
    
    // Handle other pages
    if (href && currentPage.includes(href)) {
        return true;
    }
    
    // Handle product detail pages - should activate products nav
    if (currentPage.includes('product-detail.html') && href === 'products.html') {
        return true;
    }
    
    return false;
}

// ===== BACK BUTTON =====
function initializeBackButton() {
    const backBtns = document.querySelectorAll('.back-btn');
    const currentPage = window.location.pathname;
    
    backBtns.forEach(btn => {
        // Hide back button on home page
        if (currentPage.includes('index.html') || currentPage === '/' || currentPage === '') {
            btn.style.display = 'none';
            return;
        }
        
        // Check if there's history to go back to
        if (window.history.length <= 1) {
            btn.disabled = true;
        }
        
        btn.addEventListener('click', () => {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                // If no history, go to home page
                window.location.href = 'index.html';
            }
        });
    });
}

// ===== SEARCH FUNCTIONALITY =====
function initializeSearch() {
    if (!window.location.pathname.includes('search.html')) return;
    
    const searchInput = document.getElementById('searchInput');
    const productResults = document.getElementById('productResults');
    const serviceResults = document.getElementById('serviceResults');
    const noResults = document.getElementById('noResults');
    
    if (!searchInput) return;
    
    // Products data
    const products = [
        { name: 'Guide Board', description: 'High-quality guide board for precise yarn guidance', link: 'product-detail.html?product=guide-board' },
        { name: 'Harness Cord', description: 'Durable harness cord for reliable performance', link: 'product-detail.html?product=harness-cord' },
        { name: 'Comber Board', description: 'Premium comber board for efficient yarn combing', link: 'product-detail.html?product=comber-board' },
        { name: 'Wire Healds (RAJ)', description: 'High-quality wire healds with durable spring mechanism', link: 'product-detail.html?product=wire-healds-raj' },
        { name: 'SS Wire Healds (RAJ)', description: 'Stainless steel wire healds for enhanced durability', link: 'product-detail.html?product=ss-wire-healds-raj' }
    ];
    
    // Services data
    const services = [
        { name: 'Installation Service', description: 'Professional Jacquard Harness installation', link: 'services.html' },
        { name: 'Repair & Maintenance', description: 'Expert repair and maintenance services', link: 'services.html' },
        { name: 'Custom Solutions', description: 'Tailored solutions for your specific needs', link: 'services.html' }
    ];
    
    // Initialize with all items
    displayResults(products, services);
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query === '') {
            displayResults(products, services);
            return;
        }
        
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(query) || 
            product.description.toLowerCase().includes(query)
        );
        
        const filteredServices = services.filter(service => 
            service.name.toLowerCase().includes(query) || 
            service.description.toLowerCase().includes(query)
        );
        
        displayResults(filteredProducts, filteredServices);
    });
    
    function displayResults(productsToShow, servicesToShow) {
        // Clear previous results
        if (productResults) productResults.innerHTML = '';
        if (serviceResults) serviceResults.innerHTML = '';
        
        // Show/hide no results message
        const hasResults = productsToShow.length > 0 || servicesToShow.length > 0;
        if (noResults) {
            noResults.style.display = hasResults ? 'none' : 'block';
        }
        
        // Display products
        if (productResults && productsToShow.length > 0) {
            productsToShow.forEach(product => {
                const productElement = document.createElement('a');
                productElement.href = product.link;
                productElement.className = 'search-result-item';
                productElement.innerHTML = `
                    <h4>${product.name}</h4>
                    <p>${product.description}</p>
                `;
                productResults.appendChild(productElement);
            });
        }
        
        // Display services
        if (serviceResults && servicesToShow.length > 0) {
            servicesToShow.forEach(service => {
                const serviceElement = document.createElement('a');
                serviceElement.href = service.link;
                serviceElement.className = 'search-result-item';
                serviceElement.innerHTML = `
                    <h4>${service.name}</h4>
                    <p>${service.description}</p>
                `;
                serviceResults.appendChild(serviceElement);
            });
        }
    }
}

// ===== PRODUCT DETAIL =====
function initializeProductDetail() {
    if (!window.location.pathname.includes('product-detail.html')) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');
    
    if (productId) {
        loadProductDetails(productId);
    }
}

function loadProductDetails(productId) {
    const products = {
        'guide-board': {
            name: 'Guide Board',
            image: 'Products Photos/Products-1.webp',
            description: 'High-quality guide board designed for precise yarn guidance and smooth loom operation. Manufactured with premium materials to ensure durability and consistent performance in textile machinery.'
        },
        'harness-cord': {
            name: 'Harness Cord',
            image: 'Products Photos/Products-2 copy.webp',
            description: 'Durable harness cord designed for reliable performance in textile machinery. Built to withstand continuous operation while maintaining optimal tension and flexibility.'
        }
        // Add more products as needed
    };
    
    const product = products[productId];
    if (product) {
        // Update page elements
        const titleElement = document.getElementById('product-title');
        const imageElement = document.getElementById('main-product-image');
        const descriptionElement = document.getElementById('product-description');
        
        if (titleElement) titleElement.textContent = product.name;
        if (imageElement) imageElement.src = product.image;
        if (descriptionElement) descriptionElement.textContent = product.description;
        
        // Update page title
        document.title = `${product.name} - Texna Products`;
    }
}

// ===== MAP IMAGE ERROR HANDLING =====
function initializeMapImage() {
    const mapImage = document.querySelector('.map-image');
    if (mapImage) {
        mapImage.addEventListener('error', function() {
            console.error('✗ Map image failed to load:', this.src);
            
            // Show fallback content
            this.style.display = 'none';
            
            const fallback = document.createElement('div');
            fallback.style.cssText = `
                background: linear-gradient(135deg, #343770 0%, #6062A9 100%);
                color: white;
                padding: 40px;
                text-align: center;
                font-size: 1.2rem;
                min-height: 200px;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            fallback.textContent = '📍 Texna Location - Map Loading...';
            this.parentNode.appendChild(fallback);
        });
    }
}

// ===== MAIN INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing Texna website...');
    
    try {
        // Initialize all components
        initializeDomainCompatibility();
        initializeSlider();
        initializeMenu();
        initializeBackButton();
        initializeNavigationSystem(); // Enhanced navigation system
        initializeSearch();
        initializeProductDetail();
        initializeMapImage();
        
        console.log('✅ Texna website initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing website:', error);
    }
});

// ===== GLOBAL FUNCTIONS FOR INLINE CALLS =====
window.currentSlideIndex = currentSlideIndex;
window.changeSlide = changeSlide;

console.log('📜 Texna JavaScript loaded successfully');

// ===== COMPREHENSIVE CROSS-BROWSER LAYOUT DETECTION =====
function detectCSSLoading() {
    // Check if critical CSS is loaded
    const testElement = document.createElement('div');
    testElement.className = 'bottom-nav';
    testElement.style.position = 'absolute';
    testElement.style.visibility = 'hidden';
    document.body.appendChild(testElement);
    
    const computedStyle = window.getComputedStyle(testElement);
    const isStyled = computedStyle.position === 'fixed';
    
    document.body.removeChild(testElement);
    
    if (!isStyled) {
        console.warn('⚠️ CSS not fully loaded, applying fallback styles');
        applyFallbackStyles();
    } else {
        console.log('✅ CSS loaded successfully');
        document.body.classList.add('css-loaded');
        // Apply additional cross-browser fixes
        applyCrossBrowserFixes();
    }
}

// Enhanced cross-browser compatibility fixes
function applyCrossBrowserFixes() {
    console.log('🔧 Applying cross-browser compatibility fixes');
    
    // Detect browser and apply specific fixes
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    const isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
    const isFirefox = /Firefox/.test(navigator.userAgent);
    const isEdge = /Edge/.test(navigator.userAgent);
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    
    console.log(`🌐 Browser detected: ${isChrome ? 'Chrome' : isSafari ? 'Safari' : isFirefox ? 'Firefox' : isEdge ? 'Edge' : 'Other'}`);
    console.log(`📱 Mobile device: ${isMobile ? 'Yes' : 'No'}`);
    
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav && isMobile) {
        // Apply browser-specific fixes
        if (isSafari) {
            // Safari-specific fixes
            bottomNav.style.paddingBottom = 'calc(8px + env(safe-area-inset-bottom))';
            bottomNav.style.paddingLeft = 'calc(12px + env(safe-area-inset-left))';
            bottomNav.style.paddingRight = 'calc(12px + env(safe-area-inset-right))';
            console.log('🍎 Applied Safari mobile fixes');
        }
        
        if (isChrome) {
            // Chrome-specific fixes
            bottomNav.style.webkitTransform = 'translateZ(0)';
            bottomNav.style.webkitBackfaceVisibility = 'hidden';
            console.log('🟢 Applied Chrome mobile fixes');
        }
        
        if (isFirefox) {
            // Firefox-specific fixes
            bottomNav.style.position = '-moz-sticky';
            bottomNav.style.position = 'sticky';
            console.log('🦊 Applied Firefox mobile fixes');
        }
        
        if (isEdge) {
            // Edge-specific fixes
            bottomNav.style.msTouchAction = 'manipulation';
            console.log('🔷 Applied Edge mobile fixes');
        }
        
        // Force consistent layout regardless of browser
        forceConsistentLayout();
    }
}

// Force consistent layout across all browsers
function forceConsistentLayout() {
    console.log('🎯 Forcing consistent layout across all browsers');
    
    const bottomNav = document.querySelector('.bottom-nav');
    const navItems = document.querySelectorAll('.nav-item');
    const navIcons = document.querySelectorAll('.nav-icon');
    const navTexts = document.querySelectorAll('.nav-text');
    
    if (bottomNav) {
        // Force bottom navigation properties
        const navStyles = {
            position: 'fixed',
            bottom: '0',
            left: '0',
            right: '0',
            width: '100%',
            zIndex: '1000',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            background: '#FFFFFF',
            boxShadow: '0 -2px 10px rgba(52, 55, 112, 0.1)',
            borderTop: '1px solid rgba(52, 55, 112, 0.1)',
            minHeight: '80px',
            padding: '8px 12px',
            boxSizing: 'border-box',
            margin: '0'
        };
        
        Object.assign(bottomNav.style, navStyles);
    }
    
    // Force navigation item properties
    navItems.forEach(item => {
        const itemStyles = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: '1',
            height: '64px',
            maxWidth: '80px',
            minWidth: '60px',
            padding: '8px 4px',
            borderRadius: '16px',
            margin: '0 2px',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxSizing: 'border-box',
            position: 'relative',
            minHeight: '44px',
            color: 'rgba(52, 55, 112, 0.7)'
        };
        
        Object.assign(item.style, itemStyles);
        
        // Check if item is active and apply active styles
        if (item.classList.contains('active')) {
            item.style.backgroundColor = '#343770';
            item.style.color = '#FFFFFF';
            item.style.transform = 'scale(1.02) translateZ(0)';
            item.style.boxShadow = '0 2px 8px rgba(52, 55, 112, 0.3)';
        }
    });
    
    // Force icon properties
    navIcons.forEach(icon => {
        const iconStyles = {
            width: '40px',
            height: '40px',
            maxWidth: '40px',
            maxHeight: '40px',
            objectFit: 'contain',
            display: 'block',
            margin: '0 auto',
            flexShrink: '0',
            boxSizing: 'border-box'
        };
        
        Object.assign(icon.style, iconStyles);
    });
    
    // Hide all text labels
    navTexts.forEach(text => {
        const textStyles = {
            display: 'none',
            visibility: 'hidden',
            opacity: '0',
            height: '0',
            margin: '0',
            padding: '0',
            fontSize: '0',
            lineHeight: '0',
            position: 'absolute',
            left: '-9999px'
        };
        
        Object.assign(text.style, textStyles);
    });
    
    // Ensure main content has proper padding
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.paddingBottom = '90px';
        mainContent.style.boxSizing = 'border-box';
    }
    
    // Ensure body has proper padding
    document.body.style.paddingBottom = '90px';
    document.body.style.boxSizing = 'border-box';
    
    console.log('✅ Consistent layout applied across all browsers');
}

function applyFallbackStyles() {
    // Add fallback CSS if main CSS fails to load
    const fallbackCSS = `
        <style id="fallback-css">
            body { font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 0; }
            .top-nav { background: white; padding: 15px; border-bottom: 1px solid #ddd; }
            .bottom-nav { background: white; position: fixed; bottom: 0; width: 100%; padding: 10px; border-top: 1px solid #ddd; display: flex; justify-content: space-around; z-index: 1000; }
            .nav-item { display: flex; flex-direction: column; align-items: center; padding: 5px; }
            .nav-icon { width: 40px; height: 40px; }
            .main-content { padding: 20px; padding-bottom: 80px; }
            .hero-banner { background: #343770; color: white; padding: 40px 20px; text-align: center; margin: 15px 0 20px 0; }
            .products-grid { display: grid; grid-template-columns: 1fr; gap: 20px; padding: 20px; }
            .product-card { background: #343770; color: white; padding: 20px; border-radius: 8px; }
            .team-profiles-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; padding: 20px; }
            .footer { background: #343770; color: white; padding: 40px 20px; }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', fallbackCSS);
    document.body.classList.add('no-css-fallback');
}

// Enhanced initialization with CSS detection
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing Texna website with cross-browser support...');
    
    try {
        // Detect CSS loading
        setTimeout(detectCSSLoading, 100);
        
        // Initialize all components
        initializeDomainCompatibility();
        initializeSlider();
        initializeMenu();
        initializeBackButton();
        initializeNavigationSystem(); // Enhanced navigation system
        initializeSearch();
        initializeProductDetail();
        initializeMapImage();
        
        // Apply responsive layout verification
        setTimeout(verifyResponsiveLayout, 200);
        
        console.log('✅ Texna website initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing website:', error);
        // Apply fallback styles if there's an error
        applyFallbackStyles();
    }
});

// Responsive layout verification system
function verifyResponsiveLayout() {
    console.log('📐 Verifying responsive layout across all screen sizes');
    
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const devicePixelRatio = window.devicePixelRatio || 1;
    
    console.log(`📱 Screen: ${screenWidth}x${screenHeight}, DPR: ${devicePixelRatio}`);
    
    // Apply screen-size specific optimizations
    if (screenWidth <= 280) {
        // Ultra small screens (Galaxy Fold closed)
        applyUltraSmallScreenFixes();
    } else if (screenWidth <= 360) {
        // Small screens
        applySmallScreenFixes();
    } else if (screenWidth <= 430) {
        // Medium screens
        applyMediumScreenFixes();
    } else if (screenWidth <= 768) {
        // Large mobile/small tablet
        applyLargeMobileFixes();
    } else if (screenWidth >= 1024) {
        // Desktop - hide mobile navigation
        hideBottomNavigation();
    }
    
    // Verify navigation is properly positioned
    verifyNavigationPosition();
    
    console.log('✅ Responsive layout verification complete');
}

function applyUltraSmallScreenFixes() {
    console.log('📱 Applying ultra small screen fixes (≤280px)');
    const bottomNav = document.querySelector('.bottom-nav');
    const navItems = document.querySelectorAll('.nav-item');
    const navIcons = document.querySelectorAll('.nav-icon');
    
    if (bottomNav) {
        bottomNav.style.minHeight = '65px';
        bottomNav.style.padding = '5px 4px';
    }
    
    navItems.forEach(item => {
        item.style.height = '50px';
        item.style.maxWidth = '50px';
        item.style.minWidth = '45px';
        item.style.padding = '4px 2px';
        item.style.borderRadius = '12px';
        item.style.margin = '0 1px';
    });
    
    navIcons.forEach(icon => {
        icon.style.width = '24px';
        icon.style.height = '24px';
        icon.style.maxWidth = '24px';
        icon.style.maxHeight = '24px';
    });
}

function applySmallScreenFixes() {
    console.log('📱 Applying small screen fixes (281px-360px)');
    const bottomNav = document.querySelector('.bottom-nav');
    const navItems = document.querySelectorAll('.nav-item');
    const navIcons = document.querySelectorAll('.nav-icon');
    
    if (bottomNav) {
        bottomNav.style.minHeight = '70px';
        bottomNav.style.padding = '6px 8px';
    }
    
    navItems.forEach(item => {
        item.style.height = '56px';
        item.style.maxWidth = '64px';
        item.style.minWidth = '55px';
        item.style.padding = '6px 2px';
        item.style.borderRadius = '14px';
        item.style.margin = '0 1px';
    });
    
    navIcons.forEach(icon => {
        icon.style.width = '28px';
        icon.style.height = '28px';
        icon.style.maxWidth = '28px';
        icon.style.maxHeight = '28px';
    });
}

function applyMediumScreenFixes() {
    console.log('📱 Applying medium screen fixes (361px-430px)');
    const bottomNav = document.querySelector('.bottom-nav');
    const navItems = document.querySelectorAll('.nav-item');
    const navIcons = document.querySelectorAll('.nav-icon');
    
    if (bottomNav) {
        bottomNav.style.minHeight = '80px';
        bottomNav.style.padding = '8px 12px';
    }
    
    navItems.forEach(item => {
        item.style.height = '64px';
        item.style.maxWidth = '76px';
        item.style.minWidth = '68px';
        item.style.padding = '8px 4px';
        item.style.borderRadius = '16px';
        item.style.margin = '0 2px';
    });
    
    navIcons.forEach(icon => {
        icon.style.width = '40px';
        icon.style.height = '40px';
        icon.style.maxWidth = '40px';
        icon.style.maxHeight = '40px';
    });
}

function applyLargeMobileFixes() {
    console.log('📱 Applying large mobile fixes (431px-768px)');
    const bottomNav = document.querySelector('.bottom-nav');
    const navItems = document.querySelectorAll('.nav-item');
    const navIcons = document.querySelectorAll('.nav-icon');
    
    if (bottomNav) {
        bottomNav.style.minHeight = '90px';
        bottomNav.style.padding = '12px 20px';
    }
    
    navItems.forEach(item => {
        item.style.height = '72px';
        item.style.maxWidth = '90px';
        item.style.minWidth = '80px';
        item.style.padding = '12px 6px';
        item.style.borderRadius = '20px';
        item.style.margin = '0 3px';
    });
    
    navIcons.forEach(icon => {
        icon.style.width = '44px';
        icon.style.height = '44px';
        icon.style.maxWidth = '44px';
        icon.style.maxHeight = '44px';
    });
}

function hideBottomNavigation() {
    console.log('💻 Hiding bottom navigation for desktop');
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) {
        bottomNav.style.display = 'none';
        bottomNav.style.visibility = 'hidden';
        bottomNav.style.opacity = '0';
        bottomNav.style.height = '0';
    }
    
    // Remove body padding for desktop
    document.body.style.paddingBottom = '0';
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.paddingBottom = '0';
    }
}

function verifyNavigationPosition() {
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav && window.innerWidth < 1024) {
        const rect = bottomNav.getBoundingClientRect();
        const isAtBottom = Math.abs(rect.bottom - window.innerHeight) < 5;
        
        if (!isAtBottom) {
            console.warn('⚠️ Navigation not at bottom, forcing position');
            bottomNav.style.position = 'fixed';
            bottomNav.style.bottom = '0';
            bottomNav.style.left = '0';
            bottomNav.style.right = '0';
        }
        
        console.log(`📍 Navigation position verified: ${isAtBottom ? 'Correct' : 'Fixed'}`);
    }
}

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`⚡ Page loaded in ${Math.round(loadTime)}ms`);
    
    // Check if images are loading properly
    const images = document.querySelectorAll('img');
    let loadedImages = 0;
    let totalImages = images.length;
    
    images.forEach(img => {
        if (img.complete) {
            loadedImages++;
        } else {
            img.addEventListener('load', () => {
                loadedImages++;
                if (loadedImages === totalImages) {
                    console.log('✅ All images loaded successfully');
                }
            });
            
            img.addEventListener('error', () => {
                console.warn(`⚠️ Failed to load image: ${img.src}`);
            });
        }
    });
    
    if (loadedImages === totalImages) {
        console.log('✅ All images loaded successfully');
    }
});

// ===== DYNAMIC RESPONSIVE HANDLING =====

// Handle window resize for dynamic responsiveness
window.addEventListener('resize', function() {
    console.log('📐 Window resized, re-verifying layout');
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(function() {
        verifyResponsiveLayout();
        forceConsistentLayout();
    }, 250);
});

// Handle orientation change
window.addEventListener('orientationchange', function() {
    console.log('🔄 Orientation changed, adjusting layout');
    setTimeout(function() {
        verifyResponsiveLayout();
        forceConsistentLayout();
    }, 500); // Delay to allow orientation change to complete
});

// Handle visibility change (for incognito mode compatibility)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        console.log('👁️ Page became visible, verifying layout');
        setTimeout(function() {
            forceConsistentLayout();
        }, 100);
    }
});

// Performance monitoring for mobile devices
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`⚡ Page loaded in ${Math.round(loadTime)}ms`);
    
    // Final layout verification after all resources are loaded
    setTimeout(function() {
        console.log('🔍 Final layout verification after page load');
        verifyResponsiveLayout();
        forceConsistentLayout();
        
        // Check if images are loading properly
        const images = document.querySelectorAll('img');
        let loadedImages = 0;
        let totalImages = images.length;
        
        images.forEach(img => {
            if (img.complete) {
                loadedImages++;
            } else {
                img.addEventListener('load', () => {
                    loadedImages++;
                    if (loadedImages === totalImages) {
                        console.log('✅ All images loaded successfully');
                    }
                });
                
                img.addEventListener('error', () => {
                    console.warn(`⚠️ Failed to load image: ${img.src}`);
                });
            }
        });
        
        if (loadedImages === totalImages) {
            console.log('✅ All images loaded successfully');
        }
        
        // Mark layout as fully initialized
        document.body.classList.add('layout-initialized');
        console.log('🎉 Cross-browser mobile layout system fully initialized');
    }, 1000);
});

console.log('📜 Enhanced Texna JavaScript with cross-browser mobile support loaded successfully');

// ===== HAMBURGER MENU BUTTON FIX =====
function ensureMenuButtonWorks() {
    console.log('🔧 Ensuring hamburger menu button functionality');
    
    // Find all possible menu button selectors
    const menuSelectors = [
        '.menu-btn',
        '.hamburger-btn',
        '[class*="menu"]',
        'button[class*="menu"]',
        '.nav-right button'
    ];
    
    let menuButton = null;
    
    for (const selector of menuSelectors) {
        menuButton = document.querySelector(selector);
        if (menuButton) {
            console.log(`✅ Found menu button with selector: ${selector}`);
            break;
        }
    }
    
    if (!menuButton) {
        console.error('❌ No menu button found with any selector');
        return;
    }
    
    // Ensure the button is properly styled and clickable
    menuButton.style.cursor = 'pointer';
    menuButton.style.pointerEvents = 'auto';
    menuButton.style.zIndex = '1001';
    menuButton.style.position = 'relative';
    menuButton.style.background = 'none';
    menuButton.style.border = 'none';
    menuButton.style.padding = '8px';
    menuButton.style.display = 'flex';
    menuButton.style.alignItems = 'center';
    menuButton.style.justifyContent = 'center';
    
    // Remove any existing event listeners and add new ones
    const newMenuButton = menuButton.cloneNode(true);
    menuButton.parentNode.replaceChild(newMenuButton, menuButton);
    
    // Add click event listener
    newMenuButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🍔 Menu button clicked - triggering menu');
        
        const menuOverlay = document.getElementById('menuOverlay');
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        
        if (menuOverlay && hamburgerMenu) {
            const isActive = hamburgerMenu.classList.contains('active');
            
            if (isActive) {
                // Close menu
                newMenuButton.classList.remove('active');
                menuOverlay.classList.remove('active');
                hamburgerMenu.classList.remove('active');
                document.body.style.overflow = '';
                console.log('🍔 Menu closed');
            } else {
                // Open menu
                newMenuButton.classList.add('active');
                menuOverlay.classList.add('active');
                hamburgerMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
                console.log('🍔 Menu opened');
            }
        } else {
            console.error('❌ Menu overlay or hamburger menu not found');
        }
    });
    
    // Add touch event for mobile
    newMenuButton.addEventListener('touchstart', function(e) {
        e.preventDefault();
        console.log('🍔 Menu button touched');
        newMenuButton.click();
    }, { passive: false });
    
    console.log('✅ Menu button functionality ensured');
}

// Call this function after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(ensureMenuButtonWorks, 500);
});

// ===== GOOGLE REVIEWS SLIDER =====
let currentReviewGroupIndex = 0;
let reviewGroups = [];
let reviewIndicators = [];
let reviewAutoSlideInterval;

function initializeReviewsSlider() {
    reviewGroups = document.querySelectorAll('.reviews-group');
    reviewIndicators = document.querySelectorAll('.review-indicator');
    
    if (reviewGroups.length === 0) {
        console.log('No review groups found');
        return;
    }
    
    console.log(`🌟 Initializing reviews slider with ${reviewGroups.length} review groups`);
    
    // Show first review group
    showReviewGroup(0);
    
    // Start auto-slide
    startReviewAutoSlide();
    
    // Add touch/swipe support for mobile
    addReviewTouchSupport();
    
    console.log('✅ Reviews slider initialized');
}

function showReviewGroup(index) {
    if (reviewGroups.length === 0) return;
    
    // Remove active class from all groups and indicators
    reviewGroups.forEach(group => group.classList.remove('active'));
    reviewIndicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current group and indicator
    if (reviewGroups[index]) {
        reviewGroups[index].classList.add('active');
    }
    if (reviewIndicators[index]) {
        reviewIndicators[index].classList.add('active');
    }
    
    currentReviewGroupIndex = index;
}

function changeReviewGroup(direction) {
    if (reviewGroups.length === 0) return;
    
    currentReviewGroupIndex += direction;
    
    if (currentReviewGroupIndex >= reviewGroups.length) {
        currentReviewGroupIndex = 0;
    } else if (currentReviewGroupIndex < 0) {
        currentReviewGroupIndex = reviewGroups.length - 1;
    }
    
    showReviewGroup(currentReviewGroupIndex);
    
    // Restart auto-slide
    clearInterval(reviewAutoSlideInterval);
    startReviewAutoSlide();
}

function currentReviewGroup(groupNumber) {
    const index = groupNumber - 1; // Convert to 0-based index
    showReviewGroup(index);
    
    // Restart auto-slide
    clearInterval(reviewAutoSlideInterval);
    startReviewAutoSlide();
}

function startReviewAutoSlide() {
    if (reviewGroups.length <= 1) return;
    
    reviewAutoSlideInterval = setInterval(() => {
        changeReviewGroup(1);
    }, 6000); // Change review group every 6 seconds
}

function addReviewTouchSupport() {
    const reviewsSlider = document.querySelector('.reviews-slider');
    if (!reviewsSlider) return;
    
    let startX = 0;
    let startY = 0;
    let isSwiping = false;
    
    reviewsSlider.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isSwiping = true;
        // Pause auto-slide during touch
        clearInterval(reviewAutoSlideInterval);
    }, { passive: true });
    
    reviewsSlider.addEventListener('touchmove', function(e) {
        if (!isSwiping) return;
        
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = Math.abs(currentX - startX);
        const diffY = Math.abs(currentY - startY);
        
        // If horizontal swipe is more significant than vertical, prevent default scrolling
        if (diffX > diffY && diffX > 10) {
            e.preventDefault();
        }
    }, { passive: false });
    
    reviewsSlider.addEventListener('touchend', function(e) {
        if (!isSwiping) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        handleReviewSwipe(startX, endX, startY, endY);
        isSwiping = false;
        // Resume auto-slide after touch
        setTimeout(() => startReviewAutoSlide(), 1000);
    }, { passive: true });
    
    function handleReviewSwipe(startX, endX, startY, endY) {
        const swipeThreshold = 50;
        const diffX = startX - endX;
        const diffY = Math.abs(startY - endY);
        
        // Only trigger horizontal swipe if it's more significant than vertical movement
        if (Math.abs(diffX) > swipeThreshold && Math.abs(diffX) > diffY) {
            if (diffX > 0) {
                // Swipe left - next review group
                changeReviewGroup(1);
                console.log('👈 Swiped left - next review group');
            } else {
                // Swipe right - previous review group
                changeReviewGroup(-1);
                console.log('👉 Swiped right - previous review group');
            }
        }
    }
    
    console.log('✅ Review touch support added');
}

// Make functions globally available for button clicks
window.changeReviewGroup = changeReviewGroup;
window.currentReviewGroup = currentReviewGroup;

// Initialize reviews slider when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeReviewsSlider, 100);
});

console.log('🌟 Reviews slider JavaScript loaded');