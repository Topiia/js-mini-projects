const languages = [
    {
        name: "Python",
        tagline: "Readable, versatile, everywhere.",
        year: 1991,
        creator: "Guido van Rossum",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        snippet: "def greet(name):\n    return f'Hello, {name}!'"
    },
    {
        name: "JavaScript",
        tagline: "The language of the web.",
        year: 1995,
        creator: "Brendan Eich",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        snippet: "const greet = n => `Hello, ${n}!`;\nconsole.log(greet('World'));"
    },
    {
        name: "Java",
        tagline: "Write once, run anywhere.",
        year: 1995,
        creator: "James Gosling",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        snippet: "System.out.println(\"Hello World\");"
    },
    {
        name: "C++",
        tagline: "Performance + Abstraction.",
        year: 1985,
        creator: "Bjarne Stroustrup",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        snippet: "std::cout << \"Hello World\";"
    },
    {
        name: "Rust",
        tagline: "Memory safety without GC.",
        year: 2010,
        creator: "Mozilla",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg",
        snippet: "println!(\"Hello World\");"
    },
    {
        name: "Go",
        tagline: "Simple, fast, concurrent.",
        year: 2009,
        creator: "Google",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg",
        snippet: "fmt.Println(\"Hello World\")"
    },
    {
        name: "Swift",
        tagline: "Apple's modern powerhouse.",
        year: 2014,
        creator: "Apple",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
        snippet: "print(\"Hello World\")"
    },
    {
        name: "TypeScript",
        tagline: "JavaScript with types.",
        year: 2012,
        creator: "Microsoft",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        snippet: "let msg: string = \"Hello World\";"
    }
];

const grid = document.getElementById('grid');
const searchInput = document.getElementById('search');
const randomBtn = document.getElementById('randomBtn');

function render(list) {
    grid.innerHTML = '';
    list.forEach(lang => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <img class="lang-logo" src="${lang.logo}" alt="${lang.name}">
                    <h2 class="lang-name">${lang.name}</h2>
                    <p class="lang-tagline">${lang.tagline}</p>
                </div>
                <div class="card-back">
                    <h2 class="lang-name">${lang.name}</h2>
                    <pre class="code-snippet"><code>${lang.snippet}</code></pre>
                    <div class="details">
                        <p><span>Year:</span> ${lang.year}</p>
                        <p><span>Creator:</span> ${lang.creator}</p>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

searchInput.addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase();
    const filtered = languages.filter(l => l.name.toLowerCase().includes(val));
    render(filtered);
});

randomBtn.addEventListener('click', () => {
    const cards = document.querySelectorAll('.card');
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    randomCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Trigger flip by adding hover class temporarily if needed, but CSS handles hover.
    // We can focus it.
    randomCard.focus();
});

// Init
render(languages);
