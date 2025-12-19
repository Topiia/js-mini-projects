const apiKey = typeof CONFIG !== 'undefined' ? CONFIG.WEATHER_API_KEY : null;

// DOM Elements
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherDisplay = document.getElementById('weatherDisplay');
const errorDisplay = document.getElementById('errorDisplay');
const loader = document.getElementById('loader');

// Event Listeners
searchBtn.addEventListener('click', () => getWeather());
cityInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') getWeather();
});

// Initialize
initApp();

// Functions
async function initApp() {
    if (!apiKey || apiKey === "PASTE_YOUR_API_KEY_HERE" || apiKey === "DEMO_KEY") {
        console.error("Config missing. Copy js/config.example.js to js/config.js");
        alert("Setup Required: \n1. Copy js/config.example.js to js/config.js\n2. Add your API Key");
    }
}

async function getWeather() {
    const city = cityInput.value.trim();
    if (!city) return;

    // UI States
    weatherDisplay.classList.add('hidden');
    errorDisplay.classList.add('hidden');
    loader.classList.remove('hidden');

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        loader.classList.add('hidden');

        if (data.cod === 200) {
            updateUI(data);
            weatherDisplay.classList.remove('hidden');
        } else {
            errorDisplay.classList.remove('hidden');
        }
    } catch (error) {
        console.error(error);
        loader.classList.add('hidden');
        errorDisplay.classList.remove('hidden');
    }
}

function updateUI(data) {
    document.getElementById('cityName').textContent = data.name;
    document.getElementById('country').textContent = data.sys.country;
    document.getElementById('temperature').textContent = Math.round(data.main.temp);
    document.getElementById('condition').textContent = data.weather[0].description;

    document.getElementById('feelsLike').textContent = Math.round(data.main.feels_like) + '°';
    document.getElementById('humidity').textContent = data.main.humidity + '%';
    document.getElementById('windSpeed').textContent = (data.wind.speed * 3.6).toFixed(1) + ' km/h';
    document.getElementById('visibility').textContent = (data.visibility / 1000).toFixed(1) + ' km';

    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    document.getElementById('sunrise').textContent = sunrise;
    document.getElementById('sunset').textContent = sunset;

    const isNight = data.weather[0].icon.endsWith('n');
    updateTheme(data.main.temp, data.weather[0].main, isNight);
}

function updateTheme(temp, condition, isNight) {
    if (window.BackgroundEngine) {
        window.BackgroundEngine.update(condition, isNight);
    }
}
