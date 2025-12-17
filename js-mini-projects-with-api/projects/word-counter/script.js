const textInput = document.getElementById('textInput');
const copyBtn = document.getElementById('copyBtn');
const clearBtn = document.getElementById('clearBtn');

// Stats Elements
const charCount = document.getElementById('charCount');
const wordCount = document.getElementById('wordCount');
const sentenceCount = document.getElementById('sentenceCount');
const paragraphCount = document.getElementById('paragraphCount');

textInput.addEventListener('input', analyzeText);

function analyzeText() {
    const text = textInput.value;

    // Characters
    charCount.textContent = text.length.toLocaleString();

    // Words (English & basic boundary support)
    const words = text.match(/\b\S+\b/g) || [];
    wordCount.textContent = words.length.toLocaleString();

    // Sentences (Simple punctuation split)
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    sentenceCount.textContent = sentences.length.toLocaleString();

    // Paragraphs
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    paragraphCount.textContent = paragraphs.length.toLocaleString();
}

clearBtn.addEventListener('click', () => {
    textInput.value = '';
    analyzeText();
    textInput.focus();
});

copyBtn.addEventListener('click', () => {
    if (textInput.value) {
        navigator.clipboard.writeText(textInput.value);
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = originalText, 1500);
    }
});
