/* =========================================
    2. NAVBAR & SCROLL LOGIC
    ========================================= */
const navbar = document.getElementById("navbar");
let lastScrollTop = 0;

// Combined Scroll Logic for Navbar and Utility Bar
window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const stc = document.getElementById("stc");

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling Down: Hide Navbar, Move STC to top 0
        navbar.classList.add("nav-hidden");
        if(stc) stc.style.top = "0px";
    } else {
        // Scrolling Up: Show Navbar, Move STC to top 70px (nav height)
        navbar.classList.remove("nav-hidden");
        if(stc) {
            if (window.innerWidth <= 740) {
                stc.style.top = navbar.offsetHeight + "px";
            } else {
                stc.style.top = "70px";
            }
        }
    }
    lastScrollTop = scrollTop;
});

// Dropdown hover logic with delay
const navDropdown = document.querySelector('.nav-dropdown');
const dropdownContent = document.querySelector('.dropdown-content');
const dropBtn = document.querySelector('.dropbtn');
let dropdownTimeout;

navDropdown.addEventListener('mouseenter', () => {
    if (window.innerWidth > 1200) {
        clearTimeout(dropdownTimeout);
        dropdownContent.classList.add('show');
    }
});

navDropdown.addEventListener('mouseleave', () => {
    if (window.innerWidth > 1200) {
        dropdownTimeout = setTimeout(() => {
            dropdownContent.classList.remove('show');
        }, 300); // 300ms delay to allow mouse to reach dropdown
    }
});

// Mobile: First click opens dropdown, second click navigates
if (dropBtn) {
    dropBtn.addEventListener('click', (e) => {
        if (window.innerWidth <= 1200) {
            if (!dropdownContent.classList.contains('show')) {
                e.preventDefault();
                dropdownContent.classList.add('show');
            }
        }
    });
}

// Close dropdown on click outside
document.addEventListener('click', (e) => {
    if (!navDropdown.contains(e.target)) {
        clearTimeout(dropdownTimeout);
        dropdownContent.classList.remove('show');
    }
    // Hide navbar on click outside
    if (!navbar.contains(e.target)) {
        navbar.classList.add('nav-hidden');
        const stc = document.getElementById("stc");
        if (stc) stc.style.top = "0px";
    }
});

// Horizontal Scroll Helper
// function scrollToGroup(groupName) {
//     const container = document.getElementById('toolBagScroll');
//     const target = document.getElementById(`group-${groupName}`);
    
//     document.getElementById('prospects').scrollIntoView({behavior: 'smooth'});

//     if(container && target) {
//         const scrollLeft = target.offsetLeft - (window.innerWidth - target.offsetWidth) / 2;
//         container.scrollTo({
//             left: scrollLeft,
//             behavior: 'smooth'
//         });
//     }
// }

/* =========================================
    GLOBAL STATE & HELPERS
    ========================================= */
const currencyState = {
    current: 'NGN', // Default currency
    // Rates are based on NGN as the base unit from inventory
    rates: {
        NGN: 1,
        EUR: 0.00062, // As per original script
    },
    symbols: {
        NGN: '₦',
        EUR: '€',
    }
};
let searchTerm = '';

/**
 * Formats a raw number into a currency string with symbol and thousand separators.
 * @param {number} rawPrice The base price in NGN.
 * @returns {string} The formatted currency string based on the current global state.
 */
function getFormattedPrice(rawPrice) {
    const { current, rates, symbols } = currencyState;
    const displayPrice = rawPrice * rates[current];
    const symbol = symbols[current];
    
    const formatted = displayPrice.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    return `${symbol}${formatted}`;
}

/**
 * Updates all price elements on the page by re-rendering the components.
 * This is called by the new currency toggle logic.
 */
function updateAllPrices() {
    // Update static currency symbols in the DOM (specifically for tool-bag-brief)
    const symbol = currencyState.symbols[currencyState.current];
    document.querySelectorAll('.currency-symbol').forEach(el => el.textContent = symbol);

    renderProspects();
    sortSummary(); // This re-renders the summary with the correct currency
    document.getElementById('grand-total-display').textContent = getFormattedPrice(fullGrandTotal);
    document.getElementById('sticky-grand-total').textContent = getFormattedPrice(fullGrandTotal);
    document.getElementById('mobile-grand-total').textContent = getFormattedPrice(fullGrandTotal);
}

/* =========================================
    3. PROSPECTS RENDERING (Cards + Sliders)
    ========================================= */
function renderProspects() {
    const categories = {
        'Learning': document.getElementById('grid-learning'),
        'Repair': document.getElementById('grid-repair'),
        'Productivity': document.getElementById('grid-productivity')
    };

    const counts = { 'Learning': 0, 'Repair': 0, 'Productivity': 0 };
    const totals = {
        'Learning': { base: 0, shipping: 0 },
        'Repair': { base: 0, shipping: 0 },
        'Productivity': { base: 0, shipping: 0 }
    };

    for (let key in categories) { if(categories[key]) categories[key].innerHTML = ''; }

    inventory.forEach((item, index) => {
        const container = categories[item.category];
        if (container) {
            // Update counts and totals
            if (counts.hasOwnProperty(item.category)) {
                counts[item.category]++;
            }
            if (totals.hasOwnProperty(item.category)) {
                totals[item.category].base += item.basePrice * (item.quantity || 1);
                totals[item.category].shipping += (item.shipping || 0) * (item.quantity || 1);
            }

            const cardWrapper = document.createElement('div');
            cardWrapper.className = 'tool-card-wrapper';

            const card = document.createElement('div');
            card.className = 'tool-card';
            card.style.animationDelay = `${index * 0.05}s`; // Staggered fade-in effect
            card.setAttribute('data-item-id', item.id); // Use ID for reliable lookup

            const imagesList = item.images && item.images.length > 0 ? item.images : ["https://placehold.co/300x200?text=No+Img"];
            const sliderHTML = imagesList.map(src => `<img src="${src}" alt="${item.name}">`).join('');

            card.innerHTML = `
                <div class="tool-pics-container">
                    <div class="slider-frame">
                        <div class="slider-track">
                            ${sliderHTML}
                        </div>
                    </div>
                </div>

                <div class="tool-card-body">
                    <div class="tool-meta-row">
                        <span class="card-category">${item.category}</span>
                        ${item.isEssential ? `<div class="essential-badge">ESSENTIAL <span style="background-color: white; color: black; border-radius: 50%; padding: 0 5px; font-size: 0.8em; margin-left: 4px;">${item.essentialRank}</span></div>` : ''}
                    </div>
                    <h1 class="tool-name" title="${item.name}">${item.name}</h1>
                    <h5 class="tool-store">${item.productStore || ''}</h5>
                    <h1 class="tool-price" data-base-price-ngn="${item.basePrice}">${getFormattedPrice(item.basePrice)}</h1>  
                    <a href="${item.productLink || '#'}" target="_blank" class="go-to-page">
                        <span>Go to page</span> 
                    </a>
                </div>
            `;
            card.addEventListener('click', handleCardClick);
            cardWrapper.appendChild(card);
            container.appendChild(cardWrapper);
        }
    });

    // Update category counts
    document.getElementById('learning-count').textContent = counts['Learning'];
    document.getElementById('repair-count').textContent = counts['Repair'];
    document.getElementById('productivity-count').textContent = counts['Productivity'];

    // Update category price summaries
    const categoriesForTotals = ['Learning', 'Repair', 'Productivity'];

    categoriesForTotals.forEach(cat => {
        const catKey = cat.toLowerCase();
        const catTotals = totals[cat];
        const basePriceEl = document.getElementById(`${catKey}-total-price`);
        const shippingEl = document.getElementById(`${catKey}-total-shipping`);
        const totalPlusEl = document.getElementById(`${catKey}-total-plus`);

        if(basePriceEl && shippingEl && totalPlusEl) {
            // Set initial text content using the centralized formatter
            basePriceEl.textContent = getFormattedPrice(catTotals.base).substring(1); // Remove symbol, it's in HTML
            shippingEl.textContent = getFormattedPrice(catTotals.shipping).substring(1);
            totalPlusEl.textContent = getFormattedPrice(catTotals.base + catTotals.shipping).substring(1);
        }
    });
}

function handleCardClick(e) {
    // If the 'Go to page' link is clicked, do nothing and let the link work.
    if (e.target.closest('.go-to-page')) {
        return;
    }

    const card = e.currentTarget;
    const gridContainer = card.closest('.tool-bag-grid-container');
    const itemId = parseInt(card.dataset.itemId, 10);
    const item = inventory.find(i => i.id === itemId);
    if (!item) return;

    // First, remove any existing panel to ensure a fresh start
    const existingPanel = gridContainer.querySelector('.tool-bag-tdescr');
    if (existingPanel) {
        existingPanel.remove();
    }

    const specsList = item.brief ? item.brief.split('\n') : [];
    const specsHTML = specsList.length > 0 ? specsList.map(s => `<li>${s}</li>`).join('') : '<li>N/A</li>';
    const panelSliderHTML = (item.images || []).map(src => `<img src="${src}" alt="${item.name}">`).join('');
    const shippingText = item.shipping > 0 ? `+${getFormattedPrice(item.shipping)} shipping` : 'Free shipping';
    const essentialHtml = item.isEssential ? `<div class="essential-badge">ESSENTIAL <span style="background-color: white; color: black; border-radius: 50%; padding: 0 5px; font-size: 0.8em; margin-left: 4px;">${item.essentialRank}</span></div>` : '';

    const panelHTML = `
    <div class="tool-bag-tdescr">
        <button class="panel-close-btn">&times;</button>
        <div class="panel-header">
            <h2 class="panel-name">${item.name}</h2>
            <div class="panel-subheader">
            <p class="panel-store-prefix">From ${item.productStore || ''}</p>
            <div class="panel-price">${getFormattedPrice(item.basePrice)}<small>${shippingText}</small></div>
            </div>
        </div>
        <div class="panel-slider">
            <div class="slider-frame">
                <div class="slider-track">
                    ${panelSliderHTML}
                </div>
                <div class="panel-meta-row">
                    <span class="card-category">${item.category}</span>
                    ${essentialHtml}
                </div>
                <div class="slider-controls">
                    <button class="slider-btn prev-btn">&#10094;</button>
                    <button class="slider-btn next-btn">&#10095;</button>
                </div>
            </div>
        </div>
        <div class="panel-details">
            <h3 class="detail-section-title">Description</h3> <p>${item.description}</p>
            <h3 class="detail-section-title">Specifications</h3> <ul class="detail-specs-list">${specsHTML}</ul>
        </div>
        <p class="close-panel-hint">Click anywhere outside to close</p>
    </div>
    `;

    // Create and insert the new panel, then slide it in
    gridContainer.insertAdjacentHTML('beforeend', panelHTML);
    const newPanel = gridContainer.querySelector('.tool-bag-tdescr:last-child');

    // Add Close Button Listener
    const closeBtn = newPanel.querySelector('.panel-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            const intervalId = newPanel.dataset.sliderIntervalId;
            if (intervalId) clearInterval(parseInt(intervalId, 10));
            newPanel.classList.remove('is-visible');
            newPanel.addEventListener('transitionend', () => newPanel.remove(), { once: true });
        });
    }

    // Use a small delay to ensure the transition triggers correctly
    requestAnimationFrame(() => {
        if (newPanel) {
            newPanel.classList.add('is-visible');
            // Initialize the slider for this new panel
            initPanelSlider(newPanel);
        }
    });
}

/**
 * Initializes the image slider for a newly created detail panel.
 * @param {HTMLElement} panelElement The panel element (.tool-bag-tdescr).
 */
function initPanelSlider(panelElement) {
    const track = panelElement.querySelector('.slider-track');
    if (!track) return;

    const images = track.querySelectorAll('img');

    // Dynamic Zoom Logic
    let zoomedImg = null;
    track.addEventListener('mousemove', (e) => {
        if (e.target.tagName === 'IMG') {
            const img = e.target;
            if (zoomedImg && zoomedImg !== img) {
                zoomedImg.style.transform = "scale(1)";
                zoomedImg.style.transformOrigin = "center center";
            }
            zoomedImg = img;
            const rect = img.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;
            img.style.transformOrigin = `${xPercent}% ${yPercent}%`;
            img.style.transform = "scale(2)";
        }
    });

    track.addEventListener('mouseleave', () => {
        if (zoomedImg) {
            zoomedImg.style.transform = "scale(1)";
            zoomedImg.style.transformOrigin = "center center";
            zoomedImg = null;
        }
    });

    if (images.length <= 1) {
        // Hide controls if there is only one image
        const controls = panelElement.querySelector('.slider-controls');
        if (controls) controls.style.display = 'none';
        return;
    }

    let currentIndex = 0;
    const totalSlides = images.length;
    let intervalId;

    const updateSlide = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    const startAutoSlide = () => {
        // Clear any existing interval to prevent conflicts
        if (intervalId) clearInterval(intervalId);
        
        intervalId = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlide();
        }, 6000); // Increased to 6 seconds
    };

    // Manual Controls
    const prevBtn = panelElement.querySelector('.prev-btn');
    const nextBtn = panelElement.querySelector('.next-btn');

    if (prevBtn) prevBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent panel from closing
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlide();
        startAutoSlide(); // Reset timer on manual interaction
    });

    if (nextBtn) nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlide();
        startAutoSlide();
    });

    // Pause on hover (Magnification)
    track.addEventListener('mouseenter', () => {
        if (intervalId) clearInterval(intervalId);
    });

    // Resume on mouse leave
    track.addEventListener('mouseleave', () => {
        startAutoSlide();
    });

    // Start the initial timer
    startAutoSlide();

    // Store the interval ID on the panel so we can clear it on close
    // We use a getter/setter approach or just assign the ID directly if it's a primitive
    // Note: setInterval returns a number in browser, so this works.
    panelElement.dataset.sliderIntervalId = intervalId;
}

/* =========================================
    4. SUMMARY RENDERING (Grid + Sliders)
    ========================================= */
let currentFilter = 'all';
let currentSort = 'default';
let fullGrandTotal = 0;

function renderSummary(items) {
    const grid = document.getElementById('summaryGrid');
    const countEl = document.getElementById('count');
    const totalEl = document.getElementById('grand-total-display');
        // Elements for the Dynamic Total Logic
    const stickyTotalEl = document.getElementById('sticky-dynamic-price');
    const mobileDynamicEl = document.getElementById('mobile-dynamic-total');

    if(!grid) return;

    grid.innerHTML = '';
    let grandTotal = 0;

    items.forEach(item => {
        const quantity = item.quantity || 1;
        const unitBase = item.basePrice;
        const unitShip = item.shipping || 0;
        const totalCost = (unitBase + unitShip) * quantity;
        grandTotal += totalCost;

        let badgeHtml = '';
        if (item.dealTag && item.dealTag !== 'None') {
            if (item.dealTag.startsWith('http')) {
                badgeHtml = `<img src="${item.dealTag}" class="deal-badge-img" alt="Deal Badge">`;
            } else {
                let badgeClass = 'deal-official';
                if (item.dealTag === 'Choice') badgeClass = 'deal-choice';
                else if (item.dealTag === 'Jumia Express') badgeClass = 'deal-express';
                else if (item.dealTag === 'SuperDeals') badgeClass = 'deal-super';
                badgeHtml = `<div class="deal-badge ${badgeClass}">${item.dealTag}</div>`;
            }
        }

        const essentialHtml = item.isEssential ? `<div class="essential-badge">ESSENTIAL <span style="background-color: white; color: black; border-radius: 50%; padding: 0 5px; font-size: 0.8em; margin-left: 4px;">${item.essentialRank}</span></div>` : '';
        const shippingHtml = unitShip === 0 
            ? '<span class="free-ship-tag" style="margin-bottom: 5px;">Free Ship</span>' 
            : `<div style="text-align: right;">
                   <div style="font-size: 0.7rem; text-transform: uppercase; color: var(--summ-dim);">Shipping</div>
                   <span class="shipping-info">${getFormattedPrice(unitShip)}</span>
               </div>`;

        // Slider Generation
        const imagesList = item.images && item.images.length > 0 ? item.images : ["https://placehold.co/300x200?text=No+Img"];
        const sliderHTML = imagesList.map(src => `<img src="${src}">`).join('');

        const cardWrapper = document.createElement('div');
        cardWrapper.className = 'summary-card-wrapper';

        const card = document.createElement('div');
        card.className = 'summary-card' + (item.isEssential ? ' essential' : '');
        card.innerHTML = `
            <div class="card-image">
                <div class="slider-frame">
                    <div class="slider-track">
                        ${sliderHTML}
                    </div>
                </div><div class="source-tag">${item.source}${badgeHtml}</div>
                <div class="meta-row">
                    <span class="card-category">${item.category}</span>
                ${essentialHtml}
                </div>
            </div>
            <div class="card-body">

                <div class="card-inner-body">
                    <div class="card-title">${item.name}</div>                        
                    <div style="font-size: 0.8rem; color: var(--summ-dim); margin-bottom: 5px;">Quantity: ${quantity}</div>
                    <div class="card-footer">
                        ${quantity > 1 
                            ? (unitShip > 0 
                                ? `<div class="price-breakdown">(${getFormattedPrice(unitBase)} + ${getFormattedPrice(unitShip)}) &times; ${quantity}</div>`
                                : `<div class="price-breakdown">${getFormattedPrice(unitBase)} &times; ${quantity}</div>`)
                            : (unitShip > 0 
                                ? `<div class="price-breakdown">${getFormattedPrice(unitBase)} + ${getFormattedPrice(unitShip)}</div>` 
                                : '')
                        } 
                        <div class="final-price-row" style="align-items: flex-end;">
                            <div>
                                <div style="font-size: 0.7rem; text-transform: uppercase; color: var(--summ-dim);">Total Price</div>
                                <span class="final-price">${getFormattedPrice(totalCost)}</span>
                            </div>
                            ${shippingHtml}
                        </div>
                    </div>
                    <a href="${item.productLink || '#'}" target="_blank" class="sum-deets">Visit Store</a>
                </div>
            </div>
        `;
        cardWrapper.appendChild(card);
        grid.appendChild(cardWrapper);
    });            

    countEl.textContent = items.length;
    // totalEl.textContent = `£${grandTotal.toFixed(2)}`;  // Removed: static total
    // UPDATE TOTALS
    const formattedTotal = getFormattedPrice(grandTotal);
    // Update the Sticky (Dynamic) Total
    if(stickyTotalEl) stickyTotalEl.textContent = formattedTotal;
    if(mobileDynamicEl) mobileDynamicEl.textContent = formattedTotal;
    
    // Start sliders for newly rendered summary cards
    initSliders();
}

function getFilteredAndSortedList() {
    let list = [...inventory];

    // 1. Apply search
    if (searchTerm) {
        list = list.filter(item => item.name.toLowerCase().includes(searchTerm));
    }

    // 2. Apply button filters
    if (currentFilter !== 'all') {
        if (currentFilter === 'essential') {
            list = list.filter(i => i.isEssential);
        } else if (currentFilter === 'freeShipping') {
            list = list.filter(i => i.shipping === 0);
        } else if (['AliExpress', 'Jumia', 'Temu', 'Local Retail'].includes(currentFilter)) {
            list = list.filter(i => i.source === currentFilter);
        } else {
            list = list.filter(i => i.category === currentFilter);
        }
    }

    // 3. Apply sort
    const getTotalCost = item => (item.basePrice + (item.shipping || 0)) * (item.quantity || 1);
    if (currentSort === 'price-asc') {
        list.sort((a, b) => getTotalCost(a) - getTotalCost(b));
    } else if (currentSort === 'price-desc') {
        list.sort((a, b) => getTotalCost(b) - getTotalCost(a));
    } else if (currentSort === 'essential') {
        list.sort((a, b) => {
        if (a.isEssential && !b.isEssential) return -1;
        if (!a.isEssential && b.isEssential) return 1;
        return (a.essentialRank || 99) - (b.essentialRank || 99);
    });
    }
    
    return list;
}

function filterSummary(criteria, btnElement) {
    currentFilter = criteria;
    if (btnElement) {
        document.querySelectorAll('.filter-button').forEach(b => b.classList.remove('active'));
        btnElement.classList.add('active');
    }
    const listToRender = getFilteredAndSortedList();
    renderSummary(listToRender);

    // Scroll back to the top of the summary utility bar
    const utilityBar = document.getElementById('stc');
    if (utilityBar) {
        utilityBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function sortSummary() {
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        currentSort = sortSelect.value;
    }
    const listToRender = getFilteredAndSortedList();
    renderSummary(listToRender);
}

/* =========================================
    6. SLIDER LOGIC
    ========================================= */
function initSliders() {
    // Clear existing intervals to prevent speed-ups
    if (window.sliderIntervals) {
        window.sliderIntervals.forEach(clearInterval);
    }
    window.sliderIntervals = [];

    const tracks = document.querySelectorAll('.slider-track');

    tracks.forEach(track => {
        const images = track.querySelectorAll('img');
        if (images.length <= 1) return;

        let currentIndex = 0;
        
        // Random offset so they don't all slide at exactly the same millisecond
        const randomOffset = Math.floor(Math.random() * 1000);

        setTimeout(() => {
            const intervalId = setInterval(() => {
                currentIndex++;
                if (currentIndex >= images.length) {
                    currentIndex = 0;
                }
                track.style.transform = `translateX(-${currentIndex * 100}%)`;
            }, 3000); 
            window.sliderIntervals.push(intervalId);
        }, randomOffset);
    });

}

    // =========================================
    // REVISED PDF DOWNLOAD LOGIC
    // =========================================
    const pdfBtn = document.querySelector('.dld-pdf');
    if (pdfBtn) {
        pdfBtn.addEventListener('click', () => {
            if (!window.jspdf) {
                alert("PDF Library not loaded. Check internet connection.");
                return;
            }
            const { jsPDF } = window.jspdf;

            // Provide feedback
            const originalText = pdfBtn.querySelector('h1').innerText;
            pdfBtn.querySelector('h1').innerText = "Generating PDF...";

            try {
                const doc = new jsPDF();
                const pageWidth = doc.internal.pageSize.width;
                const pageHeight = doc.internal.pageSize.height;
                const margin = 15;
                let yPos = 20;

                // --- 1. DATA PREPARATION ---
                // Calculate specific totals
                const grandTotal = inventory.reduce((sum, i) => sum + ((i.basePrice + (i.shipping || 0)) * (i.quantity || 1)), 0);
                const totalBasePrice = inventory.reduce((sum, i) => sum + (i.basePrice * (i.quantity || 1)), 0);
                const totalShipping = inventory.reduce((sum, i) => sum + ((i.shipping || 0) * (i.quantity || 1)), 0);

                // Group Data
                const categories = {};
                inventory.forEach(item => {
                    if (!categories[item.category]) categories[item.category] = [];
                    categories[item.category].push(item);
                });

                // --- 2. HEADER SECTION ---
                // Left: Website Name
                doc.setFont("helvetica", "bold");
                doc.setFontSize(16);
                doc.setTextColor(40, 40, 40);
                doc.text("CURE PROSPECTS 2025-2026", margin, yPos);

                // Right: Grand Total (Large)
                doc.setFontSize(18);
                doc.setTextColor(0, 0, 0);
                doc.text(getFormattedPrice(grandTotal), pageWidth - margin, yPos, { align: "right" });

                // Right: Small Breakdown (Underneath)
                yPos += 6;
                doc.setFont("helvetica", "normal");
                doc.setFontSize(9);
                doc.setTextColor(100, 100, 100); // Grey text
                const totalBreakdownText = `Products: ${getFormattedPrice(totalBasePrice)} + Shipping: ${getFormattedPrice(totalShipping)}`;
                doc.text(totalBreakdownText, pageWidth - margin, yPos, { align: "right" });

                // Header Divider Line
                yPos += 5;
                doc.setDrawColor(200, 200, 200);
                doc.setLineWidth(0.5);
                doc.line(margin, yPos, pageWidth - margin, yPos);
                yPos += 15; // Space before first category

                // --- 3. CATEGORY & ITEM LOOP ---
                const categoryOrder = ['Learning', 'Repair', 'Productivity']; // Define order

                categoryOrder.forEach(catName => {
                    if (!categories[catName]) return;
                    const items = categories[catName];

                    // Check space for Category Header
                    if (yPos > pageHeight - 30) { doc.addPage(); yPos = 20; }

                    // Draw Category Title
                    doc.setFont("helvetica", "bold");
                    doc.setFontSize(14);
                    doc.setTextColor(0, 51, 102); // Dark Blue
                    doc.text(catName.toUpperCase(), margin, yPos);
                    yPos += 10;

                    // Loop Items
                    items.forEach(item => {
                        const quantity = item.quantity || 1;
                        const unitTotal = item.basePrice + (item.shipping || 0);
                        const itemTotal = unitTotal * quantity;
                        const shippingText = item.shipping === 0 ? "Free Shipping" : `Shipping: ${getFormattedPrice(item.shipping || 0)}`;
                        let breakdownText = `(Base: ${getFormattedPrice(item.basePrice)})`;
                        if (quantity > 1) {
                            breakdownText = `(${quantity} @ ${getFormattedPrice(unitTotal)} = ${getFormattedPrice(itemTotal)})`;
                        }
                        
                        // Item Row Height (Generous height for layout)
                        const rowHeight = 25; 

                        // Check Page Break
                        if (yPos + rowHeight > pageHeight - 15) {
                            doc.addPage();
                            yPos = 20;
                        }

                        // --- A. IMAGE (Thumbnail Box) ---
                        // Note: Loading external URLs fails in PDF often due to CORS. 
                        // We draw a clean gray placeholder box to keep layout professional.
                        doc.setFillColor(240, 240, 240);
                        doc.rect(margin, yPos, 15, 15, 'F'); // X, Y, W, H
                        doc.setFontSize(6);
                        doc.setTextColor(150, 150, 150);
                        doc.text("IMG", margin + 4, yPos + 9);

                        // --- B. LEFT SIDE: Name & Details ---
                        const textStartX = margin + 20;
                        
                        // Tool Name
                        doc.setFont("helvetica", "bold");
                        doc.setFontSize(12);
                        doc.setTextColor(0, 0, 0);
                        doc.text(item.name, textStartX, yPos + 5);

                        // Store & Shipping Info (Next line)
                        doc.setFont("helvetica", "normal");
                        doc.setFontSize(10);
                        doc.setTextColor(80, 80, 80);
                        doc.text(`${item.productStore} | ${item.source} | ${shippingText}`, textStartX, yPos + 11);

                        // --- C. RIGHT SIDE: Prices ---
                        // Item Total Price
                        doc.setFont("helvetica", "bold");
                        doc.setFontSize(12);
                        doc.setTextColor(0, 0, 0);
                        doc.text(getFormattedPrice(itemTotal), pageWidth - margin, yPos + 5, { align: "right" });

                        // Small Breakdown text underneath
                        doc.setFont("helvetica", "italic");
                        doc.setFontSize(8);
                        doc.setTextColor(120, 120, 120);
                        doc.text(breakdownText, pageWidth - margin, yPos + 11, { align: "right" });

                        // --- D. SEPARATOR ---
                        // Light line between items
                        yPos += rowHeight;
                        doc.setDrawColor(230, 230, 230);
                        doc.line(margin, yPos - 8, pageWidth - margin, yPos - 8);
                    });

                    yPos += 5; // Extra space after category group
                });

                // Final Save
                doc.save('CURE_Prospects_2025-2026_Inventory.pdf');

            } catch (err) {
                console.error(err);
                alert("Error generating PDF. See console for details.");
            } finally {
                pdfBtn.querySelector('h1').innerText = originalText;
            }
        });
    }

/* =========================================
    7. INIT
    ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    // Calculate full grand total
    fullGrandTotal = inventory.reduce((sum, item) => sum + ((item.basePrice + (item.shipping || 0)) * (item.quantity || 1)), 0);
    document.getElementById('grand-total-display').textContent = getFormattedPrice(fullGrandTotal);
    document.getElementById('sticky-grand-total').textContent = getFormattedPrice(fullGrandTotal);
    document.getElementById('mobile-grand-total').textContent = getFormattedPrice(fullGrandTotal);

    renderProspects();
    renderSummary(inventory);
    initSliders();
    // setupScrollSnapping(); // This function is not defined in the provided files.
    // setupDownloads(); // This function is not defined in the provided files.

    // --- Tool Bag Nav Click-to-Expand Logic ---
    const toolBagNav = document.querySelector('.tool-bag-nav');
    if (toolBagNav) {
        toolBagNav.addEventListener('click', (e) => {
            // If not active, prevent default link action and expand
            if (!toolBagNav.classList.contains('active')) {
                e.preventDefault();
                toolBagNav.classList.add('active');
            }
        });
        // Close if clicked outside
        document.addEventListener('click', (e) => {
            if (!toolBagNav.contains(e.target)) {
                toolBagNav.classList.remove('active');
            }
        });
    }

    // --- EVENT LISTENERS ---

    // Search Bar
    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', (e) => {
        searchTerm = e.target.value.toLowerCase();
        sortSummary(); // Re-renders summary with all current filters/sorts
    });

    // --- Synchronized Currency Toggle Logic ---
    const currencyBtns = [
        document.getElementById('currency-toggle-btn'),
        document.getElementById('currency-toggle-btn2'),
        document.getElementById('currency-toggle-btn2'),
        document.getElementById('mobile-currency-btn')
    ].filter(btn => btn); // Filter out nulls

    function toggleCurrency() {
        // Cycle through NGN -> EUR -> NGN
        if (currencyState.current === 'NGN') currencyState.current = 'EUR';
        else currencyState.current = 'NGN';

        const nextCurrency = currencyState.current === 'NGN' ? 'EUR' : 'NGN';

        currencyBtns.forEach(btn => {
            const textSpan = btn.querySelector('.link-descr');
            if (textSpan) {
                textSpan.textContent = `Switch to ${nextCurrency}`;
            } else {
                btn.textContent = `Switch to ${nextCurrency}`;
            }
        });
        updateAllPrices(); // Re-render content with new prices
    }

    currencyBtns.forEach(btn => btn.addEventListener('click', toggleCurrency));

    // --- Panel Closing Logic (with DOM removal) ---
    document.addEventListener('click', function(event) {
        const openPanel = document.querySelector('.tool-bag-tdescr.is-visible');
        if (!openPanel) return;

        // Do not close if the click is on the panel itself or on any tool card
        const isClickOnToolCard = event.target.closest('.tool-card');
        const isClickInsidePanel = openPanel.contains(event.target);

        if (!isClickInsidePanel && !isClickOnToolCard) {
            // Clear the slider interval before closing to prevent memory leaks
            const intervalId = openPanel.dataset.sliderIntervalId;
            if (intervalId) {
                clearInterval(parseInt(intervalId, 10));
            }

            openPanel.classList.remove('is-visible');
            // After the slide-out animation finishes, remove the element from the DOM.
            openPanel.addEventListener('transitionend', () => openPanel.remove(), { once: true });
        }
    });

    // --- Navbar Dropdown Scroll Logic ---
    const dropdownLinks = document.querySelectorAll('.dropdown-content a');
    const toolBagSection = document.getElementById('prospects');
    const toolBagContainer = document.querySelector('.tool-bag');

    dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href'); // e.g., "#learn-tools"
            const targetId = href ? href.substring(1) : null;
            const targetGroup = document.getElementById(targetId);

            if (targetGroup && toolBagContainer && toolBagSection) {
                // 1. Vertical Scroll First
                toolBagSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // 2. Horizontal Scroll (Delayed to allow vertical to start)
                setTimeout(() => {
                    // Dynamic Scroll Calculation
                    const scrollPos = targetGroup.offsetLeft - (window.innerWidth * 0.05); // 5% margin

                    toolBagContainer.scrollTo({
                        left: scrollPos,
                        behavior: 'smooth'
                    });
                }, 600); // 600ms delay for visual sequencing
            }
        });
    });

    // --- Mobile Utility Bar Logic ---
    const searchIconBtn = document.getElementById('search-icon-btn');
    const searchInput = document.getElementById('search-bar');
    const filterHamBtn = document.getElementById('filter-hamburger-btn');
    const filterContainer = document.querySelector('.summary-filter-container');

    if (searchIconBtn && searchInput) {
        searchIconBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            // Expand search bar and hide icon with animation
            searchInput.classList.add('expanded');
            searchIconBtn.classList.add('hide-anim');
            searchInput.focus();
        });

        // Close search bar when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchIconBtn.contains(e.target)) {
                searchInput.classList.remove('expanded');
                searchIconBtn.classList.remove('hide-anim'); // Show icon again
            }
        });
    }

    if (filterHamBtn && filterContainer) {
        filterHamBtn.addEventListener('click', () => {
            const isNowOpen = filterContainer.classList.toggle('show');
            document.querySelector('.utility-top-row').classList.toggle('filters-expanded', isNowOpen);
            if (!isNowOpen) {
                // When closing, update lastScrollTop to prevent navbar from showing
                lastScrollTop = 0;
            }
        });

        // Close filters when clicking outside
        document.addEventListener('click', (e) => {
            if (filterContainer.classList.contains('show') && 
                !filterContainer.contains(e.target) && 
                !filterHamBtn.contains(e.target)) {
                filterContainer.classList.remove('show');
                document.querySelector('.utility-top-row').classList.remove('filters-expanded');
                // When closing, update lastScrollTop to prevent navbar from showing
                lastScrollTop = 0;
            }
        });
    }
});              