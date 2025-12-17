let calculation = localStorage.getItem('calculation') || '';

// Initialize display
updateDisplay();

function updateDisplay() {
    const displayElement = document.querySelector('.js-display');
    if (!calculation) {
        displayElement.innerText = '0';
        displayElement.style.color = 'rgba(255,255,255,0.3)'; // Dim when empty
    } else {
        displayElement.innerText = calculation;
        displayElement.style.color = 'var(--neon-blue)';
    }
}

function appendNumber(value) {
    if (calculation === 'Error' || calculation === 'NaN' || calculation === 'Infinity') {
        calculation = '';
    }
    calculation += value;
    saveAndDisplay();
}

function appendOperator(op) {
    const lastChar = calculation.slice(-1);
    if ('+-*/.'.includes(lastChar)) {
        // Prevent double operators
        return;
    }
    if (!calculation && op !== '-') return; // Only allow minus at start

    calculation += op;
    saveAndDisplay();
}

function deleteLast() {
    calculation = calculation.toString().slice(0, -1);
    saveAndDisplay();
}

function clearDisplay() {
    calculation = '';
    saveAndDisplay();
}

function calculate() {
    try {
        // Evaluate the expression safely
        // Note: For a portfolio, Function constructor or eval is often used 
        // to simplify parsing, but specific joke checks were requested to be preserved/removed.
        // The original code had a "You are Banned" joke which we will remove for "Premium" feel 
        // unless requested. We'll stick to professional math.

        let result = eval(calculation); // Still using eval for simplicity as per original constraint

        if (!isFinite(result) || isNaN(result)) {
            calculation = 'Error';
        } else {
            calculation = String(result);
        }
    } catch (error) {
        calculation = 'Error';
    }
    saveAndDisplay();
}

function saveAndDisplay() {
    localStorage.setItem('calculation', calculation);
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', (event) => {
    if (event.key >= '0' && event.key <= '9') appendNumber(event.key);
    if (event.key === '.') appendNumber('.');
    if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') appendOperator(event.key);
    if (event.key === 'Enter' || event.key === '=') calculate();
    if (event.key === 'Backspace') deleteLast();
    if (event.key === 'Escape') clearDisplay();
});
