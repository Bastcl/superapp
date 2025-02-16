let total = 0;
let history = [];
let lastOperation = null;

document.getElementById('addButton').addEventListener('click', () => {
    const amount = parseInt(document.getElementById('amount').value);
    const itemName = document.getElementById('itemName').value.trim();

    if (isNaN(amount) || amount <= 0) {
        alert("Por favor, ingrese un monto válido.");
        return;
    }

    total += amount;
    updateTotal();
    addToHistory(itemName, amount, 'add');
    lastOperation = { type: 'add', amount, itemName };
    clearInputs();
    hideUndoButton();
});

document.getElementById('subtractButton').addEventListener('click', () => {
    const amount = parseInt(document.getElementById('amount').value);
    const itemName = document.getElementById('itemName').value.trim();

    if (isNaN(amount) || amount <= 0) {
        alert("Por favor, ingrese un monto válido.");
        return;
    }

    if (total - amount < 0) {
        document.getElementById('errorMessage').textContent = "No se puede tener un total negativo";
        showUndoButton();
        return;
    }

    total -= amount;
    updateTotal();
    addToHistory(itemName, amount, 'subtract');
    lastOperation = { type: 'subtract', amount, itemName };
    clearInputs();
    hideUndoButton();
});

document.getElementById('undoButton').addEventListener('click', () => {
    location.reload(); // Refrescar la página
});

function updateTotal() {
    document.getElementById('totalAmount').textContent = total.toLocaleString('es-CL');
}

function addToHistory(itemName, amount, operation) {
    const formattedAmount = amount.toLocaleString('es-CL'); // Formatear con puntos de miles
    const entry = {
        itemName: itemName || "",
        amount: operation === 'add' ? `+${formattedAmount}` : `-${formattedAmount}`,
        className: operation === 'add' ? 'positive' : 'negative', // Clase para el color
    };
    history.push(entry);
    updateHistory();
}

function updateHistory() {
    const historyElement = document.getElementById('history');
    historyElement.innerHTML = history.map(entry => `
        <div>
            <span>${entry.itemName}</span>
            <span class="${entry.className}">${entry.amount}</span>
        </div>
    `).join('');
}

function clearInputs() {
    document.getElementById('itemName').value = "";
    document.getElementById('amount').value = "";
}

function showUndoButton() {
    document.getElementById('undoButton').style.display = 'block';
}

function hideUndoButton() {
    document.getElementById('undoButton').style.display = 'none';
    document.getElementById('errorMessage').textContent = "";
}