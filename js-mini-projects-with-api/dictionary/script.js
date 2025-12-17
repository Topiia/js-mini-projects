const input = document.getElementById('inputText');
const searchBtn = document.getElementById('searchBtn');
const content = document.getElementById('displayContent');
const audioPlayer = document.getElementById('audioPlayer');

searchBtn.addEventListener('click', () => searchWord());
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchWord();
});

async function searchWord() {
    const word = input.value.trim();
    if (!word) return;

    content.innerHTML = '<div class="empty-state">Searching...</div>';

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();

        if (response.ok) {
            displayResults(data[0]);
        } else {
            content.innerHTML = `<div class="empty-state" style="color: var(--neon-pink)">${data.title || "Word not found"}</div>`;
        }
    } catch (error) {
        console.error(error);
        content.innerHTML = `<div class="empty-state" style="color: var(--neon-pink)">Network Error</div>`;
    }
}

function displayResults(data) {
    const phonetic = data.phonetics.find(p => p.audio && p.text) || data.phonetics[0] || {};
    const audioSrc = data.phonetics.find(p => p.audio)?.audio;

    let meaningsHTML = data.meanings.map(m => `
        <div class="meaning-block">
            <span class="part-of-speech">${m.partOfSpeech}</span>
            <p class="definition">${m.definitions[0].definition}</p>
        </div>
    `).join('');

    content.innerHTML = `
        <div class="word-header">
            <div>
                <h2 class="word-title">${data.word}</h2>
                <span class="phonetic">${phonetic.text || ''}</span>
            </div>
            ${audioSrc ? `<button class="audio-btn" onclick="playAudio('${audioSrc}')">🔊</button>` : ''}
        </div>
        <div class="meanings">
            ${meaningsHTML}
        </div>
    `;
}

window.playAudio = (src) => {
    audioPlayer.src = src;
    audioPlayer.play();
};
