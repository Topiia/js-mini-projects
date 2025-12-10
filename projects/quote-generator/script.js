const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
    { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
    { text: "Act as if what you do makes a difference. It does.", author: "William James" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
    { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" }
];

const quoteText = document.getElementById('quoteText');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const tweetBtn = document.getElementById('tweetBtn');

function newQuote() {
    // Fade out
    quoteText.style.opacity = 0;
    authorText.style.opacity = 0;

    setTimeout(() => {
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        quoteText.textContent = quote.text;
        authorText.textContent = `- ${quote.author}`;

        // Fade in
        quoteText.style.opacity = 1;
        authorText.style.opacity = 1;
    }, 500);
}

tweetBtn.addEventListener('click', () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
});

newQuoteBtn.addEventListener('click', newQuote);

// Initial Load
newQuote();
