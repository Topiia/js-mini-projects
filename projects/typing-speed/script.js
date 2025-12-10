const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
    "I think therefore I am.",
    "The only thing we have to fear is fear itself.",
    "JavaScript is the programming language of the Web.",
    "Clean code always looks like it was written by someone who cares."
];

const quoteDisplay = document.getElementById('quoteDisplay');
const inputField = document.getElementById('inputField');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const wpmEl = document.getElementById('wpm');
const accuracyEl = document.getElementById('accuracy');
const timeEl = document.getElementById('timeLeft');

let timer;
let timeLeft = 60;
let timeElapsed = 0;
let timerRunning = false;
let currentQuote = "";
let charIndex = 0;
let errors = 0;

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', resetGame);

function startGame() {
    startBtn.classList.add('hidden');
    restartBtn.classList.remove('hidden');
    inputField.disabled = false;
    inputField.value = "";
    inputField.focus();

    loadQuote();

    // Timer starts on first input or immediately? Let's do immediately for "Speed Test"
    timerRunning = true;
    timer = setInterval(updateTimer, 1000);
}

function loadQuote() {
    currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteDisplay.innerHTML = '';
    currentQuote.split('').forEach(char => {
        const span = document.createElement('span');
        span.innerText = char;
        quoteDisplay.appendChild(span);
    });
}

inputField.addEventListener('input', () => {
    if (!timerRunning) return;

    const currInput = inputField.value.split('');
    const quoteChars = quoteDisplay.querySelectorAll('span');
    let correctChars = 0;

    quoteChars.forEach((charSpan, index) => {
        const char = currInput[index];

        if (char == null) {
            charSpan.classList.remove('correct');
            charSpan.classList.remove('incorrect');
        } else if (char === charSpan.innerText) {
            charSpan.classList.add('correct');
            charSpan.classList.remove('incorrect');
            correctChars++;
        } else {
            charSpan.classList.remove('correct');
            charSpan.classList.add('incorrect');
            if (index === currInput.length - 1) errors++; // Crude error tracking
        }
    });

    // Accuracy
    const accuracy = currInput.length > 0
        ? Math.round(((currInput.length - errors) / currInput.length) * 100)
        : 100;
    accuracyEl.innerText = `${accuracy}%`;

    // WPM
    // (Chars / 5) / TimeInMinutes
    if (timeElapsed > 0) {
        const wpm = Math.round((currInput.length / 5) / (timeElapsed / 60));
        wpmEl.innerText = wpm;
    }

    // Check complete
    if (currInput.length >= currentQuote.length) {
        finishGame();
    }
});

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeElapsed++;
        timeEl.innerText = timeLeft;
    } else {
        finishGame();
    }
}

function finishGame() {
    clearInterval(timer);
    timerRunning = false;
    inputField.disabled = true;
    quoteDisplay.innerHTML += ` <br><strong style="color:var(--neon-green)">Finished! Final WPM: ${wpmEl.innerText}</strong>`;
}

function resetGame() {
    clearInterval(timer);
    timeLeft = 60;
    timeElapsed = 0;
    errors = 0;
    timerRunning = false;

    timeEl.innerText = timeLeft;
    wpmEl.innerText = 0;
    accuracyEl.innerText = "100%";

    inputField.value = "";
    inputField.disabled = true;

    startBtn.classList.remove('hidden');
    restartBtn.classList.add('hidden');
    quoteDisplay.innerText = 'Click "Start" to begin...';
}
