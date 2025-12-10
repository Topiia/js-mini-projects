const coin = document.getElementById('coin');
const flipBtn = document.getElementById('flipBtn');
const resetBtn = document.getElementById('resetBtn');
const statusText = document.getElementById('statusText');
const headsCountEl = document.getElementById('headsCount');
const tailsCountEl = document.getElementById('tailsCount');

let heads = 0;
let tails = 0;
let isFlipping = false;

flipBtn.addEventListener('click', () => {
    if (isFlipping) return;
    isFlipping = true;

    // Reset animation
    coin.style.transition = 'none';
    coin.style.transform = 'rotateX(0deg)';

    // Force reflow
    void coin.offsetWidth;

    coin.style.transition = 'transform 3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    statusText.textContent = "Flipping...";

    const isHeads = Math.random() < 0.5;

    if (isHeads) {
        coin.style.transform = 'rotateX(1800deg)'; // 5 spins -> 0 deg (mod 360) effectively
        setTimeout(() => {
            heads++;
            headsCountEl.textContent = heads;
            statusText.textContent = "HEADS";
            statusText.style.color = "#ffd700";
            isFlipping = false;
        }, 3000);
    } else {
        coin.style.transform = 'rotateX(1980deg)'; // 5.5 spins -> 180 deg
        setTimeout(() => {
            tails++;
            tailsCountEl.textContent = tails;
            statusText.textContent = "TAILS";
            statusText.style.color = "#c0c0c0";
            isFlipping = false;
        }, 3000);
    }
});

resetBtn.addEventListener('click', () => {
    if (isFlipping) return;
    heads = 0;
    tails = 0;
    headsCountEl.textContent = 0;
    tailsCountEl.textContent = 0;
    statusText.textContent = "Click Flip to Start";
    statusText.style.color = "var(--neon-blue)";

    coin.style.transition = 'all 0.5s ease';
    coin.style.transform = 'rotateX(0deg)';
});
