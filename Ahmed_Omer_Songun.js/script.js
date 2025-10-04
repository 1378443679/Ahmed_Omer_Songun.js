(() => {
    'use strict';

    // Configuration
    const CONFIG = {
        apiUrl: 'https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json',
        carouselTitle: 'Beğenebileceğinizi düşündüklerimiz',
        storageKey: 'ebebek_favorites',
        storageDataKey: 'ebebek_products_data'
    };

    // State management
    let products = [
        {
            "id": 1,
            "brand": "HelloBaby",
            "name": " Yenidoğan 6lı Ağız Mendili 24x24cm Unisex ",
            "url": "https://www.e-bebek.com/hellobaby-yenidogan-6li-agiz-mendili-24x24cm-unisex-p-24ghlbumnd007001",
            "img": "https://cdn05.e-bebek.com/mnresize/300/300/media/p/organik-6li-agiz-mendili-24x24-cm_8682766103779_01.jpg",
            "price": 89.99,
            "original_price": 89.99
        },
        {
            "id": 2,
            "brand": "HelloBaby",
            "name": " Unisex Beyaz Body Ribana Kumaş Çıtçıtlı Zıbın Zarf Yaka Kısa Kol",
            "url": "https://www.e-bebek.com/hellobaby-unisex-beyaz-body-ribana-kumas-citcitli-zibin-zarf-yaka-kisa-kol-beyaz-p-24ghlbubdy010002",
            "img": "https://cdn05.e-bebek.com/mnresize/300/300/media/p/a_8682766438970_01.jpg",
            "price": 69.99,
            "original_price": 69.99
        },
        {
            "id": 3,
            "brand": "HelloBaby",
            "name": "Unisex Beyaz Body Ribana Kumaş Çıtçıtlı Zıbın Bisiklet Yaka Atlet Kol",
            "url": "https://www.e-bebek.com/hellobaby-unisex-beyaz-body-ribana-kumas-citcitli-zibin-bisiklet-yaka-atlet-kol-beyaz-p-24ghlbubdy002008",
            "img": "https://cdn05.e-bebek.com/mnresize/300/300/media/p/abcdeefff_8682766439298_01.jpg",
            "price": 69.99,
            "original_price": 69.99
        },
        {
            "id": 4,
            "brand": "HelloBaby",
            "name": "Yenidoğan Müslin Ağız Mendili Unisex",
            "url": "https://www.e-bebek.com/hellobaby-yenidogan-muslin-agiz-mendili-unisex-p-24ghlbumnd003003",
            "img": "https://cdn05.e-bebek.com/mnresize/300/300/media/p/yenidogan-muslin-agiz-mendili-unisex_8682766728736_01.jpg",
            "price": 89.99,
            "original_price": 89.99
        },
        {
            "id": 5,
            "brand": "Aziz Bebe",
            "name": "Yenidoğan Süzene Nakışlı 5li Askı Hastane Çıkışı",
            "url": "https://www.e-bebek.com/aziz-bebe-yenidogan-suzene-nakisli-5li-aski-hastane-cikisi-p-24yazzeset001001",
            "img": "https://cdn05.e-bebek.com/mnresize/300/300/media/p/24y-little-life-yenidogan-suzene-nakisli-5li-aski-hastane-cikisi-erkek-bebek_8682766693195_01.jpg",
            "price": 399.99,
            "original_price": 479.99
        },
        {
            "id": 6,
            "brand": "HelloBaby",
            "name": "Kız Bebek Sweatshirt Şardonlu Çiçek Desenli Bisiklet Yaka Uzun Kol",
            "url": "https://www.e-bebek.com/hellobaby-kiz-bebek-sweatshirt-sardonlu-cicek-desenli-bisiklet-yaka-uzun-kol-desenli-p-24khlbkswt008004",
            "img": "https://cdn05.e-bebek.com/mnresize/300/300/media/p/basic-az-sardonlu-cicek-desenli-sweatshirt-kiz-bebek_8682766731644_01.jpg",
            "price": 99.99,
            "original_price": 199.99
        },
        {
            "id": 7,
            "brand": "HelloBaby",
            "name": "Unisex Beyaz Body Ribana Kumaş Çıtçıtlı Zıbın Bisiket Yaka İp Askılı",
            "url": "https://www.e-bebek.com/hellobaby-unisex-beyaz-body-ribana-kumas-citcitli-zibin-bisiket-yaka-ip-askili-beyaz-p-24ghlbubdy009008",
            "img": "https://cdn05.e-bebek.com/mnresize/300/300/media/p/a_8682766616361_01.jpg",
            "price": 69.99,
            "original_price": 69.99
        },
        {
            "id": 8,
            "brand": "Little Dreams",
            "name": "Kız Müslin Battaniye Bebek",
            "url": "https://www.e-bebek.com/little-dreams-kiz-muslin-battaniye-kiz-bebek-p-24kltlkmsl002001",
            "img": "https://cdn05.e-bebek.com/mnresize/300/300/media/p/kiz-muslin-battaniye-kiz-bebek_8682766812732_01.jpg",
            "price": 269.99,
            "original_price": 169.99
        }
    ]
    let favorites = [];
    let currentSlide = 0;
    let itemsPerView = 5;

    // Main initialization function
    const init = async () => {
        // Check if we're on the homepage
        if (!isHomePage()) {
          return console.log('wrong page');
            
        }

    loadFavorites();
    await loadProducts();
    buildHTML();
    buildCSS();
    setEvents();
    };

    // Check if current page is homepage
    const isHomePage = () => {
        const path = window.location.pathname;
        return(path === '/' || path === '/index.html' || path === '/home' || path.includes('homepage'));
    };




    // Load favorites from localStorage
    const loadFavorites = () => {
        const stored = localStorage.getItem(CONFIG.storageKey);
        favorites = stored ? JSON.parse(stored) : [];
    };

    // Save favorites to localStorage
    const saveFavorites = () => {
        localStorage.setItem(CONFIG.storageKey, JSON.stringify(favorites));
    };

    // Load products from API or localStorage
    const loadProducts = async () => {
        const storedData = localStorage.getItem(CONFIG.storageDataKey);
        const storedTimestamp = localStorage.getItem(CONFIG.storageDataKey + '_timestamp');
        const now = Date.now();
        const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

        // Use cached data if it's less than 1 hour old
        if (storedData && storedTimestamp && (now - parseInt(storedTimestamp)) < oneHour) {
            products = JSON.parse(storedData);
            return;
        }

        try {
            const response = await fetch(CONFIG.apiUrl);
            console.log("api sonrası", response);
            if (!response.ok) throw new Error('Failed to fetch products');
            
            products = await response.json();
            
            // Cache the data
            localStorage.setItem(CONFIG.storageDataKey, JSON.stringify(products));
            localStorage.setItem(CONFIG.storageDataKey + '_timestamp', now.toString());
        } catch (error) {
            console.error('Error fetching products:', error);
            // Fallback to cached data if available
            if (storedData) {
                products = JSON.parse(storedData);
            }
        }
    };

    // Build HTML structure
    const buildHTML = () => {
        const html = `
            <div class="product-carousel-container">
                <div class="carousel-header">
                    <h2 class="carousel-title">${CONFIG.carouselTitle}</h2>
                </div>
                <div class="carousel-wrapper">
                    <button class="carousel-nav carousel-nav-left" id="carouselPrev">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <div class="carousel-content">
                        <div class="carousel-track" id="carouselTrack">
                            ${generateProductCards()}
                        </div>
                    </div>
                    <button class="carousel-nav carousel-nav-right" id="carouselNext">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;

        // Append to the main content area
       
        const targetElement =  document.querySelector('eb-product-carousel > .banner > .container')
                   

        console.log(targetElement);
        
        if (targetElement) {
            targetElement.insertAdjacentHTML('beforeend', html);
        }
        else {
            alert('targetElement not found');
        }
    };

    // Generate product cards HTML
    const generateProductCards = () => {
        return products.slice(0, 10).map((product, index) => {
            const isFavorite = favorites.includes(product.id);
            const hasDiscount = product.price && product.original_price && product.price !== product.original_price;
            const discountPercentage = hasDiscount ? 
                Math.round(((product.original_price - product.price) / product.original_price) * 100) : 0;

            return `
                <div class="product-card" data-product-id="${product.id}">
                    <div class="product-image-container">
                        <img src="${product.img}" alt="${product.name}" class="product-image" loading="lazy">
                        <div class="product-badges">
                            <button class="favorite-btn ${isFavorite ? 'favorited' : ''}" data-product-id="${product.id}">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
                                          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <div class="product-rating">
                            <div class="stars">
                                ${generateStars(product.rating || 0)}
                            </div>
                            <span class="rating-count">(${product.rating_count || 0})</span>
                        </div>
                        <div class="product-pricing">
                            ${hasDiscount ? `
                                <span class="original-price">${formatPrice(product.original_price)}</span>
                                <div class="discount-info">
                                    <span class="discount-badge">%${discountPercentage}</span>
                                </div>
                            ` : ''}
                            <span class="current-price">${formatPrice(product.price)}</span>
                        </div>
                        <div class="special-offer">
                            <span class="offer-badge">Farklı Ürünlerde 3 Al 2 Öde</span>
                        </div>
                        <button class="add-to-cart-btn">Sepete Ekle</button>
                    </div>
                </div>
            `;
        }).join('');
    };

    // Generate star rating HTML
    const generateStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars += '<span class="star filled">★</span>';
            } else if (i === fullStars && hasHalfStar) {
                stars += '<span class="star half">★</span>';
            } else {
                stars += '<span class="star empty">★</span>';
            }
        }

        return stars;
    };

    // Format price with Turkish Lira
    const formatPrice = (price) => {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY',
            minimumFractionDigits: 2
        }).format(price);
    };

    // Build CSS styles
    const buildCSS = () => {
        const css = `
            .product-carousel-container {
                max-width: 1200px;
                margin: 40px auto;
                padding: 0 20px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }

            .carousel-header {
                text-align: center;
                margin-bottom: 30px;
            }

            .carousel-title {
                font-size: 28px;
                font-weight: 600;
                color: #f28e00;
                margin: 0;
                background: #fef7ec;
                padding: 15px;
                border-radius: 12px 12px 0 0;
                display: inline-block;
                width: 100%;
                text-align: left;
                padding-left: 50px;
        }

            .carousel-wrapper {
                position: relative;
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .carousel-nav {
                background: #ff6b35;
                border: none;
                border-radius: 8px;
                width: 48px;
                height: 48px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
                color: white;
                flex-shrink: 0;
            }

            .carousel-nav:hover {
                background: #e55a2b;
                transform: scale(1.05);
            }

            .carousel-nav:disabled {
                background: #ccc;
                cursor: not-allowed;
                transform: none;
            }

            .carousel-content {
                flex: 1;
                overflow: hidden;
            }

            .carousel-track {
                display: flex;
                gap: 20px;
                transition: transform 0.3s ease;
            }

            .product-card {
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                padding: 0;
                min-width: 220px;
                max-width: 220px;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                cursor: pointer;
                position: relative;
            }

            .product-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            }

            .product-image-container {
                position: relative;
                padding: 20px;
                text-align: center;
                background: #f8f9fa;
                border-radius: 12px 12px 0 0;
            }

            .product-image {
                width: 100%;
                height: 160px;
                object-fit: contain;
                border-radius: 8px;
            }

            .product-badges {
                position: absolute;
                top: 15px;
                left: 15px;
                right: 15px;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
            }

            .shipping-badge {
                background: #28a745;
                color: white;
                padding: 4px 8px;
                border-radius: 6px;
                font-size: 11px;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 4px;
            }

            .favorite-btn {
                background: white;
                border: 2px solid #ddd;
                border-radius: 50%;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
                color: #666;
            }

            .favorite-btn:hover {
                border-color: #ff6b35;
                color: #ff6b35;
            }

            .favorite-btn.favorited {
                background: #ff6b35;
                border-color: #ff6b35;
                color: white;
            }

            .product-info {
                padding: 20px;
            }

            .product-name {
                font-size: 14px;
                font-weight: 500;
                color: #333;
                margin: 0 0 10px 0;
                line-height: 1.4;
                height: 40px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }

            .product-rating {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 12px;
            }

            .stars {
                display: flex;
                gap: 2px;
            }

            .star {
                font-size: 14px;
                color: #ffc107;
            }

            .star.empty {
                color: #ddd;
            }

            .star.half {
                background: linear-gradient(90deg, #ffc107 50%, #ddd 50%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .rating-count {
                font-size: 12px;
                color: #666;
            }

            .product-pricing {
                margin-bottom: 12px;
                position: relative;
            }

            .original-price {
                font-size: 12px;
                color: #999;
                text-decoration: line-through;
                margin-right: 8px;
            }

            .discount-info {
                display: inline-block;
                margin-left: 8px;
            }

            .discount-badge {
                background: #28a745;
                color: white;
                padding: 2px 6px;
                border-radius: 4px;
                font-size: 11px;
                font-weight: 600;
                display: inline-flex;
                align-items: center;
                gap: 2px;
            }

            .current-price {
                font-size: 18px;
                font-weight: 700;
                color: #333;
                display: block;
                margin-top: 4px;
            }

            .special-offer {
                margin-bottom: 15px;
            }

            .offer-badge {
                background: #e8f5e8;
                color: #28a745;
                padding: 6px 10px;
                border-radius: 6px;
                font-size: 11px;
                font-weight: 500;
                display: inline-block;
            }

            .add-to-cart-btn {
                width: 100%;
                background: #ff6b35;
                color: white;
                border: none;
                border-radius: 8px;
                padding: 12px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                transition: background 0.3s ease;
            }

            .add-to-cart-btn:hover {
                background: #e55a2b;
            }

            /* Responsive Design */
            @media (max-width: 1200px) {
                .product-card {
                    min-width: 200px;
                    max-width: 200px;
                }
            }

            @media (max-width: 992px) {
                .product-card {
                    min-width: 180px;
                    max-width: 180px;
                }
                
                .carousel-title {
                    font-size: 24px;
                }
            }

            @media (max-width: 768px) {
                .product-carousel-container {
                    padding: 0 15px;
                }
                
                .carousel-wrapper {
                    gap: 10px;
                }
                
                .carousel-nav {
                    width: 40px;
                    height: 40px;
                }
                
                .product-card {
                    min-width: 160px;
                    max-width: 160px;
                }
                
                .carousel-title {
                    font-size: 20px;
                    padding: 12px 20px;
                }
            }

            @media (max-width: 576px) {
                .product-card {
                    min-width: 140px;
                    max-width: 140px;
                }
                
                .product-image {
                    height: 120px;
                }
                
                .product-name {
                    font-size: 12px;
                    height: 32px;
                }
                
                .current-price {
                    font-size: 16px;
                }
            }
        `;

        // Create and append style element
        const style = document.createElement('style');
        style.className = 'product-carousel-styles';
        style.textContent = css;
        document.head.appendChild(style);
    };

    // Update carousel position


    // Set up event listeners
    const setEvents = () => {
        // Navigation buttons
        const prevBtn = document.getElementById('carouselPrev');
        const nextBtn = document.getElementById('carouselNext');
        const track = document.getElementById('carouselTrack');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentSlide > 0) {
                    currentSlide--;
                    updateCarouselPosition();
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const maxSlide = Math.max(0, products.length - itemsPerView);
                if (currentSlide < maxSlide) {
                    currentSlide++;
                    updateCarouselPosition();
                }
            });
        }

        let favoriteBtn = null;
        let productCard = null;

        // Product card clicks
        document.addEventListener('click', (e) => {
            favoriteBtn = e.target.closest('.favorite-btn');
            productCard = e.target.closest('.product-card');
        })
    
    
        if (favoriteBtn) {
            e.stopPropagation();
                const productId = parseInt(favoriteBtn.dataset.productId);
            toggleFavorite(productId);
            return;
        }

        if (productCard) {
            const productId = parseInt(productCard.dataset.productId);
            if (!productId) return; // güvenlik kontrolü
            const product = products.find(p => Number(p.id) === productId);
            if (product && product.url) {
                window.open(product.url, '_blank');
            }
        }           
        

        // Heart icon clicks
        if (favoriteBtn) {
            e.stopPropagation();
            const productId = parseInt(favoriteBtn.dataset.productId);
            toggleFavorite(productId);
        }

   

        // Toggle favorite
        const toggleFavorite = (productId) => {
            const index = favorites.indexOf(productId);
            if (index > -1) {
                favorites.splice(index, 1);
            } else {
                favorites.push(productId);
            }
            saveFavorites();
            updateFavoriteButtons();
        };

        const updateCarouselPosition = () => {
            if (track) {
                const cardWidth = track.querySelector('.product-card').offsetWidth + 20;
                const translateX = -currentSlide * cardWidth;
                track.style.transform = `translateX(${translateX}px)`;
            }
    
            // Update button states
            if (prevBtn) {
                prevBtn.disabled = currentSlide === 0;
            }
            if (nextBtn) {
                const maxSlide = Math.max(0, products.length - itemsPerView);
                nextBtn.disabled = currentSlide >= maxSlide;
            }
        };

        // Update favorite button states
        const updateFavoriteButtons = () => {
            document.querySelectorAll('.favorite-btn').forEach(btn => {
                const productId = btn.dataset.productId;
                if (favorites.includes(productId)) {
                    btn.classList.add('favorited');
                } else {
                    btn.classList.remove('favorited');
                }
            });
        };

        // Initialize carousel position
        updateCarouselPosition();
        updateFavoriteButtons();

        // Handle window resize
        window.addEventListener('resize', () => {
            const width = window.innerWidth;
            if (width < 576) {
                itemsPerView = 2;
            } else if (width < 768) {
                itemsPerView = 3;
            } else if (width < 992) {
                itemsPerView = 4;
            } else {
                itemsPerView = 5;
            }
            updateCarouselPosition();
        });
    };

    // Self reference for function calls
    const self = {
        init,
        loadFavorites,
        loadProducts,
        buildHTML,
        buildCSS,
        setEvents
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();