/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function navDropDown() {
  document.getElementById("prosCatDrop").style.height = "16rem";
  // document.getElementById("navContainer").style.overflow = "visible";
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(e) {
  if (!e.target.matches('.drop-down-btn')) {
  var myDropdown = document.getElementById("prosCatDrop");
    if (myDropdown.style.height === "16rem") {
      myDropdown.style.height = "4rem";
    }
  }

  // if (!e.target.matches('.drop-down-btn')) {
  // var myDropdown = document.getElementById("navContainer");
  //   if (myDropdown.style.overflow = "visible") {
  //     myDropdown.style.overflow = "hidden";
  //   }
  // }
}

// function hiddenReveal() {
//   document.getElementById("hiddenReveal").classList.add("hidden-reveal");
//   // document.getElementById("navContainer").style.overflow = "visible";
// }

/* Loop through all dropdown buttons to toggle 
 between hiding and showing its dropdown content 
 - This allows the user to have multiple dropdowns without any conflict */
// var hidrev = document.getElementsByClassName("summary-tool-card-container");
// var i;

// for (i = 0; i < hidrev.length; i++) {
//   hidrev[i].addEventListener("click", function() {
//     this.classList.add("stcc-active");
//   });

//   window.onclick = function(r) {
//   if (!r.target.matches('summary-tool-card-container')) {
//     var hidrev = document.querySelectorAll('.summary-tool-card-container');
//         if (hidrev.classList.contains("stcc-active")) (
//             hidrev.classList.remove("stcc-active")
//         )
//     }
//   }
// }

// window.onclick = function(r) {
//   if (!r.target.matches('summary-tool-card-container')) {
//     var hidrev = document.querySelectorAll('.summary-tool-card-container');
//         if (hidrev.classList.contains("stcc-active")) (
//             hidrev.classList.remove("stcc-active")
//         )
//     }
//   }

// /* --- Product Detail Card Logic (The requested functionality) --- */
// document.addEventListener('DOMContentLoaded', () => {
//     const toolCards = document.querySelectorAll('.tool-card');
//     if (toolCards.length > 0) {
//         toolCards.forEach(card => {
//             card.addEventListener('click', () => {
//                 const gridContainer = card.closest('.tool-bag-grid-container');
//                 if (!gridContainer) return;
//                 const detailsString = card.getAttribute('data-product-details');
                
//                 // Only proceed if data is available
//                 if (!detailsString) { 
//                     // This ensures cards without the data attribute are ignored
//                     return; 
//                 }

//                 let product;
//                 try {
//                     product = JSON.parse(detailsString);
//                 } catch (e) {
//                     console.error("Error parsing product details JSON:", e);
//                     return;
//                 }

//                 // 1. CLEANUP: Remove any existing description div
//                 const existingDescr = gridContainer.querySelector('.tool-bag-tdescr');
//                 if (existingDescr) { existingDescr.remove(); }

//                 // 2. GENERATE HTML
//                 const newHTML = buildDescriptionHTML(card, product);

//                 // 3. INSERTION: Inject the new details div
//                 gridContainer.insertAdjacentHTML('beforeend', newHTML);

//                 // *** NEW LINE ***
//                 // Get the newly inserted element and trigger the fade-in transition
//                 const newDescr = gridContainer.querySelector('.tool-bag-tdescr');
//                 // Use requestAnimationFrame to ensure the browser has time to register the element
//                 // before adding the class, which correctly triggers the transition.
//                 requestAnimationFrame(() => {
//                     if (newDescr) {
//                         newDescr.classList.add('is-visible');
//                     }
//                 });
//             });
//         });
//     }
    
//     // Initial call to render the summary items when the page loads
//     renderSummaryItems(allSummaryItems);
//     setupFiltering();
//   });

// /* --- Updated Logic: Close on outside click with transition --- */
// document.addEventListener('click', (event) => {
//     const detailPanel = document.querySelector('.tool-bag-tdescr');
    
//     if (detailPanel) {
//         const isCard = event.target.closest('.tool-card');
//         const isInsideDetailPanel = event.target.closest('.tool-bag-tdescr');
        
//         if (!isCard && !isInsideDetailPanel) {
            
//             // 1. Trigger the fade-out transition by removing the active class
//             detailPanel.classList.remove('is-visible');
            
//             // 2. Wait for the CSS transition to complete (0.4s) before removing the element
//             detailPanel.addEventListener('transitionend', function handler() {
//                 // Ensure we only remove it if it's still present
//                 if (!detailPanel.classList.contains('is-visible')) {
//                     detailPanel.remove();
//                 }
//                 // Important: Remove the listener after execution to prevent memory leaks
//                 detailPanel.removeEventListener('transitionend', handler);
//             });
//         }
//     }
// });


/* --- Helper function to build the inner HTML content (Revised) --- */
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

    // IMPORTANT: This function now returns the inner content block, 
    // wrapped in a new container for easier replacement.
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

/* --- Main Logic --- */
document.addEventListener('DOMContentLoaded', () => {
    const toolCards = document.querySelectorAll('.tool-card');

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
                
                // 1. Generate the inner HTML content
                const innerHTMLContent = buildDescriptionHTML(card, product);

                let existingDescr = gridContainer.querySelector('.tool-bag-tdescr');
                
                // --- CORE LOGIC CHANGE ---
                if (existingDescr) {
                    // SCENARIO 1: REUSE & UPDATE (No animation)
                    const innerWrapper = existingDescr.querySelector('.tool-bag-tdescr-inner');
                    if (innerWrapper) {
                        // Replace the content of the inner wrapper immediately
                        innerWrapper.outerHTML = innerHTMLContent;
                    } else {
                        // Fallback: If inner wrapper is missing, just replace all content
                        existingDescr.innerHTML = innerHTMLContent; 
                    }
                } else {
                    // SCENARIO 2: INITIAL INSERTION (With animation)
                    // 2a. Wrap the content in the animatable outer div
                    const newHTML = `<div class="tool-bag-tdescr">${innerHTMLContent}</div>`;

                    // 2b. Insert the new div
                    gridContainer.insertAdjacentHTML('beforeend', newHTML);
                    
                    // 2c. Get the element and trigger the slide-in transition
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

    // --- CLOSE ON OUTSIDE CLICK LOGIC (With Slide-Out Transition) ---
    document.addEventListener('click', (event) => {
        const detailPanel = document.querySelector('.tool-bag-tdescr');
        
        if (detailPanel) {
            const isCard = event.target.closest('.tool-card');
            const isInsideDetailPanel = event.target.closest('.tool-bag-tdescr');
            
            if (!isCard && !isInsideDetailPanel) {
                
                // Trigger the fade-out/slide-out transition
                detailPanel.classList.remove('is-visible');
                
                // Wait for the transition to finish before removing the element
                // The duration (0.4s) must match the CSS transition duration
                detailPanel.addEventListener('transitionend', function handler() {
                    // Only remove if it has actually transitioned out
                    if (!detailPanel.classList.contains('is-visible')) {
                        detailPanel.remove();
                    }
                    // Clean up the event listener
                    detailPanel.removeEventListener('transitionend', handler);
                });
            }
        }
    });

    // Initial call to render the summary items when the page loads
    renderSummaryItems(allSummaryItems);
    setupFiltering();
});

const allSummaryItems = [
    // Essential (10)
    { id: 1, name: "Precision HexDriver Set", price: 35.99, category: "Essential", store: "iFixit", brief: "Core 64-bit magnetic driver system.", shipping: "Paid" },
    { id: 2, name: "Digital Multimeter (Fluke)", price: 65.00, category: "Essential", store: "TechSupply", brief: "Reliable voltage and continuity checks.", shipping: "Paid" },
    { id: 3, name: "Compact Soldering Station", price: 75.00, category: "Essential", store: "ElectronicsCo", brief: "Adjustable temp for board repairs.", shipping: "Paid" },
    { id: 4, name: "Anti-Static Wrist Strap", price: 5.99, category: "Essential", store: "Temu", brief: "Mandatory ESD protection.", shipping: "Free Shpping" },
    { id: 5, name: "Thermal Paste (Arctic)", price: 7.50, category: "Essential", store: "PC Coolers", brief: "High-performance CPU cooling solution.", shipping: "Paid" },
    { id: 6, name: "Nylon Spudger Kit", price: 8.99, category: "Essential", store: "iFixit", brief: "Non-marring tool for prying cases.", shipping: "Paid" },
    { id: 7, name: "Tweezer Set (ESD Safe)", price: 12.00, category: "Essential", store: "Aliexpress", brief: "Fine control for small components.", shipping: "Free Shpping" },
    { id: 8, name: "Compressed Air Duster (Refillable)", price: 29.00, category: "Essential", store: "EcoClean", brief: "Sustainable dust removal.", shipping: "Paid" },
    { id: 9, name: "Screen Suction Cup", price: 4.50, category: "Essential", store: "RepairCo", brief: "Safely lifting monitor screens.", shipping: "Paid" },
    { id: 10, name: "HDMI Diagnostic Dongle", price: 15.00, category: "Essential", store: "VideoTools", brief: "Quick video signal testing.", shipping: "Free Shpping", image1: "images/3 (3).jpg", image2: "images/5 (1).jpg" },
    
    // Learning (15)
    { id: 11, name: "Arduino Uno R3 Starter Kit", price: 55.99, category: "Learning", store: "Aliexpress", brief: "Introduction to embedded systems.", shipping: "Free Shpping" },
    { id: 12, name: "Breadboard & Jumper Wires", price: 10.50, category: "Learning", store: "MakerSpace", brief: "Prototyping circuits without soldering.", shipping: "Paid" },
    { id: 13, name: "Raspberry Pi 5 (8GB)", price: 80.00, category: "Learning", store: "PiHut", brief: "Advanced project development platform.", shipping: "Paid" },
    { id: 14, name: "Electronic Components Box", price: 22.00, category: "Learning", store: "ResistorKing", brief: "Assorted resistors, capacitors, LEDs.", shipping: "Paid" },
    { id: 15, name: "Oscilloscope Simulator Licence", price: 40.00, category: "Learning", store: "SimuLab", brief: "Virtual waveform analysis software.", shipping: "Paid" },
    { id: 16, name: "Logic Analyzer (USB)", price: 35.00, category: "Learning", store: "Aliexpress", brief: "Digital signal debugging tool.", shipping: "Free Shpping" },
    { id: 17, name: "Book: Practical Electronics", price: 28.50, category: "Learning", store: "University Press", brief: "Essential theory and projects.", shipping: "Paid" },
    { id: 18, name: "3D Printer Filament (PLA)", price: 18.00, category: "Learning", store: "FilamentPro", brief: "Material for custom tool holders.", shipping: "Paid" },
    { id: 19, name: "Python Programming Course", price: 15.00, category: "Learning", store: "CodeAcademy", brief: "Automation and data analysis skill.", shipping: "Free Shpping" },
    { id: 20, name: "Bench Power Supply (Variable)", price: 95.00, category: "Learning", store: "LabEquipment", brief: "Testing circuits under various loads.", shipping: "Paid" },
    { id: 21, name: "ESP32 Wi-Fi Module", price: 8.00, category: "Learning", store: "Temu", brief: "Microcontroller with integrated Wi-Fi.", shipping: "Free Shpping" },
    { id: 22, name: "IoT Sensor Kit", price: 25.00, category: "Learning", store: "MakerSpace", brief: "Temperature, humidity, motion sensors.", shipping: "Paid" },
    { id: 23, name: "Li-Po Battery Charger Module", price: 6.00, category: "Learning", store: "Aliexpress", brief: "Safe battery charging practice.", shipping: "Free Shpping" },
    { id: 24, name: "Fritzing Software Licence", price: 12.00, category: "Learning", store: "Fritzing", brief: "Diagramming and PCB layout.", shipping: "Free Shpping" },
    { id: 25, name: "Heat Shrink Tubing Assortment", price: 9.00, category: "Learning", store: "WirePro", brief: "Insulation and protection for joins.", shipping: "Paid" },
    
    // Repair (15)
    { id: 26, name: "Jig for Screen Separation", price: 45.00, category: "Repair", store: "RepairPro", brief: "Non-destructive phone/tablet opening.", shipping: "Paid" },
    { id: 27, name: "BGA Rework Stencil Kit", price: 32.00, category: "Repair", store: "ChipFix", brief: "Reballing GPU/CPU chips.", shipping: "Paid" },
    { id: 28, name: "Microscope (Digital USB)", price: 70.00, category: "Repair", store: "Aliexpress", brief: "High-magnification component inspection.", shipping: "Free Shpping" },
    { id: 29, name: "Solder Wick & Flux", price: 11.50, category: "Repair", store: "ElectronicsCo", brief: "Removing excess solder.", shipping: "Paid" },
    { id: 30, name: "Desoldering Pump (Vacuum)", price: 18.00, category: "Repair", store: "ToolMaster", brief: "Manual solder removal.", shipping: "Paid" },
    { id: 31, name: "Magnifying Lamp (LED)", price: 49.00, category: "Repair", store: "Workshop Gear", brief: "Illuminated hands-free work.", shipping: "Paid" },
    { id: 32, name: "DC Power Supply Benchtop", price: 120.00, category: "Repair", store: "LabEquipment", brief: "Powering devices for diagnostics.", shipping: "Paid" },
    { id: 33, name: "Diagnostic Burn-in Software", price: 60.00, category: "Repair", store: "StressTest", brief: "Testing stability under load.", shipping: "Paid" },
    { id: 34, name: "Pry Tool (Metal, Thin)", price: 5.00, category: "Repair", store: "Jumia", brief: "For tough, sealed cases.", shipping: "Free Shpping" },
    { id: 35, name: "Fiber Optic Cleaning Kit", price: 25.00, category: "Repair", store: "NetTools", brief: "Cleaning network connections.", shipping: "Paid" },
    { id: 36, name: "Logic Probe and Pulser", price: 22.00, category: "Repair", store: "DigitalTools", brief: "Tracing digital signals.", shipping: "Paid" },
    { id: 37, name: "Hot Air Gun (Digital)", price: 85.00, category: "Repair", store: "Jumia", brief: "SMD component removal.", shipping: "Paid" },
    { id: 38, name: "UV Curing Lamp", price: 15.00, category: "Repair", store: "AdhesivePro", brief: "For curing UV solder mask.", shipping: "Paid" },
    { id: 39, name: "Laptop Screen Adhesive Strips", price: 10.00, category: "Repair", store: "RepairCo", brief: "Re-sealing modern laptops.", shipping: "Paid" },
    { id: 40, name: "Oscilloscope Probes (High-Z)", price: 30.00, category: "Repair", store: "Temu", brief: "Accurate signal measurement.", shipping: "Free Shpping" },

    // Productivity (5)
    { id: 41, name: "Cloud Storage Subscription", price: 8.00, category: "Productivity", store: "MegaCorp", brief: "Secure client data backup.", shipping: "Free Shpping" },
    { id: 42, name: "Label Maker (Thermal)", price: 45.00, category: "Productivity", store: "Dymo", brief: "Organizing parts and repairs.", shipping: "Paid" },
    { id: 43, name: "Client Management Software", price: 19.99, category: "Productivity", store: "RepairFlow", brief: "Tracking job statuses.", shipping: "Paid" },
    { id: 44, name: "Ergonomic Anti-Fatigue Mat", price: 55.00, category: "Productivity", store: "ComfortZone", brief: "Reducing strain during long repairs.", shipping: "Paid" },
    { id: 45, name: "Wireless Presentation Remote", price: 15.00, category: "Productivity", store: "OfficeGear", brief: "For training and meetings.", shipping: "Paid" },

    // Exotic (5)
    { id: 46, name: "Quantum Flux Capacitor", price: 1500.00, category: "Exotic", store: "TemporalTech", brief: "Experimental component. Use with caution.", shipping: "Paid" },
    { id: 47, name: "Holographic Work Surface", price: 250.00, category: "Exotic", store: "FutureLabs", brief: "Floating component inventory display.", shipping: "Paid" },
    { id: 48, name: "AI Troubleshooting Assistant", price: 99.00, category: "Exotic", store: "SyntaxCorp", brief: "Predictive failure analysis software.", shipping: "Paid" },
    { id: 49, name: "Plasma Etcher Mini", price: 300.00, category: "Exotic", store: "MicroFabrication", brief: "Removing thin layers of material precisely.", shipping: "Paid" },
    { id: 50, name: "DIY Laptop Power Bank Project", price: 110.00, category: "Exotic", store: "BatteryKing", brief: "Components for a high-capacity custom power bank.", shipping: "Paid" }
];

// Function to update the brief prices
function updateBriefs() {
    const categories = ['Learning', 'Repair', 'Productivity'];
    categories.forEach(cat => {
        const items = allSummaryItems.filter(item => item.category === cat);
        const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
        const count = items.length;
        const shippingEl = document.getElementById(`${cat.toLowerCase()}-total-shipping`);
        if (shippingEl) {
            const shipping = parseFloat(shippingEl.textContent);
            const totalPlus = totalPrice + shipping;
            document.getElementById(`${cat.toLowerCase()}-total-price`).textContent = totalPrice.toFixed(2);
            document.getElementById(`${cat.toLowerCase()}-count`).textContent = count;
            document.getElementById(`${cat.toLowerCase()}-total-plus`).textContent = totalPlus.toFixed(2);
        }
    });
}

// 2. RENDERING FUNCTION
function renderSummaryItems(items) {
    const grid = document.getElementById('summaryGrid');
    if (!grid) return;

    grid.classList.add('is-filtering');

    setTimeout(() => {
        grid.innerHTML = '';
        
        items.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'summary-tool-card-container';
            // Minor adjustment to animation timing for better sequential flow
            card.style.animationDelay = `${index * 0.02}s`; 

            let extraInfo = '';
            if (item.shipping === 'Free') {
                extraInfo += ' <span style="color:var(--color-teal); font-weight:700;">(Free Ship)</span>';
            }

            card.innerHTML = `
                <div class="summary-tool-card" onclick="hiddenReveal()">

                    <div class="summary-tool-pics"><img src="${item.image1}"><img src="${item.image2}"></div>
                    <h1 class="hidden-tool-name">${item.name}</h1>
                    <h2 class="summary-tool-store">${item.store}</h4>
                    <h1 class="summary-tool-price">£${item.price.toFixed(2)}</h1>
                    <h1 class="summary-tool-shipping">${item.shipping}</h1>
                    <h2 class="hidden-tool-store">${item.category} | ${item.store}${extraInfo}</button></h2>
                </div>
            `;
            grid.appendChild(card);
        });

        grid.classList.remove('is-filtering');
    }, 200); 
}

// 3. FILTERING LOGIC (UPDATED)
function setupFiltering() {
    const filterButtons = document.querySelectorAll('.filter-button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterCategory = this.getAttribute('data-filter');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            let filteredItems;
            
            if (filterCategory === 'All') {
                filteredItems = allSummaryItems;
            } else if (filterCategory === 'FreeShipping') {
                // NEW FILTER LOGIC: Filter by shipping status
                filteredItems = allSummaryItems.filter(item => item.shipping === 'Free');
            } else if (filterCategory === 'MajorRetailers') {
                // NEW FILTER LOGIC: Filter by specific stores (Aliexpress, Jumia, Temu)
                const retailers = ['Aliexpress', 'Jumia', 'Temu'];
                filteredItems = allSummaryItems.filter(item => retailers.includes(item.store));
            } else {
                // Existing category filters
                filteredItems = allSummaryItems.filter(item => item.category === filterCategory);
            }
            
            // Update button count to match filtered results (optional visual flair)
            this.textContent = `${this.getAttribute('data-filter')} (${filteredItems.length})`;


            renderSummaryItems(filteredItems);
        });
    });
}

// Handle tool group navigation for centering
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#') && href !== '#') {
                const target = document.querySelector(href);
                if (target && target.classList.contains('tools-group')) {
                    e.preventDefault();
                    const container = document.querySelector('.tool-bag');
                    if (container) {
                        const containerRect = container.getBoundingClientRect();
                        const targetRect = target.getBoundingClientRect();
                        const targetCenter = targetRect.left + targetRect.width / 2;
                        const containerCenter = containerRect.left + containerRect.width / 2;
                        const scrollAmount = targetCenter - containerCenter;
                        container.scrollBy({
                            left: scrollAmount,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    });

    // Update the brief prices
    updateBriefs();
});

// Download functionality
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
            const element = document.getElementById('summaryGrid');
            if(!element) return alert("Summary Grid not found");
            
            if (!window.jspdf) {
                alert("PDF Library not loaded. Check internet connection.");
                return;
            }
            const { jsPDF } = window.jspdf;
            
            // Provide feedback
            const originalText = pdfBtn.querySelector('h1').innerText;
            pdfBtn.querySelector('h1').innerText = "Generating...";

            html2canvas(element, { backgroundColor: "#FFFDD0" }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                
                // Calculate dimensions to fit the canvas
                const imgWidth = 210; // A4 width in mm
                const pageHeight = 295; // A4 height in mm
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                let heightLeft = imgHeight;
                
                let position = 0;
                
                // Add first page
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
                
                // Add additional pages if needed
                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }
                
                pdf.save('CURE_Inventory_Summary.pdf');
                pdfBtn.querySelector('h1').innerText = originalText;
            }).catch(err => {
                console.error(err);
                alert("Error generating PDF.");
                pdfBtn.querySelector('h1').innerText = originalText;
            });
        });
    }
}

// Initialize downloads when DOM is loaded
document.addEventListener('DOMContentLoaded', setupDownloads);

// Also call immediately in case DOM is already loaded
setupDownloads();