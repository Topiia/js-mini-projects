// ================= CONFIG =================
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";
const API_TOKEN = typeof CONFIG !== 'undefined' ? CONFIG.TMDB_API_KEY : null;

// ================= DOM =================
const moviesGrid = document.getElementById("moviesGrid");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const loader = document.getElementById("loader");

const modal = document.getElementById("movieModal");
const closeBtn = document.querySelector(".close-btn");
const modalPoster = document.getElementById("modalPoster");
const modalTitle = document.getElementById("modalTitle");
const modalRating = document.getElementById("modalRating");
const modalOverview = document.getElementById("modalOverview");
const modalDate = document.getElementById("modalDate");
const modalBackdrop = document.querySelector(".modal-backdrop-img");

// ================= INIT =================
initApp();

// ================= EVENTS =================
searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSearch();
});

closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});

// ================= FUNCTIONS =================
function initApp() {
    if (!API_TOKEN || API_TOKEN === "PASTE_YOUR_API_KEY_HERE" || API_TOKEN === "DEMO_KEY") {
        console.error("Config missing. Copy js/config.example.js to js/config.js");
        alert("Setup Required: \n1. Copy js/config.example.js to js/config.js\n2. Add your API Key");
        return;
    }
    fetchMovies("popular");
}

function handleSearch() {
    const query = searchInput.value.trim();
    if (query) fetchMovies("search", query);
}

async function fetchMovies(type, query = "") {
    loader.classList.remove("hidden");
    moviesGrid.innerHTML = "";

    const endpoint =
        type === "popular"
            ? `${BASE_URL}/movie/popular`
            : `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`TMDB Error: ${response.status}`);
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            moviesGrid.innerHTML = `<p class="error-msg">No movies found.</p>`;
            return;
        }

        displayMovies(data.results);
    } catch (err) {
        console.error(err);
        moviesGrid.innerHTML = `<p class="error-msg">Failed to load movies.</p>`;
    } finally {
        loader.classList.add("hidden");
    }
}

function displayMovies(movies) {
    moviesGrid.innerHTML = movies
        .map((movie) => {
            const poster = movie.poster_path
                ? IMAGE_BASE_URL + movie.poster_path
                : "https://via.placeholder.com/500x750?text=No+Image";

            const rating = movie.vote_average
                ? movie.vote_average.toFixed(1)
                : "N/A";

            return `
        <div class="movie-card" data-id="${movie.id}">
          <img src="${poster}" alt="${movie.title}" loading="lazy" />
          <div class="movie-overlay">
            <div class="movie-title">${movie.title}</div>
            <div class="movie-rating">⭐ ${rating}</div>
          </div>
        </div>
      `;
        })
        .join("");

    document.querySelectorAll(".movie-card").forEach((card) => {
        card.addEventListener("click", () => {
            openModal(card.dataset.id);
        });
    });
}

async function openModal(id) {
    try {
        const response = await fetch(`${BASE_URL}/movie/${id}`, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Failed to load movie details");
        }

        const movie = await response.json();

        modalPoster.src = movie.poster_path
            ? IMAGE_BASE_URL + movie.poster_path
            : "https://via.placeholder.com/500x750";

        modalTitle.textContent = movie.title;
        modalRating.textContent = `⭐ ${movie.vote_average.toFixed(1)}`;
        modalOverview.textContent =
            movie.overview || "No overview available.";
        modalDate.textContent = movie.release_date
            ? movie.release_date.split("-")[0]
            : "Unknown";

        modalBackdrop.style.backgroundImage = movie.backdrop_path
            ? `url(${BACKDROP_BASE_URL + movie.backdrop_path})`
            : "none";

        modal.classList.add("show");
        document.body.style.overflow = "hidden";
    } catch (err) {
        console.error(err);
    }
}

function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "auto";
}
