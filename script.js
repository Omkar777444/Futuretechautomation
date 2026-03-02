// --- NATIVE SHARE LOGIC ---
function shareProject(projectName) {
    const shareText = `Check out this engineering project from FutureTech: ${projectName}`;
    const siteUrl = window.location.href.split('?')[0]; // Gets the base URL
    
    if (navigator.share) {
        navigator.share({
            title: 'FutureTech Automation',
            text: shareText,
            url: siteUrl
        }).catch(console.error);
    } else {
        // Fallback for desktop browsers that don't support native sharing
        navigator.clipboard.writeText(`${shareText} - ${siteUrl}`);
        alert("Project details and website link copied to clipboard!");
    }
}

// 1. DATA: Your Business Database
let projects = [
    { 
        id: 1, category: "Electronics", name: "Mobile control robot car", 
        desc: "Mobile control robot car.", price: 2500, 
        img: "assets/robot.jpeg", video: "assets/robot.mp4",
        popularity: 95, 
    },

    { 
        id: 101, category: "DIY Kits", name: "Robot Car DIY Kit", 
        desc: "Complete kit: Chassis, Arduino, motors, and code access.", price: 1800, 
        img: "assets/robot.jpeg", video: "",
        popularity: 100, 
    },
    
    { 
        id: 2, category: "Electronics", name: "Alcohol Detector", 
        desc: "0-25V LCD measurement.", price: 1500, 
        img: "assets/alcohol.jpeg", video: "",
        popularity: 70, 
    },
    { 
        id: 3, category: "Mechanical", name: "Robotic Arm", 
        desc: "6-DOF Pick and Place robot.", price: 8500, 
        img: "assets/robotic.jpeg", video: "",
        popularity: 88, 
    },
    { 
        id: 4, category: "Mechanical", name: "360 degree car", 
        desc: "360 degree roatating car.", price: 8000, 
        img: "assets/360 degree car.jpeg", video: "",
        popularity: 88, 
    },
    { 
        id: 5, category: "Electrical", name: "plc system", 
        desc: "plc automatic system.", price: 20000, 
        img: "assets/plc system.jpeg", video: "",
        popularity: 88, 
    },
    { 
        id: 6, category: "Electrical", name: "automatic power factor", 
        desc: "automatic power factor.", price: 16000, 
        img: "assets/automatic power factor.jpeg", video: "",
        popularity: 88, 
    },
    { 
        id: 7, category: "Mechatronic", name: "Robotic Arm", 
        desc: "6-DOF Pick and Place robot.", price: 8500, 
        img: "assets/robotic.jpeg", video: "",
        popularity: 88, 
    }
    // Add Civil, Electrical, etc., here when ready

    
    
];

const app = document.getElementById('app');

function renderCategory(catName, sortBy = 'default') {
    // Filter first
    let filtered = projects.filter(p => p.category === catName);

    // Apply Sorting only if there are items to sort
    if (filtered.length > 0) {
        if (sortBy === 'priceLow') filtered.sort((a, b) => a.price - b.price);
        if (sortBy === 'priceHigh') filtered.sort((a, b) => b.price - a.price);
        if (sortBy === 'popular') filtered.sort((a, b) => b.popularity - a.popularity);
    }

    // Start building the HTML string
    let html = `
        <div class="category-header">
            <h2>${catName} Projects</h2>
            <div class="sort-bar">
                <label>Sort By: </label>
                <select onchange="renderCategory('${catName}', this.value)">
                       <option value="default">↕️ Sort By</option>
                       <option value="popular" ${sortBy==='popular'?'selected':''}>🔥 Trending</option>
                       <option value="priceLow" ${sortBy==='priceLow'?'selected':''}>💰 Price: Low to High</option>
                       <option value="priceHigh" ${sortBy==='priceHigh'?'selected':''}>💎 Price: High to Low</option>
                </select>
            </div>
        </div>
    `;

    // THE FEATURE YOU ASKED FOR: Empty State Check
    if (filtered.length === 0) {
        html += `
            <div style="text-align:center; padding: 50px; color: #666;">
                <h3>🚧 Projects Coming Soon</h3>
                <p>We are currently updating our ${catName} catalog. Contact us on WhatsApp for custom requirements!</p>
                <button onclick="contactWhatsApp('General ${catName} Inquiry')" style="background:#28a745; color:white; border:none; padding:10px 20px; border-radius:5px; cursor:pointer; margin-top:15px;">Inquire via WhatsApp</button>
            </div>
        `;
    } else {
        html += `<div class="product-grid">`;
        filtered.forEach(p => {
            html += `
                <div class="card">
                    <div class="media-container">
                ${p.video && p.video.trim() !== "" ? `
                    <div class="slider-wrapper" id="slider-${p.id}">
                        <img src="${p.img}" alt="${p.name}" class="active-media" onerror="this.src='https://via.placeholder.com/250'">
                        <video src="${p.video}" class="hidden-media" controls muted></video>
                        <div class="slider-controls">
                            <button onclick="toggleMedia(${p.id})">❮</button>
                            <button onclick="toggleMedia(${p.id})">❯</button>
                        </div>
                    </div>
                ` : `
                    <img src="${p.img}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/250'">
                `}
            </div>
                    <h3>${p.name}</h3>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; padding: 0 10px;">
                        <div style="font-size: 0.9rem; color: #666; font-weight: bold;">
                            🏷️ ${p.category}
                        </div>
                        <div style="font-size: 1.2rem; user-select: none;">
                            <span style="cursor: pointer;" onclick="shareProject('${p.name}')" title="Share Project">🔗</span>
                        </div>
                    </div>
                    <p>${p.desc}</p>
                    <p class="price">Starting at: ₹${p.price}</p>
                    <button onclick="contactWhatsApp('${p.name}')">Inquiry on WhatsApp</button>
                </div>
            `;
        });
        html += `</div>`;
    }
    
    app.innerHTML = html;

    
}

// --- UPGRADED INQUIRY FLOW ---

// 1. Opens the form instead of going straight to WhatsApp
function contactWhatsApp(projectName) {
    document.getElementById('inquiryProject').value = projectName;
    document.getElementById('inquiryProjectName').innerText = "Interested in: " + projectName;
    document.getElementById('inquiryModal').style.display = "block";
}

// 2. Closes the form and resets the textarea height
function closeInquiry() {
    document.getElementById('inquiryModal').style.display = "none";
    
    // Reset the textarea back to its default size when closed
    const detailsBox = document.getElementById('inqDetails');
    if (detailsBox) {
        detailsBox.style.height = 'auto';
    }
}

// 3. Formats the data and sends the text
function sendInquiry() {
    const project = document.getElementById('inquiryProject').value;
    const name = document.getElementById('inqName').value.trim();
    const role = document.getElementById('inqRole').value;
    const date = document.getElementById('inqDate').value;
    const details = document.getElementById('inqDetails').value.trim();

    // Basic validation so you don't get blank names
    if (!name) {
        alert("Please enter your name before proceeding.");
        return;
    }

    // Build the professional message layout
    let message = `Hello FutureTech, I want to inquire about a project.\n\n`;
    message += `*Project:* ${project}\n`;
    message += `*Name:* ${name}\n`;
    message += `*Role:* ${role}\n`;
    
    if (date) {
        // Formats the date nicely if they selected one
        message += `*Deadline:* ${new Date(date).toLocaleDateString('en-IN')}\n`;
    }
    
    if (details) {
        message += `*Requirements:* ${details}\n`;
    }

    // Encode and open WhatsApp
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/918888747557?text=${encodedMessage}`, '_blank');
    
    // Close the modal and reset the form
    closeInquiry();
    document.getElementById('inqName').value = '';
    document.getElementById('inqDate').value = '';
    document.getElementById('inqDetails').value = '';
}

// Initial view
// This ensures that when the site first opens, the user sees the Home/Hero section
renderHome();

// 1. Handle "Enter" key press
function handleSearch(event) {
    if (event.key === 'Enter') {
        executeSearch();
    }
}

// 2. The Search Logic (Upgraded with Sorting)
function executeSearch(searchQuery = null, sortBy = 'default') {
    // If no query is passed via the sort dropdown, grab it from the input box
    const query = searchQuery !== null ? searchQuery : document.getElementById('searchInput').value.toLowerCase();
    
    if (query.trim() === "") return; // Don't search if empty

    // Search in Name, Description, and Category
    let results = projects.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.desc.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );

    // Apply Sorting
    if (results.length > 0) {
        if (sortBy === 'priceLow') results.sort((a, b) => a.price - b.price);
        if (sortBy === 'priceHigh') results.sort((a, b) => b.price - a.price);
        if (sortBy === 'popular') results.sort((a, b) => b.popularity - a.popularity);
    }

    let html = `
        <div class="category-header">
            <h2>Search Results for: "${query}"</h2>
            <p>${results.length} projects found</p>
    `;

    // Only show the Sort dropdown if we actually found results
    if (results.length > 0) {
        html += `
            <div class="sort-bar">
                <label>Sort By: </label>
                <select onchange="executeSearch('${query}', this.value)">
                       <option value="default">↕️ Sort By</option>
                       <option value="popular" ${sortBy==='popular'?'selected':''}>🔥 Trending</option>
                       <option value="priceLow" ${sortBy==='priceLow'?'selected':''}>💰 Price: Low to High</option>
                       <option value="priceHigh" ${sortBy==='priceHigh'?'selected':''}>💎 Price: High to Low</option>
                </select>
            </div>
        `;
    }

    html += `</div>`; // Close category-header

    if (results.length === 0) {
        html += `
            <div style="text-align:center; padding: 50px;">
                <h3>❌ No matches found</h3>
                <p>Try searching for different keywords or contact us for custom development.</p>
                <button onclick="renderHome()" style="margin-top:10px; padding:10px;">Back to Home</button>
            </div>
        `;
    } else {
        html += `<div class="product-grid">`;
        results.forEach(p => {
            html += `
                <div class="card">
                    <div class="media-container">
                        ${p.video && p.video.trim() !== "" ? `
                            <div class="slider-wrapper" id="slider-${p.id}">
                                <img src="${p.img}" alt="${p.name}" class="active-media" onerror="this.src='https://via.placeholder.com/250'">
                                <video src="${p.video}" class="hidden-media" controls muted></video>
                                <div class="slider-controls">
                                    <button onclick="toggleMedia(${p.id})">❮</button>
                                    <button onclick="toggleMedia(${p.id})">❯</button>
                                </div>
                            </div>
                        ` : `
                            <img src="${p.img}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/250'">
                        `}
                    </div>
                    <h3>${p.name}</h3>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; padding: 0 10px;">
                        <div style="font-size: 0.9rem; color: #666; font-weight: bold;">
                            🏷️ ${p.category}
                        </div>
                        <div style="font-size: 1.2rem; user-select: none;">
                            <span style="cursor: pointer;" onclick="shareProject('${p.name}')" title="Share Project">🔗</span>
                        </div>
                    </div>
                    <p>${p.desc}</p>
                    <p class="price">Starting at: ₹${p.price}</p>
                    <button onclick="contactWhatsApp('${p.name}')">Inquiry on WhatsApp</button>
                </div>
            `;
        });
        html += `</div>`;
    }

    app.innerHTML = html;
}

function renderHome() {
    // Get the first 4 products to show as "Featured"
    const featuredProducts = projects.slice(0, 4);

    let html = `
        <section class="home-hero">
            <h1 class="brand-big">FUTURETECH</h1>
            <p class="tagline">Innovative Embedded & Robotics Solutions</p>
            <p class="price-disclaimer"><em>* Prices are flexible. We can discuss and customize according to your budget.</em></p>
            <button class="cta-btn" onclick="document.getElementById('featured').scrollIntoView()">Explore Projects</button>
        </section>

        <section class="home-about">
            <div class="about-content">
                <h2>About FutureTech</h2>
                <p>Based in Pune, India, FutureTech is a leading provider of embedded system solutions. We specialize in turning complex ideas into working prototypes using Arduino, ESP32, and Raspberry Pi.</p>
                <p>Whether you are a student looking for a final-year project or an industry professional needing a custom automation tool, we provide end-to-end support—from circuit design to final assembly.</p>
            </div>
        </section>

        <section id="featured" class="home-featured">
            <h2>Featured Solutions</h2>
            <div class="mini-product-grid">
    `;

    featuredProducts.forEach(p => {
        html += `
            <div class="mini-card">
                <div class="mini-media">
                    <img src="${p.img}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/150'">
                </div>
                <h4>${p.name}</h4>
                <div style="font-size: 0.85rem; color: #666; font-weight: bold; margin-bottom: 5px;">
                    🏷️ ${p.category}
                </div>
                <p class="price">Starting at: ₹${p.price}</p>
                <button onclick="contactWhatsApp('${p.name}')">Inquiry</button>
            </div>
        `;
    });

    html += `
            </div>
            <div class="view-all-container">
                <p class="view-all-text">Explore our full range of engineering solutions</p>
                <button class="view-all-btn" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">View All Categories Above ↑</button>
            </div>
        </section>
    `;

    // Trust-building section to replace the duplicate About block
    html += `
        <section class="home-about" style="background: var(--light); border-top: 1px solid #ddd;">
            <div class="about-content">
                <h2 style="color: var(--primary);">Why Choose FutureTech?</h2>
        <section class="home-about" style="background: var(--light); border-top: 1px solid #ddd;">
            <div class="about-content">
                <h2 style="color: var(--primary);">Why Choose FutureTech?</h2>
                <div style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; margin-top: 25px; text-align: left;">
                    <div style="flex: 1; min-width: 250px; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                        <h3 style="margin-top: 0; font-size: 1.2rem;">🛠️ Tested Hardware</h3>
                        <p style="font-size: 0.95rem; color: var(--dark);">Every kit and component is pre-tested before shipping. No faulty sensors or dead microcontrollers.</p>
                    </div>
                    <div style="flex: 1; min-width: 250px; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                        <h3 style="margin-top: 0; font-size: 1.2rem;">💻 Code & Diagrams</h3>
                        <p style="font-size: 0.95rem; color: var(--dark);">We don't just send raw hardware. You get fully commented source code and clear wiring diagrams.</p>
                    </div>
                    <div style="flex: 1; min-width: 250px; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                        <h3 style="margin-top: 0; font-size: 1.2rem;">📞 Engineer Support</h3>
                        <p style="font-size: 0.95rem; color: var(--dark);">Stuck on a bug? Get direct WhatsApp support from real engineers to help you troubleshoot your build.</p>
                    </div>
                </div>
            </div>
        </section>
    `;

    app.innerHTML = html;
}

function navigateToAbout() {
    // 1. First, render the home page content
    renderHome();

    // 2. Wait for the browser to render, then scroll
    // We use a small timeout (0ms) to push the scroll to the end of the execution queue
    setTimeout(() => {
        const aboutSection = document.querySelector('.home-about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 10);
}

function openContact() {
    document.getElementById("contactModal").style.display = "block";
}

function closeContact() {
    document.getElementById("contactModal").style.display = "none";
}

// Close any open modal if the user clicks the dark background outside the box
window.onclick = function(event) {
    let contactModal = document.getElementById("contactModal");
    let inquiryModal = document.getElementById("inquiryModal");
    
    if (event.target == contactModal) {
        contactModal.style.display = "none";
    }
    if (event.target == inquiryModal) {
        inquiryModal.style.display = "none";
    }
}

function toggleDarkMode() {
    const body = document.body;
    const btn = document.getElementById('themeToggle');
    body.classList.toggle('dark-mode');
    
    if(body.classList.contains('dark-mode')) {
        btn.innerHTML = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        btn.innerHTML = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

// Check for saved theme on load
window.onload = function() {
    if(localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('themeToggle').innerHTML = '☀️';
    }
} 

// --- MEDIA SLIDER LOGIC ---
function toggleMedia(id) {
    const wrapper = document.getElementById(`slider-${id}`);
    if (!wrapper) return;
    
    const img = wrapper.querySelector('img');
    const vid = wrapper.querySelector('video');
    
    if (img.classList.contains('active-media')) {
        // Switch to Video
        img.classList.replace('active-media', 'hidden-media');
        vid.classList.replace('hidden-media', 'active-media');
    } else {
        // Switch to Image & pause video
        vid.classList.replace('active-media', 'hidden-media');
        img.classList.replace('hidden-media', 'active-media');
        vid.pause();
    }
}

// --- SMART NOTIFICATION TRIGGER ---
// Wait 12 seconds before sliding in the helpful prompt
setTimeout(() => {
    const tooltip = document.getElementById('wa-tooltip');
    if (tooltip) {
        tooltip.classList.add('show');
    }
}, 12000);

// Function to close it if the user finds it annoying
function closeTooltip() {
    const tooltip = document.getElementById('wa-tooltip');
    if (tooltip) {
        tooltip.classList.remove('show');
    }
}

// --- TEXTAREA AUTO-RESIZE ---
function autoResize(textarea) {
    // Reset the height first so it can shrink if the user deletes text
    textarea.style.height = 'auto'; 
    // Set the height to match the scroll height of the internal text
    textarea.style.height = textarea.scrollHeight + 'px'; 
}


// --- TEMPORARY JOKE FEATURE (DELETE BEFORE LAUNCH) ---
const memeSound = new Audio('assets/fahhhhhhhhhhhhhh.mp3');

function playJokeSound() {
    // Play the sound
    memeSound.play().catch(err => console.log("Browser blocked the sound:", err));
    
    // Immediately remove the event listener so it only happens ONCE
    document.removeEventListener('click', playJokeSound);
}

// Listen for the very first click ANYWHERE on the document
document.addEventListener('click', playJokeSound);