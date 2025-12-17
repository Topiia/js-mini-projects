const images = [
    "https://images.unsplash.com/photo-1542281286-9e0a16bb7366", // Cyberpunk City
    "https://images.unsplash.com/photo-1534211832049-9df2dd432924", // Neon Signs
    "https://images.unsplash.com/photo-1563089145-599997674d42", // Retro Grid
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b", // Tech
    "https://images.unsplash.com/photo-1629853920703-e62a95c97793"  // Glass
];

let currentIndex = 0;
let autoPlayInterval;
let isAutoPlaying = false;

const displayImage = document.getElementById('displayImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const autoPlayBtn = document.getElementById('autoPlayBtn');
const indicatorsContainer = document.getElementById('indicators');

// Initialize
function init() {
    createIndicators();
    loadImage(currentIndex);
}

function createIndicators() {
    images.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentIndex = index;
            loadImage(currentIndex);
            resetAutoPlay();
        });
        indicatorsContainer.appendChild(dot);
    });
}

function updateIndicators() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentIndex) dot.classList.add('active');
        else dot.classList.remove('active');
    });
}

function loadImage(index) {
    displayImage.classList.remove('visible');

    // Smooth transition
    setTimeout(() => {
        displayImage.src = images[index];
        displayImage.onload = () => {
            displayImage.classList.add('visible');
        };
        // Fallback if cached
        if (displayImage.complete) displayImage.classList.add('visible');
    }, 200);

    updateIndicators();
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    loadImage(currentIndex);
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    loadImage(currentIndex);
}

// Event Listeners
nextBtn.addEventListener('click', () => {
    nextImage();
    resetAutoPlay();
});

prevBtn.addEventListener('click', () => {
    prevImage();
    resetAutoPlay();
});

autoPlayBtn.addEventListener('click', () => {
    if (isAutoPlaying) {
        stopAutoPlay();
    } else {
        startAutoPlay();
    }
});

function startAutoPlay() {
    isAutoPlaying = true;
    autoPlayBtn.textContent = "Stop Autoplay";
    autoPlayBtn.classList.add('warning');
    autoPlayInterval = setInterval(nextImage, 3000);
}

function stopAutoPlay() {
    isAutoPlaying = false;
    autoPlayBtn.textContent = "Start Autoplay";
    autoPlayBtn.classList.remove('warning');
    clearInterval(autoPlayInterval);
}

function resetAutoPlay() {
    if (isAutoPlaying) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextImage, 3000);
    }
}

// Keyboard nav
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
});

init();
