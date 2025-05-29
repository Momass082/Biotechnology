// --- Hamburger Menu & Overlay Functionality ---
const hamburgerMenu = document.getElementById("hamburger-menu");
const sidePanel = document.querySelector(".side-panel");
const mainContent = document.getElementById("main-content"); // This now correctly targets the new div
const overlay = document.getElementById('overlay');

function toggleSidePanel() {
    sidePanel.classList.toggle("show");
    mainContent.classList.toggle("dim");
    overlay.classList.toggle("show");
    // Ensure body scroll is managed when panel is open
    document.body.style.overflow = sidePanel.classList.contains("show") ? 'hidden' : '';
}

hamburgerMenu.addEventListener("click", toggleSidePanel);

// Close panel when clicking dimmed content or overlay
mainContent.addEventListener("click", () => {
    if (sidePanel.classList.contains("show")) {
        toggleSidePanel();
    }
});

overlay.addEventListener("click", () => {
    if (sidePanel.classList.contains("show")) {
        toggleSidePanel();
    }
});

// Close panel when a navigation link within the side panel is clicked
// This handles both direct links and dropdown sub-links
sidePanel.querySelectorAll('ul li a:not(.dropdown-toggle), .dropdown-menu a').forEach(link => {
    link.addEventListener('click', () => {
        // Only close if the panel is currently open
        if (sidePanel.classList.contains("show")) {
            toggleSidePanel();
        }
        // For direct navigation links, also close any open dropdowns in the side panel
        document.querySelectorAll('.side-panel .dropdown.active').forEach(openDropdown => {
            openDropdown.classList.remove('active');
            openDropdown.querySelector('.dropdown-menu').style.maxHeight = null;
            openDropdown.querySelector('.arrow-dropdown').style.transform = 'rotate(0deg)';
        });
    });
});


// --- Side Panel Dropdown Functionality (Projects & Contact) ---
document.querySelectorAll('.side-panel .dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', (event) => {
        event.preventDefault(); // <-- CRUCIAL: Prevent default link behavior for dropdown toggles

        const parentLi = toggle.closest('li.dropdown');
        const dropdownMenu = parentLi.querySelector('.dropdown-menu');
        const arrow = toggle.querySelector('.arrow-dropdown');

        // Close other open dropdowns
        document.querySelectorAll('.side-panel .dropdown.active').forEach(openDropdown => {
            if (openDropdown !== parentLi) {
                openDropdown.classList.remove('active');
                openDropdown.querySelector('.dropdown-menu').style.maxHeight = null;
                openDropdown.querySelector('.arrow-dropdown').style.transform = 'rotate(0deg)';
            }
        });

        // Toggle current dropdown
        parentLi.classList.toggle('active');
        if (dropdownMenu.style.maxHeight) {
            dropdownMenu.style.maxHeight = null; // Close it
            arrow.style.transform = 'rotate(0deg)';
        } else {
            dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + 'px'; // Open it
            arrow.style.transform = 'rotate(180deg)';
        }
    });
});


// --- Displaying Contact Info from Side Panel ---
document.getElementById('personal-email-link').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent navigating to #
    alert('Personal Email: Momasseminent@gmail.com');
});

document.getElementById('work-email-link').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent navigating to #
    alert('Work Email: s229776213@mandela.ac.za');
});

document.getElementById('phone-link').addEventListener('click', (e) => {
    e.preventDefault(); // Prevent navigating to #
    alert('Phone: +27 66 592 2166');
});
// --- Candlestick Chart Animation Functionality ---
document.addEventListener('DOMContentLoaded', () => {
    const chart = document.querySelector('.candlestick-chart');
    const computerScreen = document.querySelector('.computer-screen');
    const maxCandles = 50; // Max number of candlesticks to show
    const candleWidth = 10; // Must match CSS .candlestick width
    const gap = 2; // Must match CSS .candlestick-chart gap

    // Function to simulate dynamic text on computer screen
    let screenInterval;
    function animateComputerScreen() {
        clearInterval(screenInterval);
        const messages = [
            'Executing trade #001...',
            'Analyzing market trends...',
            'Detecting arbitrage opp...',
            'AI model active...',
            'Optimizing portfolio...',
            'Processing data stream...'
        ];
        let messageIndex = 0;
        computerScreen.textContent = messages[messageIndex];
        screenInterval = setInterval(() => {
            messageIndex = (messageIndex + 1) % messages.length;
            computerScreen.textContent = messages[messageIndex];
        }, 3000); // Change message every 3 seconds
    }
    animateComputerScreen(); // Start immediately

    // Function to generate a new candlestick
    function generateCandlestick() {
        const candlestick = document.createElement('div');
        candlestick.classList.add('candlestick');

        // Simulate price movement for height and color
        const baseHeight = 50; // Min height for a candle
        const priceChange = Math.random() * 200 - 100; // -100 to 100
        const height = Math.max(10, baseHeight + priceChange); // Ensure min height

        candlestick.style.height = `${height}px`;

        if (priceChange > 0) {
            candlestick.classList.remove('bearish'); // Green (default)
        } else {
            candlestick.classList.add('bearish'); // Red
        }

        // Add the new candle to the chart
        chart.appendChild(candlestick);

        // Remove oldest candle if we exceed max
        if (chart.children.length > maxCandles) {
            chart.removeChild(chart.firstElementChild);
        }
    }

    // Generate initial set of candles
    for (let i = 0; i < maxCandles; i++) {
        generateCandlestick();
    }

    // Continuously add new candles to animate the chart
    setInterval(generateCandlestick, 1000); // Add a new candle every 1 second
});
// --- Dark Mode Toggle ---
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("dark-toggle");
    const html = document.documentElement;

    // Check stored preference
    if (localStorage.getItem("theme") === "dark") {
        html.classList.add("dark");
        toggle.textContent = "☀️";
    }

    toggle.addEventListener("click", () => {
        html.classList.toggle("dark");
        const isDark = html.classList.contains("dark");
        toggle.textContent = isDark ? "☀️" : "🌙";
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });
});






