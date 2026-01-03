/* =========================================
   1. MASTER INVENTORY DATA
   (All 50 Items from your original list)
   ========================================= */
const inventory = [
    // Essential (10)
    { id: 1, name: "Precision HexDriver Set", price: 35.99, category: "Productivity", store: "iFixit", brief: "Core 64-bit magnetic driver system.", shipping: "Paid", 
      details: { description: "High-quality precision driver set for electronics.", specs: ["64 Bits", "Magnetic Handle", "Sim Ejector"], images: ["images/3 (3).jpg", "images/5 (1).jpg"], link: "#" } 
    },
    { id: 2, name: "Digital Multimeter (Fluke)", price: 65.00, category: "Productivity", store: "TechSupply", brief: "Reliable voltage and continuity checks.", shipping: "Paid" },
    { id: 3, name: "Compact Soldering Station", price: 75.00, category: "Productivity", store: "ElectronicsCo", brief: "Adjustable temp for board repairs.", shipping: "Paid" },
    { id: 4, name: "Anti-Static Wrist Strap", price: 5.99, category: "Productivity", store: "Temu", brief: "Mandatory ESD protection.", shipping: "Free" },
    { id: 5, name: "Thermal Paste (Arctic)", price: 7.50, category: "Productivity", store: "PC Coolers", brief: "High-performance CPU cooling solution.", shipping: "Paid", isEssential: "isEssential" },
    { id: 6, name: "Nylon Spudger Kit", price: 8.99, category: "Productivity", store: "iFixit", brief: "Non-marring tool for prying cases.", shipping: "Paid" },
    { id: 7, name: "Tweezer Set (ESD Safe)", price: 12.00, category: "Productivity", store: "Aliexpress", brief: "Fine control for small components.", shipping: "Free", isEssential: "isEssential" },
    { id: 8, name: "Compressed Air Duster", price: 29.00, category: "Productivity", store: "EcoClean", brief: "Sustainable dust removal.", shipping: "Paid" },
    { id: 9, name: "Screen Suction Cup", price: 4.50, category: "Productivity", store: "RepairCo", brief: "Safely lifting monitor screens.", shipping: "Paid" },
    { id: 10, name: "HDMI Diagnostic Dongle", price: 15.00, category: "Productivity", store: "VideoTools", brief: "Quick video signal testing.", shipping: "Free", image1: "images/3 (3).jpg", image2: "images/5 (1).jpg" },
    
    // Learning (15)
    { id: 11, name: "Arduino Uno R3 Starter Kit", price: 55.99, category: "Learning", store: "Aliexpress", brief: "Introduction to embedded systems.", shipping: "Free" },
    { id: 12, name: "Breadboard & Jumper Wires", price: 10.50, category: "Learning", store: "MakerSpace", brief: "Prototyping circuits without soldering.", shipping: "Paid", isEssential: "isEssential" },
    { id: 13, name: "Raspberry Pi 5 (8GB)", price: 80.00, category: "Learning", store: "PiHut", brief: "Advanced project development platform.", shipping: "Paid" },
    { id: 14, name: "Electronic Components Box", price: 22.00, category: "Learning", store: "ResistorKing", brief: "Assorted resistors, capacitors, LEDs.", shipping: "Paid" },
    { id: 15, name: "Oscilloscope Simulator Licence", price: 40.00, category: "Learning", store: "SimuLab", brief: "Virtual waveform analysis software.", shipping: "Paid", isEssential: "isEssential" },
    { id: 16, name: "Logic Analyzer (USB)", price: 35.00, category: "Learning", store: "Aliexpress", brief: "Digital signal debugging tool.", shipping: "Free" },
    { id: 17, name: "Book: Practical Electronics", price: 28.50, category: "Learning", store: "University Press", brief: "Essential theory and projects.", shipping: "Paid" },
    { id: 18, name: "3D Printer Filament (PLA)", price: 18.00, category: "Learning", store: "FilamentPro", brief: "Material for custom tool holders.", shipping: "Paid" },
    { id: 19, name: "Python Programming Course", price: 15.00, category: "Learning", store: "CodeAcademy", brief: "Automation and data analysis skill.", shipping: "Free", isEssential: "isEssential" },
    { id: 20, name: "Bench Power Supply (Variable)", price: 95.00, category: "Learning", store: "LabEquipment", brief: "Testing circuits under various loads.", shipping: "Paid" },
    { id: 21, name: "ESP32 Wi-Fi Module", price: 8.00, category: "Learning", store: "Temu", brief: "Microcontroller with integrated Wi-Fi.", shipping: "Free" },
    { id: 22, name: "IoT Sensor Kit", price: 25.00, category: "Learning", store: "MakerSpace", brief: "Temperature, humidity, motion sensors.", shipping: "Paid" },
    { id: 23, name: "Li-Po Battery Charger Module", price: 6.00, category: "Learning", store: "Aliexpress", brief: "Safe battery charging practice.", shipping: "Free" },
    { id: 24, name: "Fritzing Software Licence", price: 12.00, category: "Learning", store: "Fritzing", brief: "Diagramming and PCB layout.", shipping: "Free" },
    { id: 25, name: "Heat Shrink Tubing Assortment", price: 9.00, category: "Learning", store: "WirePro", brief: "Insulation and protection for joins.", shipping: "Paid" },
    
    // Repair (15)
    { id: 26, name: "Jig for Screen Separation", price: 45.00, category: "Repair", store: "RepairPro", brief: "Non-destructive phone/tablet opening.", shipping: "Paid" },
    { id: 27, name: "BGA Rework Stencil Kit", price: 32.00, category: "Repair", store: "ChipFix", brief: "Reballing GPU/CPU chips.", shipping: "Paid" },
    { id: 28, name: "Microscope (Digital USB)", price: 70.00, category: "Repair", store: "Aliexpress", brief: "High-magnification component inspection.", shipping: "Free" },
    { id: 29, name: "Solder Wick & Flux", price: 11.50, category: "Repair", store: "ElectronicsCo", brief: "Removing excess solder.", shipping: "Paid" },
    { id: 30, name: "Desoldering Pump (Vacuum)", price: 18.00, category: "Repair", store: "ToolMaster", brief: "Manual solder removal.", shipping: "Paid" },
    { id: 31, name: "Magnifying Lamp (LED)", price: 49.00, category: "Repair", store: "Workshop Gear", brief: "Illuminated hands-free work.", shipping: "Paid" },
    { id: 32, name: "DC Power Supply Benchtop", price: 120.00, category: "Repair", store: "LabEquipment", brief: "Powering devices for diagnostics.", shipping: "Paid" },
    { id: 33, name: "Diagnostic Burn-in Software", price: 60.00, category: "Repair", store: "StressTest", brief: "Testing stability under load.", shipping: "Paid", isEssential: "isEssential" },
    { id: 34, name: "Pry Tool (Metal, Thin)", price: 5.00, category: "Repair", store: "Jumia", brief: "For tough, sealed cases.", shipping: "Free" },
    { id: 35, name: "Fiber Optic Cleaning Kit", price: 25.00, category: "Repair", store: "NetTools", brief: "Cleaning network connections.", shipping: "Paid", isEssential: "isEssential" },
    { id: 36, name: "Logic Probe and Pulser", price: 22.00, category: "Repair", store: "DigitalTools", brief: "Tracing digital signals.", shipping: "Paid" },
    { id: 37, name: "Hot Air Gun (Digital)", price: 85.00, category: "Repair", store: "Jumia", brief: "SMD component removal.", shipping: "Paid", isEssential: "isEssential" },
    { id: 38, name: "UV Curing Lamp", price: 15.00, category: "Repair", store: "AdhesivePro", brief: "For curing UV solder mask.", shipping: "Paid" },
    { id: 39, name: "Laptop Screen Adhesive Strips", price: 10.00, category: "Repair", store: "RepairCo", brief: "Re-sealing modern laptops.", shipping: "Paid" },
    { id: 40, name: "Oscilloscope Probes (High-Z)", price: 30.00, category: "Repair", store: "Temu", brief: "Accurate signal measurement.", shipping: "Free" },

    // Productivity (5)
    { id: 41, name: "Cloud Storage Subscription", price: 8.00, category: "Productivity", store: "MegaCorp", brief: "Secure client data backup.", shipping: "Free", isEssential: "isEssential" },
    { id: 42, name: "Label Maker (Thermal)", price: 45.00, category: "Productivity", store: "Dymo", brief: "Organizing parts and repairs.", shipping: "Paid" },
    { id: 43, name: "Client Management Software", price: 19.99, category: "Productivity", store: "RepairFlow", brief: "Tracking job statuses.", shipping: "Paid" },
    { id: 44, name: "Ergonomic Anti-Fatigue Mat", price: 55.00, category: "Productivity", store: "ComfortZone", brief: "Reducing strain during long repairs.", shipping: "Paid" },
    { id: 45, name: "Wireless Presentation Remote", price: 15.00, category: "Productivity", store: "OfficeGear", brief: "For training and meetings.", shipping: "Paid" },

    // Exotic (5)
    { id: 46, name: "Quantum Flux Capacitor", price: 1500.00, category: "Repair", store: "TemporalTech", brief: "Experimental component. Use with caution.", shipping: "Paid", isEssential: "isEssential" },
    { id: 47, name: "Holographic Work Surface", price: 250.00, category: "Repair", store: "FutureLabs", brief: "Floating component inventory display.", shipping: "Paid" },
    { id: 48, name: "AI Troubleshooting Assistant", price: 99.00, category: "Repair", store: "SyntaxCorp", brief: "Predictive failure analysis software.", shipping: "Paid", isEssential: "isEssential" },
    { id: 49, name: "Plasma Etcher Mini", price: 300.00, category: "Repair", store: "MicroFabrication", brief: "Removing thin layers of material precisely.", shipping: "Paid" },
    { id: 50, name: "DIY Laptop Power Bank Project", price: 110.00, category: "Repair", store: "BatteryKing", brief: "Components for a high-capacity custom power bank.", shipping: "Paid", isEssential: "isEssential" }
];

/* =========================================
   2. NAVBAR & UI LOGIC
   ========================================= */
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "50%"; // Reset to center-ish
  } else {
    document.getElementById("navbar").style.top = "-50px"; // Hide
  }
  prevScrollpos = currentScrollPos;
}

/* =========================================
   3. RENDERING: MAIN SECTIONS (Big Cards)
   ========================================= */
function renderToolGroups() {
    // 1. Render Learning Tools
    renderSection("Learning", "learn-tools");
    // 2. Render Repair Tools
    renderSection("Repair", "repair-tools");
    // 3. Render Productivity Tools
    renderSection("Productivity", "prod-tools");
}

function renderSection(categoryName, containerId) {
    const container = document.querySelector(`#${containerId} .tool-bag-grid`);
    if (!container) return;
    
    container.innerHTML = ''; // Clear existing

    // Filter items
    const items = inventory.filter(item => item.category === categoryName);

    items.forEach(item => {
        // --- SMART DETAIL GENERATOR ---
        // If 'details' doesn't exist, create it from brief
        let detailsObj = item.details || {};
        
        // Fill in missing properties
        if(!detailsObj.description) detailsObj.description = item.brief;
        if(!detailsObj.specs) detailsObj.specs = ["Standard Specification", "Professional Grade"];
        if(!detailsObj.images) detailsObj.images = [item.image1 || "", item.image2 || ""].filter(Boolean); // Handle your legacy image keys
        if(!detailsObj.price) detailsObj.price = `£${item.price.toFixed(2)}`;
        if(!detailsObj.store) detailsObj.store = item.store;
        if(!detailsObj.link) detailsObj.link = "#";

        const dataString = JSON.stringify(detailsObj).replace(/'/g, "&apos;");
        const imageSrc = (detailsObj.images && detailsObj.images.length > 0) ? detailsObj.images[0] : ""; 

        const html = `
            <div class="tool-card" data-product-details='${dataString}'>
                <div class="tool-pics-container">
                    <img src="${imageSrc}" alt="${item.name}" class="tool-pics" onerror="this.style.display='none'">
                </div>
                <h1 class="tool-name">${item.name}</h1>
                <h5 class="tool-store">${item.store}</h5>
                <h1 class="tool-price">£${item.price.toFixed(2)}</h1>  
            
                <div class="go-to-page">
                    <a href="#">View Details ➔</a>                            
                </div>  
            </div> 
        `;
        container.insertAdjacentHTML('beforeend', html);
    });

    // Re-attach the click event listeners for the new cards
    attachDetailListeners(container);
}

/* =========================================
   5. DETAIL VIEW LOGIC (Slide In/Out)
   ========================================= */
function buildDescriptionHTML(cardElement, productDetails) {
    const toolName = cardElement.querySelector('.tool-name')?.textContent.trim() || 'Product Details';
    
    const imageHTML = (productDetails.images && productDetails.images.length > 0) 
        ? productDetails.images.map(src => `<img src="${src}" alt="Product Image" class="product-detail-img">`).join('')
        : '<p style="color:var(--color-text-dim);">No images available.</p>';
        
    const specsHTML = (productDetails.specs && productDetails.specs.length > 0)
        ? productDetails.specs.map(spec => `<li>${spec}</li>`).join('')
        : '<li>No detailed specifications listed.</li>';
        
    const description = productDetails.description || 'No detailed description available.';
    const price = productDetails.price || 'Price not listed';
    const store = productDetails.store || 'Store not specified';
    const link = productDetails.link || '#';

    return `
        <div class="tool-bag-tdescr-inner">
            <h2>${toolName}</h2>
            <div class="detail-content-wrapper">
                <div class="detail-images">${imageHTML}</div>
                <div class="detail-info">
                    <p class="detail-price">Price: <strong>${price}</strong></p>
                    <h3>Description</h3><p style="color:var(--color-text-light);">${description}</p>
                    <h3>Specifications</h3><ul>${specsHTML}</ul>
                    <h3>Online Store</h3>
                    <p style="color:var(--color-text-light);">Available at: ${store}</p>
                    <a href="${link}" target="_blank" class="detail-link">Visit Store Page ✦</a>
                </div>
            </div>
        </div>
    `;
}

function attachDetailListeners(containerContext) {
    const toolCards = containerContext.querySelectorAll('.tool-card');

    if (toolCards.length > 0) {
        toolCards.forEach(card => {
            card.addEventListener('click', () => {
                const gridContainer = card.closest('.tool-bag-grid-container');
                if (!gridContainer) return;
                const detailsString = card.getAttribute('data-product-details');

                if (!detailsString) { return; }

                let product;
                try {
                    product = JSON.parse(detailsString);
                } catch (e) {
                    console.error("Error parsing product details JSON:", e);
                    return;
                }
                
                const innerHTMLContent = buildDescriptionHTML(card, product);
                let existingDescr = gridContainer.querySelector('.tool-bag-tdescr');
                
                if (existingDescr) {
                    const innerWrapper = existingDescr.querySelector('.tool-bag-tdescr-inner');
                    if (innerWrapper) {
                        innerWrapper.outerHTML = innerHTMLContent;
                    } else {
                        existingDescr.innerHTML = innerHTMLContent; 
                    }
                } else {
                    const newHTML = `<div class="tool-bag-tdescr">${innerHTMLContent}</div>`;
                    gridContainer.insertAdjacentHTML('beforeend', newHTML);
                    
                    existingDescr = gridContainer.querySelector('.tool-bag-tdescr');
                    requestAnimationFrame(() => {
                        if (existingDescr) {
                            existingDescr.classList.add('is-visible');
                        }
                    });
                }
            });
        });
    }
}

// Global listener for closing detail panel
document.addEventListener('click', (event) => {
    const detailPanel = document.querySelector('.tool-bag-tdescr');
    
    if (detailPanel) {
        const isCard = event.target.closest('.tool-card');
        const isInsideDetailPanel = event.target.closest('.tool-bag-tdescr');
        
        if (!isCard && !isInsideDetailPanel) {
            detailPanel.classList.remove('is-visible');
            detailPanel.addEventListener('transitionend', function handler() {
                if (!detailPanel.classList.contains('is-visible')) {
                    detailPanel.remove();
                }
                detailPanel.removeEventListener('transitionend', handler);
            });
        }
    }
});

/* =========================================
   2. RENDERING THE NEW STORE (Grid)
   ========================================= */
function renderSummaryItems(itemsToRender) {
    const grid = document.getElementById('summaryGrid');
    
    // Elements for the Dynamic Total Logic
    const stickyTotalEl = document.getElementById('sticky-dynamic-price');
    const briefTotalEl = document.getElementById('brief-static-price');
    
    if (!grid) return;

    grid.innerHTML = '';
    let grandTotal = 0;

    itemsToRender.forEach((product, index) => {
        grandTotal += product.totalPrice;

        // 1. Badge Logic
        let badgeHtml = '';
        if(product.dealTag !== 'None') {
            let badgeClass = '';
            if(product.dealTag === 'Choice') badgeClass = 'deal-choice';
            else if(product.dealTag === 'SuperDeals') badgeClass = 'deal-super';
            else if(product.dealTag === 'Jumia Express') badgeClass = 'deal-express';
            else if(product.dealTag === 'Official Store') badgeClass = 'deal-official';
            badgeHtml = `<div class="deal-badge ${badgeClass}">${product.dealTag}</div>`;
        }

        // 2. Shipping Logic
        let shippingElem = product.shippingCost === 0 
            ? `<span class="free-ship-tag">Free Shipping</span>` 
            : "";

        // 3. Slider Generation (HTML)
        // We create a strip of emojis
        let sliderContent = product.sliderImages.map(emoji => 
            `<div class="slider-item">${emoji}</div>`
        ).join('');

        const card = document.createElement('div');
        card.className = 'card'; 
        // Staggered fade-in animation
        card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.02}s`;
        card.style.opacity = '0'; // Start hidden for animation
        
        card.innerHTML = `
            <div class="card-image-window">
                <div class="slider-track">
                    ${sliderContent}
                    </div>
            </div>
            <div class="card-body">
                <div class="meta-row">
                    <span class="card-category">${product.category}</span>                    
                    ${product.isEssential === 'isEssential' ? '<div class="essential-badge">ESSENTIAL</div>' : ''}
                </div>
                
                <div class="card-title">${product.name}</div>
                
                <span class="source-tag">${product.store}</span>
                ${badgeHtml}                
                
                <div class="card-footer">
                    <div class="price-breakdown">
                        £${product.basePrice.toFixed(2)} + ${product.shippingCost === 0 ? 'Free Ship' : '£' + product.shippingCost.toFixed(2) + ' ship'}
                    </div>
                    <div class="final-price-row">
                        <span class="final-price-label">Total:</span>
                        <span class="final-price">£${product.totalPrice.toFixed(2)}</span>
                        ${shippingElem}
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    // UPDATE TOTALS
    const formattedTotal = `£${grandTotal.toFixed(2)}`;
    
    // Update the Brief (Top) Total
    if(briefTotalEl) briefTotalEl.textContent = formattedTotal;
    
    // Update the Sticky (Hidden) Total
    if(stickyTotalEl) stickyTotalEl.textContent = formattedTotal;
}

/* =========================================
   3. SCROLL & SNAP LOGIC
   ========================================= */
function setupScrollSnapping() {
    const briefSection = document.querySelector('.summary-brief');
    const stickyContainer = document.querySelector('.sticky-total-container');
    
    if(!briefSection || !stickyContainer) return;

    // We use IntersectionObserver to watch the Brief Section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                // The brief is gone (scrolled up) -> Show sticky total
                stickyContainer.classList.add('visible');
            } else {
                // The brief is visible -> Hide sticky total
                stickyContainer.classList.remove('visible');
            }
        });
    }, {
        threshold: 0, // Trigger as soon as one pixel leaves
        rootMargin: "-80px 0px 0px 0px" // Adjust offset based on your header height
    });

    observer.observe(briefSection);
}

/* =========================================
   4. FILTER & SORT LOGIC
   ========================================= */
let currentSort = 'default';

function setupFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sort-select');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const criteria = this.getAttribute('data-filter');
            
            let filteredItems = inventory;
            if (criteria !== 'all') {
                if (criteria === 'Essential') {
                    filteredItems = inventory.filter(item => item.isEssential === 'isEssential');
                } else if (criteria === 'freeShipping') {
                    filteredItems = inventory.filter(item => item.shippingCost === 0);
                } else if (criteria === 'AliExpress' || criteria === 'Jumia') {
                    filteredItems = inventory.filter(item => item.store.includes(criteria));
                } else {
                    filteredItems = inventory.filter(item => item.category === criteria);
                }
            }
            applySortAndRender(filteredItems);
        });
    });

    if(sortSelect) {
        sortSelect.addEventListener('change', function() {
            currentSort = this.value;
            const activeBtn = document.querySelector('.filter-btn.active');
            if(activeBtn) activeBtn.click(); // Re-trigger filter logic
        });
    }
}

function applySortAndRender(list) {
    let sortedList = [...list];
    if (currentSort === 'price-asc') sortedList.sort((a, b) => a.totalPrice - b.totalPrice);
    else if (currentSort === 'price-desc') sortedList.sort((a, b) => b.totalPrice - a.totalPrice);
    
    renderSummaryItems(sortedList);
}

/* =========================================
   7. DOWNLOAD LOGIC (PDF & IMAGE)
   ========================================= */
function setupDownloads() {
    // IMAGE DOWNLOAD
    const imgBtn = document.querySelector('.dld-img');
    if(imgBtn) {
        imgBtn.addEventListener('click', () => {
            const element = document.getElementById('summaryGrid');
            if(!element) return alert("Summary Grid not found");
            
            // Provide feedback
            const originalText = imgBtn.querySelector('h1').innerText;
            imgBtn.querySelector('h1').innerText = "Generating...";

            html2canvas(element, { backgroundColor: "#FFFDD0" }).then(canvas => {
                const link = document.createElement('a');
                link.download = 'CURE_Inventory_Summary.png';
                link.href = canvas.toDataURL();
                link.click();
                imgBtn.querySelector('h1').innerText = originalText;
            }).catch(err => {
                console.error(err);
                alert("Error generating image.");
                imgBtn.querySelector('h1').innerText = originalText;
            });
        });
    }

    // PDF DOWNLOAD
    const pdfBtn = document.querySelector('.dld-pdf');
    if(pdfBtn) {
        pdfBtn.addEventListener('click', () => {
            if (!window.jspdf) {
                alert("PDF Library not loaded. Check internet connection.");
                return;
            }
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            const originalText = pdfBtn.querySelector('h1').innerText;
            pdfBtn.querySelector('h1').innerText = "Generating...";

            let yPos = 20;
            doc.setFontSize(20);
            doc.text("CURE Inventory 2025", 10, yPos);
            yPos += 10;
            
            doc.setFontSize(10);
            
            inventory.forEach((item, index) => {
                if(yPos > 280) { doc.addPage(); yPos = 20; }
                const line = `${index + 1}. [${item.category}] ${item.name} - £${item.price} (${item.store})`;
                doc.text(line, 10, yPos);
                yPos += 7;
            });

            doc.save("CURE_Inventory_List.pdf");
            pdfBtn.querySelector('h1').innerText = originalText;
        });
    }
}

/* =========================================
   5. INITIALIZATION
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Prepare Data
    enrichInventory();
    
    // 2. Initial Render
    renderSummaryItems(inventory);

    // 3. Setup Logic
    setupFiltering();
    setupScrollSnapping();
    
    // CSS Keyframe injection for FadeIn if not in CSS
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `@keyframes fadeIn { to { opacity: 1; } }`;
    document.head.appendChild(styleSheet);
});

// Helper to get random emojis
const toolEmojis = ["🔨", "🔌", "🔋", "💡", "💻", "📟", "📸", "🧱", "⚙️", "🔧", "🧲", "🕹️", "📡", "📼", "🔦"];

function enrichInventory() {
    const aliTags = ['Choice', 'SuperDeals', 'None', 'None']; 
    const jumiaTags = ['Jumia Express', 'Official Store', 'None', 'None'];
    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

    inventory.forEach(item => {
        item.basePrice = item.price;

        // Shipping Logic
        if (!item.shippingCost) { 
            const isFree = item.shipping === "Free" || Math.random() < 0.4;
            item.shippingCost = isFree ? 0 : randomInt(2, 25) + 0.50;
        }

        item.totalPrice = item.basePrice + item.shippingCost;

        // Deal Tag Logic
        if (!item.dealTag) {
            if (item.store.includes('Aliexpress')) item.dealTag = aliTags[randomInt(0, 3)];
            else if (item.store.includes('Jumia')) item.dealTag = jumiaTags[randomInt(0, 3)];
            else item.dealTag = 'None';
        }

        // SLIDER IMAGES: Generate 5 random emojis per product
        item.sliderImages = [];
        for(let i=0; i<5; i++) {
            item.sliderImages.push(toolEmojis[randomInt(0, toolEmojis.length - 1)]);
        }
    });
}