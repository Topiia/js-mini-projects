const fileInput = document.getElementById('fileInput');
const imagePreview = document.getElementById('imagePreview');
const placeholder = document.getElementById('placeholder');
const controlsArea = document.getElementById('controlsArea');
const resetBtn = document.getElementById('resetBtn');

// Sliders
const brightness = document.getElementById('brightness');
const contrast = document.getElementById('contrast');
const saturate = document.getElementById('saturate');

// Labels
const brightVal = document.getElementById('brightVal');
const contrastVal = document.getElementById('contrastVal');
const saturateVal = document.getElementById('saturateVal');

// Presets
const presetBtns = document.querySelectorAll('.preset-btn');

let currentFilter = {
    brightness: 100,
    contrast: 100,
    saturate: 100,
    preset: ''
};

// Handle File Upload
fileInput.addEventListener('click', () => {
    fileInput.value = null; // Allow re-selecting same file
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    handleFile(file);
});

// Allow clicking preview to change image
imagePreview.addEventListener('click', () => {
    fileInput.click();
});

function handleFile(file) {
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            imagePreview.src = event.target.result;
            imagePreview.classList.remove('hidden');
            placeholder.classList.add('hidden');
            controlsArea.classList.remove('disabled');
        };
        reader.readAsDataURL(file);
    }
}

// Update Filters
function applyFilters() {
    const filterString = `
        brightness(${currentFilter.brightness}%) 
        contrast(${currentFilter.contrast}%) 
        saturate(${currentFilter.saturate}%)
        ${currentFilter.preset}
    `;
    imagePreview.style.filter = filterString;
}

// Slider Events
brightness.addEventListener('input', (e) => {
    currentFilter.brightness = e.target.value;
    brightVal.innerText = `${e.target.value}%`;
    applyFilters();
});

contrast.addEventListener('input', (e) => {
    currentFilter.contrast = e.target.value;
    contrastVal.innerText = `${e.target.value}%`;
    applyFilters();
});

saturate.addEventListener('input', (e) => {
    currentFilter.saturate = e.target.value;
    saturateVal.innerText = `${e.target.value}%`;
    applyFilters();
});

// Preset Events
presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        currentFilter.preset = filter === 'none' ? '' : filter;
        applyFilters();
    });
});

// Reset
resetBtn.addEventListener('click', () => {
    currentFilter = { brightness: 100, contrast: 100, saturate: 100, preset: '' };
    brightness.value = 100;
    contrast.value = 100;
    saturate.value = 100;
    brightVal.innerText = "100%";
    contrastVal.innerText = "100%";
    saturateVal.innerText = "100%";
    applyFilters();
});
