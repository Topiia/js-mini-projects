let cartQuantity = JSON.parse(localStorage.getItem('cartQuantity')) || 0;

const badge = document.getElementById('cartBadge');
const statusMsg = document.getElementById('statusMsg');
const resetBtn = document.getElementById('resetBtn');

updateDisplay();

window.updateCart = (change) => {
    const newQuantity = cartQuantity + change;

    if (newQuantity > 10) {
        showStatus('Cart is full (Max 10)', 'error');
        return;
    }

    if (newQuantity < 0) {
        showStatus('Cart is empty', 'error');
        return;
    }

    cartQuantity = newQuantity;
    saveCart();

    if (change > 0) showStatus(`Added ${change} item(s)`, 'success');
    else showStatus(`Removed ${Math.abs(change)} item(s)`, 'success');
};

resetBtn.addEventListener('click', () => {
    cartQuantity = 0;
    saveCart();
    showStatus('Cart reset', 'success');
});

function saveCart() {
    localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));
    updateDisplay();
}

function updateDisplay() {
    badge.textContent = cartQuantity;
    badge.style.transform = 'scale(1.2)';
    setTimeout(() => badge.style.transform = 'scale(1)', 200);
}

function showStatus(msg, type) {
    statusMsg.textContent = msg;
    statusMsg.className = `status-msg ${type}`;
    setTimeout(() => {
        statusMsg.textContent = '';
        statusMsg.className = 'status-msg';
    }, 2000);
}
