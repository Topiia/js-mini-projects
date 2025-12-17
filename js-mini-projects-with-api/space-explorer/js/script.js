const apiKey = typeof CONFIG !== 'undefined' ? CONFIG.NASA_API_KEY : null;

// DOM Elements
const datePicker = document.getElementById('datePicker');
const getImageBtn = document.getElementById('getImage');
const mediaContainer = document.getElementById('mediaContainer');
const imgDate = document.getElementById('imgDate');
const imgTitle = document.getElementById('imgTitle');
const imgExplanation = document.getElementById('imgExplanation');

// Setup UI
datePicker.max = new Date().toISOString().split("T")[0];
datePicker.value = new Date().toISOString().split("T")[0];

// Event Listeners
getImageBtn.addEventListener('click', () => {
    fetchAPOD(datePicker.value);
});

// Initialize
initApp();

// Functions
async function initApp() {
    if (!apiKey || apiKey === "PASTE_YOUR_API_KEY_HERE" || apiKey === "DEMO_KEY") {
        console.error("Config missing. Copy js/config.example.js to js/config.js");
        alert("Setup Required: \n1. Copy js/config.example.js to js/config.js\n2. Add your API Key");
        return;
    }
    fetchAPOD();
}

async function fetchAPOD(date) {
    if (!apiKey) return;

    // Show Loading
    mediaContainer.innerHTML = '<div class="loader"></div>';
    imgTitle.innerText = "Scanning the cosmos...";
    imgExplanation.innerText = "";
    imgDate.innerText = "";

    const url = date
        ? `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`
        : `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        updateUI(data);
    } catch (error) {
        console.error(error);
        mediaContainer.innerHTML = '<p style="color:var(--neon-pink)">Error contacting NASA servers.</p>';
    }
}

function updateUI(data) {
    imgDate.innerText = data.date;
    imgTitle.innerText = data.title;
    imgExplanation.innerText = data.explanation;

    if (data.media_type === "image") {
        mediaContainer.innerHTML = `
            <img src="${data.hdurl || data.url}" alt="${data.title}">
        `;
    } else if (data.media_type === "video") {
        mediaContainer.innerHTML = `
            <iframe src="${data.url}" frameborder="0" allowfullscreen style="width:100%; height:100%;"></iframe>
        `;
    }
}
